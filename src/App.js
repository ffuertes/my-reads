import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
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
    this.setState( ( prevState ) => ({
      books: prevState.books.map( (b) => {
        if ( b.id === book.id ) {
          b.shelf = shelf;
        }
        return b;
      })}
    ));
    BooksAPI.update( book, shelf );
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks books={ this.state.books } onMoveBook={ this.updateShelf } />
        )} />
        <Route path='/add' render={() => (
          <Search onBack={ this.onChangeView } />
        )} />
      </div>
    )
  }
}

export default BooksApp