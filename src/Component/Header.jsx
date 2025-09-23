
import { NavLink } from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import { toggleTheme } from "../Redux/ThemeSlice";
import { useEffect } from "react";

export default function Header() {
    const mode = useSelector(s=>s.theme.mode)
    const dispatch= useDispatch()
 
  useEffect(() => {
    document.body.classList.toggle("dark-mode", mode === "dark");
  }, [mode]);

    return (
        <header className="header">
            <div className="nav">
                <NavLink className="navLink" to="/">Home</NavLink>
                <NavLink className="navLink" to="/favorites">Favorites</NavLink>
            </div>
            <button onClick={()=>dispatch(toggleTheme())} className="modeButton">
                {mode==='light'? 'Dark Mode': 'Light Mode'}
            </button>

        </header>
       
    );
}
