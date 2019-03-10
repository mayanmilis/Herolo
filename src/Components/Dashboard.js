import React, { Component } from 'react'
import Movie from './Movie'
import './Dashboard.css'
import axios from 'axios'
import { connect } from 'react-redux'
import AddMovie from './AddMovieModal'
import {addMovie} from '../Store/Actions'
import {removeMovie} from '../Store/Actions'

class Dashboard extends Component{   
    state = {   
        addMovieDisplay: false
        
    }

    componentDidMount(){ 
        this.fetchAllMoviesData();
    }

    async fetchAllMoviesData () {
        let list = [];
        let initialMoviesDetails=[]
        try {
            const movies = await axios.get(`https://www.omdbapi.com/?apikey=1d80d066&s=turtle`);
            initialMoviesDetails = movies.data.Search;
        } catch (err) {
            this.setState({isLoaded: false});
        }
        for(let i = 0; i < initialMoviesDetails.length; i++) {
            try{
                const movieDetails = await axios.get(`https://www.omdbapi.com/?apikey=1d80d066&i=${initialMoviesDetails[i].imdbID}`)
                list.push(movieDetails.data);
            } catch (err) {
                console.log(initialMoviesDetails[i].Title,'has failed')
            }

        }
        this.setState({
            list: list, 
            isLoaded: true});
        this.props.addMovie(list)
    }

    onChangeHandler = (event) => {  
        this.setState({ 
            [event.target.id]: event.target.value
        })
    }

    addMovieHandler= () =>{  
            let list = this.props.movies
            this.setState({ 
                list: list
            })
    }

    removeHandler = (key) => { 
        let list = this.props.movies.filter((movie) => {   
            return key !== movie.imdbID
        })
    this.props.removeMovie(list)
    }

    addMovieDisplay = ()=>{ 
        let addMovieDisplay = this.state.addMovieDisplay
        this.setState({
            addMovieDisplay: !addMovieDisplay
        })
    }

    render(){   
        console.log(this.state)
        let {isLoaded} = this.state;
        const movies = this.props.movies;
        if(!isLoaded){    
            return( 
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                
            )
        }else{ 

        return( 
            <div className='Container'>            
            <div className='MainTitle'>   
                Herolo-Cinema
            </div>
            <div className='SubTitle'>   
                Try, Stay.
            </div>
            <div className='AddNewMovieButton'>   
                <button onClick={this.addMovieDisplay}>Add New Movie</button>
            </div>
            <div className='AddMovieModal'>  
            <AddMovie
            onClick={this.addMovieHandler}
            addMovieDisplay={this.state.addMovieDisplay}
            /> 
                </div> 
            <div className='MoviesContainer'>   
                <ul>    
                    {movies&&movies.map((movie) =>{  
                        return (    
                            <li key={movie.imdbID}>
                                <Movie  
                                Title={movie.Title}
                                Genre={movie.Genre}
                                Runtime={movie.Runtime}
                                Director={movie.Director}
                                Poster={movie.Poster}
                                Year={movie.Year}
                                remove={this.removeHandler}
                                id={movie.imdbID}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            </div>
        )
            }
    }
}

const mapStateToProps = (state) =>{ 
    return{ 
        movies: state.movies
    }
}

const mapDispatchToProps = (dispatch) =>{   
    return{ 
        addMovie: (list) => dispatch(addMovie(list)),
        removeMovie: (list) => dispatch(removeMovie(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)