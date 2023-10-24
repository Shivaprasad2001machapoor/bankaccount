import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website login"
            className="image-logo"
          />
        </Link>
        <button type="button" className="button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="content-container">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          className="card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
