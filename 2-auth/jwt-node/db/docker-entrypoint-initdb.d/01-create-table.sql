CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    post_id INTEGER NOT NULL REFERENCES posts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dislikes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    post_id INTEGER NOT NULL REFERENCES posts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (username, email, password) VALUES
('init', 'init@user.com', 'password123');


INSERT INTO posts (user_id, title, description) VALUES
(1, 'Hello World', 'This is my first post. Excited to be here!'),
(1, 'Quick Update', 'Just wanted to share a quick update. More details coming soon.'),
(1, 'Random Thoughts', 'Sometimes I just like to write down random thoughts. It helps me clear my mind.'),
(1, 'Tech News', 'Latest updates in the tech world. Stay tuned for more.'),
(1, 'Travel Plans', 'Planning a trip to Europe. Can''t wait to explore new places and cultures.'),
(1, 'Book Review', 'Just finished reading a great book. Highly recommend it to everyone.'),
(1, 'Fitness Goals', 'Setting new fitness goals for the month. Let''s get fit together!'),
(1, 'Cooking Tips', 'Sharing some of my favorite cooking tips and recipes. Bon appétit!'),
(1, 'Movie Night', 'Planning a movie night with friends. Any recommendations?'),
(1, 'Daily Routine', 'Sharing my daily routine and how I stay productive.'),
(1, 'Music Playlist', 'Curating a new music playlist. What are your favorite songs?'),
(1, 'Weekend Plans', 'Looking forward to the weekend. Any fun plans?');



INSERT INTO likes (user_id, post_id) VALUES
(1, 1),
(1, 12);

INSERT INTO dislikes (user_id, post_id) VALUES
(1, 11);


