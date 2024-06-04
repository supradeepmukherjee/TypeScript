import { useContext } from "react"
import { ThemeContext } from "../App"

const ContextBox = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <div
            className="contextBoxContainer"
            style={{
                backgroundColor: theme === 'light' ? 'white' : 'black',
                color: theme !== 'light' ? 'white' : 'black'
            }}>
            <h1>
                Box 1
            </h1>
            <button onClick={toggleTheme}>
                Change Theme
            </button>
        </div>
    )
}

export default ContextBox