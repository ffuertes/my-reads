import React from 'react';
import Book from './Book';

const BookShelf = ( props ) => {
    
    const { shelf, books, title } = props;
    const filteredBooks = books.filter( (book) => book.shelf === shelf );
        
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { filteredBooks.map( ( book ) => (
                        <Book key={book.id} data={book} />
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;
