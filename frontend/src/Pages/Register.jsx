import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await axios.post("http://localhost:5000/api/user/signup", {
      username,
      password,
    });
    if (response.data) {
      setUsername("");
      setPassword("");
      console.log(response.data);
      alert("Registered");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="w-1/3 h-full flex flex-col justify-center align-center">
        <div className="mb-5">
          <label htmlFor="username" className="font-bold">
            Username{" "}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline-none border-solid border-2 border-black py-1 px-5 rounded"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="font-bold">
            Password{" "}
          </label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border-solid border-2 border-black py-1 px-5 rounded"
          />
        </div>
        <div className="py-2 px-2 bg-green-600 rounded text-center text-white font-bold">
          <button className="w-full h-full" onClick={handleClick}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
