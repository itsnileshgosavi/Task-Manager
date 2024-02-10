"use client";
import Link from "next/link";
import UserContext from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";
import { logout } from "@/app/services/userServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Header = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if the user is logged in based on the presence of a cookie
  const checkLoggedInStatus = () => {
    const token = getCookie("loginToken");
    setIsLoggedIn(!!token);
    // Set isLoggedIn to true if the token is present, otherwise false
  };
  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const doLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
      context.setUser(undefined);
      router.push("/login");
      toast.info("Logged out");
    } catch (error) {
      console.log("Something went wrong logging out");
      toast.error("Error logging out");
    }
  };

  return (
    <header className="bg-slate-950 p-4 w-full">
      <nav className="flex items-center sticky justify-between">
        <div>
          <Link href="/">
            <button className="text-white text-lg font-semibold hover:text-blue-500">
              Task Manager
            </button>
          </Link>
        </div>
        <div className="flex">
          {context.user && (
            <ul className="flex m-3 justify-items-center">
              <li className="hidden md:block m-3">
                <Link href="/addtask" className="hover:text-blue-500">
                  Add Task
                </Link>
              </li>
              <li className="hidden md:block m-3">
                <Link href="/your-tasks" className="hover:text-blue-500">
                  Show Tasks
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="hidden md:flex md:space-x-4">
          {context.user ? (
            <>
              <Link href="/profile/user" className="hover:text-green-600">
                {context.user.name}
              </Link>
              <button
                className="ms-1 px-3 py-0 bg-red-700 text-white rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
                onClick={doLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-yellow-800">
                Login
              </Link>
              <Link href="/signup" className="hover:text-yellow-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {context.user ? (
          <div className="md:hidden z-50 drawer drawer-end justify-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-4"
                className="drawer-button bt"
              >
                &#8801;
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay z-50"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-50">
                {/* Sidebar content here */}
                <li>
                <Link href="/addtask" className="hover:text-blue-500">
                 Add Task
                 </Link>
                </li>
                <li>
                <Link href="/your-tasks" className="hover:text-blue-500">
                  Show Tasks
                 </Link>
                </li>
                <li>
                <Link href="/profile/user" className="hover:text-green-600">
                 Profile ({context.user.name})
                 </Link>
                </li>
                <li>
                <div
                 className="ms-1 px-2 py-0 bg-red-700 text-white rounded-3xl hover:bg-red-500 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
                   onClick={doLogout}
                 >
                   Logout
                </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="md:hidden z-50 drawer drawer-end justify-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button bt"
            >
              &#8801;
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay z-50"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-50">
              {/* Sidebar content here */}
              
              <li>
              <Link href="/login" className="hover:text-yellow-800">
                   Login
                 </Link>
              </li>
              <li>
              <Link href="/signup" className="hover:text-yellow-600">
                 Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
          // <div className="dropdown md:hidden">
          //   <div tabIndex={0} role="button" className="btn m-1">
          //     &#8801;
          //   </div>
          //   <ul
          //     tabIndex={0}
          //     className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          //   >
          //     <li>
          //       <Link href="/login" className="hover:text-yellow-800">
          //         Login
          //       </Link>
          //     </li>
          //     <li>
          //       <Link href="/signup" className="hover:text-yellow-600">
          //         Sign Up
          //       </Link>
          //     </li>
          //   </ul>
          // </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
