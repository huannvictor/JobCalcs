const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // importando apenas a funcionalidade open do sqlite

module.exports = () => {
  open({
    filename: './database.sqlite', // arquivo destinado a guardar as informações
    driver: sqlite3.Database // recebe as informações do front e as trabalha e guarda no arquivo informado no fileame
  })
}
// É preciso colocar o open() dentro de uma estrutura de função, não de objeto. Por isso o uso da arrow function para poder ser exportado pelo modules.exports.
