
export default class Feedback {
    constructor(nome_usuario, comentario, nota, resposta) {
        this.nome_usuario = nome_usuario;
        this.comentario = comentario;
        this.nota = nota;
        this.data = new Date().toISOString();
        this.resposta = resposta;

    }
}