import React, { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import { Todo } from "./types/Task";
import TodoService from "./service/TodoService";




function App(): JSX.Element {
  const [toDoList, setToDoList] = useState<Todo[]>([]);

  const addTask = (task: Todo): void => {

    setToDoList((prevToDoList) => {

      return [...prevToDoList, task];
    });
  };


  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    await TodoService.getTodos().then((res) => {
      setToDoList(res)
    })
  }


  return (
    <>
      <div className="container">
        <img src="src\assets\noteBook.avif" className="notebook-img" />
        <h1>ToDo List</h1>
        <TaskInput addTask={addTask} loadData={loadData} />
        <div className="toDoList">
          <span>To do</span>
          <ul className="list-items">
            {toDoList.map((item, index) => (
              <TaskItem key={index} task={item} loadData={loadData} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
