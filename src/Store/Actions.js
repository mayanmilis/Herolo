
export const addMovie = (list) =>{ 
    return(dispatch, gesState) =>{  
        dispatch({ type: 'ADD_MOVIE', list: list})
        .catch((err) =>{
            dispatch({ type: 'ADD_MOVIE_ERROR', err})
        })
    }
};

export const removeMovie = (list) =>{ 
    return(dispatch, gesState) =>{  
        dispatch({ type: 'REMOVE_MOVIE', list: list})
        .catch((err) =>{
            dispatch({ type: 'REMOVE_MOVIE_ERROR', err})
        })
    }
};
