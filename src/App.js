import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as BooksAPI from './BooksAPI';
import Search from './components/Search';
import ListBooks from './components/ListBooks';

import './App.css';

class BooksApp extends Component {

  state = {
    books: {
      all: {},
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then( ( books ) => {

      const normalized = this.normalizeBooks(books);

      console.log( normalized );

      this.setState({
        books: normalized
      });
    });
  }

  normalizeBooks = ( books ) => {
    let normalized = Object.assign( {}, this.state.books );

    books.map( (book) => {
      normalized.all[book.id] = book;
      switch ( book.shelf ) {
        case 'currentlyReading':
          return normalized.currentlyReading.push(book.id)
        case 'wantToRead':
          return normalized.wantToRead.push(book.id)
        case 'read':
          return normalized.read.push(book.id)
        default:
          return normalized.none.push(book.id);
      }
    });

    return normalized;
  }

  updateShelf = ( book, shelf ) => {
    BooksAPI.update( book, shelf ).then( (response) => {
      this.setState( ( prevState ) => {
        prevState.books.all[book.id].shelf = shelf;
        return {
          books: {
            all: prevState.books.all,
            currentlyReading: response.currentlyReading,
            wantToRead: response.wantToRead,
            read: response.read,
          }
        }
      });
      console.log( this.state );
    });
  }

  render() {
    return (
      <MuiThemeProvider>
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
      </MuiThemeProvider>
    )
  }
}

export default BooksApp