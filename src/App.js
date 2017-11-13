import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      <MuiThemeProvider>
        <div>
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