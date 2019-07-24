import React, { Component } from 'react';
import SignIn from "./SignIn"
import SignUp from "./SignUp"

class FormCard extends Component {
  render() {
    return (
      <div className="headers">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked={this.props.renderSignIn}
          onChange={this.props.onSignInClick}
        >
        </input>
        <label htmlFor="tab-1" className="tab">Sign In</label>
        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          checked={!this.props.renderSignIn}
          onChange={this.props.onSignUpClick}
        >
        </input><label htmlFor="tab-2" className="tab">Sign Up</label>
        <div className="login-form">
          <SignIn
            onEmailChange={this.props.onSignInEmailChange}
            onPwChange={this.props.onSignInPwChange}
            onSignIn={this.props.handleSignIn}
            onCheck={this.props.onCheck}
          />
          <SignUp
            onEmailChange={this.props.onSignUpEmailChange}
            onPwChange={this.props.onSignUpPwChange}
            onPwConfChange={this.props.onSignUpPwChangeConf}
            onFirstNameChange={this.props.onSignUpFirstNameChange}
            onLastNameChange={this.props.onSignUpLastNameChange}
            onProdCodeChange={this.props.onSignUpProdCodeChange}
            onSubmit={this.props.handleSignUp}
            switchToSignIn={this.props.onSignInClick}
          />
        </div>
      </div>
    )
  }
}

export default FormCard