import { Routes, Route } from 'react-router-dom'
import Lobby from './pages/Lobby';
import Room from './pages/Room';

function App() {
  return (
    <>
        <div className="App">
          <Routes>
            <Route path='/' element={<Lobby />}></Route>
            <Route path='/interview' element={<Room />}></Route>
          </Routes>
        </div>
    </>
  );
}

export default App;
