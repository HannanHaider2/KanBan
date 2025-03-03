import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import axios from "axios";

function TodoApp() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [Todo, setTodos] = useState([]);
  const [EditObj, setEditObj] = useState(null);
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const fetchTodos = async () => {
      console.log(token)
      try {
        const res = await axios.get("http://localhost:3002/todo/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(res.data);
      } catch (error) {
        console.error("Can't get todos", error);
      }
    };
    if (token) fetchTodos();
  }, [token]);

  const Add = async () => {
    try {
      const todo = { title, desc, status };

      if (EditObj) {
        const res = await axios.patch(
          `http://localhost:3002/todo/update/${EditObj._id}`,
          todo,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTodos(Todo.map((o) => (o.id === EditObj.id ? res.data : o)));
      } else {
        const res = await axios.post("http://localhost:3002/todo/create", todo, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos([...Todo, res.data]);
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

  const Delete = async (objToDelete) => {

    try {
      await axios.delete(`http://localhost:3002/todo/delete/${objToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(token)
      setTodos(Todo.filter((obj) => obj._id !== objToDelete._id));
    } catch (err) {
      console.error("Can't Delete", err);
    }
  };

  const handleclick = () => {
    if (EditObj) {
      Add();
    } else {
      Add();
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

  const onDrop = async (e, newstatus) => {
    e.preventDefault();
    const draggedTodo = JSON.parse(e.dataTransfer.getData("Todos"));

    if (draggedTodo.status !== newstatus) {
      try {
        const res = await axios.patch(
          `http://localhost:3002/todo/update/${draggedTodo._id}`,
          { status: newstatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedTodo = res.data;
        setTodos(Todo.map((task) =>
          task.id === draggedTodo.id ? updatedTodo : task
        ));

      } catch (err) {
        console.error("Error updating task status:", err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2.5 rounded-lg mt-3 ml-5">
        Logout
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
            <button type="submit" className="bg-blue-700 text-white px-5 py-2.5 rounded-lg" onClick={handleclick}>
              {EditObj ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      )}

      <Home Todo={Todo} Delete={Delete} Update={updateTask} onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver} />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
