import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import Search from './components/Search';
import ListBooks from './components/ListBooks';

import './App.css';

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( ( books ) => {
        this.setState({ books });
    });
  }

  updateShelf = ( book, shelf ) => {
    BooksAPI.update( book, shelf ).then( () => {
      BooksAPI.getAll().then( ( books ) => {
        this.setState({ books });
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks books={ this.state.books } onMoveBook={ this.updateShelf } />
        )} />
        <Route path='/add' render={({ history }) => (
          <Search onBack={ this.onChangeView } onMoveBook={ ( book, shelf ) => {
            this.updateShelf( book, shelf );
            history.push('/');
          }} />
        )} />
      </div>
    )
  }
}

export default BooksApp