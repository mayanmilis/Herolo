import React, { Component } from 'react'
import './Dashboard.css'
import { connect } from 'react-redux'


class AddMovie extends Component{   
    state = {   
        Title:'',
        Year:'',
        Genre: '',
        Runtime: '',
        Director: '',
        Poster: '',
        imdbID: 0,
        list: [],
        TitleError: false,
        RuntimeError: false,
        YearError: false,
        MovieError: false
        
    }

    onChangeHandler = (event) => {  
        this.setState({ 
            [event.target.id]: event.target.value
        })
    }

    addMovieHandler= () =>{  
        function strOrganize(str){ 
            str= str.split(' ')
            for(let i=0; i<str.length; i++){  
                if(isNaN(str[i])){   
                    str[i] = str[i][0].toUpperCase() + str[i].slice(1).toLowerCase()
                }
            }
            return str.join(' ')
        }

            let Title = this.state.Title
            Title = Title.replace(/[!@#$%^&*-><=,)(}{.'`~;_+|\\]/g, "");
            let Year = this.state.Year
            let Genre = this.state.Genre
            let Runtime= this.state.Runtime 
            let Director = this.state.Director
            let Poster= this.state.Poster
            let YearErr= false
            let RuntimeErr=false
            let moviesList = this.props.movies
            let MovieErr = false
            for(let i =0; i<moviesList.length; i++){  
                if(moviesList[i].Title===Title){   
                    MovieErr=true 
                    break
                }
            }
            if(Year === '' ||  isNaN(Year)!==false || Number(Year)<1900 || Number(Year)>2019){
                YearErr=true
            }
            if(Runtime === '' ||  isNaN(Runtime)!==false || Number(Runtime)<0 || Number(Runtime)>500){
                RuntimeErr = true
            }

            this.setState({ 
                YearError: YearErr,
                RuntimeError: RuntimeErr,
                MovieError: MovieErr

            })
            if(Title&&Year&&Genre&&Director&&Poster !== '' &&YearErr!==true &&RuntimeErr!==true && Year>1900&&Year<2019 && Runtime>0&&Runtime<500 &&MovieErr===false){ 
            Title = strOrganize(Title)
            Genre = strOrganize(Genre)
            Runtime= this.state.Runtime + ' min' 
            Director = strOrganize(Director)
            let imdbID = this.state.imdbID+1
            let list = this.props.movies
            list.push({Title, Year, Genre, Runtime, Director, Poster, imdbID})
            this.props.addMovie(list)
            this.setState({ 
                Title:'',
                Year:'',
                Genre: '',
                Runtime: '',
                Director: '',
                Poster: '',
                list: list,
                imdbID: imdbID
            })
        }else{  
            return null
        }

    }
    
render(){   

    let display;
    let YearErrorDisplay;
    let RuntimeErrorDisplay;
    let MovieErrorDisplay;

    if(this.props.addMovieDisplay===false){    
        display= 'none'
    }
    if(this.state.RuntimeError === false){ 
        RuntimeErrorDisplay='none'

    }
    if(this.state.YearError === false){ 
        YearErrorDisplay= 'none'

    }
    if(this.state.MovieError === false){ 
       MovieErrorDisplay= 'none'

    }
    
    return( 
        <div >  
            <div  style={{display: display}}>
                 <div className='AddMovieModal'>   
                            <div>   
                                <div>Title</div>
                                <input type='text' id='Title' onChange={this.onChangeHandler} value={this.state.Title}/>
                                <div className='Error' style={{display: MovieErrorDisplay}}>Movie is already exists</div>
                            </div>
                            <div>   
                                <div>Year</div>
                                <input type='text' id='Year' onChange={this.onChangeHandler}  value={this.state.Year}/>
                                <div className='Error' style={{display: YearErrorDisplay}}>Number between 1900-2019</div>
                            </div>
                            <div>   
                                <div>Genre</div>
                                <input type='text' id='Genre'  onChange={this.onChangeHandler}  value={this.state.Genre}/>
                            </div>
                            <div>   
                                <div>Runtime</div>
                                <input type='text' id='Runtime'  onChange={this.onChangeHandler}  value={this.state.Runtime}/>
                                <div className='Error' style={{display: RuntimeErrorDisplay}}>Number between 0-500</div>
                            </div>
                            <div>   
                                <div>Director</div>
                                <input type='text' id='Director' onChange={this.onChangeHandler}  value={this.state.Director}/>
                            </div>
                            <div>   
                                <div>Poster</div>
                                <input type='text' id='Poster' onChange={this.onChangeHandler}  value={this.state.Poster}/>
                            </div>
                            </div>
                            <div>
                                <div className='AddMovieModalButton' onClick={this.props.onClick}>   
                                <button onClick={this.addMovieHandler}>ADD</button>
                            </div>
                    </div>
                </div> 
        </div>
    )
}
}

const mapStateToProps = (state) =>{ 
    return{ 
        movies: state.movies
    }
}

const mapDispatchToProps = (dispatch) =>{   
    return{ 
        addMovie: (list) => dispatch({type: 'ADD_MOVIE', list: list}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie)