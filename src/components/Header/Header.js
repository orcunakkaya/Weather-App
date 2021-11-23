import { useContext } from 'react'
import { WeatherContext } from '../../Context/WeatherContext';
import './style.scss'
function Header({ isOnSubmit, setIsOnSubmit }) {

    const { setCity, inputValue, setInputValue } = useContext(WeatherContext)

    const handleOnSubmit = (event) => {
        event.preventDefault()
        if (inputValue !== "") {
            !isOnSubmit && setIsOnSubmit(true)
            setCity(inputValue)
            setInputValue("")
        } else {
            alert("You cannot enter null characters!")
        }
    }
    return (
        <div id="header">
            <h1 className="app-header" >Weather App</h1>
            <form onSubmit={event => handleOnSubmit(event)}>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="City or region name" />
                <button>Search</button>
            </form>
        </div>
    )
}
export default Header;
