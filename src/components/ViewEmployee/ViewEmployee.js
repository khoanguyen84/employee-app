import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import DepartmentService from "../../services/departmentService";
import EmployeeService from './../../services/employeeService';
import noAvatar from '../../asset/images/noAvatar.jpg';
import Helper from './../../helper/Helper';
import Spinner from "../Spinner/Spinner";

const ViewEmployee = () => {
    const [state, setState] = useState({
        loading: false,
        employee: {},
        department: {},
        errorMessage: ''
    })

    const { employeeId } = useParams();

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let employeeRes = await EmployeeService.getEmployee(employeeId);
                let departRes = await DepartmentService.getDepartment(employeeRes.data.departId);
                setState({
                    ...state,
                    employee: employeeRes.data,
                    department: departRes.data,
                    loading: false
                })
            }
            getData();
        } catch (error) {

        }
    }, [employeeId])

    const { loading, employee, department } = state;
    const { name, avatar, mobile, salary, title, email, departId } = employee;
    return (
        <>
            <section className="view-info my-2">
                <div className="container">
                    <div>
                        <h3 className="text-warning">View Employee
                            <Link to={`/employee-app/edit/${employeeId}`} className="btn btn-warning btn-sm ms-2">
                                <i className="fa fa-edit me-2"></i>
                                Edit
                            </Link>
                        </h3>
                        <p className="fst-italic">Occaecat aute culpa id sit commodo sunt non do veniam magna. Cupidatat ea dolore culpa eu sint esse eiusmod occaecat elit. Magna eiusmod occaecat consequat nulla commodo commodo proident proident laboris deserunt proident. Tempor ea veniam sunt voluptate sit ipsum cupidatat cillum incididunt in velit ut. Nulla aute magna mollit anim duis incididunt in et elit quis.</p>
                    </div>
                </div>
            </section>
            <section className="view-detail">
                {
                    loading ? <Spinner /> : (
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <img className="avatar-md" src={avatar || noAvatar} alt="" />
                                    <Link to={"/employee-app"} className="btn btn-warning btn-sm btn-custom mt-1">Back</Link>
                                </div>
                                <div className="col-5">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            Name: <span className="fw-bolder">{name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Mobile: <span className="fw-bolder">{mobile}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Email: <span className="fw-bolder">{email}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Title: <span className="fw-bolder">{title}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Salary: <span className="fw-bolder">{Helper.formatCurrency(salary)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            Department: <span className="fw-bolder">{department.departmentName}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>
        </>
    )
}

export default ViewEmployee;