//----------------------
//Author:Brigitta Bunford
//----------------------

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import './App.css';

//adding a search page to the project which opens, when the user clicks on the "+" icon
class SearchPage extends Component {
  constructor(props) {
    super(props);
    console.log("props", props)
  }
  //two properties added to the component
  static propTypes = {
    changeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array.isRequired
  }

  state = {
    searchText: '',
    searchResults: []
  }

  //results updating according to the search query
  updateQuery = (text) => {
    this.setState({ searchText: text });
    if (text === '') {
      this.setState({ searchResults: [] });
      return;
    }

    BooksAPI.search(text)
      .then((results) => {
        if (results instanceof Array)
          this.setState({ searchResults: results });
        else
          this.setState({ searchResults: [] });
      });
  }
  shelfChanged = (bookId, e) => {
    let updt = this.state.searchResults;
    const book = updt.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: updt
      });
    });
  };

  //rendering view
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <Shelf
          key='search-shelf'
          shelfId='search-shelf'
          books={this.state.searchResults}
          changeShelf={this.props.changeShelf}
          booksOnShelves={this.props.booksOnShelves}
          movingPosition={this.shelfChanged}
        />
      </div>
    );
  }
}

export default SearchPage;
