import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeItems } from "../store/slices/items.slice";
import { useEffect, useState } from "react";

export const Config = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(localStorage.getItem('theme') == 'light' ? '' : 'checked')
    const items = useSelector(state => state.items);

    useEffect(() => {

        document.documentElement.setAttribute("data-theme", localStorage.getItem('theme'));
        console.log('cambiado');

    }, [checked])

    const changeTheme = (checked) => {

        if(checked){

            localStorage.setItem('theme', 'dark');

        }else{

            localStorage.setItem('theme', 'light');

            //document.documentElement.setAttribute("data-theme", 'light');

        }

        setChecked(localStorage.getItem('theme') == 'light' ? '' : 'checked');

    }

    return(
        <> 
            <div id="modal">
                <div id="modal-container">
                    <div id="close" onClick={()=> navigate('/pokemons/')}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <h1>Settings</h1>
                    <section id="theme">
                        <h2>Theme</h2>
                        <span>Light <i className="fa-regular fa-sun"></i></span>
                        <label className="switch">
                            <input type="checkbox" 
                            name="theme_switch" onChange={(e) => changeTheme(e.target.checked)}
                            defaultChecked={checked}
                            />
                            <span className="slider"></span>
                        </label>
                        <span><i className="fa-regular fa-moon"></i> Dark</span>
                    </section>
                    <section id="items">
                        <h2>Pokemons per page</h2>
                        <select onChange={e => dispatch(changeItems(Number(e.target.value)))}>
                            <option value="" selected disabled hidden>{items}</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="20">20</option>
                        </select>
                    </section>
                </div>
            </div>
        </>
    )

}