import { useState } from 'react';
import Login from './components/pages/Login/Login';
import Info from './components/pages/Info/Info';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PersonDetailsContext } from './contexts/ContextPerson';
import { PersonDetails } from './models/PersonDetails';

 function App() {

  const [details, setDetails] = useState<PersonDetails>();

  return (
    <div className="App">
      <PersonDetailsContext.Provider value= {{details,setDetails}}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/Login" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Info" element={<Info />} />
          </Routes>
        </Router>
        </PersonDetailsContext.Provider>
    </div>
  );
}

export default App;
