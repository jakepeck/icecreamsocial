import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  LoadMovieList,
  LoadSelectedMovie
} from '../store/actions/MovieListActions'
import { POSTER_PATH } from '../globals'

const mapStateToProps = ({ movieListState }) => {
  return { movieListState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieList: () => dispatch(LoadMovieList()),
    fetchMovieDetails: (movieId) => dispatch(LoadSelectedMovie(movieId))
  }
}

const MovieList = (props) => {
  useEffect(() => {
    props.fetchMovieList()
  }, [props.movieListState.selectedMovie])

  const moviesMap = props.movieListState.movies.map((movie, idx) => {
    return (
      <div key={movie.id} className="card">
        {movie.title}{' '}
        <img
          src={`${POSTER_PATH}${movie.backdrop_path}`}
          alt="poster"
          width="200"
        />
        <button
          onClick={() => {
            props.fetchMovieDetails(movie.id)
          }}
        >
          View Movie Details
        </button>
      </div>
    )
  })

  return (
    <div>
      {props.movieListState.selectedMovie !== null ? (
        <div className="movieDetails">
          <img
            src={`${POSTER_PATH}${props.movieListState.selectedMovie.backdrop_path}`}
            alt="poster"
            width="200"
          />
          <h1>{props.movieListState.selectedMovie.title}</h1>
          <div>
            <h2>
              Released on: {props.movieListState.selectedMovie.release_date}
            </h2>
            <h2>{props.movieListState.selectedMovie.runtime} minutes</h2>
          </div>

          <p>{props.movieListState.selectedMovie.overview}</p>
        </div>
      ) : (
        'Click on a movie to expand details'
      )}
      Movie List
      <div className="grid">{moviesMap}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList)
