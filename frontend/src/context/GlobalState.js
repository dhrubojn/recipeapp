import React, { createContext, useReducer, useState, useEffect } from 'react';

import AppReducer from './AppReducer'


export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer);
    
    
    useEffect(() => {
        fetch('/api/recipes').then(res => res.json()).then(data => {
            data.recipies = state
        });
    }, []);
    console.log(state)
    function removeRecipe(id) {
        dispatch({
            type: 'REMOVE_RECIPE',
            payload: id
        });
    };

    function addRecipe(recipies) {
        dispatch({
            type: 'ADD_RECIPE',
            payload: recipies
        });
    };

    function editRecipe(recipies) {
        dispatch({
            type: 'EDIT_RECIPE',
            payload: recipies
        });
    };

    return (<GlobalContext.Provider value={{
        recipies: state.recipies,
        removeRecipe,
        addRecipe,
        editRecipe
    }}>
        {children}
    </GlobalContext.Provider>);
}