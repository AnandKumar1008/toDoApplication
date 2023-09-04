import axios from "axios";
import React, { useContext, useState } from "react";
import { MyContext } from "../../MyContext";
import { BASE_URL } from "../../BaseUrl";
import "./EachList.css";
const EachList = ({ item }) => {
  const { update, setUpdate } = useContext(MyContext);
  const [edit, setEdit] = useState(false);
  const [inp, setInp] = useState({
    title: "",
    description: "",
  });
  const handleUpdate = async () => {
    const upload = { ...inp, task_id: item._id };
    try {
      const res = await axios.patch(`${BASE_URL}/api/v1/task/update`, upload);

      setEdit(false);
      setUpdate((p) => !p);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/task/delete/${item._id}`
      );
      console.log(res.data);
      setUpdate((p) => !p);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="to_do-each_list">
      <div key={item?._id} className="to_do-list_task">
        {edit ? (
          <>
            <div className="to_do-input">
              <input
                type="text"
                style={{ padding: "1rem 0.5rem" }}
                placeholder="Enter your title "
                value={inp.title}
                onChange={(e) => setInp({ ...inp, title: e.target.value })}
              />

              <textarea
                name=""
                id=""
                cols="30"
                rows="2"
                placeholder="Description Here"
                value={inp?.description}
                onChange={(e) =>
                  setInp({ ...inp, description: e.target.value })
                }
              ></textarea>
            </div>
          </>
        ) : (
          <div>
            <h3 style={{ color: "white" }}>{item.title}</h3>
            <p style={{ color: "white" }}>{item?.description}</p>
          </div>
        )}
        <div className="to_do-list_button">
          {edit ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button
              onClick={() => {
                setInp({ title: item.title, description: item?.description });
                setEdit(true);
              }}
            >
              Edit
            </button>
          )}
          <button onClick={handleDelete}>Delete</button>
          {edit && <button onClick={() => setEdit(false)}>Close</button>}
        </div>
      </div>
    </div>
  );
};

export default EachList;
