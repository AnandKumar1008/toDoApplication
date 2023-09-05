import React, { useContext, useState } from "react";
import { MyContext } from "../../MyContext";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { BASE_URL } from "../../BaseUrl";
const CreateAccount = () => {
  const { setLoginPage, setAuthPage, setMessage } = useContext(MyContext);
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    e.preventDefault();
    if (userDetail.name.length < 3) {
      setError("username must have more than 2 characters");
      return;
    }
    if (!pattern.test(userDetail.email)) {
      setError("Enter a valid Email Adress");
      return;
    }
    if (userDetail.password.length < 6) {
      setError("password must have more than 6 characters");
      return;
    }
    const create = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/v1/user/signup`,
          userDetail
        );
        console.log(res);
        setLoginPage(true);
        setAuthPage(true);
        setMessage("Account Creation SuccessFull");
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
      }
    };

    create();
  };
  return (
    <div className="to_do-login">
      <form className="to_do-login_cover" onSubmit={handleSubmit}>
        <div className="to_do-login_close">
          <button
            style={{
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
              padding: "1rem 0",
              fontSize: "1.5rem",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLoginPage(false);
              setAuthPage(false);
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
        <h3 style={{ margin: "1rem 0", textAlign: "start" }}>
          Create An Account
        </h3>
        <p style={{ color: "red" }}>{error}</p>
        <input
          type="text"
          placeholder="username"
          style={{ padding: "0.5rem", margin: "0.5rem 0" }}
          value={userDetail.name}
          onChange={(e) => {
            setUserDetail({ ...userDetail, name: e.target.value });
            setError("");
          }}
        />
        <input
          type="email"
          placeholder="Email"
          style={{ padding: "0.5rem", margin: "0.5rem 0" }}
          value={userDetail.email}
          onChange={(e) => {
            setError("");
            setUserDetail({ ...userDetail, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          style={{ padding: "0.5rem", margin: "0.5rem 0" }}
          value={userDetail.password}
          onChange={(e) => {
            setError("");
            setUserDetail({ ...userDetail, password: e.target.value });
          }}
        />

        <button
          style={{ cursor: "pointer", padding: "0.5rem", margin: "0.5rem 0" }}
        >
          Create Account
        </button>
        <p>
          Already had An Account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setLoginPage(true)}
          >
            Login
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
