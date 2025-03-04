import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { TokenContext } from "../context/tokenContext";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../service/service";

function Home() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");
    const [Todo, setTodos] = useState([]);
    const [EditObj, setEditObj] = useState(null);

    const token = localStorage.getItem("token");
    const { logout } = useContext(TokenContext);

    useEffect(() => {
        if (EditObj) {
            setTitle(EditObj.title);
            setDesc(EditObj.desc);
            setStatus(EditObj.status);
        } else {
            setTitle("");
            setDesc("");
            setStatus("");
        }
    }, [EditObj]);

    const fetchTodosData = async () => {
        if (token) {
            const data = await fetchTodos(token);
            setTodos(data);
        }
    };

    useEffect(() => {
        fetchTodosData();
    }, [token]);

    const addAndupdate = async () => {
        try {
            const todo = { title, desc, status };

            if (EditObj) {
                const response = await updateTodo(EditObj._id, todo, token);
                setTodos(Todo.map((o) => (o._id === EditObj._id ? response : o)));
            } else {
                const response = await addTodo(todo, token);
                setTodos([...Todo, response]);
                await fetchTodosData();
            }

            setEditObj(null);
            setTitle("");
            setDesc("");
            setStatus("");
            setModal(false);
        } catch (err) {
            console.error("Task not saved", err);
        }
    };

    const handleDelete = async (objToDelete) => {
        try {
            await deleteTodo(objToDelete._id, token);
            setTodos(Todo.filter((obj) => obj._id !== objToDelete._id));
        } catch (err) {
            console.error("Can't Delete", err);
        }
    };

    const updateTask = (task) => {
        setEditObj(task);
        setModal(true);
    };

    const onDragStart = (e, task) => {
        e.dataTransfer.setData("Todos", JSON.stringify(task));
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = async (e, newStatus) => {
        e.preventDefault();
        const draggedTodo = JSON.parse(e.dataTransfer.getData("Todos"));

        if (draggedTodo.status !== newStatus) {
            try {
                await updateTodo(draggedTodo._id, { status: newStatus }, token);
                await fetchTodosData();
            } catch (err) {
                console.error("Error updating task status:", err);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleActivityLog = () => {
        navigate("/log");
    };

    return (
        <>
            <Navbar />
            <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2.5 rounded-lg mt-3 ml-5">
                Logout
            </button>
            <button onClick={handleActivityLog} className="bg-green-600 text-white px-5 py-2.5 rounded-lg mt-3 ml-5">
                Activity Log
            </button>
            <button className="bg-blue-700 text-white px-5 py-2.5 rounded-lg mt-3 ml-5" onClick={() => { setEditObj(null); toggle(); }}>
                Create
            </button>

            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold">{EditObj ? "Update Task" : "Create Task"}</h3>
                            <button onClick={toggle} className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8">
                                &times;
                            </button>
                        </div>

                        <div className="grid gap-4 mb-4">
                            <div>
                                <label className="block mb-2">Title</label>
                                <input type="text" className="border p-2 w-full" value={title} onChange={e => setTitle(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block mb-2">Description</label>
                                <textarea className="border p-2 w-full" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label className="block mb-2">Status</label>
                                <select className="border p-2 w-full" value={status} onChange={e => setStatus(e.target.value)}>
                                    <option value="">Select Task Status</option>
                                    <option value="ToDo">ToDo</option>
                                    <option value="Inprogress">Inprogress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-700 text-white px-5 py-2.5 rounded-lg" onClick={addAndupdate}>
                            {EditObj ? "Update Task" : "Add Task"}
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-evenly mt-3 text-2xl font-bold h-auto">

                <div className="bg-green-600 w-1/3 text-center pt-4" onDragOver={onDragOver} onDrop={(e) => onDrop(e, "ToDo")}>
                    <h2 className="mb-4 text-white">To Do</h2>
                    <div className="space-y-4">
                        {Todo.filter((task) => task.status === "ToDo").map((task, index) => (
                            <Card key={task._id} task={task} Delete={handleDelete} Update={updateTask} onDragStart={onDragStart} index={index} />
                        ))}
                    </div>
                </div>
                <div className="bg-orange-500 w-1/3 text-center pt-4" onDragOver={onDragOver} onDrop={(e) => onDrop(e, "Inprogress")}>
                    <h2 className="mb-4 text-white">In Progress</h2>
                    <div className="space-y-4">
                        {Todo.filter((task) => task.status === "Inprogress").map((task, index) => (
                            <Card key={task._id} task={task} Delete={handleDelete} Update={updateTask} onDragStart={onDragStart} index={index} />
                        ))}
                    </div>
                </div>

                <div className="bg-red-600 w-1/3 text-center pt-4" onDragOver={onDragOver} onDrop={(e) => onDrop(e, "Done")}>
                    <h2 className="mb-4 text-white">Done</h2>
                    <div className="space-y-4">
                        {Todo.filter((task) => task.status === "Done").map((task, index) => (
                            <Card key={task._id} task={task} Delete={handleDelete} Update={updateTask} onDragStart={onDragStart} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
