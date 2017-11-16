import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SvgIcon from 'material-ui/SvgIcon';

import SwipeableViews from 'react-swipeable-views';

import BookShelf from './BookShelf';

const MyReadsIcon = ( props ) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '24px', margin: '6px 5px 0'}} viewBox="0 0 296.999 296.999"><g fill="#FFF"><path d="M45.432 35.05h-.025c-2.81 0-5.45 1.094-7.446 3.084-2.016 2.012-3.127 4.69-3.127 7.543v159.365c0 5.844 4.773 10.61 10.64 10.625 24.74.06 66.185 5.215 94.777 35.136V84.023c0-1.98-.506-3.842-1.46-5.382C115.32 40.85 70.225 35.108 45.43 35.05zM262.167 205.042V45.676c0-2.852-1.11-5.53-3.128-7.543-1.996-1.99-4.64-3.085-7.446-3.085h-.026c-24.793.06-69.89 5.8-93.357 43.593-.954 1.54-1.46 3.402-1.46 5.383v166.78c28.593-29.922 70.04-35.078 94.777-35.137 5.867-.015 10.64-4.78 10.64-10.624z"/><path d="M286.373 71.8h-7.706v133.242c0 14.92-12.157 27.088-27.1 27.125-20.984.05-55.582 4.153-80.085 27.344 42.378-10.375 87.052-3.63 112.512 2.172 3.18.724 6.464-.024 9.01-2.054 2.54-2.025 3.995-5.052 3.995-8.3v-168.9c0-5.86-4.768-10.627-10.627-10.627zM18.332 205.042V71.802h-7.706C4.768 71.8 0 76.567 0 82.426v168.897c0 3.25 1.456 6.276 3.994 8.3 2.545 2.03 5.827 2.78 9.01 2.055 25.46-5.804 70.136-12.548 112.512-2.172-24.502-23.19-59.1-27.292-80.083-27.342-14.943-.036-27.1-12.203-27.1-27.124z"/></g></svg>
    )
}

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
                <AppBar title="MyReads" style={{lineHeight: '50px'}} className="app-header" iconElementLeft={<MyReadsIcon />} />

                <Tabs className="app-navigation" onChange={this.handleChange} value={index} >
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

ListBooks.propTypes = {
    books: PropTypes.shape({
            all: PropTypes.array,
            byIds: PropTypes.object,
            currentlyReading: PropTypes.array,
            wantToRead: PropTypes.array,
            read: PropTypes.array
        }).isRequired,
    onMoveBook: PropTypes.func.isRequired,
    labels: PropTypes.object
}