import React, { useState, useEffect } from 'react';
import './Row.css';
import axios from '../api/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchURL, isLargeRow }) {
    // baseURL for the pitures for the posters
    const baseImgUrl = "https://image.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([]);

    // snippet of code which runs on specific condition 
    useEffect(() => {
        // async function cannot be run inside the "useEffect"
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results)
        };
        fetchData();
    }, [fetchURL]);

    //options for the YouTube Player
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const [trailerUrl, setTrailerUrl] = useState('');
    const [currentMovieName, setCurrentMovieName] = useState('');

    const handleClick = (movie) => {
        if (trailerUrl) {
            if (movie?.title === currentMovieName) {
                setTrailerUrl('');
            } else {
                movieTrailer(movie?.title || "")
                    .then((url) => {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get("v"));
                    })
                    .catch((error) => console.log(error))
            }
        } else {
            movieTrailer(movie?.title || "")
                .then((url) => {
                    console.log(url)
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error))
        }
        setCurrentMovieName(movie?.title)
    }

    return (
        <div className="row">
            <h3>{title}</h3>

            <div className="row__posters">
                {/* saveral posters scrollable */}
                {movies.map(movie => (
                    (movie.poster_path &&
                        <img key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    )
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
            }
        </div>
    )
};

export default Row;
