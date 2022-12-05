import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'

function App() {
  return ( <Router>
    <Routes>
        <Route exact path ='/' element = {<Landing/>} />
        {/* <Route exact path ='/login' component = {} /> */}
    </Routes>
  </Router>
  )
}

export default App;

