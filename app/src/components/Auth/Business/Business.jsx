import { faCircleXmark, faImages } from "@fortawesome/free-regular-svg-icons"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Business as BusinessClass } from "../../../class/Business"
import { AuthContext } from "../../../context/AuthContext"
import "./Buisness.css"
import { useNavigate } from "react-router"

export function Business() {

    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    async function submitFormBusinesses(e) {
        e.preventDefault()
        setLoading(true)

        const business = new BusinessClass(token)
        const formData = new FormData(e.target)

        if (!image) {
            formData.delete("logo")
        }

        try {
            const response = await business.create(formData)
            if (response.business) {
                setLoading(false)
                navigate('/register/connect-account')
            }
        } catch (error) {

            if (e.errors.name) alert('se necesita nombre')
            setLoading(false)
        }
    }

    function removeLogo() {
        setImage(null)
    }

    return (
        <>
            <h1>Datos de tu negocio</h1>
            <form onSubmit={submitFormBusinesses}>
                <div className="image-form-businesses">
                    <FontAwesomeIcon icon={faImages} size="2xl" />
                    <input
                        autoComplete="off"
                        type="file"
                        name="logo"
                        id="image"
                        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                        accept="image/png, image/jpeg, image/webp"
                    />
                    <label htmlFor="image">Logo de tu negocio (opcional)</label>
                </div>
                {image &&
                    <div className="image-form-businesses">
                        <img src={image} alt="logo del negocio" />
                        <button
                            type="button"
                            className="remove-logo"
                            onClick={removeLogo}
                        >
                            Eliminar logo
                        </button>
                    </div>
                }
                <div>
                    <input
                        autoComplete="off"
                        type="text"
                        name="name"
                        placeholder="Nombre del negocio"
                    />
                </div>
                <div>
                    <input
                        autoComplete="off"
                        type="text"
                        name="industry"
                        placeholder="Industria / rubro (opcional)"
                    />
                </div>
                <button type="submit" disabled={loading}>{loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Continuar'}</button>
                {errorMessage && <p className="message-error">{errorMessage} <FontAwesomeIcon icon={faCircleXmark} onClick={() => setErrorMessage(null)} /></p>}
            </form >
        </>
    )
}