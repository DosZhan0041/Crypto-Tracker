import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Coin from './components/Coin/Coin';
import CoinContextProvider from './context/CoinContext';

function App() {
  return (
    <BrowserRouter>
      <CoinContextProvider>
        <div className="App">
          <div className='container'>
            <Header/>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/coin/:coinId' element={<Coin/>}/>
              </Routes>
              <Footer/>
            </div>
        </div>
        </CoinContextProvider>
    </BrowserRouter>
  );
}

export default App;
