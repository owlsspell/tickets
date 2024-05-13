import Filters from './components/Filters/Filters';
import Sidebar from './components/Sidebar/Sidebar';
import TicketsList from './components/Tiсkets/TicketsList';
import './scss/global.scss';

function App() {

  return (
    <div className="page">
      <div className='container'>
        <header className="header">
          <a href='/'>
            <img src="/images/Logo.svg" alt="" />
          </a>
        </header>
        <div className='page__body'>
          <Sidebar />
          <div className='filters__container'>
            <Filters />
            <div className='tickets__container'>
              <TicketsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
