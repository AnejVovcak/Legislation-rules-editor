import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

const ProductionToastr = () => {
    useEffect(() => {
        toast.warn("This is production environment! Editing and adding elements is disabled!");
    }, []);
    return <ToastContainer position="bottom-right"
                           closeOnClick={false}
                           autoClose={false}
                           hideProgressBar={false}
                           limit={1}
                           closeButton={false}/>
}

export default ProductionToastr;