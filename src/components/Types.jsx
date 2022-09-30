import {useEffect, useState} from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { changeTypeName } from '../store/slices/typeName.slice';

export const Types = () => {

    const [types, setTypes] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {

        axios.get('https://pokeapi.co/api/v2/type/')
        .then(resp => setTypes(resp.data.results))

    }, []);

    const setTypeName = (name) => {

        if(name){ 
            
            dispatch(changeTypeName(name));

        }else{

            dispatch(changeTypeName(''));

        }

    }

    return(
        <select onChange={e => setTypeName(e.target.value)}>
            <option value="">Select a Pokemon type</option> 
            {types.map(type => (

               <option key={type.name} value={type.name}>{type.name}</option>                 

            ))}
        </select>
    )

}

