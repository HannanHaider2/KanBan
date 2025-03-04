import axios from "axios";

const BaseURL = "http://localhost:3002/todo";

const fetchTodos = async (token) => {
    try {
        const res = await axios.get(`${BaseURL}/get`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Can't get todos", error);
        return [];
    }
};

const addTodo = async (todo, token) => {
    try {
        const res = await axios.post(`${BaseURL}/create`, todo, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.error("Task not saved", err);
        return null;
    }
};

const updateTodo = async (id, updatedData, token) => {
    try {
        const res = await axios.patch(`${BaseURL}/update/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        console.error("Error updating task:", err);
        return null;
    }
};

const deleteTodo = async (id, token) => {
    try {
        await axios.delete(`${BaseURL}/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (err) {
        console.error("Can't Delete", err);
    }
};

export { fetchTodos, addTodo, updateTodo, deleteTodo };
