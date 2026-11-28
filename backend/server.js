import app from './src/index.js';
import connectToDb from './src/config/db.js';
import http from 'http';
import { initSocket } from './src/socket/socket.js';
import config from './src/config/config.js';

connectToDb();

const server = http.createServer(app);
initSocket(server);

const PORT = config.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});