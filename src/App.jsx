import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

function App() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");

  const [Todo, setTodos] = useState([]);

  const [EditObj, setEditObj] = useState("");

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

  const Add = (e) => {
    e.preventDefault();
    const obj = { title, desc, status };
    const Todos = [...Todo, obj];
    setTodos(Todos);
    localStorage.setItem("todos", JSON.stringify(Todos));
    setTitle("");
    setDesc("");
    setStatus("");
    setModal(false);
  };

  const update = () => {
    const updateTodos = Todo.map((task) => {
      if (task === EditObj) {
        return { title, desc, status };
      }
      return task;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setEditObj("");
    setModal(false);
  };



  const Delete = (objToDelete) => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const newTodos = storedTodos.filter((task) => JSON.stringify(task) !== JSON.stringify(objToDelete));
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleclick = (e) => {
    if (EditObj) {
      update();
    } else {
      Add(e);
    }
  };

  const updateTask = (task) => {
    setEditObj(task);
    setModal(true);
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const onDragStart = (e, Todo) => {
    e.dataTransfer.setData("Todos", JSON.stringify(Todo))
  }

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDrop = (e, newstatus) => {
    e.preventDefault();
    console.log("Hannan")

    const draggedTodo = JSON.parse(e.dataTransfer.getData("Todos"));
    const updatedArr = Todo.map((obj) =>
      JSON.stringify(obj) === JSON.stringify(draggedTodo) ? { ...obj, status: newstatus } : obj
    );

    localStorage.setItem("todos", JSON.stringify(updatedArr));
    setTodos(updatedArr);
  };

  return (
    <>
      <Navbar />
      <button
        className="bg-blue-700 text-white px-5 py-2.5 rounded-lg mt-3 ml-5"
        onClick={() => {
          setEditObj(null);
          toggle();
        }}
      >
        Create
      </button>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="flex justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {EditObj ? "Update Task" : "Create Task"}
              </h3>
              <button
                onClick={toggle}
                className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8"
              >
                &times;
              </button>
            </div>

            <div className="grid gap-4 mb-4">
              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  className="border p-2 w-full"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block mb-2">Status</label>
                <select
                  className="border p-2 w-full"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="">Select Task Status</option>
                  <option value="ToDo">ToDo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white px-5 py-2.5 rounded-lg"
              onClick={handleclick}
            >
              {EditObj ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      )}

      <Home Todo={Todo} Delete={Delete} Update={updateTask} onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver} />
    </>
  );
}

export default App;


