import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MailRemove02Icon, MailValidation01Icon } from "hugeicons-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import './VerifyEmail.css';

export function VerifyEmail() {

    const navigate = useNavigate()

    const { sendEmail, getUser, user } = useContext(AuthContext)

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [status, setStatus] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const [loading, setLoading] = useState(false)

    async function sendEmailVerify(email) {
        try {
            const response = await sendEmail({ email })

            setStatus('success')
            setSuccessMessage(response.message == 'Correo de verificación enviado' ? null : response.message)
        } catch (error) {
            console.log(error)
            setStatus('error')
            setSuccessMessage(null)

            setRetryCount(e => {
                if (e < 3) {
                    return e = e + 1
                }
                navigate('/register')
            })
        }
    }

    async function isVerify() {

        if (successMessage == 'El email ya está verificado') {
            return navigate('/register/business');
        }

        setLoading(true)

        try {
            const user = await getUser()

            setLoading(false)

            user.email_verified_at ?
                navigate('/register/business') :
                setErrorMessage('El email no está verificado')
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        user && sendEmailVerify(user.email)
    }, [user])

    return (
        status ?
            status == 'success' ?
                <div className="verify-email">
                    <MailValidation01Icon
                        size={64}
                        color={"#66b819"}
                        variant={"stroke"}
                    />
                    <h1>Enviamos un correo de verificación a <br /> {user.email}</h1>
                    <p>Revisa la bandeja de entrada, si no aparece revisa en spam</p>
                    <p>¿No te llegó el correo? <Link onClick={sendEmailVerify}>Click para reenviar</Link></p>
                    {successMessage && <p className="message-success">{successMessage} <FontAwesomeIcon icon={faCircleXmark} onClick={() => setSuccessMessage(null)} /></p>}
                    {errorMessage && <p className="message-error">{errorMessage} <FontAwesomeIcon icon={faCircleXmark} onClick={() => setErrorMessage(null)} /></p>}
                    <button
                        disabled={loading}
                        onClick={isVerify}
                        className="btn-next-step"
                    >{loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Continuar'}</button>

                </div> :
                <div className="verify-email">
                    <MailRemove02Icon
                        size={64}
                        color={"#df1212"}
                        variant={"stroke"}
                    />
                    <h1>Ocurrió un error inesperado. No pudimos enviar en correo de verificación</h1>
                    <p>¿No te llegó el correo? <Link onClick={sendEmailVerify}>Click para reenviar</Link></p>
                    <Link to={'/register'} className="btn-back-step">Volver</Link>
                </div> :
            <FontAwesomeIcon icon={faCircleNotch} spin size="2xl" />
    )
}