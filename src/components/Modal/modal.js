import PropTypes from "prop-types";
import { PureComponent } from "react/cjs/react.production.min";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

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
    const { children } = this.props;
    return createPortal(
      <div className={style.backdrop} onClick={this.props.onClose}>
        <div className={style.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
