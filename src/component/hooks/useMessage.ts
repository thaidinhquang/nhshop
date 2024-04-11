import { Bounce, ToastPosition, TypeOptions, toast } from "react-toastify";

export const successMessage = (message: string, position?: ToastPosition | "bottom-right") => {
    return toast.success(message, {
        position: position,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
        transition: Bounce,
    });
}

export const errorMessage = (message: string, position?: ToastPosition | "bottom-right") => {
    return toast.error(message, {
        position: position,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       
        transition: Bounce,
    });
}

export const infoMessage = (message: string, position?: ToastPosition | "bottom-right") => {
    return toast.info(message, {
        position: position,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       
        transition: Bounce,
    });
}

export const warningMessage = (message: string, position?: ToastPosition | "bottom-right") => {
    return toast.warning(message, {
        position: position,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
    });
}

export const darkMessage = (message: string, position?: ToastPosition | "bottom-right") => {
    return toast.dark(message, {
        position: position,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
    });
}

export const defaultMessage = (message: string, position?: ToastPosition | "bottom-right") => {
    return toast(message, {
        position: position,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
 
        transition: Bounce,
    });
}

export const customMessage = (message: string, type: TypeOptions | undefined, position?: ToastPosition | "bottom-right") => {
    return toast(message, {
        position: position,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
        type: type,
    });
}

export const clearMessage = () => {
    toast.dismiss();
}