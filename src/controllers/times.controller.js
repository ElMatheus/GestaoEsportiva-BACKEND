import Jogador from '../models/jogador/Jogador.js';
import Jogado2 from '../models/jogador/bdskbkd.js';
import Times from '../models/times/Times.js';
import TimesRepository from '../models/times/TimesRepository.js';

const timesRepository = new TimesRepository();

export const createTimes = async (req, res) => {
    try {
        const { nome, sala, modalidade_id, status } = req.body;

        const times = new Times(nome, sala, modalidade_id, status);

        await timesRepository.createTime(times);

        return res.status(201).send(times);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar time", error: error.message });
    }
}

export const getTimes = async (req, res) => {
    try {
        const times = await timesRepository.getAllTimes();
        const jogadores = await timesRepository.getJogadoresPorTime();

        const timesJogadores = times.map(time => {
            time.jogadores = jogadores.filter(jogador => jogador.id_time == time.id).map(jogador => ({
                id: jogador.id_jogador,
                nome: jogador.nome_jogador,
                sala: jogador.sala_jogador,
                id_time: jogador.id_time
            }));

            return time;
        }
        );
        return res.json({
            status: "success",
            message: "Times listados com sucesso",
            total: timesJogadores.length,
            data: timesJogadores
        })
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar times", error: error.message });
    }
}

export const getTimesAndJogadores = async (req, res) => {
    try {
        const times = await timesRepository.getJogadoresPorTime();

        if (!times) {
            return res.status(404).send({ message: "Time não encontrado" });
        }

        return res.status(200).send({ message: "Time encontrado", times });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar time", error: error.message });
    }
}

export const getTimesById = async (req, res) => {
    try {
        const { id } = req.params;

        const time = await timesRepository.getTimesById(id);
        const jogadores = await timesRepository.getJogadoresPorTime(id);

        if (!time) {
            return res.status(404).send({ message: "Time não encontrado" });
        }

        time.jogadores = jogadores.map(jogador => ({
            id: jogador.id_jogador,
            nome: jogador.nome_jogador,
            sala: jogador.sala_jogador,
            id_time: jogador.id_time
        }));

        return res.json({
            status: "success",
            message: "Time listado com sucesso",
            data: time
        });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar time e jogadores", error: error.message });
    }
}

export const updateTimes = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sala, modalidade_id, status, pontos } = req.body;

        const times = await timesRepository.updateTime(id, nome, sala, modalidade_id, status, pontos);

        if (!times) {
            return res.status(404).send({ message: "Time não encontrado" });
        }

        return res.status(200).send({ message: "Time atualizado", times });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao atualizar time", error: error.message });
    }
}

export const getTimesByModalidadeID = async (req, res) => {
    try {
        const { modalidade_id } = req.params;

        const times = await timesRepository.getTimeByModalidadeID(modalidade_id);

        // if (!times) {
        //     return res.status(404).send({ message: "Time não encontrado" });
        // }

        return res.status(200).send(times);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar time", error: error.message });
    }
}

export const getJogadoresByTimeID = async (req, res) => {
    try {
        const { time_id } = req.params;

        const jogadores = await timesRepository.getJogadoresByTimeID(time_id);

        if (!jogadores) {
            return res.status(404).send({ message: "Jogadores não encontrados" });
        }

        return res.status(200).send(jogadores);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar jogadores", error: error.message });
    }
};

export const getTimesBySala = async (req, res) => {
    try {
        const { sala } = req.params;

        const times = await timesRepository.getTimeBySala(sala);

        if (!times) {
            return res.status(404).send({ message: "Time não encontrado" });
        };

        return res.status(200).send(times);
    } catch (error) {
        return res.status(500).send({ message: "Erro ao buscar time", error: error.message });
    }
}

export const deleteTimes = async (req, res) => {
    try {
        const { id } = req.params;

        const times = await timesRepository.getTimesById(id);

        if (!times) {
            return res.status(404).send({ message: "Time não encontrado" });
        }

        await timesRepository.deleteTime(id);

        return res.status(200).send({ message: "Time deletado" });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao deletar time", error: error.message });
    }
}