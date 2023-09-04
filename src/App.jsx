import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import List from "./Components/List/List";
import axios from "axios";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import Nav from "./Components/Nav/Nav";
import Login from "./Pages/Login/Login";
import { MyContext } from "./MyContext";
import { BASE_URL } from "./BaseUrl";

const App = () => {
  const {
    authPage,
    setLogin,
    setUserId,
    setUserName,
    setUpdate,
    setAuthPage,
    loginPage,
  } = useContext(MyContext);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("to_do_token")) || "";

    const checkLogin = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/api/v1/user/login`, {
          token,
        });
        const data = res.data;
        setLogin(true);
        localStorage.setItem("to_do_token", JSON.stringify(res.data.token));
        setUserId(res.data.data._id);
        setUserName(res.data.data.name);
        setUpdate((p) => !p);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) checkLogin();
  }, []);

  return (
    <div className="to_do-app">
      {authPage && <div>{loginPage ? <Login /> : <CreateAccount />}</div>}
      <Nav />
      <div className="to_do-app_padding">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
