import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

const SuccessToastr = ({content}: { content?: string }) => {
    useEffect(() => {
        toast.success(content ? content : "Success! Data saved!");
    }, []);
    return <ToastContainer position="bottom-right"
                           closeOnClick={false}
                           autoClose={4000}
                           hideProgressBar={false}
                           limit={1}
                           closeButton={false}/>
}

export default SuccessToastr;