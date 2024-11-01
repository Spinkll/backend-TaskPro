import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constans/saveFiles.js';

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, TEMP_UPLOAD_DIR);
    },
    filename: (req, file, cd) => {
        const uniqueSuffix = Date.now();
        cd(null, `${uniqueSuffix}_${file.originalname}`);
    }
});

export const upload = multer({storage});