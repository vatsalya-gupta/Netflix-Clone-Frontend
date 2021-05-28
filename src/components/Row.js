import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import instance from '../axios'
import '../css/Row.css'

const base_url = 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl)
            // console.log(request);
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    console.log(movies)

    const opts = {
        height: '390',
        width: '99%',
        playerVars: {
            autoplay: 0,
        },
    }

    const movieClick = movie => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(
                movie?.name || movie?.original_name || movie?.title || ''
            )
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className='Row'>
            <h2>{title}</h2>

            <div className='row_posters'>
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => movieClick(movie)}
                        className={`row_poster ${
                            isLargeRow && 'row_posterLarge'
                        }`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
