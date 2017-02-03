-- This creates the users table. The username field is constrained to unique
-- values only, by using a UNIQUE KEY on that column
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(60) NOT NULL, -- why 60??? ask me :)
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);

-- This creates the posts table. The userId column references the id column of
-- users. If a user is deleted, the corresponding posts' userIds will be set NULL.
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(300) DEFAULT NULL,
  `url` varchar(2000) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`), -- why did we add this here? ask me :)
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
);

--subreddits

CREATE TABLE subreddits
(
id int NOT NULL AUTO_INCREMENT,
name varchar(30) NOT NULL UNIQUE,
description varchar(200),
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY (ID)
);

--make foreign key

ALTER TABLE posts ADD COLUMN subredditId INT REFERENCES subreddits(id);

--insert into

INSERT INTO subreddits VALUES
(
id=NULL,
name='Montreal',
description='Everything about 514',
createdAt=NOW(),
updatedAt=NULL
);

INSERT INTO posts VALUES
(
  title='Check out this crazy thing',
  url='www.reddit.com/crazything',
  userId=3,
  createdAt=2014-02-12
);

--get all posts full subreddit

SELECT posts.id, posts.title, posts.url, subreddits.name, subreddits.description, subreddits.createdAt, subreddits.updatedAt
FROM posts LEFT JOIN subreddits
ON posts.subredditId = subreddits.id
ORDER BY createdAt DESC;

--votes table

CREATE TABLE votes
(
userId int NOT NULL,
postId int NOT NULL,
vote TINYINT,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY (userId, postId)
);

--two foreign keys

ALTER TABLE votes ADD FOREIGN KEY (`postId`) REFERENCES posts(`id`);
ALTER TABLE votes ADD FOREIGN KEY (`userId`) REFERENCES users(`id`);
