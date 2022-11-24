CREATE TABLE Guardian
(
	email varchar(50) primary key,
	name varchar(50) NOT NULL,
	phone_number char(10) UNIQUE
);

CREATE TABLE TailColor (
    grade CHAR(2) PRIMARY KEY,
    tail_color VARCHAR(20)
);

CREATE TABLE Beaver
(
	name varchar(20),
	email varchar(50),
	grade char(2),
	PRIMARY KEY(name, email),
	FOREIGN KEY(email) references guardian(email)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (grade) REFERENCES TailColor(grade)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE MaxSupervised (
  years_as_leader INT DEFAULT 0,
  max_supervised INT DEFAULT 5,
  PRIMARY KEY (years_as_leader)
);

CREATE TABLE AccessToBankAccount (
    role VARCHAR(20) DEFAULT 'Scouter',
    bank_privilege VARCHAR(20) DEFAULT 'None',
    PRIMARY KEY (role)
);

CREATE TABLE Leader (
    colony_name VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    training_completed BOOLEAN,
    first_aid BOOLEAN,
    police_check_completed BOOLEAN,
    phone_number CHAR(10) UNIQUE,
    email VARCHAR(50) UNIQUE,
    years_as_leader INT,
    role VARCHAR(20),
    FOREIGN KEY (years_as_leader) REFERENCES MaxSupervised(years_as_leader)
                    ON DELETE SET DEFAULT
                    ON UPDATE CASCADE,
    FOREIGN KEY (role) REFERENCES AccessToBankAccount(role)
                    ON DELETE SET DEFAULT
                    ON UPDATE CASCADE
);

CREATE TABLE Badge (
  name VARCHAR(50) PRIMARY KEY,
  requirements VARCHAR
);

CREATE TABLE Activity (
    title VARCHAR(50) PRIMARY KEY,
    completion_date DATE
);


CREATE TABLE Songs (
    title VARCHAR(50) PRIMARY KEY,
    lyrics TEXT,
    type VARCHAR(50),
    FOREIGN KEY (title) REFERENCES Activity(title)
                   ON DELETE CASCADE
                   ON UPDATE CASCADE
);


CREATE TABLE Skits (
    title VARCHAR PRIMARY KEY,
    acting_roles VARCHAR,
    script VARCHAR,
    FOREIGN KEY (title) REFERENCES Activity(title)
                   ON DELETE CASCADE
                   ON UPDATE CASCADE
);

CREATE TABLE Location (
    address VARCHAR(100),
    name VARCHAR(50),
    outdoors BOOLEAN,
    PRIMARY KEY (address, name)
);

CREATE TABLE Craft (
    name VARCHAR(50) PRIMARY KEY,
    instructions TEXT,
    completion_time INT
);

CREATE TABLE Learn (
    name VARCHAR(20),
    email VARCHAR(50),
    title VARCHAR(50),
    PRIMARY KEY (name, email, title),
    FOREIGN KEY (name, email) REFERENCES Beaver(name, email)
                   ON DELETE CASCADE
                   ON UPDATE CASCADE,
                   FOREIGN KEY (title) REFERENCES Activity(title)
                   ON DELETE CASCADE
                   ON UPDATE CASCADE
);

CREATE TABLE BeaverBadgeProgress (
  beaver_name VARCHAR(20),
  email VARCHAR(50),
  badge_name VARCHAR(50),
  date_completed DATE,
  PRIMARY KEY (beaver_name, email, badge_name),
  FOREIGN KEY (beaver_name, email) REFERENCES Beaver(name, email)
                                 ON DELETE CASCADE
                                 ON UPDATE CASCADE,
  FOREIGN KEY (badge_name) REFERENCES Badge(name)
                                 ON DELETE CASCADE
                                 ON UPDATE CASCADE
);

CREATE TABLE Meeting (
    address VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    date DATE,
    leaders_available INT,
    PRIMARY KEY (date),
    FOREIGN KEY (address, name) REFERENCES Location(address, name)
                     ON DELETE SET NULL
                     ON UPDATE CASCADE
);

CREATE TABLE MeetingAttendance (
    name VARCHAR(50),
    email VARCHAR(50),
    date DATE,
    dues_Paid BOOLEAN,
    PRIMARY KEY (name, email, date),
    FOREIGN KEY (email) REFERENCES Guardian
                               ON DELETE CASCADE
                               ON UPDATE CASCADE,
    FOREIGN KEY (date) REFERENCES Meeting(date)
                               ON DELETE CASCADE
                               ON UPDATE CASCADE
);

CREATE TABLE MeetingOrganization (
    date DATE,
    colony_name VARCHAR(20),
    responsibility VARCHAR(50),
    PRIMARY KEY (date, colony_name),
    FOREIGN KEY (date) REFERENCES Meeting(date)
                                 ON DELETE CASCADE
                                 ON UPDATE CASCADE,
    FOREIGN KEY (colony_name) REFERENCES Leader(colony_name)
                                 ON DELETE CASCADE
                                 ON UPDATE CASCADE
);

CREATE TABLE CraftAtMeeting (
    date DATE,
    name VARCHAR(50),
    cost INT,
    PRIMARY KEY (date, name),
    FOREIGN KEY (date) REFERENCES Meeting (date)
                            ON DELETE CASCADE
                            ON UPDATE CASCADE,
    FOREIGN KEY (name) REFERENCES Craft(name)
                            ON DELETE SET NULL
);

-- POPULATE TABLES WITH DATA -- 

INSERT INTO Guardian(email, name, phone_number) VALUES ('mr_jake@gmail.com', 'Dan Smith', 4165552012),
                                                      ('stacysMom@hotmail.com', 'Sam White', 9055551121),
                                                      ('zuul@zuul.com', 'Vinz Clortho', 6665551010),
                                                      ('generic1997@gmail.com', 'Jacob Anthony', 6041231234),
                                                      ('momomom@yahoo.ca', 'James James', 1112223333);

INSERT INTO TailColor(grade, tail_color) VALUES ('JK', 'No Tail'),
                                                ('SK', 'Brown'),
                                                ('01', 'Blue'),
                                                ('02', 'White'),
                                                ('03', 'Shooting Star');

INSERT INTO Beaver (name, email, grade) VALUES ('Jake', 'mr_jake@gmail.com', 'JK'),
                                               ('Stacy', 'stacysMom@hotmail.com', '02'),
                                               ('Zuul', 'zuul@zuul.com', '01'),
                                               ('Jimothy', 'generic1997@gmail.com', 'SK'),
                                               ('Alice', 'zuul@zuul.com', '03'),
                                               ('Kyle', 'zuul@zuul.com', '01'),
                                               ('Vlad', 'zuul@zuul.com', '02'),
                                               ('Chad', 'mr_jake@gmail.com', '01'),
                                               ('Chris', 'mr_jake@gmail.com', 'JK'),
                                               ('Heather', 'mr_jake@gmail.com', '02'),
                                               ('Logan', 'stacysMom@hotmail.com', 'JK');


INSERT INTO MaxSupervised(years_as_leader, max_supervised) VALUES (0, 5),
                                                                  (1, 6),
                                                                  (2, 8),
                                                                  (3, 10),
                                                                  (5, 10);

INSERT INTO AccessToBankAccount(role, bank_privilege) VALUES ('Scouter', 'None'),
                                                             ('Treasurer', 'Deposit/Withdrawal'),
                                                             ('Quartermaster', 'Withdrawal'),
                                                             ('Section Scouter', 'Deposit/Withdrawal'),
                                                             ('First Aider', 'None');

INSERT INTO Leader(colony_name, name, training_completed, first_aid, police_check_completed, phone_number, email, years_as_leader, role)
VALUES ('Rusty', 'Don Smith', TRUE, TRUE, TRUE, 6045552323, 'don_smith@gmail.com', 5, 'Treasurer'),
       ('Acorn', 'Cathy Liu', TRUE, FALSE, TRUE, 6045552223, 'cathy_liu@gmail.com', 3, 'Scouter'),
       ('Hopper', 'Don Smith', FALSE, FALSE, TRUE, 6045552326, 'don_smith2@gmail.com', 1, 'Scouter'),
       ('Rainbow', 'Vlad Vlad', TRUE, TRUE, FALSE, 6045551111, 'vlad@gmail.com', 3, 'Scouter'),
       ('Hawkeye', 'Derek Britton', TRUE, TRUE, FALSE, 6045552723, 'hawkeye123@gmail.com', 5, 'Quartermaster');


INSERT INTO Badge(name, requirements) VALUES ('Exploring Beaver', 'Go on 5 hikes'),
                                             ('Musical Beaver', 'Perform a musical piece on an instrument '),
                                             ('Aquatic Skills 1', 'Demonstrate appropriate water safety'),
                                             ('Paddling Skills 1', 'Show knowledge of how to paddle in a canoe'),
                                             ('Olympic Beaver', 'Participate in a sports team');

INSERT INTO Activity(title, completion_date) VALUES ('Whistle', '2020-05-06'),
                                                   ('Tag', '2020-05-06'),
                                                   ('Hop Scotch', '2020-06-06'),
                                                   ('Treasure Hunt', '2021-07-08'),
                                                   ('Hide and Seek', '2021-07-08'),
                                                   ('Firemaking', '2021-09-09'),
                                                   ('Public Speaking', '2022-08-09'),
                                                   ('Story Time', '2021-04-06'),
                                                   ('Bird Watching', '2022-10-10'),
                                                   ('Reading', '2022-10-10'),
                                                   ('Jellyfish Song', '2022-10-03'),
                                                   ('Bear Hunt Song', '2022-10-01'),
                                                   ('Hokey Pokey', '2022-10-10'),
                                                   ('Penguin song', '2022-10-11'),
                                                   ('Vespers', '2022-10-10'),
                                                   ('Invisible Bench', NULL),
                                                   ('Submarine Skit', '2022-10-10'),
                                                   ('Ugliest Man in the World', NULL),
                                                   ('Balogna', NULL),
                                                   ('Gotta Go Wee', '2022-10-10');


INSERT INTO Songs(title, lyrics, type) VALUES ('Jellyfish Song', 'Arms up, wrist together Jellyfish Jellyfish', 'action and repeat after me'),
                                              ('Bear Hunt Song', 'Going on a bear hunt, gonna catch a big one', 'action and repeat after me'),
                                              ('Hokey Pokey', 'You put your right foot in, you put you right foot out...', 'action'),
                                              ('Penguin song', 'Penguin attention, penguin salute', 'action and repeat after me'),
                                              ('Vespers', 'Softly falls the light of day, as the campfire fades away', 'regular');

INSERT INTO Skits(title, script, acting_roles) VALUES ('Invisible Bench', 'Beaver 1, Beaver 2, Beaver 3, Final Beaver', 'Hey are you sitting on the invisible bench? Yes, come and join'),
                                                      ('Submarine Skit', 'Narrator, Line of Beavers, Final Beaver', 'Once there was a submarine at sea...'),
                                                      ('Ugliest Man in the World', 'Ugliest man, Presenter, Beaver 1, Beaver 2, Scouter 1', 'Come one, come all, to see the ugliest man in the world...'),
                                                      ('Balogna', 'Scouter, Echo 1, Echo 2, Echo 3', 'There are some very special echoes in these woods...'),
                                                      ('Gotta Go Wee', 'Scouter, Beaver 1, Beaver 2, Beaver 3', 'Leader, I have to go wee...');

INSERT INTO Location(address, name, outdoors) VALUES ('123 W 16th Avenue', 'Community Center', FALSE),
                                                     ('212 W 1st Avenue', 'Jericho Beach', TRUE),
                                                     ('1455 Quebec Street', 'Science World', FALSE),
                                                     ('Imperial Drive', 'Camosun Bog', TRUE),
                                                     ('3461 Ross Drive', 'UBC Farm', TRUE);

INSERT INTO Craft(name, instructions, completion_time) VALUES ('Paper Airplane', 'Get paper, fold plane', 15),
                                                              ('Compass', 'Put water in bottlecap, put needle in water', 10),
                                                              ('Gumball Caterpillar', 'Wrap gumballs in cellophane, add eyes', 10),
                                                              ('Tube Owl', 'Fold ears, Draw face on owl', 15),
                                                              ('Origami', 'Fold a crane', 20);

INSERT INTO Learn(name, email, title) VALUES ('Jake', 'mr_jake@gmail.com', 'Jellyfish Song'),
                                             ('Stacy', 'stacysMom@hotmail.com', 'Invisible Bench'),
                                             ('Zuul', 'zuul@zuul.com', 'Invisible Bench'),
                                             ('Zuul', 'zuul@zuul.com', 'Submarine Skit'),
                                             ('Jimothy', 'generic1997@gmail.com', 'Vespers');

INSERT INTO BeaverBadgeProgress(beaver_name, email, badge_name, date_completed) VALUES ('Jake', 'mr_jake@gmail.com', 'Exploring Beaver', NULL),
                                                                                       ('Stacy', 'stacysMom@hotmail.com', 'Musical Beaver', '2022-09-12'),
                                                                                       ('Zuul', 'zuul@zuul.com', 'Aquatic Skills 1', '2021-08-15'),
                                                                                       ('Jimothy', 'generic1997@gmail.com', 'Paddling Skills 1', NULL),
                                                                                       ('Alice', 'zuul@zuul.com', 'Olympic Beaver', '2022-11-01'),
                                                                                       ('Alice', 'zuul@zuul.com', 'Exploring Beaver', '2021-01-01'),
                                                                                       ('Alice', 'zuul@zuul.com', 'Aquatic Skills 1', '2021-07-01'),
                                                                                       ('Alice', 'zuul@zuul.com', 'Paddling Skills 1', '2022-05-01'),
                                                                                       ('Alice', 'zuul@zuul.com', 'Musical Beaver', '2020-10-01');

INSERT INTO Meeting(address, name, date, leaders_available) VALUES ('123 W 16th Avenue', 'Community Center', '2022-09-29', 3),
                                                                   ('123 W 16th Avenue', 'Community Center', '2022-10-06', 2),
                                                                   ('123 W 16th Avenue', 'Community Center', '2022-10-13', 5),
                                                                   ('1455 Quebec Street', 'Science World', '2022-10-27', 2),
                                                                   ('212 W 1st Avenue', 'Jericho Beach', '2022-11-9', 4);

INSERT INTO MeetingAttendance(name, email, date, dues_Paid) VALUES ('Jake', 'mr_jake@gmail.com', '2022-09-29', TRUE),
                                                                  ('Jake', 'mr_jake@gmail.com', '2022-10-06', FALSE),
                                                                  ('Jake', 'mr_jake@gmail.com', '2022-10-13', TRUE),
                                                                  ('Stacy', 'stacysMom@hotmail.com', '2022-09-29', TRUE),
                                                                  ('Zuul', 'zuul@zuul.com', '2022-09-29', TRUE);

INSERT INTO MeetingOrganization(date, colony_name, responsibility) VALUES ('2022-09-29', 'Rusty', 'Craft supplies'),
                                                                          ( '2022-09-29', 'Rainbow', 'Teach song'),
                                                                          ( '2022-09-29', 'Hawkeye', 'Run opening and closing'),
                                                                          ( '2022-10-27', 'Acorn', 'Craft supplies'),
                                                                          ( '2022-11-9', 'Rainbow', 'Organize game');

INSERT INTO CraftAtMeeting(date, name, cost) VALUES ('2022-09-29', 'Paper Airplane', 15),
                                                    ('2022-10-06', 'Compass', 30),
                                                    ('2022-10-13', 'Gumball Caterpillar', 25),
                                                    ('2022-10-27', 'Tube Owl', 50),
                                                    ('2022-11-9', 'Origami', 20);




