import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="flex justify-between mb-7">
                <div className="text-2xl font-bold w-1/2">
                <Link to={'/'} className="font-bold text-blue-500">Home</Link>
                </div>
                <div className="text-2xl flex justify-end gap-x-9 w-1/2">
                    <Link to={'/register'} className="font-bold text-blue-500">Register</Link>
                    <Link to={'/Login'} className="font-bold text-blue-500">Login</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;