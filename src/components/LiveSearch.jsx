import {useEffect, useState} from "react";
import axios from "axios";
import useOnclickOutside from "react-cool-onclickoutside";
import { Types } from "./Types";
import { useNavigate } from "react-router-dom";

export const LiveSearch = () => {

    const [inputText, setInputText] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [results, setResults] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const [isTabSearch, setIsTabSearch] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1200')
        .then(resp => setPokemons(resp.data.results))

    }, []);

    const ref = useOnclickOutside(() => {
        setIsOpened(false);
    });

    const search = text => {

        setInputText(text);

        const results = pokemons?.filter(pokemon => pokemon.name.includes(text.toLowerCase()));

        setIsOpened(false);

        if(results){

            setIsOpened(true);
            setResults(results.slice(0, 6));

        }

    }

    const getId = url => url.split('/').at(-2);

    const parseName = name => name?.replace('-', ' ');

    return(
        <>
        <div id="live-search">
            <fieldset>
                <legend>
                    <button onClick={() => setIsTabSearch(false)} style={{opacity: !isTabSearch ? '1' : '0.8'}}>Type</button>
                    <button onClick={() => setIsTabSearch(true)} style={{opacity: isTabSearch ? '1' : '0.8'}}>Pokemon</button>
                </legend>
                {isTabSearch ? (
                    <>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="search" autocomplete="off" value={inputText} name="Buscar" onChange={e => search(e.target.value)} placeholder="Search pokemon"/>
                    </>
                    ) 
                    : 
                    (
                        <Types/>
                    )
                }
            </fieldset>
            {isOpened && (
                <ul id="results" ref={ref}>
                    {results.map(pokemon => (

                        <li key={pokemon.url} onClick={() => navigate(`/pokemon/${pokemon.name}/`)}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getId(pokemon.url)}.png`}/>
                            <span>{parseName(pokemon.name)}</span>
                        </li>

                    ))}
                </ul>
                )
            }
        </div>
        </>
    )

}