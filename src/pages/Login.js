import React,{useState} from "react";
import api from "../api/api";

const Login = () => {
    const [formData,setFormData] = useState({username:"",password:""});
    const [error,setError] = useState("");
    
    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name]:e.target.value})

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const res = await api.post("/login/",formData)
            localStorage.setItem("access",res.data.access)
            localStorage.setItem("refresh",res.data.refresh)
            alert("Login Successfull");
            window.location.href="/";
        }catch(err){
            setError("Invalid Credentials");
        }
    }

    return (
       <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-12 space-y-4 py-16 px-4 sm:px-6 lg:px-8 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>

      <p className="text-center">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500">
          Register
        </a>
      </p>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Login;
