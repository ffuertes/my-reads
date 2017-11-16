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
	  byIds: {},
	  currentlyReading: [],
	  wantToRead: [],
	  read: []
	},
  }

  componentDidMount() {
	BooksAPI.getAll().then( ( books ) => {
		this.setState({
		  books: this.process( books )
		});
	});
  }

  /**
   * @description Process the books returned from the API.
   * @param {array} books - array of books
   * @return {object} Books ordered by ids and shelves.
   */
  process = ( books ) => {
	let data = {
	  all: [],
	  byIds: {},
	  currentlyReading: [],
	  wantToRead: [],
	  read: []
	};

	data.all = books;

	books.map( book => {
	  data.byIds[book.id] = book;
	  switch ( book.shelf ) {
		case 'currentlyReading':
		  data.currentlyReading.push(book.id);
		  break;
		case 'wantToRead':
		  data.wantToRead.push(book.id);
		  break;
		case 'read':
		  data.read.push(book.id);
		  break;
		default:
		  break;
	  }
	  return book.id;
	});

	return data;
  }

  updateShelf = ( book, shelf ) => {
	BooksAPI.update( book, shelf )
	  .then( () => this.setState( ( prevState ) => {
		  let books = prevState.books.all.map( (b) => {
			b.shelf = b.id === book.id ? shelf : b.shelf;
			return b;
		  });
		  return { books: this.process( books ) }
		})
	  );
  }

  addBook = ( book, shelf ) => {
	BooksAPI.update( book, shelf )
	  .then( () => {
		book.shelf = shelf;
		this.setState( ( prevState ) => ({
			books: this.process( [ ...prevState.books.all, book ] )
		  })
		)
	  });
  }

  render() {

	const labels = {
	  currentlyReading: 'Reading',
	  wantToRead: 'Want to Read',
	  read: 'Read',
	  none: 'None'
	}

	return (
	  <MuiThemeProvider>
	  <div className='app'>
		<Route exact path='/' render={() => (
		  <ListBooks
			labels={labels}
			books={ this.state.books }
			onMoveBook={ this.updateShelf } />
		)} />
		<Route path='/add' render={({ history }) => (
		  <Search
			labels={labels}
			booksByIds={ this.state.books.byIds }
			onMoveBook={ ( book, shelf ) => {
			  this.addBook( book, shelf );
			  history.push('/');
			}} />
		)} />
	  </div>
	  </MuiThemeProvider>
	)
  }
}

export default BooksApp;