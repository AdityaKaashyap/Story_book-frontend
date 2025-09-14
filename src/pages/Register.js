import React,{useState} from "react";
import api from "../api/api";

const RegisterForm = () => {
    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:"",
        confirm_password:"",
        bio:"",
        profile_image:null,
    });

    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");

    const handleChange = (e) => {
        const {name,value,files} = e.target;
        if(name === 'profile_image'){
            setFormData({...formData,profile_image:files[0]});
        }else{
            setFormData({...formData,[name]:value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");
        setSuccess("");
        try{
            const form = new FormData();
            Object.entries(formData).forEach(([key,value]) => {
                form.append(key,value);
            });

            await api.post("/register/",form,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            setSuccess("User registered Successfully!!")
            setFormData({
                username:"",
                email:"",
                password:"",
                confirm_password:"",
                bio:"",
                profile_image:null,
            });
        }catch(err){
            console.log(err);
            setError(err.response?.data || "Registration failed");
        }
    };


return(
    <>
    <form onSubmit = {handleSubmit} className = "max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
        />

        <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
        />

        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
        />

        <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
        />

        <textarea
            type="text"
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
        />

        <input
            type="file"
            name="profile_image"
            placeholder="Profile Image"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
        />
        <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>

      {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
    </>
)
}

export default RegisterForm;