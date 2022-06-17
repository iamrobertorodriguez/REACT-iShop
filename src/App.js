import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home, ProductDetail, Purchases } from './Pages';
import { Footer, LoadingScreen, Nav } from './Components';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector( state => state.isLoading );

  return (
    <div className="App">
      <HashRouter>
        { isLoading && <LoadingScreen/> }
        <Nav/>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/shop/:id' element={ <ProductDetail/> }/>
          <Route path='/purchases' element={ <Purchases/> }/>
        </Routes>
        <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;