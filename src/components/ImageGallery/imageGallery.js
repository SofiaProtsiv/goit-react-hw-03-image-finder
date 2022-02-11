import { Component } from "react";

import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Loading from "../Loader";
import Modal from "../Modal";
import ErrorMessage from "../ErrorMessage";

import api from "../../services/images-api";

import { toast, ToastContainer } from "react-toastify";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: Status.IDLE,
    isLoading: false,
    isModalOpen: false,
    largeImageId: null,
    largeImage: [],
    pageNumber: 1,
    search: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;
    const nextPage = this.props.currentPage;

    if (prevName !== nextName) {
      this.setState({
        status: Status.PENDING,
        pageNumber: nextPage,
        search: nextName,
      });

      api
        .fetchImage(nextName, nextPage)
        .then((images) => this.setState({ images, status: Status.RESOLVED }))
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
  }
  findPic = () => {
    const largeImg = this.state.images.hits.find((image) => {
      return image.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id),
    });
  };
  closeModal = () => this.setState({ isModalOpen: false });

  scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  loadMore = () => {
    const { pageNumber, search } = this.state;
    api
      .fetchImage(search, pageNumber + 1)
      .then((images) => {
        this.setState({
          images,
          pageNumber: pageNumber + 1,
          status: Status.RESOLVED,
        });
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
    this.scrollToTop();
  };

  render() {
    const { images, error, status, isModalOpen, largeImageId, pageNumber } =
      this.state;

    const { searchQuery } = this.props;
    if (status === "idle") {
      return (
        <div
          className="notification"
          style={{
            fontSize: 28,
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
            marginTop: 15,
          }}
        >
          Find images
        </div>
      );
    }

    if (status === "pending") {
      return <Loading searchQuery={searchQuery} />;
    }

    if (status === "rejected") {
      return <ErrorMessage message={error.message} />;
    }

    if (status === "resolved") {
      const total = images.total;
      const totalHits = pageNumber * 12 >= images.totalHits;
      return (
        <>
          {total === 0 ? (
            toast.error("NO IMAGES")
          ) : (
            <ImageGalleryItem openModal={this.openModal} images={images} />
          )}
          {isModalOpen && (
            <Modal onClose={this.closeModal}>
              <img
                id={largeImageId}
                src={this.findPic().largeImageURL}
                alt={this.findPic().tags}
              />
            </Modal>
          )}
          {!totalHits && <Button loadMore={this.loadMore} />}
          <ToastContainer />
        </>
      );
    }
  }
}
