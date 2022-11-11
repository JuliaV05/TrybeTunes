import React, { Component } from 'react';
import Header from './Header';
import  getMusics  from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends Component {
  state = {
   album: [],
   artist: {},
  }
  async componentDidMount () {
    const { match: { params: { id } }}  = this.props;
    const [ artist, ...album ] = await getMusics(id);
    this.setState({ album, artist });
  }

  render() {
    const { album, artist } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <h3 data-testid="artist-name">{artist.artistName}</h3>
        <h4 data-testid="album-name">{artist.collectionName}</h4>
        <section>
          { album.map((music) => (
            <MusicCard { ...music } key={ music.trackId }/>
          )) }
          </section>
      </div>
    );
  }
}
