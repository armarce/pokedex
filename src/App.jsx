import { useState } from 'react';
import { Pokemons } from './components/Pokemons';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { PokeDetail } from './components/PokeDetail';
import { useSelector } from 'react-redux';
import './App.css';
import { Config } from './components/Config';

export const App = () => {

  const userName = useSelector(state => state.userName);

  if(localStorage.getItem('theme') === null){

    localStorage.setItem('theme', 'light');

  }
  
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route element={<ProtectedRoutes userName={userName}/>}>
            <Route path='/pokemons/' element={<Pokemons/>}/>
            <Route path='/pokemon/:pokeName' element={<PokeDetail/>}/>
            <Route path='/config/' element={<Config/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}