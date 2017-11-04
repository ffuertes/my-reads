import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import Search from './components/Search';
import ListBooks from './components/ListBooks';

import './App.css';

class BooksApp extends Component {

  // constructor(){
  //   super();

  //   this.onChangeView = this.onChangeView.bind(this);
  // }
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  onChangeView = () => {
    this.setState({ showSearchPage: false });
  }

  goToSearch = () => {
    this.setState({ showSearchPage: true });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search onBack={ this.onChangeView } />
        ) : (
          <ListBooks goToSearch={ this.goToSearch } />
        )}
      </div>
    )
  }
}

export default BooksApp