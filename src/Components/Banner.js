import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from '../api/axios'
import requests from "../api/request";

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchHorrorMovies)
            setMovie(
                //selecting the random movie from the result
                request.data.results[
                Math.floor(Math.random() * request.data.results.length)
                ]
            );
            return request;
        }
        fetchData();
    }, [])

    // truncating the description
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "...." : str;
    }

    return (

        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
            backgroundPosition: 'center center',
        }}>
            <div className="banner__content">
                {/* Main Title */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.origional_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">
                    {/* Description */}
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            {/* adding the fade effect */}
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
