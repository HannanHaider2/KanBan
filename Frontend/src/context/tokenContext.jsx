import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export function TokenProvider({ children }) {
    const [token, setToken] = useState("");
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setToken(getToken);
        }
        setLoad(false);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <TokenContext.Provider value={{ logout, login, token, load }}>
            {!load && children}
        </TokenContext.Provider>
    );
}
