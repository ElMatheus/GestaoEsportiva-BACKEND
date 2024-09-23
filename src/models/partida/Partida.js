
export default class Partida {
  constructor(data, anotacao, updateUser) {
    this.data = data;
    this.anotacao = anotacao;
    this.updateDate = new Date().toISOString();
    this.updateUser = updateUser;
  }
}
