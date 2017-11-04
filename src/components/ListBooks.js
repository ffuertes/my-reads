import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

export default class ListBooks extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
    
                <div className="list-books-content">
                    <BookShelf title="Currently Reading" books={ this.props.books } shelf="currentlyReading"/>
                    <BookShelf title="Want to Read" books={ this.props.books } shelf="wantToRead"/>
                    <BookShelf title="Read" books={ this.props.books } shelf="read" />
                </div>
    
                <div className="open-search">
                    <Link to='add'>Add a book</Link>
                </div>
            </div>
        );
    }
}