import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import { Link } from "react-router"

function Header() {
    // Пример получение данных из контекста, вместо props
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (

        <header className={`header-${theme}`}>
            <h2>Task manager</h2>
            <ul>
                <Link to={'/'}>
                    <ol>Home</ol>
                </Link>
                <Link to={'/products'}>
                    <ol>Products</ol>
                </Link>
                <Link to={'/about'}>
                    <ol>About</ol>
                </Link>
                <Link to={'/tasks'}>
                    <ol>Tasks</ol>
                </Link>
            </ul>
            <div>
                <label>
                    <input
                        type="checkbox" role="switch"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                    />
                    Темная тема
                </label>
                <Link to={'/login'}>
                    <p>Войти / зарегистрироваться</p>
                </Link>
            </div>

        </header>
    )
}

export default Header
