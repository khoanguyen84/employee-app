import axios from "axios";
import { EMPLOYEE_API_URL } from './commonService.js'
class EmployeeService {
    static getEmployees() {
        return axios.get(EMPLOYEE_API_URL);
    }
    static removeEmployee(employeId) {
        return axios.delete(`${EMPLOYEE_API_URL}/${employeId}`);
    }
    
    static createEmployee(employee){
        return axios.post(EMPLOYEE_API_URL, employee);
    }
}   

export default EmployeeService;