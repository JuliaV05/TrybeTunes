import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class cardAlbums extends Component {
  render() {
    const { album:
        { artistName, collectionId, collectionName, artworkUrl100 } } = this.props;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h4>{ collectionName }</h4>
          <h6>{ artistName }</h6>
        </Link>
      </div>
    );
  }
}
cardAlbums.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};
