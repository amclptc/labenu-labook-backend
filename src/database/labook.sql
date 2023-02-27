-- Active: 1676560371108@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Gabigol", "gabigol@flamail.com", "predestinado123", "NORMAL"),
    ("u002", "Arrascaeta", "arrascaeta@flamail.com", "arrasca14", "NORMAL"),
    ("u003", "Pedro", "pedro@flamail.com", "queixada09", "NORMAL");


CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

SELECT * FROM posts;

DROP TABLE posts;

INSERT INTO posts(id, creator_id, content)
VALUES
    ("p001", "u001", "Projeto Labook da Labenu!"),
    ("p002", "u002", "FLAMENGO CAMPEÃO!"),
    ("p003", "u003", "Fui de berço :*");

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO likes_dislikes(user_id, post_id, like)
VALUES
    ("u001", "p003", 1),
    ("u002", "p001", 1),
    ("u003", "p002", 0),
    ("u003", "p001", 1);

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;



