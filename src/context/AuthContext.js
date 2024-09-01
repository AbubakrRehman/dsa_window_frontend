import React, { useContext, useEffect, useReducer } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return { user: action.payload }

            case 'LOGOUT':
                localStorage.removeItem("user");
                return { user: null }

            case 'SIGNUP':

                break;

            default:
                return state

        }
    }, { user: undefined });



    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            dispatch({ type: "LOGIN", payload: user })
        }

    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be inside AuthContext');
    }

    return context;
}

export default AuthContextProvider