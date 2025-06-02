import {promises as fs} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const deleteFile = async(file, folder) =>{
    const filePath = path.join(__dirname, '../public/images', folder, file);
    try {
        await fs.unlink(filePath)
        console.log("borrado 0k");
    } catch (error) {
        console.log(error);
    }
};
export default deleteFile