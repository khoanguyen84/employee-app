import axios from "axios";
import { CLOUDINARY_UPLOAD_API_URL } from './commonService.js';

const Unsigned_Uploading = "a09ikbyc";
class FileService {
    static uploadImage(imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", Unsigned_Uploading);
        return axios.post(CLOUDINARY_UPLOAD_API_URL, formData);
    }
}

export default FileService;