import axios from "axios";
import { DEPARTMENT_API_URL } from './commonService.js'
class DepartmentService {
    static getDepartments() {
        return axios.get(DEPARTMENT_API_URL);
    }
    static getDepartment(departId) {
        return axios.get(`${DEPARTMENT_API_URL}/${departId}`);
    }
}   

export default DepartmentService;