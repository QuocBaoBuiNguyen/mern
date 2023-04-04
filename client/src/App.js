import './App.css';
import Landing from './components/layout/Landing'
import Auth from './view/Auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'
import ProtectedRoute from './components/routing/ProtectedRoute'
import Dashboard from './view/Dashboard';
import About from './view/About';
function App() {
  return  ( 
  <AuthContextProvider>
    <PostContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' render={props => <Auth {...props} authRoute = 'login' />} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute = 'register' />}/>
          <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
          <ProtectedRoute exact path='/about' component={About}/>
        </Switch>
      </Router>
    </PostContextProvider>
  </AuthContextProvider>
   )
}

export default App;

