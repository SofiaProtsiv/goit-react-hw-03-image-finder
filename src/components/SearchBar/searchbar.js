import PropTypes from "prop-types";
import style from "./searchbar.module.css";

function Searchbar() {
  return (
    <header className={style.searchbar}>
      <form className={style.form}>
        <button type="submit" className={style.button}>
          <span className={style.label}>Search</span>
        </button>

        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

// Searchbar.propTypes = {};

export default Searchbar;
