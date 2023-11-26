import React, { useEffect, useState } from "react";
import { Todo } from "../types/Task";
import TodoService from "../service/TodoService";
import { Modal } from "antd";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

interface TaskItemProps {
    task: Todo
    loadData: () => void
}
const options = ["TODO", "In Progress", "Done", "High Priority", "Low", "Medium"];
const TaskItem: React.FC<TaskItemProps> = ({ task, loadData }) => {
    const [selected, setSelected] = useState(options[0]);
    const [isModalOpen, setIsModalOpen] = useState(false); // default isModelOpen is false
    const [taskSelected, setTaskSeleted] = useState<Todo | null>()

    // set isModelOpen is true
    const showModal = () => {
        setIsModalOpen(true);
        setTaskSeleted(task)
    };

    const handleOk = () => {
        setIsModalOpen(false);
        console.log(taskSelected)
        TodoService.editTodo(taskSelected).then((res) => {
            if (res.data) {
                loadData();
            }
        })
        setTaskSeleted(null)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTaskSeleted(null)
    };
    const handleUpdateChange = (e: any) => {

        setTaskSeleted((prev: Todo | any) => ({ ...prev, [e.target.name]: e.target.value }))

    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
        const value: Todo = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: event.target.value
        }
        TodoService.editTodo(value).then((res) => {
            if (res.data) {
                loadData();
            }
        })
    };

    useEffect(() => {
        setSelected(task.status);
    }, [])

    const deleteTask = () => {
        TodoService.deleteTodo(task.id).then((res) => {
            if (res.data) {
                loadData();
            }
        })
    }
    return (
        <>
            <li className="items">
                <div className="items-text">
                    <div style={{ display: 'flex' }}>

                        <div style={{ marginLeft: "10px" }}>
                            <p className="text-lg cursor-pointer" >{task.title}</p>
                            <p className="text-sm">{task.description}</p>

                        </div>
                    </div>

                    <div className="flex items-center">
                        <HiOutlinePencilAlt className="mx-1 w-5 h-5 cursor-pointer" onClick={showModal} />
                        <HiOutlineTrash className="mx-1 w-5 h-5 cursor-pointer" onClick={deleteTask} />
                        <select id="select" value={selected} onChange={handleChange} className="rounded-md p-1">
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </li>

            <Modal title={`Edit ${task.title}`} open={isModalOpen} onOk={handleOk} okButtonProps={{ className: "model-ok-button model-ok-text" }} onCancel={handleCancel}>
                <form className="flex">
                    <div>
                        <input
                            type="text"
                            id="title"
                            className="rounded p-1 m-1  text-gray-300"
                            name="title"
                            value={taskSelected?.title}
                            onChange={handleUpdateChange}
                            required
                        />
                         <input
                            type="text"
                            id="description"
                            className="rounded p-1 m-1  text-gray-300"
                            name="description"
                            value={taskSelected?.description}
                            onChange={handleUpdateChange}
                            required
                        />
                    </div>

                    
                    <div>
                        <select id="select" name="status" value={taskSelected?.status} onChange={handleUpdateChange} className="rounded-md p-1 text-gray-300">
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                </form>
            </Modal>
        </>

    );
};

export default TaskItem;
