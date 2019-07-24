import React, { Component } from 'react';
import PwReset from "./PwReset"
const forgotUrl = 'http://localhost:8080/forgotPassword'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPwReset: false,
      pwResetText: '',
      isLoading: false,
    }
    this.renderPwReset = this.renderPwReset.bind(this)
    this.onForgetPwChange = this.onForgetPwChange.bind(this)
    this.showReset = this.showReset.bind(this)
    this.submitForgotPw = this.submitForgotPw.bind(this)
  }

  renderPwReset() {
    if (this.state.showPwReset) {
      return (
        <PwReset
          onChange={this.onForgetPwChange}
          onSubmit={this.submitForgotPw}
        />
      )
    }
  }

  submitForgotPw() {
    var reqBody = {
      email: this.state.pwResetText,
    }
    this.setState({
      isLoading: true
    })
    fetch(forgotUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody),
    })
      .then(res => res.json())
      .then(json => {
        console.log("json: ", json)
        if (json.success) {
          alert("pw reset successfull. Check your email for more instructions")
          // setInStorage("pwResetEmailMsg", {
          //   msg: "Check out your email for reset instructions"
          // })
        } else {
          alert("error" + json.messages.msg)
          // setInStorage("pwResetEmailErr", json.messages)
        }
        this.setState({
          showPwReset: false,
          pwResetText: '',
          isLoading: false
        })
      })
    .catch((err) => {
      alert(err)
      // setInStorage("pwResetEmailErr", {
      //   msg: err.toString()
      // })
    })
  }

  onForgetPwChange(e) {
    this.setState({
      pwResetText: e.target.value
    })
  }

  showReset() {
    this.setState({
      showPwReset: true
    })
  }

  render() {
    return (

      <div className="sign-in-htm">
        <form id="signin-form" onSubmit={this.props.onSignIn}>
          <div className="group">
            <label htmlFor="login-email" className="label">Email</label>
            <input
              id="login-email"
              type="text"
              className="input"
              onChange={this.props.onEmailChange}
            />
          </div>
          <div className="group">
            <label htmlFor="login-pass" className="label">Password</label>
            <input
              id="login-pass"
              type="password"
              className="input"
              data-type="password"
              onChange={this.props.onPwChange}
            />
          </div>
          <div className="group">
            <input id="check" type="checkbox" className="check" onClick={this.props.onCheck}/>
            <label htmlFor="check">
              <span className="icon"></span> Keep me Signed In
            </label>
          </div>
          <div className="group">
            <input type="submit" className="button" value="Sign In" id="signInButton" />
          </div>
          <div className="hr"></div>
        </form>
        <div className="foot-lnk">
          <p id="forgot-link" onClick={this.showReset}>Forgot Password?</p>
          {this.renderPwReset()}
        </div>
      </div>
    )
  }
}

export default SignIn