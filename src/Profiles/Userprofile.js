import {useState,useEffect} from "react";
import api from "../api/api";

const Userprofile = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/user/",
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
                    }
                );

                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
        </div>
    );
}

export default Userprofile