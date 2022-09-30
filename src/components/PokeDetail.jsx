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

    useEffect(() => {

        const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}/`;

        axios.get(url)
        .then(resp => {
            setPokemon(resp.data);
            setColor(colors[resp.data.types[0].type.name].color);
            setGradient(colors[resp.data.types[0].type.name].gradient);
        })

    }, []);

    console.log(gradient);

    return(

        <>
            <main id="home">
                <header class="center">
                    <div>
                        <img src="logo.webp" id="logo"/>
                        <LiveSearch/>
                    </div>
                </header>
                <article id="pokemon" style={{backgroundImage: gradient}}>
                    <section id="image">
                        <img src={pokemon.sprites?.other['official-artwork'].front_default}/>
                        <h1>{pokemon.name}</h1>
                    </section>
                    <section id="stats">
                        <h2>Stats</h2>
                        <div id="hp"></div>
                        <div id="attack"></div>
                        <div id="defense"></div>
                        <div id="speed"></div>
                    </section>
                </article>
            </main>
        </>
    )

}