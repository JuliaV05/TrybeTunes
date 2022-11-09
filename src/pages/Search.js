import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  state = {
    buttonDisabled: true,
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.searchArtist);
  };

  searchArtist = () => {
    const number = 2;
    const { name } = this.state;
    if (name.length >= number) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  render() {
    const { name, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="name"
            type="text"
            value={ name }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
