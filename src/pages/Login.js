import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.userChar);
  };

  textLoading = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, redirect: true });
  };

  userChar = () => {
    const number = 3;
    const { name } = this.state;
    if (name.length >= number) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    const { name, buttonDisabled, loading, redirect } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <div>

            <button
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.textLoading }
              data-testid="login-submit-button"
            >
              Entrar
            </button>

          </div>
        </form>
      </div>
    );
  }
}
