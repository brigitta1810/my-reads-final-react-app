//----------------------
//Autor:Brigitta Bunford
//----------------------

//importing components
import React from "react";
import { Route } from "react-router-dom";

import SearchPage from "./SearchPage";
import Books from "./books";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };


  // componentWillReceiveProps() {
  //   BooksAPI.getAll().then(data => {
  //     this.setState({
  //       books: data
  //     });
  //   });
  // }

  updatee = () => {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });

  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  shelfChanged = (book: [], shelf: '') => {
    console.log("working ")

    BooksAPI.update(book, shelf).then(response => {
      this.fetchBook();
    });
  };

  fetchBook() {
    console.log("working 2")
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  render() {
    return (
      <div className="application">
        <Route exact path="/" render={() => <Books updatee={this.updatee} categorizedBooks={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchPage updatee={this.updatee} movingPosition={this.shelfChanged} categorizedBooks={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;