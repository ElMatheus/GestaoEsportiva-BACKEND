CREATE TABLE IF NOT EXISTS campeonato (
id VARCHAR(100) PRIMARY KEY UNIQUE NOT NULL,
titulo VARCHAR(100) NOT NULL,
data_inicio DATE NOT NULL,
data_final DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    nota INT DEFAULT(0) NOT NULL,
    data DATE DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS modalidade (
id VARCHAR(100) PRIMARY KEY NOT NULL,
nome_modalidade VARCHAR(100) NOT NULL UNIQUE,
descricao text,
limite_pessoas INT NOT NULL,
campeonato_id VARCHAR(100) NOT NULL,
valor_por_pessoa INT NOT NULL,
tipo BOOLEAN NOT NULL,
FOREIGN KEY(campeonato_id) REFERENCES campeonato(id)
);

CREATE TABLE IF NOT EXISTS times (
id VARCHAR(100) PRIMARY KEY NOT NULL,
nome VARCHAR(100) NOT NULL,
sala VARCHAR(100),
modalidade_id VARCHAR(100) NOT NULL,
status VARCHAR(100) NOT NULL,
pontos INT DEFAULT(0),
FOREIGN KEY(modalidade_id) REFERENCES modalidade(id)
);

CREATE TABLE IF NOT EXISTS jogadores (
id VARCHAR(100) PRIMARY KEY NOT NULL,
nome VARCHAR(100) NOT NULL,
sala VARCHAR(100) NOT NULL,
time_id VARCHAR(100) NOT NULL,
FOREIGN KEY(time_id) REFERENCES times(id));


CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS refresh_token (
    id VARCHAR(36) PRIMARY KEY,
    expiresIn INT NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS partida (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    anotacao TEXT,
    updAtDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updAtIdUser VARCHAR(100),
    FOREIGN KEY (updAtIdUser) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS confronto (
    id VARCHAR(36) PRIMARY KEY,
    idPartida INT NOT NULL,
    timeId VARCHAR(36) NOT NULL,
    winner BOOLEAN DEFAULT FALSE,
    tie BOOLEAN DEFAULT FALSE,
    updAtDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updAtIdUser VARCHAR(100),
    FOREIGN KEY (idPartida) REFERENCES partida(id),
    FOREIGN KEY (timeId) REFERENCES times(id),
    FOREIGN KEY (updAtIdUser) REFERENCES users(id)
);  