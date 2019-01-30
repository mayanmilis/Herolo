const initialState = {  
    movies:[]
} 

const rootReducer = (state = initialState, action) =>{    
    switch(action.type){    
        case 'ADD_MOVIE':
        return{ 
            ...state,
            movies: action.list
        }
        case 'ADD_MOVIE_ERROR':
        console.log('add_movie_error', action.err)
        return state;
        case 'REMOVE_MOVIE':
        return{ 
            ...state,
            movies: action.list
        }
        case 'REMOVE_MOVIE_ERROR':
        console.log('remove_movie_error', action.err)
        return state;
        default:
        return state;
    }
}

export default rootReducer