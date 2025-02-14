import { useState } from "react"
import './Header.css'

export function Header() {

    const [selectValue, setSelectValue] = useState('DNI')

    function search(e) {
        e.preventDefault()

    }

    return (
        <header>
            <form onSubmit={search}>
                <input type="text" name={selectValue} />
                <select onChange={(e) => setSelectValue(e.target.value)}>
                    <option value="DNI">DNI</option>
                    <option value="name">Nombre</option>
                </select>
                <button type="submit"></button>
            </form>
        </header>
    )
}