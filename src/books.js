//----------------------
//Autor:Brigitta Bunford
//----------------------

import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

//adding the book component
class Books extends React.Component {
  state = {};

  constructor(props) {
    super(props)
    this.props.updatee()
  }

  //updating where the books are placed
  shelfChanged = (bookId, e) => {
    let updt = this.props.categorizedBooks;
    const book = updt.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: updt
      });
    });
  };


  //rendering new view according to shelves
  render() {
    return (
      <div className="categorized-books">
        <div className="categorized-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="categorized-books-content">

          <Shelf
            key="currentlyReading"
            books={this.props.categorizedBooks.filter(book => book.shelf === "currentlyReading")}
            movingPosition={this.shelfChanged}
            nameOfShelf="Currently Reading"
          />

          <Shelf
            key="wantToRead"
            books={this.props.categorizedBooks.filter(book => book.shelf === "wantToRead")}
            movingPosition={this.shelfChanged}
            nameOfShelf="Want to Read"
          />

          <Shelf
            key="hasRead"
            books={this.props.categorizedBooks.filter(book => book.shelf === "read")}
            movingPosition={this.shelfChanged}
            nameOfShelf="Read"
          />
        </div>

        <div className="open-search">
          <Link to="/search">Find and add books</Link>
        </div>
      </div>
    );
  }
}
export default Books;