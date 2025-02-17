import { LicenseIcon, LicenseThirdPartyIcon, UserAdd01Icon } from 'hugeicons-react';
import './Shortcuts.css';

export function Shortcuts () {
    return (
        <>
        <h4 className='title'>Atajos</h4>
        <div className='shortcuts'>
                <div>
                    <div className='shortcut-icon'>
                        <UserAdd01Icon
                            size={24}
                            color={"#000"}
                            variant={"stroke"}
                        />
                        </div>
                    <p>Nuevo cliente</p>
                </div>
                <div>
                    <div className='shortcut-icon'>
                       <LicenseThirdPartyIcon
                            size={24}
                            color={"#000"}
                            variant={"stroke"}
                        />
                    </div>
                   <p>Asociar a plan</p>
                </div>
                <div>
                    <div className='shortcut-icon'>
                       <LicenseIcon
                            size={24}
                            color={"#000"}
                            variant={"stroke"}
                        />
                    </div>
                   <p>Crear nuevo plan</p>
                </div>
            </div>
        </>
        
    )
}