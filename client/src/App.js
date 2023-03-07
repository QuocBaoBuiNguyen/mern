import './App.css';
import Landing from './components/Layout/Landing'
import Auth from './view/Auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthContextProvider from './components/contexts/AuthContext'
function App() {
  return  ( 
  <AuthContextProvider>
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={props => <Auth {...props} authRoute = 'login' />} />
        <Route exact path='/register' render={props => <Auth {...props} authRoute = 'register' />}/>
      </Switch>
    </Router>
  </AuthContextProvider>
   )
}

export default App;

