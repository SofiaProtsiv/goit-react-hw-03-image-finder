import PropTypes from "prop-types";
import { PureComponent } from "react/cjs/react.production.min";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={style.backdrop} onClick={this.handleBackdropClick}>
        <div className={style.modal}>
          <img className={style.image} src="" alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
