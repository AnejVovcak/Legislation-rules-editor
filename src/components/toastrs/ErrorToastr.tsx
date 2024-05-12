import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

const ErrorToastr = () => {
    useEffect(() => {
        toast.error("Error! Data not saved!");
    }, []);
    return <ToastContainer position="bottom-right"
                           closeOnClick={false}
                           autoClose={false}
                           hideProgressBar={false}
                           limit={1}
                           closeButton={false}/>
}

export default ErrorToastr;