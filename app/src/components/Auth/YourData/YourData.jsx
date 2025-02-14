import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { useNavigate } from "react-router"

export function YourData() {
    const passwordRules = [
        { rule: 'Debe contener al menos 8 caracteres', check: value => value.length >= 8 },
        { rule: 'Debe contener al menos una letra mayúscula', check: value => /[A-Z]/.test(value) },
        { rule: 'Debe contener al menos un número', check: value => /\d/.test(value) },
        { rule: 'Debe contener al menos un carácter especial', check: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) },
    ];

    const { register } = useContext(AuthContext)
    const navigate = useNavigate()

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [passwordRulesVisibility, setPasswordRulesVisibility] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [rulesStatus, setRulesStatus] = useState(passwordRules.map(() => false));

    async function submitFormRegister(e) {
        e.preventDefault()
        setLoading(true)

        const data = new FormData(e.target)

        try {
            const { user } = await register(data)

            setLoading(false)
            if (user) {
                navigate('/register/verify-email')
            }
            
        } catch (error) {

            setLoading(false)
            setPasswordRulesVisibility(false)

            const { email, name, password } = error.errors

            const typeErrors = {
                email: [
                    'The email has already been taken.',
                    'The email field is required.'
                ],
                password: [
                    'The password field confirmation does not match.',
                    'The password field must contain at least one symbol.',
                    'The password field must contain at least one number.',
                    'The password field must contain at least one uppercase and one lowercase letter.',
                    'The password field must be at least 8 characters.',
                    'The password field is required.'
                ],
                name: [
                    'The name field is required.'
                ]
            }


            if (name && typeErrors.name[0] == name[0]) {
                return setErrorMessage('Completa con tu nombre')
            }


            if (email) {
                if (typeErrors.email[0] == email[0]) {
                    return setErrorMessage('El correo electrónico ya esta usado')
                }

                if (typeErrors.email[1] == email[0]) {
                    return setErrorMessage('Completa con tu correo electrónico')
                }
            }

            if (password) {
                console.log(password)
                if (typeErrors.password[5] == password[0]) {
                    return setErrorMessage('Completa la contraseña')
                }

                if (typeErrors.password[0] == password[0]) {
                    return setErrorMessage('Las contraseñas son distintas')
                }

                if (typeErrors.password[3] == password[0]) {
                    return setErrorMessage('La contraseña debe contener al menos una letra mayúscula')
                }

                if (typeErrors.password[2] == password[0]) {
                    return setErrorMessage('Las contraseñas debe contener al menos un número')

                }

                if (typeErrors.password[1] == password[0]) {
                    return setErrorMessage('Debe contener al menos un carácter especial')
                }

                if (typeErrors.password[4] == password[0]) {
                    return setErrorMessage('Debe contener al menos 8 caracteres')
                }
            }
        }
    }

    function changePassword(e) {

        changeInput()
        setPasswordRulesVisibility(true)

        const newRulesStatus = passwordRules.map(rule => rule.check(e.target.value));
        setRulesStatus(newRulesStatus)
    }
    function changeInput() {
        setErrorMessage(null)
    }

    return (
        <>
            <h1>Tus datos</h1>
            <form onSubmit={submitFormRegister}>
                <div>
                    <input
                        autoComplete="off"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        onChange={changeInput}
                    />
                </div>
                <div>
                    <input
                        autoComplete="off"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        onChange={changeInput}
                    />
                </div>
                <div>
                    <input
                        autoComplete="off"
                        type={passwordVisibility ? "text" : "password"}
                        placeholder="Contraseña"
                        name="password"
                        onChange={changePassword}
                        onFocus={() => setPasswordRulesVisibility(true)}
                        onBlur={() => setPasswordRulesVisibility(false)}
                    />
                </div>
                <div>
                    <input
                        autoComplete="off"
                        type={passwordVisibility ? "text" : "password"}
                        name="password_confirmation"
                        placeholder="Confirmar contraseña"
                        onChange={changeInput}
                    />
                    <button type="button" onClick={() => setPasswordVisibility(!passwordVisibility)}>
                        {!passwordVisibility ?
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
                <button type="submit" disabled={loading}>{loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Continuar'}</button>
                <div className="password-rules">
                    {passwordRulesVisibility && passwordRules.map((rule, index) =>
                        <p key={index} style={rulesStatus[index] ? { color: '#66b819' } : {}}>{rule.rule}</p>
                    )}
                </div>
                {errorMessage && <p className="message-error">{errorMessage} <FontAwesomeIcon icon={faCircleXmark} onClick={() => setErrorMessage(null)} /></p>}
            </form>
        </>
    )
}