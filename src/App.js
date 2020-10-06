import React from 'react';
import './App.css';

// importing the api stuff
import requests from './api/request';

//importing the Components
import Banner from './Components/Banner'
import Row from './Components/Row';
import Navebar from './Components/Navebar'


function App() {
  return (
    <div className="app">
      <Navebar />
      {/* Top Banner/Hero Image */}
      <Banner />
      {/* Row showing different sections */}
      <Row title="Netflix Origionals" fetchURL={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Comedy" fetchURL={requests.fetchComedyMovies} />
      <Row title="Romantic" fetchURL={requests.fetchRomanticMovies} />
      <Row title="Documentries" fetchURL={requests.fetchDocumentries} />

    </div>
  );
}

export default App;
