INSERT INTO AppUser(username, first_name, second_name, password) VALUES ('admin', 'root', 'user', 'password');
INSERT INTO AppUser(username, first_name, second_name, password) VALUES ('vlasJedi', 'Vlas', 'Dielov', 'password');

INSERT INTO Role(role_name) VALUES ('ADMIN');
INSERT INTO Role(role_name) VALUES ('USER');

INSERT INTO AppUser_Role(appuser_id, role_id) SELECT u.id, r.id FROM AppUser u, Role r WHERE u.username = 'admin' AND r.role_name = 'ADMIN';
INSERT INTO AppUser_Role(appuser_id, role_id) SELECT u.id, r.id FROM AppUser u, Role r WHERE u.username = 'admin' AND r.role_name = 'USER';
INSERT INTO AppUser_Role(appuser_id, role_id) SELECT u.id, r.id FROM AppUser u, Role r WHERE u.username = 'vlasJedi' AND r.role_name = 'USER';

--INSERT INTO AppUser_Role(appuser_id, role_id)
--  SELECT (id) FROM AppUser WHERE username = 'admin',
--  SELECT (id) FROM Role WHERE role_name = 'ADMIN';

--INSERT INTO AppUser_Role(appuser_id, role_id)
--  SELECT (id) FROM AppUser WHERE username == 'admin',
--  SELECT (id) FROM Role WHERE role_name == 'USER';
--
--INSERT INTO AppUser_Role(appuser_id, role_id)
--  SELECT (id) FROM AppUser WHERE username == 'vlasJedi',
--  SELECT (id) FROM Role WHERE role_name == 'USER';