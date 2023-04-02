import express from 'express';
import http from 'http';
import routes from './routes.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

/**
 * Setting to see /src directory in index.html for link css 
 */
app.use(express.static(routes.__dirname + '/src'));

/**
 * Init socket.io
 */
io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });
});

/**
 * Base route.
 */
routes.indexPage(app);

/**
 * Server listener
 */
server.listen(3000, () => {
    console.log('listening on *:3000');
});