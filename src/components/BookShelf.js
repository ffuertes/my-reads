import React from 'react';
import Book from './Book';

const BookShelf = ( props ) => {

    const { shelf, books, title, onMoveBook } = props;
    const filteredBooks = books.filter( (book) => book.shelf === shelf );

    const shelvesMessages = {
        currentlyReading: "It's time to start reading a new book!",
        wantToRead: "Check out our new books, sure you are going to find some interesting to read.",
        read: "Nothing here yet!",
    };

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                { filteredBooks.length < 1 && (
                    <div className="no-books-message">
                        {shelvesMessages[shelf]}
                    </div>
                )}
                { filteredBooks.length > 0 && (
                    <ol className="books-grid">
                        { filteredBooks.map( ( book ) => (
                            <Book
                                key={book.id}
                                book={book}
                                onMoveBook={onMoveBook}
                                shelf={shelf} />
                        ))}
                    </ol>
                )}
            </div>
        </div>
    )
}

export default BookShelf;
