import Main from './views/Main';
import { Routes, Route } from 'react-router-dom';

import AnimeDetails from './components/animedetails/AnimeDetails';

import Tags from './views/Tags';
import Results from './components/genres/Results';

import Producers from './views/Producers'
import Studio from './components/animedetails/StudioDetails'


import Seasons from './views/Seasons';
import SeasonResults from './components/seasons/SeasonResults';

import Watchlist from './views/Watchlist'


import Searchbar from './components/searchbar/Searchbar';



function App() {
  
  document.cookie = 'cookieName=myanimelist; SameSite=Lax';
  
  return (
    <div className="App">

        <Routes>
          <Route path='/' element={<Main/>}> </Route>
          <Route path='/anime' element={<AnimeDetails/>}> </Route>
          <Route path='/tags' element={<Tags/>}> </Route>
            <Route path='/tags/results' element={<Results/>}> </Route>
          <Route path='/studios' element={<Producers/>}> </Route>
            <Route path='/studio' element={<Studio/>}> </Route>
          <Route path='/seasons' element={<Seasons/>}> </Route>
            <Route path='/seasons/results' element={<SeasonResults/>}> </Route>
          <Route path='/search' element={<Searchbar/>}> </Route>
          <Route path='/watchlist' element={<Watchlist/>}> </Route>
        </Routes>

    </div>
  );
}

export default App;
