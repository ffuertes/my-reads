import React from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';

const ListBooks = ( props ) => {
    const { books, onMoveBook } = props; 
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
                <BookShelf title="Currently Reading" books={ books } shelf="currentlyReading" onMoveBook={ onMoveBook } />
                <BookShelf title="Want to Read" books={ books } shelf="wantToRead" onMoveBook={ onMoveBook }/>
                <BookShelf title="Read" books={ books } shelf="read" onMoveBook={ onMoveBook } />
            </div>

            <div className="open-search">
                <Link to='add'>Add a book</Link>
            </div>
        </div>
    );
}

export default ListBooks;