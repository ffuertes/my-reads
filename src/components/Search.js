import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';
import Book from './Book';

export default class Search extends Component {

    state = {
        query: '',
        message: '"Whenever you read a good book, somewhere in the world a door opens to allow in more light." – Vera Nazarian',
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query });
        this.getBooks( query );
    }

    getBooks = ( query ) => {
        // If there is no query clean state and return early.
        if ( !query ) {
            this.setState({ books: [] });
            return;
        };

        BooksAPI.search( query, 50 ).then( (books ) => {
            if ( books.error ) {
                this.setState({
                    message: `No results for "${query}". Please try again with a different keyword.`,
                    books: []
                });
            } else if( books ) {
                //console.log( books );
                this.setState({ books });
            }
        })
    }

    render() {
        const { books, query, message } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={ (e) => this.updateQuery( e.target.value ) } />

                    </div>
                </div>
                    { books.length < 1 && ( <div className="search-message">
                        { message }
                    </div> )}
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {books && books.map( (book ) => (
                            <Book
                                key={book.id}
                                book={book}
                                shelf={book.shelf || 'none'}
                                onMoveBook={this.props.onMoveBook} />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}