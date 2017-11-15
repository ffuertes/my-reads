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
      all: [],
      allIds: [],
    },
  }

  componentDidMount() {
    BooksAPI.getAll().then( ( books ) => {
        this.setState({
          books: this.normalize( books )
        });
    });
  }

  normalize = ( books ) => {
    let data = Object.assign({}, this.state.books );

    data.all = books;
    data.allIds = books.map( book => book.id );

    return data;
  }

  updateShelf = ( book, shelf ) => {
    BooksAPI.update( book, shelf )
      .then( () => this.setState( ( prevState ) => {
        let books = prevState.books.all.map( (b) => {
          b.shelf = b.id === book.id ? shelf : b.shelf;
          return b;
        });
        return { books: this.normalize( books ) }
        })
      );
  }

  addBook = ( book, shelf ) => {
    BooksAPI.update( book, shelf )
      .then( () => {
        book.shelf = shelf;
        this.setState( ( prevState ) => ({
            books: this.normalize( [ ...prevState.books.all, book ] )
          })
        )
      });
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks books={ this.state.books.all } onMoveBook={ this.updateShelf } />
        )} />
        <Route path='/add' render={({ history }) => (
          <Search onBack={ this.onChangeView } booksIds={ this.state.books.allIds } onMoveBook={ ( book, shelf ) => {
            this.addBook( book, shelf );
            history.push('/');
          }} />
        )} />
      </div>
      </MuiThemeProvider>
    )
  }
}

export default BooksApp