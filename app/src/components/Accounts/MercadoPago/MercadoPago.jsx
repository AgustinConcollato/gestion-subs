import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { IconMercadoPago } from '../../../assets/icons';
import { AuthContext } from '../../../context/AuthContext';
import './MercadoPago.css';

export function MercadoPago() {

    const { nextStep, user } = useContext(AuthContext)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    function openWindows() {
        const url = 'https://auth.mercadopago.com.ar/authorization?client_id=892061100599901&response_type=code&platform_id=mp&redirect_uri=http://localhost:8000'
        window.open(url, 'popup', 'width=600,height=600,scrollbars=no,resizable=no');
    }

    async function next() {
        setLoading(true)
        try {
            const response = await nextStep(4)

            if (response.steps == 4) {
                return navigate('/register/plans')
            }

            setLoading(false)
            console.log(response)

        } catch (error) {
            alert(error.message)
            setLoading(false)
        }
    }

    console.log(user)

    return (
        <div className="mercado-pago">
            <IconMercadoPago />
            <h1>Conecta tu cuenta de Mercado Pago</h1>
            <p>Al vincular tu cuenta de Mercado Pago con nuestra plataforma, vas a poder gestionar los pagos de tus clientes de manera automática, sin preocupaciones y con total seguridad.</p>
            <div>
                <h3>Automatización de cobros y suscripciones</h3>
                <p>Con Mercado Pago, los pagos se debitan automáticamente cada mes sin que tengas que hacer nada. ¡Cobrás a tiempo y sin complicaciones!</p>

                <h3>Más opciones de pago para tus clientes</h3>
                <p>Permitiles pagar como prefieran: tarjeta de crédito, débito, saldo en cuenta y más.</p>

                <h3>Sincronización en segundos</h3>
                <p>Si ya creaste servicios en nuestra plataforma y luego vinculás Mercado Pago, sincronizamos automáticamente los planes para que no tengas que configurarlos dos veces.</p>

                <h3>Control y seguimiento desde un solo lugar</h3>
                <p>Visualizá todos los pagos y suscripciones desde nuestra plataforma, con acceso a reportes detallados y estado de cada transacción en tiempo real.</p>

                <h3>Seguridad garantizada</h3>
                <p>Mercado Pago protege cada transacción con su sistema antifraude, brindando confianza tanto para vos como para tus clientes.</p>

                <h3>Pagos recibidos</h3>
                <p>Los pagos recibidos se acreditan en tu cuenta de Mercado Pago y podrás utilizarlos cuando quieras.</p>
            </div>
            <div className='btn-container'>
                {user.steps < 5 &&
                    <button
                        className='btn-back-step'
                        onClick={next}
                        disabled={loading}
                    >
                        {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Más tarde'}
                    </button>
                }
                <button className='btn-next-step' onClick={openWindows}>Vincular</button>
            </div>
        </div>
    )
}