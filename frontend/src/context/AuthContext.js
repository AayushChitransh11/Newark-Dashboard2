import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            fetch("/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => setUser(data.user))
                .catch(() => setUser(null));
        }
    }, [token]);

    const login = async (Email, Password) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email, Password }),
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                setUser(data.user);
            }
            return data;
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
