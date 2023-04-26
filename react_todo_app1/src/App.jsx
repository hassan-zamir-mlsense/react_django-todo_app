import {React } from 'react';
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Notes from './components/notes/notes'
// Add this in your component file
// require('react-dom');

import {BrowserRouter, Link, Route,Routes, Switch} from 'react-router-dom';

// import "./App.css";



const App = () =>{
    // const [showComponent, setShowComponent] = useState(false);

  // const handleClick = () => {
  //   setShowComponent(true);
  // };
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
                {/*<Route path='/login' element={<Login/>} />*/}
                <Route path='/notes' element={<Notes/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;