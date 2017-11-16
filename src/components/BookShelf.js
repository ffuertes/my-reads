import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BookShelf = ( props ) => {

    const { shelf, books, title, onMoveBook, labels } = props;

    const shelvesMessages = {
        currentlyReading: "It's time to start reading a new book!",
        wantToRead: "Check out our new books! Sure enough you're going to find something interesting to read.",
        read: "Nothing here yet!",
    };

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                { books[shelf].length < 1 && (
                    <div className="no-books-message">
                        {shelvesMessages[shelf]}
                    </div>
                )}
                { books[shelf].length > 0 && (
                    <ol className="books-grid">
                        { books[shelf].map( id => {
                            let book = books.byIds[id];
                            return (
                                <Book
                                    labels={labels}
                                    key={book.id}
                                    book={book}
                                    onMoveBook={onMoveBook}
                                    shelf={shelf} />
                            )})
                        }
                    </ol>
                )}
            </div>
        </div>
    )
}

export default BookShelf;

BookShelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string,
    books: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    labels: PropTypes.object,
}
