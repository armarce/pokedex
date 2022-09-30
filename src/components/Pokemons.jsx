import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Pokemon } from './Pokemon';
import { userName } from '../store/slices/userName.slice';
import { useSelector } from 'react-redux';
import { LiveSearch } from './LiveSearch';

export const Pokemons = () => {

    const [pokemons, setPokemons] = useState([]);

    const [total, setTotal] = useState(0);

    const [limit, setLimit] = useState(10);  // Se puede guardar en el store con redux para accederlo de forma global

    const [offset, setOffset] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    const maxPages = 8;

    const className = 'current-page';

    const userName = useSelector(state => state.userName);

    useEffect(() => {
  
        const apiURL = 'https://pokeapi.co/api/v2/pokemon/';

        axios({method: 'get', 
            url: apiURL, 
            params: {offset, limit}
            })
            .then(resp => {
                
                setPokemons(resp.data.results);
                setTotal(resp.data.count);
            
            })
            .finally(() => setIsLoading(false))
    
    }, [currentPage]);

    const getPage = (page) => {

        setCurrentPage(page);

        page === 1 ? setOffset(0) : setOffset((page - 1) * limit);

    }
    
    const pagination = (total, limit, currentPage, getPage) => {

        let pages = 0;

        if(total){
        
            pages = Math.floor(total / limit);

            if(pages < pages * limit) pages++;

        }

        let jsx = [];

        if(pages <= 8){

            for(let page = 1; page <= pages; page++){

                jsx.push(<li key={page} onClick={() => getPage(page)}>{page}</li>);

            }

        }else{

            if(currentPage > 2){

                jsx.push(<li key="back" onClick={() => getPage(currentPage - 1)}><i className="fa-solid fa-caret-left"></i></li>);

            }

            if(currentPage > 3){

                if(currentPage <= (pages - 3)){

                    jsx.push(

                        <Fragment key="center">
                            <li key="1" onClick={() => getPage(1)}>1</li>
                            <li key='n'>...</li>
                            <li key={currentPage - 1} onClick={() => getPage(currentPage - 1)}>{currentPage - 1}</li>
                            <li key="current" className={className}>{currentPage}</li>
                            <li key={currentPage + 1} onClick={() => getPage(currentPage + 1)}>{currentPage + 1}</li>
                            <li key='m'>...</li>
                            <li key={pages} onClick={() => getPage(pages)}>{pages}</li>
                        </Fragment>
                    )
                
                }else{

                    jsx.push(
                        
                        <Fragment key="end">

                            <li key={1} onClick={() => getPage(1)}>1</li>
                            <li key='n'>...</li>
                            <li key={pages - 2} className={currentPage === (pages - 2)  ? className : ''} onClick={() => getPage(pages - 2)}>
                                {pages - 2}
                            </li>
                            <li key={pages - 1} className={currentPage === (pages - 1)  ? className : ''} onClick={() => getPage(pages - 1)}>
                                {pages - 1}
                            </li>
                            <li key={pages} className={currentPage === pages  ? className : ''} onClick={() => getPage(pages)}>
                                {pages}
                            </li>

                        </Fragment>

                    )

                }

            }else{

                jsx.push(
                        
                    <Fragment key="start">

                        <li className={currentPage === 1 ? className : ''} onClick={() => getPage(1)}>1</li>
                        <li className={currentPage === 2 ? className : ''} onClick={() => getPage(2)}>2</li>
                        <li className={currentPage === 3 ? className : ''} onClick={() => getPage(3)}>3</li>

                    </Fragment>
                )            
                
            }

            if(currentPage < (pages - 1)){

                jsx.push(<li key="next" onClick={() => getPage(currentPage + 1)}><i className="fa-solid fa-caret-right"></i></li>);

            }

        }

        return jsx;

    }

    /* En la líne 150 reemplazar por el componente <Pokemon url={pokemon.url}/>*/

    return(

        <>  { isLoading ? (
            <main id="loader" className="slide-right">
                <img src="pokeball.png" id="ball-pokemon" className="bounce"/>
                <img src="pikachu-running.gif" id="pikachu"/>
            </main>
            ) 
            : 
            (
                <>
                    <main id="home">
                        <header>
                            <div>
                                <img src="logo.webp" id="logo"/>
                                <LiveSearch/>
                            </div>
                            <div id="banner">
                                <div id="rocket">
                                </div>
                                <p>
                                    Welcome <b>{userName}</b> <br/>¿Are you ready? <br/>
                                    <i>¡Get him now!</i>
                                </p>
                            </div>
                        </header>
                        <ul id="pokemons">
                        {
                            pokemons.map(pokemon => (

                                <Pokemon key={pokemon.url} url={pokemon.url}/>

                            ))
                        }
                        
                        </ul>
                        <ul className="pagination">
                            {pagination(total, limit, currentPage, getPage)}
                        </ul>
                    </main>
                </>
                
            )
            }
        </>

    )

}