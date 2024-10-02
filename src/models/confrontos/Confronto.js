import { v4 as uuidv4 } from "uuid";

export default class Confronto {
  constructor(idPartida, timeId, data, winner, tie, updAtIdUser) {
    this.id = uuidv4();
    this.idPartida = idPartida;
    this.timeId = timeId;
    this.data = data;
    this.winner = winner;
    this.tie = tie;
    this.updAtDate = new Date().toISOString();
    this.updAtIdUser = updAtIdUser;
  }
}
