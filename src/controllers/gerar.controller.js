import TimesRepository from '../models/times/TimesRepository.js';
import PartidaRepository from '../models/partida/PartidaRepository.js';
import ConfrontoRepository from '../models/confrontos/ConfrontosRepository.js';
import ModalidadesRepository from '../models/modalidades/ModalidadesRepository.js';
import Partida from '../models/partida/Partida.js';
import { v4 as uuidv4 } from 'uuid';

const timesRepository = new TimesRepository();
const partidasRepository = new PartidaRepository();
const confrontosRepository = new ConfrontoRepository();
const modalidadesRepository = new ModalidadesRepository();

export const gerarTodosConfrontos = async (req, res) => {
    try {
        const { data, anotacao, updateUser, modalidade_id } = req.body;

        const modalidade = await modalidadesRepository.getModalidadeById(modalidade_id);

        // 2. Buscar todos os times disponíveis
        const times = await timesRepository.getTimeByModalidadeID(modalidade_id);

        const confrontos = [];


        if (modalidade.tipo === false) {
            // 3. Gerar confrontos todos contra todos com dados dos times
            for (let i = 0; i < times.length; i++) {
                for (let j = i + 1; j < times.length; j++) {
                    const partida = new Partida(data, anotacao, updateUser);
                    const novaPartida = await partidasRepository.createPartida(partida);
                    const partidaId = novaPartida.id;
                    const timeA = times[i];
                    const timeB = times[j];

                    // Adicionar os dados dos times nos confrontos
                    confrontos.push({
                        id: uuidv4(),
                        idPartida: partidaId,
                        timeA: { partidaId, id: timeA.id, nome: timeA.nome }, // Dados do time A
                        timeB: { partidaId, id: timeB.id, nome: timeB.nome }, // Dados do time B
                    });
                }
            }
        } else {
            // Gerar partidas com confrontos que guardam apenas um time
            for (let i = 0; i < times.length; i++) {
                const partida = new Partida(data, anotacao, updateUser);
                const novaPartida = await partidasRepository.createPartida(partida);
                const partidaId = novaPartida.id;
                const time = times[i];

                confrontos.push({
                    id: uuidv4(),
                    idPartida: partidaId,
                    time: { partidaId, id: time.id, nome: time.nome }, // Dados do time
                });
            }
        }

        // 4. Registrar confrontos no banco de dados
        for (const confronto of confrontos) {
            await confrontosRepository.createConfronto({
                id: confronto.id,
                idPartida: confronto.idPartida,
                timeId: confronto.timeA ? confronto.timeA.id : confronto.time.id,
                updAtIdUser: updateUser
            });
            if (confronto.timeB) {
                await confrontosRepository.createConfronto({
                    id: uuidv4(),
                    idPartida: confronto.idPartida,
                    timeId: confronto.timeB.id,
                    updAtIdUser: updateUser
                });
            }
        }

        return res.status(201).send({
            message: "Confrontos gerados com sucesso",
            totalConfrontos: confrontos.length,
            confrontos
        });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao gerar confrontos", error: error.message });
    }
};