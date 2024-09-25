import { v4 as uuidv4 } from "uuid";

export default class Campeonato {
  constructor(titulo, data_inicio, data_final)
    {
        this.id = uuidv4();
        this.titulo = titulo;
        this.data_inicio = data_inicio;
        this.data_final = data_final;
    }
    getDuration() {
      const diffInMs = this.data_final - this.data_inicio;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return diffInDays;
    }
}

