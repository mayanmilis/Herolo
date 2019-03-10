
export const addMovie = (list) =>{ 
    return(dispatch) =>{  
            try{    
                dispatch({type: 'ADD_MOVIE', list})
            }catch(err){
                dispatch({ type: 'ADD_MOVIE_ERROR', err})
            }
        
    }
};

export const removeMovie = (list) =>{ 
    return(dispatch) =>{
            try{    
                dispatch({ type: 'REMOVE_MOVIE', list})
            }
            catch(err){
                dispatch({ type: 'REMOVE_MOVIE_ERROR', err})
            }
        
    
    }
};
