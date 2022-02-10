import { Component } from "react/cjs/react.production.min";
import SearchBar from "./components/SearchBar";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Loader from "./components/Loader";
import Modal from "./components/Modal";

export default class App extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <>
        <SearchBar />
        <ImageGallery>
          {showModal && <Modal onClose={this.toggleModal} />}
          <ImageGalleryItem onOpenModal={this.toggleModal} />
        </ImageGallery>
      </>
    );
  }
}
