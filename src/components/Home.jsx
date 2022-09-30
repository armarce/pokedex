import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { change }  from '../store/slices/userName.slice';
import { changeTypeName }  from '../store/slices/typeName.slice';

export const Home = () => {

    const [inputName, setInputName] = useState('');

    const navigate = useNavigate();

    const userName = useSelector(state => state.userName);

    const dispatch = useDispatch();

    const changeName = e => {

        e.preventDefault();

        dispatch(change(inputName));

        dispatch(changeTypeName(''));
        
        navigate('/pokemons/');

    }

    return (
        
        <main id="login">
            <form onSubmit={ e => changeName(e) }>
                <img src="logo.webp" id="logo"/>
                <h1>¡Hello trainer!</h1>
                <h2>To start you have to give me your name</h2>
                <fieldset>
                    <input type="text" name="name" autoComplete="off" placeholder="Master" value={inputName} onChange={ e => setInputName(e.target.value)}/>
                    <button id="start">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </fieldset>
            </form>
            <img src="pngwing.png" id="ash"/>
        </main>

    )

}