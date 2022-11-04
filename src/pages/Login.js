import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <input data-testid="login-name-input" />
          <div>
            <label htmlFor="button-login">
              Entrar
              <input type="button" data-testid="login-submit-button" />
            </label>
          </div>
        </form>
      </div>
    );
  }
}
