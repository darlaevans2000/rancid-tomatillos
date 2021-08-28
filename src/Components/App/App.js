import React, { Component } from 'react';
// import movieData from '../../movieData';
import MoviesArea from '../MoviesArea/MoviesArea'
import MovieInfo from '../MovieInfo/MovieInfo'
import fetchMoviesData from '../API/APICalls';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: [],
      error: ''
    }
  }

   componentDidMount = () => {
   fetchMoviesData()
   .then(data => this.setState({movies:[ ...this.state.movies,...data.movies]}))
   .catch(error => this.setState({error: 'ERROR: Something went wrong!!'}))
 }


  displayMovie = (id) => {
    const clickedMovie = this.state.movies.find(movie => movie.id === id);

    this.state.selectedMovie.length ? this.setState({selectedMovie: []}) : this.setState({selectedMovie: [clickedMovie]})
    //if the length is 0 then keep empty, if not, set state to the clicked movie
  }

  displayHomePage = () => {
    this.setState({
      selectedMovie: []})
  }

  render() {
    return (
      <main className='App'>
        <h1>Rancid Tomatillos</h1>
        {!this.state.selectedMovie.length && <MoviesArea movies={this.state.movies} displayMovie={this.displayMovie}/>}
        <MovieInfo selectedMovie={this.state.selectedMovie} displayHomePage={this.displayHomePage}/>
      </main>
        // ln 27 if ^  this.state.selectedMovie length is null then return regular movie grid,
        // ln 28 else ^ return movie info component 
    )

  }
}

export default App;
