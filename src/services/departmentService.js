import axios from "axios";
import { DEPARTMENT_API_URL } from './commonService.js'
class DepartmentService {
    static getDepartment() {
        return axios.get(DEPARTMENT_API_URL);
    }
}   

export default DepartmentService;