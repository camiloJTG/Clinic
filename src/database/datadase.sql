CREATE DATABASE clinic; 

USE clinic;

CREATE TABLE type_animal
(
	id_type_animal INT(11) NOT NULL AUTO_INCREMENT,
    description_type_animal VARCHAR(50),
    PRIMARY KEY(id_type_animal)
);

CREATE TABLE clients
(
	id_clients INT(11) NOT NULL AUTO_INCREMENT, 
    name_clients VARCHAR(50), 
    last_name_clients VARCHAR(50),
    PRIMARY KEY(id_clients)
); 

CREATE TABLE pet
(
	id_pet INT(11) NOT NULL AUTO_INCREMENT,
    name_pet VARCHAR(50),
    id_clients INT(11) NOT NULL,
    id_type_animal INT(11) NOT NULL,
    PRIMARY KEY (id_pet),
    FOREIGN KEY (id_clients) REFERENCES clients(id_clients),
    FOREIGN KEY (id_type_animal) REFERENCES type_animal(id_type_animal)
);

INSERT INTO type_animal VALUES (1, "PERRO"), (2, "GATO"), (3, "HURON");
INSERT INTO clients VALUES (1, "camilo", "Montupil"), (2, "pepe", "Rojas");
INSERT INTO pet VALUES (1, "Hercules", 2, 2), (2, "lolo", 2, 2), (3, "pato", 1, 2), (4, "dede", 2, 1);

SELECT concat(cli.name_clients,' ',cli.last_name_clients) "CLIENTE" , ta.description_type_animal "TIPO DE ANIMAL", pe.name_pet "NOMBRE" 
FROM pet pe JOIN type_animal ta ON (pe.id_type_animal = ta.id_type_animal) 
JOIN clients cli ON (pe.id_clients = cli.id_clients);