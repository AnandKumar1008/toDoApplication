import React, { useContext, useState } from "react";
import "./Nav.css";
import { BiUser } from "react-icons/bi";
import { MyContext } from "../../MyContext";
import { FaUser } from "react-icons/fa";
import { CiLogin, CiLogout } from "react-icons/ci";
// import { IoPersonAdd } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
const Nav = () => {
  const { setAuthPage, setLoginPage, login, setLogin, setUserData, userName } =
    useContext(MyContext);
  const [select, setSelect] = useState("home");
  return (
    <div className="to_do-nav">
      <ul className="to_do-nav_top">
        <li>ToDo App</li>
        <li
          style={select === "home" ? { backgroundColor: "lightblue" } : {}}
          onClick={() => setSelect("home")}
        >
          Home
        </li>
        {login ? (
          // <li
          //   onClick={() => {
          //     setLogin(false);
          //     setUserData([]);
          //     localStorage.setItem("to_do_token", JSON.stringify(""));
          //   }}
          // >
          //   Logout
          // </li>
          <></>
        ) : (
          <>
            <li
              onClick={() => {
                setAuthPage(true);
              }}
            >
              Register
            </li>
            <li
              onClick={() => {
                setAuthPage(true);
                setLoginPage(true);
              }}
            >
              Login
            </li>
          </>
        )}
      </ul>
      {
        <ul className="to_do-nav_right">
          <li className="to_do-nav_profile">
            <FaUser />
            <div className="to_do-nav_profile_hover">
              <ul>
                {login ? (
                  <>
                    <li>
                      <BiUser />
                      {userName}
                    </li>
                    <li
                      onClick={() => {
                        setLogin(false);
                        localStorage.setItem("to_do_token", JSON.stringify(""));
                        setUserData([]);
                      }}
                    >
                      {" "}
                      <CiLogout /> Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      onClick={() => {
                        setLoginPage(true);
                        setAuthPage(true);
                      }}
                    >
                      {" "}
                      <CiLogin /> LogIn
                    </li>
                    <li
                      onClick={() => {
                        setLoginPage(false);
                        setAuthPage(true);
                      }}
                    >
                      {" "}
                      <IoMdPersonAdd /> Create Account
                    </li>
                  </>
                )}
              </ul>
            </div>
          </li>
        </ul>
      }
    </div>
  );
};

export default Nav;
