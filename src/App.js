import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import * as BooksAPI from './BooksAPI'
import Search from './components/Search';
import ListBooks from './components/ListBooks';

import './App.css';

class BooksApp extends Component {
  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks goToSearch={ this.goToSearch } />
        )} />
        <Route path='/add' render={() => (
          <Search onBack={ this.onChangeView } />
        )} />
      </div>
    )
  }
}

export default BooksApp