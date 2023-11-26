import React, { useState, ChangeEvent } from "react";
import { Todo } from "../types/Task";
import { generateRandomId } from "../util/Utils";
import TodoService from "../service/TodoService";


const initialState: Todo = {
  id: '0',
  title: '',
  description: '',
  status: ''

}
interface TaskInputProps {
  addTask: (task: Todo) => void;
  loadData: () => void
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask, loadData }) => {

  const [toDoList, setToDoList] = useState<Todo>(initialState);

  const handleChange = (e: any) => {

    setToDoList((prev: Todo) => ({ ...prev, [e.target.name]: e.target.value }))

  };

  const handleAddTask = (e: any) => {
    e.preventDefault();
    if (toDoList.title?.trim() !== "") {
      const values: Todo = {
        id: generateRandomId(),
        title: toDoList.title,
        description: toDoList.description,
        status: 'TODO'
      }
      addTask(values)
      TodoService.addTodo(values).then((res: any) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })

      setToDoList(initialState);
    }
  };

  return (
    <form className="flex" onSubmit={handleAddTask}>
      <div>
        <input className="rounded p-1 m-1" type="text" placeholder="Add Task" value={toDoList.title} name='title' onChange={handleChange} />
        <input className="rounded p-1 m-1" type="text" placeholder="Add Description" value={toDoList.description} name='description' onChange={handleChange} />
      </div>
      <button className="w-20 h-10">Add</button>
    </form>
  );
};

export default TaskInput;
