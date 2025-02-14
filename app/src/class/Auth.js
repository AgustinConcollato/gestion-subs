import { url } from "../config/url"

class Auth {
    constructor({ token }) {
        this.token = token
    }

    async login(data) {
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                body: data
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    async register(data) {
        try {
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                body: data
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            const response = await fetch(`${url}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${this.token}`
                }
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    async get() {
        try {
            const response = await fetch(`${url}/user`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    async sendEmail(data) {
        try {
            const response = await fetch(`${url}/email/verify/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    async nextStep(step) {
        try {
            const response = await fetch(`${url}/next-step`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${this.token}`
                },
                body: JSON.stringify({ step })
            })

            if (!response.ok) {
                const error = await response.json()
                throw error
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

}

export default Auth