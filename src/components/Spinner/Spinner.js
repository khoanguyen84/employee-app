import React from "react";
import Loading from '../../asset/images/loading.gif';

function Spinner(){
    return (
        <div className="container d-flex align-items-center justify-content-center">
            <img className="w-25" src={Loading} alt="" />
        </div>
    )
}

export default Spinner;