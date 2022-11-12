import './App.css';
import Maps from './Maps/Maps';

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
        <Maps />
        </section>
        <section>
          
        </section>
        
      
      
    
    </div>
  );
}

export default App;
