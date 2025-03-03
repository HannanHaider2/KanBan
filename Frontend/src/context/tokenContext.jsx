import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export function TokenProvider({ children }) {
    const [token, setToken] = useState("");

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setToken(getToken);
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={{ login, token }}>
            {children}
        </TokenContext.Provider>
    );
}
