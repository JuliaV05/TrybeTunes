import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    click: false,
  };

  componentDidMount() {
    this.saveMusic();
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    this.setState({
      click: checked,
    }, this.songFavorites);
  };

  saveMusic = () => {
    const { oneMusic } = this.props;
    this.setState({ loading: true }, async () => {
      const songs = await getFavoriteSongs();
      songs.forEach((e) => {
        if (e.trackId === oneMusic.trackId) {
          this.setState({
            click: true,
          });
        }
      });
    });
    this.setState({ loading: false });
  };

  songFavorites = async () => {
    const { oneMusic } = this.props;
    const { click } = this.state;
    this.setState({ loading: true });
    if (click) {
      await addSong(oneMusic);
    } else {
      await removeSong(oneMusic);
    }
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
  oneMusic: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
