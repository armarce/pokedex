import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../colors.json';

export const Pokemon = ({url}) => {

    const [pokemon, setPokemon] = useState({});

    const [color, setColor] = useState("");

    const [gradient, setGradient] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        axios.get(url)
        .then(resp => {
            setPokemon(resp.data);
            setColor(colors[resp.data.types[0].type.name].color);
            setGradient(colors[resp.data.types[0].type.name].gradient);
        });

    }, []);

    const goPokemon = (name) => {

        const path = `/pokemon/${name}/`;

        navigate(path);
        
    }
    
    return(

        <>
        <li onClick={() => goPokemon(pokemon.name)}>
            <article>
                <header style={{backgroundImage: gradient}}>
                </header>
                <section>
                    <h3> {pokemon.name}</h3>
                    <img src={pokemon.sprites?.other['official-artwork'].front_default} loading="lazy"/>
                    <p className="types">
                        {
                            pokemon.types?.map(type => (
                                <span key={type.type.name} style={{background: color}}>{type.type.name}</span>
                            ))
                        }
                    </p>
                    <div className="stats">
                        <div>
                            <div><b>{pokemon.stats?.[0].base_stat}</b></div>
                            <div className="field">HP</div>
                        </div>
                        <div className='middle'>
                            <div><b>{pokemon.stats?.[1].base_stat}</b></div>
                            <div className="field">Attack</div>
                        </div>
                        <div>
                            <div><b>{pokemon.stats?.[2].base_stat}</b></div>
                            <div className="field">Defense</div>
                        </div>
                    </div>
                </section>
            </article>
        </li>
        </>
    )

}