import React, { Component } from 'react';
import Header from './Header';

export default class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        <Header />

      </div>
    );
  }
}
