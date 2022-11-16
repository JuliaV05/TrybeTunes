import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    click: false,
  };

  handleChange = ({ target }) => {
    const { checked } = target;
    console.log(checked);
    this.setState({
      click: checked,
    }, this.songFavorites);
  };

  songFavorites = async () => {
    const { oneMusic } = this.props;
    this.setState({ loading: true });
    await addSong(oneMusic);
    this.setState({ loading: false });
  };

  render() {
    const { loading, click } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        { loading ? <Loading /> : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                name={ trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                checked={ click }
              />
            </label>
          </div>
        ) }
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  oneMusic: PropTypes.shape.isRequired,
};
