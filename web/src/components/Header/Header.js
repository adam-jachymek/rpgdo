import { useQuery } from 'react-query'
import { fetchUser } from '../../api/requests'
import { Link } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';
import { useContext } from 'react';
import { ThemeContext } from "../../ThemeContext";
import "./style.sass"
import classNames from 'classnames';

const Header = ({ userData, refetchUser }) => {

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.clear('userToken')
        refetchUser()
    }

    //const user = userData?.[0]

    const progress = (exp, maxExp) => {
        const result = (100 * exp) / maxExp

        return result
    }

    return (
        <div className="header">
            <div className="header__profile">
                {/* <p>{user.name}</p>
                <p style={{width: "100px"}}>LVL: {user.level}
                    <LinearProgress variant="determinate" value={progress(user.exp, user.maxExp)} />
                </p> */}
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div>

                <ul className="header__nav">
                    <button onClick={() => { setDarkMode(!darkMode) }}>Mode</button>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <li className={classNames("header__nav__item", { "dark": darkMode })}>Tasks</li>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/skills">
                        <li className={classNames("header__nav__item", { "dark": darkMode })}>Skills</li>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/profile">
                        <li className={classNames("header__nav__item", { "dark": darkMode })}>Profile</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header
