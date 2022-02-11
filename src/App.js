import { Component } from "react";
import { ToastContainer } from "react-toastify";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";

export default class App extends Component {
  state = {
    searchQuery: "",
    currentPage: 1,
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery, currentPage } = this.state;
    return (
      <div style={{ width: "100%", margin: "0 auto", padding: 0 }}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} currentPage={currentPage} />
      </div>
    );
  }
}
