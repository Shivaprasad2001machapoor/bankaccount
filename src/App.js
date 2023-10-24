import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './component/Home'
import LoginForm from './component/LoginForm'
import ProtectedRoute from './component/ProtectedRoute'
import NotFound from './component/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
