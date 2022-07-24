INSERT INTO department
(department_name)
VALUES
('HR'),
('Web Development'),
('Accounting'),
('Public Relations');

INSERT INTO roles
(role_title, salary, department_id)
VALUES
('HR Manager', 65600, 1),
('Senior Software engineer', 232300, 2),
('Junior web developer', 76000, 2),
('Account Manger', 80000, 3),
('Financial Consultant', 234000, 3),
('Junior Accountant', 60305, 3),
('PR manager', 180000, 4),
('Social Media Intern', 32000, 4),
('Media consultant', 160000, 4);

INSERT INTO employees
(first_name, last_name, manager_id, role_id)
VALUES
('Sandy', 'Powell', null, 1),
('Emil', 'Zola', 2, 2),
('Sissy', 'Coalpits', 3, 2),
('Antoinette', 'Capet', null, 2),
('Samuel', 'Delany', 3, 2),
('Tony', 'Duvert', 4, 4),

