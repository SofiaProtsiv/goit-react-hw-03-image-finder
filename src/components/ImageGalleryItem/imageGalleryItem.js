import PropTypes from "prop-types";
import style from "./imageGalleryItem.module.css";

function ImageGalleryItem({ onOpenModal }) {
  return (
    <li className={style.item} onClick={() => onOpenModal()}>
      <img className={style.image} src="" alt="" />
    </li>
  );
}

// ImageGalleryItem.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default ImageGalleryItem;
