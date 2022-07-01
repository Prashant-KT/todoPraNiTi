import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetTodo } from "./GetTodo";

const TodoInput = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = () => {
    axios.get("http://localhost:8080/allTodos").then((res) => {
      setTodos(res.data);
    });
  };

  const handleTodo = () => {
    if (text === "") {
      return;
    }
    axios
      .post("http://localhost:8080/allTodos", {
        text: text,
        status: false,
      })
      .then((res) => {
        console.log(res);
        setText("");
      }).then(()=>{
        getTodo()
      });
  };

  
  return (
    <div>
      <input value={text} type="text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={handleTodo}>Add todo</button>
      {
        todos?.map((el)=>{
          return <GetTodo {...el} key={el.id} value = {{setTodos,todos,getTodo}} />;
        })
      }
    </div>
  );
};

export default TodoInput;
