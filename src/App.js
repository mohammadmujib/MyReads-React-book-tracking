import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookList from "./components/BookList";
import Search from "./components/Search";

class BooksApp extends React.Component {
  state = { books: [] };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then(response => {
      changedBook.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }));
    });
  };

  render() {
    const { books } = this.state;
    console.log("book ", books);
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <BookList books={books} changeShelf={this.changeShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => <Search books={books} changeShelf={this.changeShelf} />}
        />
      </div>
    );
  }
}

export default BooksApp;
