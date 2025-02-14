import { createContext, useEffect, useState } from "react";
import Auth from "../class/Auth";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const auth = new Auth({ token })

    const [user, setUser] = useState(null)

    async function login(data) {
        try {
            const response = await auth.login(data)

            const { token, user } = response
            localStorage.setItem('token', token)

            setUser(user)
            setToken(token)

            return response
        } catch (error) {
            throw error
        }

    }

    async function register(data) {
        try {
            const response = await auth.register(data)

            const { token, user } = response
            localStorage.setItem('token', token)

            setToken(token)
            setUser(user)

            return response
        } catch (error) {
            throw error
        }
    }

    async function logout() {
        try {
            const response = await auth.logout()

            if (response) {
                setUser(null)
                setToken(null)
                localStorage.removeItem('token')
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function sendEmail(data) {
        try {
            const response = await auth.sendEmail(data)

            const { token, user } = response
            if (token && user) {

                localStorage.setItem('token', token)

                setToken(token)
                setUser(user)
            }

            return response
        } catch (error) {
            throw error
        }
    }

    async function getUser() {
        try {
            const response = await auth.get();
            localStorage.setItem('token', response.token)
            setToken(response.token)
            setUser(response.user)
            return response
        } catch (error) {
            throw error
        }
    }

    async function nextStep(step) {
        try {
            const response = await auth.nextStep(step)

            return response
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return <AuthContext.Provider value={{
        login,
        register,
        logout,
        sendEmail,
        getUser,
        nextStep,
        user,
        token
    }}
    >
        {children}
    </AuthContext.Provider>
}