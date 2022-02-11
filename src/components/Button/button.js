import style from "./button.module.css";

const Button = ({ loadMore }) => (
  <button type="button" className={style.button} onClick={loadMore}>
    Load more...
  </button>
);

export default Button;
