import { useEffect, useState } from "react";
import { login } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isLoading, isError, message]);
  const handleClick = () => {
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
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
        <div className="mb-5 py-2 px-2 bg-green-600 rounded text-center text-white font-bold">
          <button className="w-full h-full" onClick={handleClick}>
            Login
          </button>
        </div>
        {isLoading ? (
          <div className="font-bold italic text-blue-500">
            Wait for a moment...
          </div>
        ) : (
          null
        )}
        {isError ? (
          <div className="font-bold italic text-blue-500">
            Username or password is incorrect
          </div>
        ) : (
          null
        )}

      </div>
    </>
  );
}

export default Login;
