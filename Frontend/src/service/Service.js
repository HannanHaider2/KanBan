import axios from "axios";

const BaseURL = "http://localhost:3002/todo";
const AuthURL = "http://localhost:3002/auth";

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

const getLog = async () => {
    try {
        const res = await axios.get("http://localhost:3002/logger/get");
        console.log(res)
        return res.data.log;
    }
    catch (err) {
        console.log("Error getting Logger", err)
    }
}

const loginUser = async (userName, password) => {
    try {
        const res = await axios.post(`${AuthURL}/login`, {
            userName,
            password,
        });
        return res.data;
    } catch (err) {
        console.error("Login failed:", err);
    }
};
const signUpUser = async (userName, password, firstName, lastName) => {
    try {
        await axios.post(`${AuthURL}/signup`, { userName, password, firstName, lastName });
    } catch (err) {
        console.error("Signup failed:", err);
    }
};


export { fetchTodos, addTodo, updateTodo, deleteTodo, getLog, loginUser, signUpUser };
