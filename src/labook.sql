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

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

SELECT * FROM posts;

DROP TABLE posts;

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;

