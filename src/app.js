'use strict';

import dotenv from "dotenv";
import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import http from "http";
import { Server as WebSocket } from 'socket.io';
import { TemplateListar } from "./public/Connection.js";
import { MessageFinal } from "./public/ServiceMsg.js";

dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new WebSocket(server); // el websocket siempre esta en escucha gracias a que le pasamos el PORT

const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(_dirname, 'public')));

//WebSocket para empezar a oir todas las peticiones del p
io.on('connection', (socket) => {

  TemplateListar('usuario', socket, 'select');
  TemplateListar('usuario', socket, 'insert');
  TemplateListar('usuario', socket, 'update');




})

server.listen(process.env.PORT || 4000, () => {
  console.log(`****** inicio servido exitosamente,por favor inicialo en tu navegador predeterminado. ********`);
})

