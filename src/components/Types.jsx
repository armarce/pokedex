import {useEffect, useState} from "react";
import axios from "axios";

export const Types = () => {

    const [types, setTypes] = useState([]);

    useEffect(() => {

        axios.get('https://pokeapi.co/api/v2/type/')
        .then(resp => setTypes(resp.data.results))

    }, []);

    return(
        <select>
            <option value="">Select a Pokemon type</option> 
            {types.map(type => (

               <option key={type.name} value={type.name}>{type.name}</option>                 

            ))}
        </select>
    )

}

