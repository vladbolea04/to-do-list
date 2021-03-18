import "../List/List";
import "./App.css";

import { useState, useEffect } from "react";

let id = 0;

export default function App() {
  const [text, setText] = useState(localStorage.getItem("text") || "");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("text", text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [text, tasks]);

  const handleChange = (event) => {
    localStorage.setItem("text", event.target.value);
    setText(event.target.value);
  };

  const handleSubmit = () => {
    if (text !== "") {
      id += 1;
      setTasks((prev) => {
        return [{ value: text, index: id, done: false }, ...prev];
      });

      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleRemove = (id) => {
    tasks.splice(tasks.length - id, 1);
    if (tasks.length === 0) {
      setTasks([]);
    }
    localStorage.setItem("text", text);
    console.log(tasks);
  };

  return (
    <div className="App">
      <p className="title"> To do list</p>
      <div className="input-container">
        <input
          type="text"
          onChange={handleChange}
          value={text}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSubmit}>Ok</button>
      </div>
      <div className="list-container">
        <div className="task-list">
          {tasks.length === 0 && <p>Empty list</p>}
          {tasks.map(({ value, index, done }) => {
            return (
              <Task
                task={value}
                key={index}
                id={index}
                done={done}
                onRemove={handleRemove}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Task(props) {
  const [del, setDel] = useState(false);

  const [taskDone, setTaskDone] = useState(
    localStorage.getItem("isTaskDone") || props.done
  );
  useEffect(() => {
    localStorage.setItem("isTaskDone", taskDone);
  }, [taskDone]);
  const handleDone = () => {
    setTaskDone(!taskDone);
    localStorage.setItem("isTaskDone", taskDone);
  };

  console.log(taskDone, props.done);

  return (
    <>
      {!del && (
        <div className="task">
          <p
            className="task-description"
            style={{ textDecorationLine: !taskDone ? "line-through" : "none" }}
          >
            {props.task}
          </p>
          <div className="align-right">
            <button className="complete" onClick={handleDone}>
              Complete
            </button>
            <button
              className="delete"
              onClick={() => {
                props.onRemove(props.id);
                setDel(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
