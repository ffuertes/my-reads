import React, { Component } from 'react';
import PropTypes from 'prop-types';

import defaultCover from '../defaultCover.jpg';

export default class Book extends Component {

    onSelectChange = (e) => {
        this.props.onMoveBook( this.props.book, e.target.value )
    }

    render() {
        const { book, shelf, search, labels } = this.props;

        // Handle books without thumbnails and without authors.
        const thumb = book.imageLinks ? book.imageLinks.thumbnail : defaultCover;
        const authors = book.authors ? book.authors : ['Anonymous'];

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover-wrap">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + thumb + ')' }}></div>
                            {(search && shelf !== 'none') && (
                                <div className={`book-shlef-label ${shelf}`}>{labels[shelf]}</div>
                            )}
                        </div>
                        { ( shelf === 'none' || !search ) && ( <div className="book-shelf-changer">
                            <select value={ shelf } onChange={ this.onSelectChange } >
                                <option value="none" disabled>Move to...</option>
                                {Object.keys(labels).map((value) => (
                                    <option key={value} value={value}>{labels[value]}</option>
                                ))}
                            </select>
                        </div> )}
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ authors.map( (author, index) => {
                        return index === authors.length - 1 ? author : `${author}, `;
                    }) }</div>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    search: PropTypes.bool,
    labels: PropTypes.object
}