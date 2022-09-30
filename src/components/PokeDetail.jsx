import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';
import { userName } from '../store/slices/userName.slice';
import { useSelector } from "react-redux";
import { LiveSearch } from "./LiveSearch";
import colors from '../colors.json';

export const PokeDetail = () => {

    const { pokeName } = useParams();

    const [pokemon, setPokemon] = useState({});

    const userName = useSelector(state => state.userName);

    const [color, setColor] = useState("");

    const [gradient, setGradient] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}/`;

        axios.get(url)
        .then(resp => {
            setPokemon(resp.data);
            setColor(colors[resp.data.types[0].type.name].color);
            setGradient(colors[resp.data.types[0].type.name].gradient);
        })

    }, [pokeName]);

    const calculateWidth = (base_stat, max) => {

        return base_stat ? `${(Number(base_stat)/max)*100}%` : 0;

    }

    return(

        <>
            <main id="home" >
                <header class="center">
                    <div>
                        <img src="logo.webp" id="logo" onClick={() => navigate('/pokemons/')}/>
                        <LiveSearch/>
                    </div>
                </header>
                <article id="pokemon">
                    <section id="image">
                        <div id="elips" style={{backgroundImage: gradient}}>
                        </div>
                        <div id="image-container">
                            <h1>{pokemon.name?.replace('-', ' ')}</h1>
                            <img src={pokemon.sprites?.other['official-artwork'].front_default}/>
                            <div id="info">
                                <div>
                                    <div><b>{pokemon.weight}</b></div>
                                    <div className="field"><span>Weight</span></div>
                                </div>
                                <div id="middle">
                                    <div><b>{pokemon.height}</b></div>
                                    <div className="field"><span>Height</span></div>
                                </div>
                                <div>
                                    <div><b>{pokemon.id}</b></div>
                                    <div className="field"><span>Number</span></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="stats">
                        <div class="data-stats">
                            <h2>Stats</h2>
                            <div id="stat">
                                <div className="stat-field"><b>Hp</b><b>{pokemon.stats?.[0].base_stat}/150</b></div>
                                <div className="progress-container">
                                    <div className="progress" style={{width: calculateWidth(pokemon.stats?.[0].base_stat, 150)}}></div>
                                </div>
                            </div>
                            <div id="stat">
                                <div className="stat-field"><b>Attack</b><b>{pokemon.stats?.[1].base_stat}/150</b></div>
                                <div className="progress-container">
                                    <div className="progress" style={{width: calculateWidth(pokemon.stats?.[1].base_stat, 150)}}></div>
                                </div>
                            </div>
                            <div id="stat">
                                <div className="stat-field"><b>Defense</b><b>{pokemon.stats?.[2].base_stat}/150</b></div>
                                <div className="progress-container">
                                    <div className="progress" style={{width: calculateWidth(pokemon.stats?.[2].base_stat, 150)}}></div>
                                </div>
                            </div>
                            <div id="stat">
                                <div className="stat-field"><b>Speed</b><b>{pokemon.stats?.[5].base_stat}/150</b></div>
                                <div className="progress-container">
                                    <div className="progress" style={{width: calculateWidth(pokemon.stats?.[5].base_stat, 150)}}></div>
                                </div>
                            </div>
                        </div>
                        <div className="data-stats">
                            <h2>Abilities</h2>
                            <div class="abilities">
                            {
                                pokemon.abilities?.map(ability => (

                                    <span key={ability.ability.name} className='ability'>
                                        {ability.ability.name.replace('-', ' ')}
                                    </span>

                                ))
                            }
                            </div>
                        </div>
                        <div className="data-stats">
                            <h2>Type</h2>
                            <div class="abilities">
                                {
                                    pokemon.types?.map(type => (
                                        <span key={type.type.name} className='ability' style={{background: colors[type.type.name].color}}>{type.type.name}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                    <section className="stats">
                        <div className="data-stats">
                            <h2>Moves</h2>
                            <div class="moves">
                            {
                                pokemon.moves?.map(moves => (

                                    <span key={moves.move.name} className='move'>
                                        {moves.move.name.replace('-', ' ')}
                                    </span>

                                ))
                            }
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </>
    )

}