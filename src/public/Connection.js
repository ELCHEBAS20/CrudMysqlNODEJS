import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();


export const connectionDb = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PSWD,
  database: process.env.DB
})



export function TemplateListar(objClass, socket, status) {
  switch (status.toUpperCase()) {
    case 'SELECT':
      connectionDb.query(`SELECT * FROM  ${objClass}`, (err, row) => {
        socket.emit('cliente:listView', { row });
      })
      break;
    case 'INSERT':

      socket.on('user:insert', (item) => {
        connectionDb.query(`INSERT INTO usuario(Nombre,Apellido,Edad,Direccion) VALUES('${item.Nombre}','${item.Apellido}','${item.Edad}','${item.Direccion}')`, (err, resp) => {
          console.log('Registrado,verifica el sistema.!!');
        })
      })

      socket.on('server:message', (row) => {
        socket.emit('rst', row);
      })

      break;
    case 'UPDATE':
      socket.on('user:update', (item) => { })
      break;
    case 'DELETE':
      socket.on('delete:user', (id) => {
        console.log(id);
      })
      break;
  }
}


