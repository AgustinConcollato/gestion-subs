import { Calendar03Icon, Tick01Icon, Link01Icon, Mail01Icon, Task01Icon, UserIcon, Invoice01Icon, Invoice02Icon } from "hugeicons-react";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import '../Auth.css';
import './Register.css';

export function Register() {

    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const { pathname } = useLocation()
    const [stage, setStage] = useState(0)

    function getStage(pathname) {
        if (pathname.includes('verify-email')) return 1
        else if (pathname.includes('business')) return 2
        else if (pathname.includes('connect-account')) return 3
        else if (pathname.includes('plans')) return 4

        return 0
    }

    function redirectToStep(steps) {
        if (steps) {
            switch (steps) {
                case 1:
                    return navigate("/register/verify-email")
                case 2:
                    return navigate("/register/business")
                case 3:
                    return navigate("/register/connect-account")
                case 4:
                    return navigate("/register/plans")
                case 5:
                    return navigate("/dashboard")
                default:
                    return navigate("/dashboard")
            }
        } else if (!steps) {
            navigate("/register")
        }
    }

    useEffect(() => {
        setStage(getStage(pathname))
    }, [pathname])

    useEffect(() => {
        redirectToStep(user?.steps)
    }, [user])

    return (
        <section className="auth">
            <Link to={'/'} className="logo"><img src="/logo.png" alt="logo Gestion Subs" /></Link>
            <div className='info-register'>
                <h1>Crea tu cuenta gratis</h1>
                <div>
                    <ul className="stage-list">
                        <li>
                            <div className="container-icon">
                                {stage > 0 ?
                                    <Tick01Icon
                                        size={22}
                                        color={"#66b819"}
                                        variant={"stroke"}
                                    /> :
                                    <UserIcon
                                        size={22}
                                        color={"#000"}
                                        variant={"stroke"}
                                    />
                                }
                            </div>
                            <div>
                                <h4>Tus datos</h4>
                                <p>Agrega tu nombre, correo electrónico y contraseña</p>
                            </div>
                        </li>
                        <li>
                            <div className="container-icon">
                                {stage > 1 ?
                                    <Tick01Icon
                                        size={22}
                                        color={"#66b819"}
                                        variant={"stroke"}
                                    /> :
                                    <Mail01Icon
                                        size={22}
                                        color={"#000"}
                                        variant={"stroke"}
                                    />
                                }
                            </div>
                            <div>
                                <h4>Verificar correo electrónico</h4>
                                <p>Entra para verificar que eres tu</p>
                            </div>
                        </li>
                        <li>
                            <div className="container-icon">
                                {stage > 2 ?
                                    <Tick01Icon
                                        size={22}
                                        color={"#66b819"}
                                        variant={"stroke"}
                                    /> :
                                    <Task01Icon
                                        size={22}
                                        color={"#000"}
                                        variant={"stroke"}
                                    />
                                }
                            </div>
                            <div>
                                <h4>Datos de tu negocio</h4>
                                <p>Agrega nombre y foto de perfil</p>
                            </div>
                        </li>
                        <li>
                            <div className="container-icon">
                                {stage > 3 ?
                                    <Tick01Icon
                                        size={22}
                                        color={"#66b819"}
                                        variant={"stroke"}
                                    /> :
                                    <Link01Icon
                                        size={22}
                                        color={"#000"}
                                        variant={"stroke"}
                                    />
                                }
                            </div>
                            <div>
                                <h4>Vincular cuenta</h4>
                                <p>Conectar con tu cuenta de Mercado Pago</p>
                            </div>
                        </li>
                        <li>
                            <div className="container-icon">
                                {stage > 4 ?
                                    <Tick01Icon
                                        size={22}
                                        color={"#66b819"}
                                        variant={"stroke"}
                                    /> :
                                    <Invoice02Icon
                                        size={22}
                                        color={"#000"}
                                        variant={"stroke"}
                                    />
                                }
                            </div>
                            <div>
                                <h4>Elegir plan</h4>
                                <p>Selecciona el plan que mejor te convenga</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <Link to={'/login'}>Ingresar a la cuenta</Link>
                {user && <button onClick={logout}>salir</button>}
            </div>
            <div className="container-form container-form-register">
                <Outlet />
                <div className="progress">
                    {new Array(0, 1, 2, 3, 4).map((e) => <div key={e} className={e == stage ? 'current-stage' : ''}></div>)}
                </div>
            </div>
        </section >
    )
}