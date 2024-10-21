import TimesRepository from '../models/times/TimesRepository.js';
import PartidaRepository from '../models/partida/PartidaRepository.js';
import ConfrontoRepository from '../models/confrontos/ConfrontosRepository.js';
import Partida from '../models/partida/Partida.js'; // Supondo que você tenha a classe Partida
import { v4 as uuidv4 } from 'uuid'; // Certifique-se de instalar o uuid

const timesRepository = new TimesRepository();
const partidasRepository = new PartidaRepository();
const confrontosRepository = new ConfrontoRepository();

export const gerarTodosConfrontos = async (req, res) => {
    try {
        const { data, anotacao, updateUser, modalidade_id } = req.body; // Receber informações da partida


        // 1. Criar uma nova partida e obter seu ID
        const partida = new Partida(data, anotacao, updateUser);
        const novaPartida = await partidasRepository.createPartida(partida);
        const partidaId = novaPartida.id; // Obter o ID da partida criada
        const partidaData = novaPartida.data; // Obter a data da partida criada


        // 2. Buscar todos os times disponíveis
        const times = await timesRepository.getTimeByModalidadeID(modalidade_id);

        console.log (partidaData)
        console.log(data)

        // 3. Gerar confrontos todos contra todos
        const confrontos = [];
        for (let i = 0; i < times.length; i++) {
            for (let j = i + 1; j < times.length; j++) {
                const timeA = times[i];
                const timeB = times[j];

                // Criar confrontos e associá-los à partida
                confrontos.push({
                    id: uuidv4(),
                    idPartida: partidaId, // Associar o ID da nova partida
                    timeId: timeA.id, // ID do time A
                    data: '2024-11-01', // Data do confronto (ajuste conforme necessário)
                    winner: false, // Inicialmente, sem vencedor
                    tie: false // Inicialmente, sem empate
                });

                confrontos.push({
                    id: uuidv4(),
                    idPartida: partidaId, // Associar o ID da nova partida
                    timeId: timeB.id, // ID do time B
                    data: '2024-11-01', // Data do confronto (ajuste conforme necessário)
                    winner: false, // Inicialmente, sem vencedor
                    tie: false // Inicialmente, sem empate
                });
            }
        }

        // 4. Registrar confrontos no banco de dados
        for (const confronto of confrontos) {
            await confrontosRepository.createConfronto(confronto);
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
