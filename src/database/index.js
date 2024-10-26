import pgp from "pg-promise";
import { config } from "dotenv";
import readline from "readline";
import path, { join } from "path";
import { fileURLToPath } from "url";


config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

const dbURL = `postgres://${user}:${password}@${host}:${port}/${database}`;

const pg = pgp()(dbURL);

export function connect() {
    pg.query("SELECT 1 + 1 AS result").then((result) => {
        console.log(result);
    });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTablesFilePath = join(__dirname, "create-tables.sql");
const updateTablesFilePath = join(__dirname, "update-tables.sql");

const createTablesQuery = new pgp.QueryFile(createTablesFilePath);
const updateTablesQuery = new pgp.QueryFile(updateTablesFilePath);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Deseja atualizar as tabelas? (atualizar/n): ", (resposta) => {
    if (resposta.toLowerCase() === 'atualizar') {
        pg.query(updateTablesQuery).then(() => {
            console.log("Tabelas atualizadas com sucesso.");
        }).catch(error => {
            console.error("Erro ao criar ou atualizar tabelas:", error);
        }).finally(() => {
            rl.close();
        });
    } else {
        pg.query(createTablesQuery).catch(error => {
            console.error("Erro ao criar tabelas:", error);
        }).finally(() => {
            rl.close();
        }
        );
    }
});

export default pg;