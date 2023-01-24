import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = (props) => {

    const history = useHistory();

    const storedToken = localStorage.getItem('token') || '';

    const [token, setToken] = useState(storedToken);
    const userIsLoggedin = !!token;

    const loginHandler = (token) => {
        localStorage.setItem('token', token);
        history.push('/complete-profile');
        setToken(token);
    };

    const logoutHandler = () => {
        setToken(() => {
            return '';
        });
        localStorage.removeItem('token');
    };

    const authContext = {
        token: token,
        isLoggedIn: userIsLoggedin,
        login: loginHandler,
        logout: logoutHandler,
    };

    return(
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    );
}

export default AuthContext;