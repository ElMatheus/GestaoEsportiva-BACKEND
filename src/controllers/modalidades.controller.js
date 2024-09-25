import Modalidade from "../models/modalidades/Modalidade.js";
import ModalidadeRepository from "../models/modalidades/ModalidadesRepository.js";

const modalidadeRepository = new ModalidadeRepository();

export const createModalidade = async (req, res) => {
  try {
    const { nome, descricao, limite_pessoas, campeonato_id, valor_por_pessoa, tipo } = req.body;
    const modalidade = new Modalidade(nome, descricao, limite_pessoas, campeonato_id, valor_por_pessoa, tipo);
    await modalidadeRepository.createModalidade(modalidade);
    return res.status(201).send(modalidade);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar modalidade", error: error.message });
  }
}

export const getModalidades = async (req, res) => {
  try {
    const modalidades = await modalidadeRepository.getModalidades();
    return res.status(200).send({ total: modalidades.length, modalidades });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar modalidades", error: error.message });
  }
}

export const getModalidadeById = async (req, res) => {
  try {
    const { id } = req.params;
    const modalidade = await modalidadeRepository.getModalidadeById(id);
    if (!modalidade) {
      return res.status(404).send({ message: "Modalidade não encontrada" });
    }
    return res.status(200).send(modalidade);
  }
  catch (error) {
    return res.status(500).send({ message: "Erro ao buscar modalidade", error: error.message });
  }
}

export const getModalidadeByNome = async (req, res) => {
  try {
    const { nome } = req.params;
    const modalidade = await modalidadeRepository.getModalidadeByNome(nome);
    if (modalidade.length === 0) {
      return res.status(404).send({ message: "Modalidade não encontrada" });
    }
    return res.status(200).send(modalidade);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar modalidade", error: error.message });
  }
}

export const getModalidadeByCampeonatoId = async (req, res) => {
  try {
    const { campeonato_id } = req.params;
    const modalidade = await modalidadeRepository.getModalidadeByCampeonatoId(campeonato_id);
    if (modalidade.length === 0) {
      return res.status(404).send({ message: "Modalidade não encontrada" });
    }
    return res.status(200).send(modalidade);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar modalidade", error: error.message });
  }
}

export const updateModalidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, limite_pessoas, campeonato_id, valor_por_pessoa, tipo } = req.body;
    const modalidadeExist = await modalidadeRepository.getModalidadeById(id);
    if (!modalidadeExist) {
      return res.status(404).send({ message: "Modalidade não encontrada" });
    }
    const modalidade = new Modalidade(nome, descricao, limite_pessoas, campeonato_id, valor_por_pessoa, tipo);
    await modalidadeRepository.updateModalidade(modalidade, id);
    return res.status(200).send({ message: "Modalidade atualizada com sucesso", modalidade });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar modalidade", error: error.message });
  }
}

export const deleteModalidade = async (req, res) => {
  try {
    const { id } = req.params;
    const modalidadeExist = await modalidadeRepository.getModalidadeById(id);
    if (!modalidadeExist) {
      return res.status(404).send({ message: "Modalidade não encontrada" });
    }
    await modalidadeRepository.deleteModalidade(id);
    return res.status(200).send({ message: "Modalidade deletada com sucesso", modalidadeExist });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar modalidade", error: error.message });
  }
}

export const getModalidadeByTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const modalidade = await modalidadeRepository.getModalidadeByTipo(tipo);
    if (modalidade.length === 0) {
      return res.status(404).send({ message: "Modalidade não encontrada" });
    }
    return res.status(200).send(modalidade);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar modalidade", error: error.message });
  }
};



