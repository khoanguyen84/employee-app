import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="w-100">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to={"/employee-app"}>
                        <h5>
                            <i className="fa fa-mobile text-warning me-2"></i>
                            Employee
                            <span className="text-warning ms-2">App</span>
                        </h5>


                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;