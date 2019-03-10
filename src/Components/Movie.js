import React, {Component} from 'react'
import './Dashboard.css'



class Movie extends Component{   
    state = {   
        Title: this.props.Title,
        Year: this.props.Year,
        Genre: this.props.Genre,
        Runtime: this.props.Runtime,
        Director: this.props.Director,
        Poster: this.props.Poster,
        TitleInput: '',
        YearInput: '',
        RuntimeInput: '',
        GenreInput: '',
        DirectorInput: '',
        PosterInput: '',
        editDisplay: false


    }

    onChangeHandler = (event) =>{   
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    saveHandler = () =>{  
        let NewTitle = this.state.Title
        let NewYear = this.state.Year
        let NewGenre = this.state.Genre
        let NewRuntime = this.state.Runtime
        let NewDirector = this.state.Director
        let editDisplay = this.state.editDisplay
        this.setState({
            Title: NewTitle,
            Year: NewYear,
            Genre: NewGenre,
            Runtime: NewRuntime,
            Director: NewDirector,
            editDisplay: !editDisplay
        })
        console.log(this.state)
    }

    cancelHandler = () =>{  
        let Title = this.props.Title
        let Year = this.props.Year
        let Genre = this.props.Genre
        let Runtime = this.props.Runtime
        let Director = this.props.Director
        let editDisplay = this.state.editDisplay
        this.setState({
            Title: Title,
            Year: Year,
            Genre: Genre,
            Runtime: Runtime,
            Director: Director,
            editDisplay: !editDisplay
        })
        console.log(this.state)
    }

    editDisplay = () =>{    
        let editDisplay= this.state.editDisplay
        this.setState({ 
            editDisplay: !editDisplay
        })
    }

    render(){   
        console.log(this.props)
        const {id, remove} = this.props
        let display 
        let opacity
        if(this.state.editDisplay===false){ 
            display = 'none';
            opacity = 0;
        }
        return( 
          <div>
          <div className='Movie'  >   
              <div className='Fade'> 

              <div className='EditContainer' style={{display: display, opacity: opacity}}> 

              <div className='EditFormModal'> 
                        <div>   
                            Title: <input type='text' id='Title' onChange={this.onChangeHandler} value={this.state.Title}/>
                        </div>
                        <div>   
                            Year: <input type='text' id='Year' onChange={this.onChangeHandler}  value={this.state.Year}/>
                        </div>
                        <div>   
                            Genre: <input type='text' id='Genre'  onChange={this.onChangeHandler}  value={this.state.Genre}/>
                        </div>
                        <div>   
                            Runtime: <input type='text' id='Runtime'  onChange={this.onChangeHandler}  value={this.state.Runtime}/>
                        </div>
                        <div>   
                            Director: <input type='text' id='Director' onChange={this.onChangeHandler}  value={this.state.Director}/>
                        </div>
                        <div>   
                            Poster: <input type='text' id='Poster' onChange={this.onChangeHandler}  value={this.state.Poster}/>
                        </div>
                        <div className='EditButtons'>   
                        <div className='SaveButton'>   
                             <button onClick={this.saveHandler}>SAVE</button>
                        </div>
                        <div className='CancelButton'>   
                             <button onClick={this.cancelHandler}>CANCEL</button>
                        </div>
                        </div>

                 </div>
              </div>

                      <div className='Header'>
                      <div className='TitleContainer'>   
                          <div className='Title'>
                            <div id='name'>{this.state.Title}</div>
                            <div id='year'>({this.state.Year})</div>
                          </div>
                              <div className='MovieGenre'>
                                  <ul>    
                                      {this.state.Genre&&this.state.Genre.split(',').map((item,index) =>{   
                                          return( 
                                              <li key={index}>{item}</li>
                                          )
                                      })}
                                  </ul>
  
                              </div>
                              <div className='Rest'>  
                               <ul>
                                   <li>Runtime: {this.state.Runtime}</li>    
                                   <li>Director: {this.state.Director}</li>    
                                   <li>Id: {id}</li>    
                                   </ul> 
                               </div>
                               <div className='Buttons'>  
                                  <div className='Edit'><button onClick={this.editDisplay}>EDIT</button></div>
                                  <div className='Remove'><button onClick={() => remove(id)}>REMOVE</button></div>
                               </div>
                          </div>   
                          <div className='Poster' style={{backgroundImage: `url(${this.state.Poster})`, backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                      </div>
               </div>
          </div>

      </div>
        )
    }
}

export default Movie