import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import AppBar from 'material-ui/AppBar';

import BookShelf from './BookShelf';

class ListBooks extends Component {
    state = {
        index: 0,
    }

    handleChange = (value) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    render() {
        const { books, onMoveBook } = this.props;
        const { index } = this.state;

        return (
            <div className="list-books">
                <AppBar title="MyReads" />

                <div className="list-books-content">
                    <Tabs value={index} onChange={this.handleChange}>
                        <Tab value={0} label="Reading" />
                        <Tab value={1} label="Want to Read" />
                        <Tab value={2} label="Read" />
                    </Tabs>
                    <SwipeableViews  index={index} onChangeIndex={this.handleChangeIndex} >
                        <BookShelf title="Currently Reading" books={ books } shelf="currentlyReading" onMoveBook={ onMoveBook } />
                        <BookShelf title="Want to Read" books={ books } shelf="wantToRead" onMoveBook={ onMoveBook }/>
                        <BookShelf title="Read" books={ books } shelf="read" onMoveBook={ onMoveBook } />
                    </SwipeableViews>
                </div>

                <div className="open-search">
                    <Link to='add'>Add a book</Link>
                </div>
            </div>
        );
    }
}

export default ListBooks;