
import { NavLink } from 'react-router-dom';


const UserSidebar = () => {
    
    const userLinks = (
        <>
            {
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "bg-slate-400" : "")}
                        to={"my-profile"}
                    >
                        My Profile
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => (isActive ? "bg-slate-400" : "")}
                        to={"add-product"}
                    >
                        Add Products
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => (isActive ? "bg-slate-400" : "")}
                        to={"my-product"}
                    >
                        My Products
                    </NavLink>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
            }
        </>
    );
    return (
        <div>
            <div className="dropdown m-5">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost text-white bg-amber-400 rounded md:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {" "}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        />{" "}
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-amber-300 rounded-box z-1 mt-3 w-52 p-2"
                >
                    {userLinks}
                </ul>
            </div>

            <div className="hidden md:block">
                <ul className="menu text-xl px-1 lg:w-[250px] mx-auto text-white font-medium">
                    {userLinks}
                </ul>
            </div>
        </div>
    )
}

export default UserSidebar
