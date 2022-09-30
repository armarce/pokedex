import {useEffect, useState} from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { changeTypeName } from '../store/slices/typeName.slice';
import { useNavigate } from "react-router-dom";

export const Types = () => {

    const [types, setTypes] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        axios.get('https://pokeapi.co/api/v2/type/')
        .then(resp => setTypes(resp.data.results.filter(item => item.name !== 'unknown' & item.name !== 'shadow')))

    }, []);

    const setTypeName = (name) => {
        
        if(name){ 
            
            dispatch(changeTypeName(name));

        }else{

            dispatch(changeTypeName(''));

        }

        navigate('/pokemons/');

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

