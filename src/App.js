import { Component } from "react";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import fetchImages from "./services/images-api";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Button from "./components/Button";
import IconButton from "./components/IconButton";
import { ReactComponent as CloseBtn } from "./icons/close.svg";

export default class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    isModalOpen: false,
    largeImage: "",
    error: null,
  };

  componentDidUpdate(prevState, prevProps) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }
  getImages = async () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });
    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));

      if (currentPage !== 1) {
        this.scroll();
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      largeImage: "",
    }));
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery,
      error: null,
    });
  };

  handleGalleryItem = (fullImageUrl) => {
    this.setState({ largeImage: fullImageUrl, isModalOpen: true });
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    const { images, isLoading, isModalOpen, largeImage, error } = this.state;
    const showLoadMore = images.length > 0 && images.length >= 12;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {isLoading && <Loader />}

        <ImageGallery images={images} openModal={this.handleGalleryItem} />

        {showLoadMore && <Button onClick={this.getImages} />}

        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <IconButton onClick={this.toggleModal} aria-label="close modal">
              <CloseBtn width="20px" height="20px" fill="black" />
            </IconButton>
            <img src={largeImage} alt="" className="modalImage" />
          </Modal>
        )}

        {error && <ErrorMessage />}
      </>
    );
  }
}
