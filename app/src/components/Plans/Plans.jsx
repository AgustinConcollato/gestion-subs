import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

export function Plans() {

    const { nextStep } = useContext(AuthContext)

    const [loading, setLoading] = useState()

    async function next() {
        setLoading(true)
        try {
            const response = await nextStep(5)

            if (response.steps == 5) {
                console.log(response)
                return window.location.href = '/dashboard'
            }

            setLoading(false)
            console.log(response)

        } catch (error) {
            alert(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="container-lans">
            <button onClick={next}>{loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'plan seleccionado'}</button>
        </div>
    )
}