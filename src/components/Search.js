import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

export default class Search extends Component {

    defaultMessage = '"Whenever you read a good book, somewhere in the world a door opens to allow in more light." – Vera Nazarian';

    state = {
        query: '',
        message: this.defaultMessage,
        books: []
    }

    getBooks = ( query ) => {
        this.setState({ query });

        // If there is no query clean state and return.
        if ( '' === query ) {
            this.setState({
                books: [],
                message: this.defaultMessage
            });
            return;
        };

        BooksAPI.search( query, 50 ).then( (books ) => {
            if ( books.error ) {
                this.setState({
                    message: `No results for "${query}". Please try again with a different keyword.`,
                    books: []
                });
            } else if( books ) {
                this.setState({ books });
            }
        })
    }

    render() {
        const { books, message } = this.state;
        const { booksByIds } = this.props;

        const search = _.debounce( (query) => { this.getBooks(query) }, 300 );

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={ (e) => search( e.target.value ) } />

                    </div>
                </div>
                    { books.length < 1 && ( <div className="search-message">
                        { message }
                    </div> )}
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {books && books.map( (book) => {
                            return ( <Book
                                key={book.id}
                                book={book}
                                search
                                labels={this.props.labels}
                                shelf={ booksByIds.hasOwnProperty(book.id) ? booksByIds[book.id].shelf : 'none'}
                                onMoveBook={this.props.onMoveBook} /> )
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}