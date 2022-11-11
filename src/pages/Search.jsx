/* eslint-disable react/jsx-tag-spacing */
import React, { Component } from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import CardAlbums from './cardAlbums';

export default class Search extends Component {
  state = {
    buttonDisabled: true,
    name: '',
    loading: false,
    albums: [],
    value: '',
    require: false,
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

  clickButton = async (e) => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true, value: name });
    const api = await searchAlbumsAPI(name);
    // console.log(api);
    this.setState({ albums: api, loading: false, name: '', require: true });
  };

  render() {
    const { name, buttonDisabled, loading, require, albums, value } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <div>
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
                onClick={ this.clickButton }
              >
                Pesquisar
              </button>
            </form>
            { require && (
              <div>
                { albums.length > 0
                  ? (
                    <p>
                      {`Resultado de álbuns de: ${value}`}
                    </p>)
                  : <p>Nenhum álbum foi encontrado</p>}
                { albums.map((album) => (
                  <CardAlbums
                    album={ album }
                    key={ album.collectionId }
                  />
                ))}
              </div>
            )}
          </div>
        ) }
      </div>
    );
  }
}
