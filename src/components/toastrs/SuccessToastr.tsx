import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

const SuccessToastr = () => {
    useEffect(() => {
        toast.success("Success! Data saved!");
    }, []);
    return <ToastContainer position="bottom-right"
                           closeOnClick={false}
                           autoClose={false}
                           hideProgressBar={false}
                           limit={1}
                           closeButton={false}/>
}

export default SuccessToastr;