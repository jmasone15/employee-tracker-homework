USE employees_db;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Management");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 75000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Accounting Manager", 75000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accounting Associate", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineering Manager", 75000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineering Associate", 50000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 75000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("HR Associate", 50000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Manager", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tanya", "McDougall", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelley", "Martin", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Masone", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jasone", "Mordan", 5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Clark", "Kent", 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lisa", "Bell", 7, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bruce", "Wayne", 8, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Derek", "Jeter", 9, NULL);
