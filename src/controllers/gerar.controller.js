import TimesRepository from '../models/times/TimesRepository.js';
import PartidaRepository from '../models/partida/PartidaRepository.js';
import ConfrontoRepository from '../models/confrontos/ConfrontosRepository.js';
import Partida from '../models/partida/Partida.js';
import { v4 as uuidv4 } from 'uuid';

const timesRepository = new TimesRepository();
const partidasRepository = new PartidaRepository();
const confrontosRepository = new ConfrontoRepository();

export const gerarTodosConfrontos = async (req, res) => {
    try {
        const { data, anotacao, updateUser, modalidade_id, tipoModalidade } = req.body;

        // 1. Criar uma nova partida e obter seu ID
        const partida = new Partida(data, anotacao, updateUser);
        const novaPartida = await partidasRepository.createPartida(partida);
        const partidaId = novaPartida.id;

        // 2. Buscar todos os times disponíveis
        const times = await timesRepository.getTimeByModalidadeID(modalidade_id);

        let confrontos = [];

        if (tipoModalidade === "contra todos") {
            // 3. Gerar confrontos todos contra todos com dados dos times
            for (let i = 0; i < times.length; i++) {
                for (let j = i + 1; j < times.length; j++) {
                    const timeA = times[i];
                    const timeB = times[j];

                    // Adicionar os dados dos times nos confrontos
                    confrontos.push({
                        id: uuidv4(),
                        idPartida: partidaId,
                        timeA: { id: timeA.id, nome: timeA.nome }, // Dados do time A
                        timeB: { id: timeB.id, nome: timeB.nome }, // Dados do time B
                        winner: false,
                        tie: false
                    });
                }
            }
        } else {
            // Gerar apenas dois confrontos em uma partida, todos os times jogam em partidas separadas
            for (let i = 0; i < times.length; i += 2) {
                if (i + 1 < times.length) {
                    const timeA = times[i];
                    const timeB = times[i + 1];

                    confrontos.push({
                        id: uuidv4(),
                        idPartida: partidaId,
                        timeA: { id: timeA.id, nome: timeA.nome }, // Dados do time A
                        timeB: { id: timeB.id, nome: timeB.nome }, // Dados do time B
                        winner: false,
                        tie: false
                    });
                } else {
                    const timeA = times[i];

                    confrontos.push({
                        id: uuidv4(),
                        idPartida: partidaId,
                        timeA: { id: timeA.id, nome: timeA.nome }, // Dados do time A
                        timeB: null, // Sem adversário
                        winner: false,
                        tie: false
                    });
                }
            }
        }

        // 4. Registrar confrontos no banco de dados
        for (const confronto of confrontos) {
            await confrontosRepository.createConfronto({
                id: confronto.id,
                idPartida: confronto.idPartida,
                timeId: confronto.timeA.id,
                winner: confronto.winner,
                tie: confronto.tie
            });
            if (confronto.timeB) {
                await confrontosRepository.createConfronto({
                    id: uuidv4(),
                    idPartida: confronto.idPartida,
                    timeId: confronto.timeB.id,
                    winner: confronto.winner,
                    tie: confronto.tie
                });
            }
        }

        return res.status(201).send({
            message: "Confrontos gerados e associados à partida com sucesso",
            partidaId,
            totalConfrontos: confrontos.length,
            confrontos
        });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao gerar confrontos", error: error.message });
    }
};
