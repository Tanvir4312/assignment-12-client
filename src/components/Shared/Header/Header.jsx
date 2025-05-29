import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";



const Header = () => {
  const { user, userLogout } = useAuth();
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white bg-blue-400 font-bold" : ""
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white bg-blue-400 font-bold" : ""
          }
          to={"/products"}
        >
          Products
        </NavLink>
      </li>
    </>
  );

  const handleLogout = async () => {
    try {
      await userLogout();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-slate-400 shadow-sm pb-1">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl flex">
            <img
              className="w-12"
              src="https://img.icons8.com/?size=160&id=6v11UYN0Fynq&format=png"
              alt=""
            />
            <p className="text-3xl font-semibold">
              <span className="text-white">Tech</span>
              <span className="text-blue-600">Trove</span>
            </p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="mr-7 hidden md:block">
            {!user && (
              <Link to={"/login"}>
                <button className="btn">Login</button>
              </Link>
            )}
          </div>
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user && (
                    <img referrerPolicy="no-referrer" src={user.photoURL} />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>{user && <p>{user.displayName}</p>}</li>
                <li>
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mr-7 md:hidden text-center">
        {!user && (
          <Link to={"/login"}>
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
