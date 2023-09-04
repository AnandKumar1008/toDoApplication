import React, { useContext, useState } from "react";
import List from "../../Components/List/List";
import axios from "axios";
import { MyContext } from "../../MyContext";
import { BASE_URL } from "../../BaseUrl";
import "./Home.css";
const Home = () => {
  const {
    update,
    setUpdate,
    login,
    setAuthPage,
    setLoginPage,
    userId,
    loading,
    setLoading,
  } = useContext(MyContext);
  const [currentData, setCurrentData] = useState({
    title: "",
    description: "",
  });
  const handleAdd = async () => {
    if (!login) {
      setLoginPage(true);
      setAuthPage(true);
      return;
    }
    if (!currentData.title) return;
    console.log(currentData);
    const addList = {
      ...currentData,
      creator_id: userId,
    };
    const res = await axios.post(`${BASE_URL}/api/v1/task/create`, addList);
    setUpdate((p) => !p);
    setCurrentData({ title: "", description: "" });
    console.log(res);
  };
  return (
    <div className="to_do-home">
      <h1 style={{ color: "black", padding: "2rem 0", textAlign: "center" }}>
        To Do Appplication
      </h1>
      <div className="to_do-input_button">
        <div className="to_do-input">
          <input
            type="text"
            style={{ padding: "1rem 0.5rem" }}
            placeholder="Enter your title "
            value={currentData.title}
            onChange={(e) =>
              setCurrentData({ ...currentData, title: e.target.value })
            }
          />

          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            placeholder="Description"
            value={currentData.description}
            onChange={(e) =>
              setCurrentData({ ...currentData, description: e.target.value })
            }
          ></textarea>
        </div>
        <button
          style={{
            cursor: "pointer",
            padding: "1rem",
            border: "1px solid #eeeeee",
          }}
          onClick={handleAdd}
        >
          Add To Do
        </button>
      </div>
      {loading && <p style={{ margin: "1rem 0" }}>Loading...</p>}
      <List />
    </div>
  );
};

export default Home;
