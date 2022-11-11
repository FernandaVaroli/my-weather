import GoogleMapReact from 'google-map-react';
import './App.css';

function App() {
  return (
    <div className="container">
      <section className="header">
       <div className="weather-today">21°</div>

       <div className="search">

          <div className='search-item'>
            <input placeholder="Enter adress" />
            <button className="button" type="submit">Search</button>
          </div>

       </div>

      </section>
      
      <section className='side-bar'>
        <div>
          
        </div>
      </section>
    </div>
  );
}

export default App;
