const Database = require('config')

Database() // abrindo a conexão com o banco de dados

Database.exec(`CREATE TABLE profile(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthly-budget INT,
  days-per-week INT,
  hours-per-day INT,
  vocation-per-year INT,
  value-hour INT
)`)

Database.close() // encerrando a conexão com o banco de dados
