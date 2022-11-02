import axios from "axios";
import { EMPLOYEE_API_URL } from './commonService.js'
class EmployeeService {
    static getEmployees() {
        return axios.get(EMPLOYEE_API_URL);
    }

    static getEmployee(employeeId) {
        return axios.get(`${EMPLOYEE_API_URL}/${employeeId}`);
    }

    static removeEmployee(employeeId) {
        return axios.delete(`${EMPLOYEE_API_URL}/${employeeId}`);
    }
    
    static createEmployee(employee){
        return axios.post(EMPLOYEE_API_URL, employee);
    }
    static editEmployee(employee, employeeId){
        return axios.put(`${EMPLOYEE_API_URL}/${employeeId}`, employee);
    }
}   

export default EmployeeService;