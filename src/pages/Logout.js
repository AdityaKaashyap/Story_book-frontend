import react,{useState,useEffect} from "react";
import api from "../api/api";

const Logout = () => {
    useEffect(()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href="/login";
    });

    return(<h1>Logging out...</h1>);
}
export default Logout;