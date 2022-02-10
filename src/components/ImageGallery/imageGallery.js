import PropTypes from "prop-types";
import style from "./imageGallery.module.css";

function ImageGallery({ children }) {
  return <ul className={style.imageGallery}>{children}</ul>;
}

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
