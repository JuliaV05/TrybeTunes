import React, { Component } from 'react';
import Header from './Header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />

      </div>
    );
  }
}
