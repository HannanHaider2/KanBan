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

    return (
        <TokenContext.Provider value={{ login, token, load }}>
            {!load && children}
        </TokenContext.Provider>
    );
}
