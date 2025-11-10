import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import {Routes, BrowserRouter, Route} from "react-router-dom"
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/quiz' element={<Quiz/>} />
        <Route path='/result' element={<Results/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
