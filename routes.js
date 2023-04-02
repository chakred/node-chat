import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Define path to files from root directory
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Route index
 * 
 * @param {*} app 
 * @returns 
 */
const indexPage = (app) => {
    return app.get('/', (req, res) => {
       res.sendFile(__dirname + '/src/index.html');
    });
}

export default {
    indexPage,
    __dirname
}