import { useContext } from "react";
import { AuthContext } from "../auth-layout/auth-context";

export default function MainHeader() {
  const { userRole } = useContext(AuthContext);

  const userHeader = (
    <>
      <li>
        <a href="/lessons">Lessons</a>
      </li>
      <li>
        <a href="/lessons/tutorial">Tutorials</a>
      </li>
    </>
  );

  const adminHeader = (
    <>
      <li>
        <a href="dashboard">Dashboard</a>
      </li>
      <li>
        <a href="user-management">User Management</a>
      </li>
      <li>
        <a href="content-management">Content Management</a>
      </li>
      <li>
        <a href="/tutorial_management">Tutorial Management</a>
      </li>
    </>
  );

  return (
    <div className="px-5 md:px-10 lg:px-20 border-b-2 bg-white">
      <div className="navbar bg-white">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm tracking-tighter dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow text-black"
            >
              {userRole == 1 ? adminHeader : userHeader}
            </ul>
          </div>
          <a
            className="bg-white"
            href={userRole == 2 ? "/lessons" : "/lessons/dashboard"}
          >
            <img
              className="w-36 h-10"
              src="https://www.japanesevocabularyshortcut.com/wp-content/uploads/2020/04/cropped-jvs-rectangle.png"
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal tracking-tighter px-2 text-black">
            {userRole == 1 ? adminHeader : userHeader}
          </ul>
        </div>
        <div className="navbar-end">
          <a
            href="/"
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            login
          </a>
        </div>
      </div>
    </div>
  );
}
