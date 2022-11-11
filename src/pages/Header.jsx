import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.getSaveUser();
  }

  getSaveUser = async () => {
    this.setState({ loading: true });
    const userName = await getUser();
    this.setState({ name: userName.name, loading: false });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        { loading ? <Loading /> : <span data-testid="header-user-name">{ name }</span>}

      </header>
    );
  }
}
