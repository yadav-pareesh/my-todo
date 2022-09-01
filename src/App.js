import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import { addTasks, updateTask, deleteTask } from "./redux/reducer";

function App() {
  const ref = useRef("");

  const [tampVal, setTampVal] = useState({ id: null, index: null, task: "" });

  const [input, setInput] = useState({ id: 0, task: "" });

  const [addProp, setAddProp] = useState("inline");

  const [saveProp, setSaveProp] = useState("none");

  const reduxState = useSelector((state) => state);

  const dispatch = useDispatch();

  const addTodo = () => {
    input.task.trim() ? dispatch(addTasks(input)) : <h1>enter a value</h1>;
    setInput({ task: "" });
    ref.current.focus();
  };

  useEffect(() => {
    console.log(reduxState.value);
  }, [reduxState]);

  const changeHandler = (e) => {
    setTampVal({ id: tampVal.id, index: tampVal.index, task: e.target.value });
    setInput({
      id: e.target.id,
      task: e.target.value,
    });
  };

  const editTask = (value, ind) => {
    setInput({ id: value.id, task: value.task });
    setTampVal({ id: value.id, index: ind, task: value.task });
    setAddProp("none");
    setSaveProp("inline");
    ref.current.focus();
  };

  const updateTodo = () => {
    return (
      <div>
        {input.task.trim()
          ? (setTampVal({ task: input.task }),
            dispatch(updateTask(tampVal)),
            setInput({ task: "" }),
            setAddProp("inline"),
            setSaveProp("none"),
            ref.current.focus())
          : null}
        ;
      </div>
    );
  };

  const deleteTodo = (id) => {
    dispatch(deleteTask(id));
    setAddProp("inline");
    setSaveProp("none");
    ref.current.focus();
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        ref={ref}
        type="text"
        value={input.task}
        id={new Date().valueOf()}
        placeholder="Write a todo..."
        onChange={changeHandler}
      />
      <button onClick={addTodo} style={{ display: addProp }}>
        Add
      </button>
      <button onClick={updateTodo} style={{ display: saveProp }}>
        Save
      </button>
      {reduxState.value.map((x, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flex: 1,
              border: "1px solid gray",
              borderRadius: "8px",
              width: "40%",
              margin: "0 0 0.4% 30%",
              padding: "5px",
            }}
          >
            <p
              key={index}
              onClick={() => editTask(x, index)}
              style={{
                display: { addProp },
                textAlign: "left",
                flex: 1,
              }}
            >
              {index + 1}
              {". "}
              {x.task}
            </p>
            <button onClick={() => deleteTodo(x.id)}>dlt</button>
          </div>
        );
      })}
    </div>
  );
}
export default App;
