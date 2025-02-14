import { url } from "../config/url"

export class Business {
    constructor(token) {
        this.token = token
    }

    async create(data) {
        try {
            const response = await fetch(`${url}/business`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: data
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