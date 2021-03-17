import "../List/List";
import "./App.css";

import { useState } from "react";

let id = 0;

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    if (text !== "") {
      id += 1;
      setTasks((prev) => {
        return [{ value: text, index: id }, ...prev];
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
    tasks.splice(id, 1);
  };

  console.log(tasks);
  return (
    <div className="App">
      <p className="title">To do</p>
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
          {tasks.map(({ value, index }) => {
            return <Task task={value} key={index} onRemove={handleRemove} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Task(props) {
  const [line, setLine] = useState(false);
  const [del, setDel] = useState(false);

  return (
    <>
      {!del && (
        <div className="task">
          <p
            className="task-description"
            style={{ textDecorationLine: line ? "line-through" : "none" }}
          >
            {props.task}
          </p>
          <div className="align-right">
            <button
              className="complete"
              onClick={() => {
                setLine(!line);
              }}
            >
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

export default App;
