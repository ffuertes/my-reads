import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SwipeableViews from 'react-swipeable-views';

import BookShelf from './BookShelf';

class ListBooks extends Component {
    state = {
        index: 0
    }

    handleChange = (value) => {
        this.setState({
            index: value,
        });
    }

    render() {
        const { books, onMoveBook, labels } = this.props;
        const { index } = this.state;
        return (
            <div className="list-books">
                <AppBar title="MyReads" />

                <Tabs onChange={this.handleChange} value={index} >
                    <Tab label="Reading" value={0} />
                    <Tab label="Want to Read" value={1} />
                    <Tab label="Read" value={2} />
                </Tabs>

                <div className="list-books-content">
                    <SwipeableViews index={index} onChangeIndex={this.handleChange}>
                        <BookShelf labels={labels} title="Currently Reading" books={ books } shelf="currentlyReading" onMoveBook={ onMoveBook } />
                        <BookShelf labels={labels} title="Want to Read" books={ books } shelf="wantToRead" onMoveBook={ onMoveBook }/>
                        <BookShelf labels={labels} title="Read" books={ books } shelf="read" onMoveBook={ onMoveBook } />
                    </SwipeableViews>
                </div>

                <Link to='add' className="open-search">
                    <FloatingActionButton>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>
            </div>
        );
    }
}

export default ListBooks;