// LoginForm.js

import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userid: '',
    pin: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onChangeUsername = event => {
    this.setState({userid: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userid, pin} = this.state
    const userDetails = {
      user_id: userid,
      pin,
    }

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
      this.setState({userid: '', pin: ''})
    } catch (error) {
      // Handle any request or network errors here
      console.error(error)
    }
  }

  renderPasswordField = () => {
    const {pin, showPassword} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PIN
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="password-input-field"
          value={pin}
          onChange={this.onChangePassword}
          placeholder="Enter PIN"
        />
        <label htmlFor="showPassword">
          Show Password
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={this.togglePasswordVisibility}
          />
        </label>
      </>
    )
  }

  renderUsernameField = () => {
    const {userid} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          User ID
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={userid}
          onChange={this.onChangeUsername}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="login-container">
          <div className="password-container">
            <img
              className="login-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <form className="form-container" onSubmit={this.submitForm}>
              <h1 className="heading-logo">Welcome Back!</h1>
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)

/* import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userid: '',
    pin: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  // Add the togglePasswordVisibility method here

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onChangeUsername = event => {
    this.setState({userid: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userid, pin} = this.state
    const userDetails = {
      user_id: userid,
      pin,
    }

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
    this.setState({userid: '', pin: ''})
  }

  renderPasswordField = () => {
    const {pin, showPassword} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PIN
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="password-input-field"
          value={pin}
          onChange={this.onChangePassword}
          placeholder="Enter PIN"
        />
        <label htmlFor="showPassword">
          Show Password
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={this.togglePasswordVisibility}
          />
        </label>
      </>
    )
  }

  renderUsernameField = () => {
    const {userid} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          User ID
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={userid}
          onChange={this.onChangeUsername}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="login-container">
          <div className="password-container">
            <img
              className="login-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <form className="form-container" onSubmit={this.submitForm}>
              <h1 className="heading-logo">Welcome Back!</h1>
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm)

/* import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
    this.setState({username: '', password: ''})
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PIN
        </label>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle input type
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Enter PIN"
        />
        <label htmlFor="showPassword">
          Show Password
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={this.togglePasswordVisibility}
          />
        </label>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          User ID
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter User ID"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="app-container">
        <div className="login-container">
          <div className="password-container">
            <img
              className="login-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <div className="login-form-container">
            <form className="form-container" onSubmit={this.submitForm}>
              <h1 className="heading-logo">Welcome Back!</h1>
              <div className="input-container">
                {this.renderUsernameField()}
              </div>
              <div className="input-container">
                {this.renderPasswordField()}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
*/
