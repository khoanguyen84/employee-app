import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DepartmentService from "../../services/departmentService";
import EmployeeService from './../../services/employeeService';
import noAvatar from '../../asset/images/noAvatar.jpg';
import FileService from './../../services/fileService';
import Helper from './../../helper/Helper';


var draftAvatar = "";
const EditEmployee = () => {
    const [state, setState] = useState({
        loading: false,
        employee: {},
        departments: [],
        errorMessage: ""
    })

    const [upload, setUpload] = useState(false);

    const { employeeId } = useParams();
    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let employeeRes = await EmployeeService.getEmployee(employeeId);
                let departRes = await DepartmentService.getDepartments();
                setState({
                    ...state,
                    employee: employeeRes.data,
                    departments: departRes.data,
                    loading: false
                })
            }
            getData();
        } catch (error) {

        }
        // cleanup function
        return async () => {
            if (draftAvatar) {
                let filename = Helper.getFilename(draftAvatar);
                if (filename) {
                    await FileService.destroyImage(filename);
                    draftAvatar = "";
                }
            }
        }
    }, [])

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
            let editRes = await EmployeeService.editEmployee(employee, employeeId);
            if (editRes.data) {
                toast.success(`Employee ${editRes.data.name} updated success!`);
                setState({
                    ...state,
                    loading: false,
                    employee: editRes.data
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

    const handleUploadAvatar = async () => {
        setUpload(true);
        let fileImage = document.querySelector('input[name="avatar"]').files[0];
        let uploadRes = await FileService.uploadImage(fileImage);
        setUpload(false);
        employee.avatar = uploadRes.data.url;
        draftAvatar = employee.avatar;
        toast.success(`Avatar has been changed success!`, { autoClose: 1000 });
    }
    const { loading, employee, departments } = state;
    const { name, avatar, mobile, salary, title, email, departId } = employee;
    return (
        <>
            <section className="edit-info my-2">
                <div className="container">
                    <h3 className="text-primary">Edit Employee
                    </h3>
                    <p className="fst-italic">Voluptate reprehenderit dolor fugiat nostrud anim eiusmod exercitation velit magna mollit pariatur id incididunt. Nulla ad cillum veniam elit eiusmod consequat officia occaecat duis voluptate reprehenderit quis esse Lorem. Consequat aliquip amet ipsum in. Et sunt aliqua ea aliqua tempor nostrud magna adipisicing aliquip fugiat in veniam. Nisi nisi Lorem minim enim id quis aute id consequat magna occaecat sit ex consectetur. Cillum duis ad aliquip esse esse culpa quis consequat nostrud sit est sint in.</p>
                </div>
            </section>
            <section className="edit-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-1">
                                    <input value={name} className="form-control form-control-sm" type="text" required name="name" placeholder="Name" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={mobile} className="form-control form-control-sm" type="tel" required name="mobile" placeholder="Mobile" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={email} className="form-control form-control-sm" type="email" required name="email" placeholder="Email" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={title} className="form-control form-control-sm" type="text" required name="title" placeholder="Title" onChange={handleInput} />
                                </div>
                                <div className="mb-1">
                                    <input value={salary} className="form-control form-control-sm" type="number" required name="salary" placeholder="Salary" onChange={handleInput} />
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
                                            <button className="btn btn-primary btn-sm me-2" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                    }

                                    <Link to={"/employee-app"} className="btn btn-dark btn-sm" >Back</Link>
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

export default EditEmployee;