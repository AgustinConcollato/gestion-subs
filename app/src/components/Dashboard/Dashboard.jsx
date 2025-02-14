import { Calendar03Icon, UserMultiple02Icon } from 'hugeicons-react';
import './Dashboard.css';

export function Dashboard() {
    return (
        <div className=''>
            <div>
                <div>
                    <div>
                        <UserMultiple02Icon
                            size={20}
                            color={"#000"}
                            variant={"stroke"}
                        />
                        <p>Clientes activos</p>
                    </div>
                    <div>
                        <p>54</p>
                    </div>
                </div>
                <div>
                    <div>
                        <Calendar03Icon
                            size={20}
                            color={"#000"}
                            variant={"stroke"}
                        />
                        <p>Servicios</p>
                    </div>
                    <div>
                        <p>54</p>
                    </div>
                </div>
            </div>
        </div>
    )
}