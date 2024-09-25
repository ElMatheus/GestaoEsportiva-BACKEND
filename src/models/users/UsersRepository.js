import pg from "../../database/index.js"
export default class UsersRepository {
  constructor() {
    this.pg = pg;
  };

  async getUsers() {
    try {
      const allUsers = await this.pg.manyOrNone("SELECT * FROM users");
      return allUsers;
    } catch (error) {
      throw error;
    }
  };

  async getUserById(id) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  async createUser(user) {
    try {
      await this.pg.none("INSERT INTO users (id, nome, senha, tipo) VALUES ($1, $2, $3, $4)", [
        user.id,
        user.nome,
        user.senha,
        user.tipo
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  };

  async updateUser(id, nome, senha, tipo) {
    try {
      const user = this.getUserById(id);

      if (!user) {
        return null;
      }

      const updateUser = await this.pg.oneOrNone(
        "UPDATE users SET nome = $1, senha = $2, tipo = $4 WHERE id = $4 RETURNING *",
        [nome, senha, tipo, id]
      );

      return updateUser;
    } catch (error) {
      throw error;
    }
  };

  async getUserByName(nome) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE LOWER(nome) LIKE $1", nome.toLowerCase());
      return user;
    } catch (error) {
      throw error;
    }
  };

  async deleteUser(id) {
    try {
      await this.pg.none("DELETE FROM users WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  }
};
