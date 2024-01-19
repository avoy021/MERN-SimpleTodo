import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <>
            <div className="flex justify-between mb-7">
                <div className="text-2xl font-bold w-1/2">
                <Link to={'/'} className="font-bold text-blue-500">Home</Link>
                </div>
                <div className="text-2xl flex justify-end gap-x-9 w-1/2">
                    {
                        user? (
                            <button className="font-bold text-blue-500" onClick={handleLogout}>Logout</button>
                        ) :
                        (
                            <>
                                <Link to={'/register'} className="font-bold text-blue-500">Register</Link>
                                <Link to={'/Login'} className="font-bold text-blue-500">Login</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar;