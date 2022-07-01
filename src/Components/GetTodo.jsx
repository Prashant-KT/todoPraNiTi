import React, { useState } from "react";
import axios from "axios";
export const GetTodo = (el) => {
  const [edit, setEdit] = useState(false);
  const [textChange, setTextChange] = useState("");
    const [done, setDone] = useState(false);
  const allProps = el.value;
  console.log(allProps);

  const handleStatus = () => {
    axios
      .patch(`http://localhost:8080/allTodos/${el.id}`, {
        status: !el.status,
      })
      .then(() => {
        // window.location.reload();
         allProps.getTodo();
         setDone(!done)
      });
  };
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/allTodos/${el.id}`).then(() => {
    //   window.location.reload();
        allProps.getTodo()
    });
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

const handleEditChange = () => {
  axios
    .patch(`http://localhost:8080/allTodos/${el.id}`, {
      text: textChange,
    })
    .then(() => {
      setEdit(false);
      //  window.location.reload();
      allProps.getTodo();
    });
};
let inputDiv = (
  <>
    <input
      type="text"
      id=""
      onChange={(e) => {
        setTextChange(e.target.value);
      }}
    />
    <button onClick={handleEditChange}>Change</button>
  </>
);

  let allTodoData = (
    <div style={{ textDecoration: done ? "line-through" : "none" }}>
      <br></br>
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "500px",
          height: "50px",
          justifyContent: "space-around",
          border: "1px solid black",
        }}
      >
        <span>{el.id}</span>
        {edit ? inputDiv  : <span >{el.text}</span>}
        <button onClick={handleStatus}>
          {el.status ? "Not done" : "Done"}
        </button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );





  return <> {allTodoData} </>;
};
