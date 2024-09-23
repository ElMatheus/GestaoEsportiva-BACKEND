import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor(name, password, admin) {
    this.id = uuidv4();
    this.name = name;
    this.password = password;
    this.admin = admin;
  }
}
