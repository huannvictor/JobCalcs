const Database = require('./config')

const initDb = {
  async init(){

    const db = await Database() // abrindo a conexão com o banco de dados
    
    await db.exec(`CREATE TABLE profile(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vocation_per_year INT,
      value_hour INT
    )`),
    
    await db.exec(`CREATE TABLE jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
    )`),
    
    await db.run(`INSERT INTO profile(
      name, 
      avatar, 
      monthly_budget, 
      days_per_week, 
      hours_per_day, 
      vocation_per_year
    ) VALUES (
        "Huann",
        "https://github.com/huannvictor.png",
        3000,
        5,
        5,
        4
    );`),
    
    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    )VALUES(
      "Pizzaria Guloso",
      2,
      1,
      1617514376018
    );`),
    
    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    )VALUES(
      "OneTwo Project",
      3,
      43,
      1617514376018
    );`),
    
    await db.close() // encerrando a conexão com o banco de dados
  }
}

initDb.init()