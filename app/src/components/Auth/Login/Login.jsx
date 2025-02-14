import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ViewIcon, ViewOffSlashIcon } from 'hugeicons-react';
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import '../Auth.css';

export function Login() {

    const { login, user } = useContext(AuthContext)

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [seePassword, setSeePassword] = useState(false);

    function submitLoginForm(e) {
        e.preventDefault()

        setLoading(true)
        const data = new FormData(e.target)

        login(data)
            .then(e => {
                setMessage(e.message)
                setLoading(false)
            })
            .catch(error => {
                if (error.errors) {
                    if (error.errors.email && error.errors.password) {
                        setErrorMessage('Completa los campos con el correo electrónico y contraseña');
                    } else if (error.errors.password) {
                        setErrorMessage('Completa con la contraseña');
                    } else if (error.errors.email) {
                        setErrorMessage('Completa con el correo electrónico');
                    } else if (error.errors.invalid) {
                        setErrorMessage(error.errors.invalid);
                    }
                } else {
                    setErrorMessage("Ocurrió un error al iniciar sesión.");
                }

                setLoading(false)
            })

    }

    function onHandleInput() {
        setMessage(null)
        setErrorMessage(null)
    }

    return (
        <section className="auth">
            <Link to={'/'} className='logo'><img src="logo.png" alt="logo Gestion Subs" /></Link>
            <div className="container-form container-form-login">
                <h1>Ingresar</h1>
                <form onSubmit={submitLoginForm}>
                    <div>
                        <input
                            type="email"
                            onChange={onHandleInput}
                            name="email"
                            placeholder="Correo electrónico"
                            autoComplete='off'
                        />
                    </div>
                    <div>
                        <input
                            type={seePassword ? "text" : "password"}
                            onChange={onHandleInput}
                            name="password"
                            placeholder="Contraseña"
                            autoComplete='off'
                        />
                        <button type="button" onClick={() => setSeePassword(!seePassword)}>
                            {!seePassword ?
                                <ViewIcon
                                    size={18}
                                    color={"#000"}
                                    variant={"stroke"}
                                /> :
                                <ViewOffSlashIcon
                                    size={18}
                                    color={"#000"}
                                    variant={"stroke"}
                                />}
                        </button>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Ingresar'}</button>
                    {errorMessage && <p className="message-error">{errorMessage} <FontAwesomeIcon icon={faCircleXmark} onClick={() => setErrorMessage(null)} /></p>}
                </form>
                <p>No tenés cuenta, crea una <Link to={'/register'} >Registrarse</Link></p>
            </div>
        </section>
    )
}