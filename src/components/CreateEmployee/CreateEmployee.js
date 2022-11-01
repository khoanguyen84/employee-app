import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import noAvatar from '../../asset/images/noAvatar.jpg';
import EmployeeService from './../../services/employeeService';
import { toast } from 'react-toastify';
import DepartmentService from "../../services/departmentService";
import FileService from './../../services/fileService';

const CreateEmployee = () => {
    const [state, setState] = useState({
        loading: false,
        employee: {},
        errorMessage: ""
    })

    const [departments, setDepartments] = useState([]);

    const [upload, setUpload] = useState(false);
    useEffect(() => {
        try {
            async function getDepart() {
                let departRes = await DepartmentService.getDepartment();
                setDepartments(departRes.data);
            }
            getDepart();
        } catch (error) {

        }
    }, [])
    const handleChangeAvatar = (e) => {
        let fakeAvatar = URL.createObjectURL(e.target.files[0]);
        setState({
            ...state,
            employee: {
                ...employee,
                avatar: fakeAvatar
            }
        })
    }
    const handleInput = (e) => {
        setState({
            ...state,
            employee: {
                ...employee,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setState({ ...state, loading: true })
            let createRes = await EmployeeService.createEmployee(employee);
            if (createRes.data) {
                toast.success(`Employee ${createRes.data.name} created success!`);
                setState({
                    ...state,
                    loading: false,
                    employee: {
                        name: "",
                        avatar: "",
                        mobile: "",
                        salary: "",
                        title: "",
                        email: "",
                        departId: 0
                    }
                })
            }
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.mesage
            })
        }
    }
    const handleUploadAvatar = async () => {
        setUpload(true);
        let fileImage = document.querySelector('input[name="avatar"]').files[0];
        let uploadRes = await FileService.uploadImage(fileImage);
        setUpload(false);
        employee.avatar = uploadRes.data.url;
    }
    const { loading, employee } = state;
    const { name, avatar, mobile, salary, title, email, departId } = employee;
    return (
        <>
            <section className="create-info my-2">
                <div className="container">
                    <h3 className="text-success">Create Employee</h3>
                    <p className="fst-italic">Anim anim anim velit ullamco fugiat. Ea aliquip amet magna nisi anim sunt est minim. Incididunt magna aliquip in reprehenderit deserunt aliqua qui mollit quis sint commodo excepteur culpa aute. Anim minim consectetur commodo nisi non. Commodo dolor non consectetur ad deserunt voluptate. Tempor adipisicing Lorem proident proident nulla excepteur.</p>
                </div>

            </section>
            <section className="create-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-1">
                                    <input value={name} className="form-control form-control-sm" type="text" name="name" placeholder="Name" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={mobile} className="form-control form-control-sm" type="tel" name="mobile" placeholder="Mobile" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={email} className="form-control form-control-sm" type="email" name="email" placeholder="Email" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={title} className="form-control form-control-sm" type="text" name="title" placeholder="Title" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={salary} className="form-control form-control-sm" type="number" name="salary" placeholder="Salary" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <select name="departId" value={departId} className="form-control form-control-sm" onChange={handleInput} defaultValue="0">
                                        <option value="0" disabled>Select Department</option>
                                        {
                                            departments.map(depart => (
                                                <option key={depart.id} value={depart.id}>{depart.departmentName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-1">
                                    {
                                        loading ?
                                            <button className="btn btn-success btn-sm me-2" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-success btn-sm me-2">Create</button>
                                    }

                                    <Link to={"/employee"} className="btn btn-dark btn-sm" >Back</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-4">
                            <div className="d-flex flex-column align-items-start justify-content-center">
                                <img className="avatar-md" src={avatar || noAvatar} alt=""
                                    onClick={() => document.querySelector("input[name='avatar']").click()}
                                />
                                <input className="d-none" type="file" accept="image/*" name="avatar" placeholder="avatar"
                                    onChange={handleChangeAvatar}
                                />
                                {
                                    upload ? <button className="btn btn-warning btn-sm btn-custom mt-1" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Uploading ...
                                    </button>
                                        :
                                        <button className="btn btn-warning btn-sm btn-custom mt-1"
                                            onClick={handleUploadAvatar}
                                        >Upload</button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateEmployee;