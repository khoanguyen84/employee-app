import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from "../Spinner/Spinner";
import EmployeeService from './../../services/employeeService';

const EmployeeList = () => {
    const [state, setState] = useState({
        loading: false,
        employees: [],
        errorMessage: ''
    })

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let employeeRes = await EmployeeService.getEmployees();
                setState({
                    ...state,
                    employees: employeeRes.data,
                    loading: false
                })
            }
            getData();
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            })
        }
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true })
        let employeeRes = await EmployeeService.getEmployees();

        setState({
            ...state,
            loading: false,
            employees: keyword ? employeeRes.data.filter(emp => emp.name.toLowerCase().includes(keyword.toLowerCase())) : employeeRes.data
        })
    }

    const handleRemoveEmployee = async (emp) => {
        let confirm = window.confirm(`Are you sure to remove emmploye name ${emp.name}?`)
        if (confirm) {
            let deleteRes = await EmployeeService.removeEmployee(emp.id);
            if (deleteRes.data) {
                setState({ ...state, loading: true })
                let employeeRes = await EmployeeService.getEmployees();
                setState({
                    ...state,
                    loading: false,
                    employees: employeeRes.data
                })

                toast.success(`Employee ${deleteRes.data.name} removed success.`, { autoClose: 2000, position: "bottom-right" });
            }
        }
    }
    const { employees, loading } = state;
    return (
        <>
            <section className="create-info my-2">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h3>Employee Manager</h3>
                        <Link to={"/employee/create"} className="btn btn-primary btn-sm ms-2">
                            <i className="fa fa-circle-plus me-2"></i>
                            New
                        </Link>
                    </div>
                    <p className="fst-italic">Pariatur veniam id sunt fugiat duis dolor consectetur ea qui. Culpa culpa sint ipsum incididunt. Lorem cupidatat minim in nisi qui eiusmod duis proident do. Pariatur esse mollit nisi amet non Lorem commodo. Sit fugiat ex voluptate incididunt pariatur voluptate. Ipsum do est enim fugiat non.</p>
                    <form onSubmit={handleSearch}>
                        <div className="d-flex align-items-center">
                            <input type="search" className="form-control form-control-sm w-25"
                                value={keyword} onInput={(e) => setKeyword(e.target.value)}
                            />
                            <button type="submit" className="btn btn-outline-secondary btn-sm ms-2">Search</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="employee-list">
                <div className="container">
                    {
                        loading ? <Spinner /> : (
                            <div className="row">
                                {employees.map(emp => (
                                    <div className="col-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-3">
                                                        <img className="avatar-sm" src={emp.avatar} alt="" />
                                                    </div>
                                                    <div className="col-8">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                Name: <span className="fw-bolder">{emp.name}</span>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Mobile: <span className="fw-bolder">{emp.mobile}</span>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Email: <span className="fw-bolder">{emp.email}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-1">
                                                        <div className="d-flex flex-column align-items-center justify-content-between">
                                                            <button className="btn btn-warning btn-sm">
                                                                <i className=" fa fa-eye"></i>
                                                            </button>
                                                            <button className="btn btn-primary btn-sm my-2">
                                                                <i className=" fa fa-edit"></i>
                                                            </button>
                                                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveEmployee(emp)}>
                                                                <i className=" fa fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>


            </section>
        </>
    )
}

export default EmployeeList;