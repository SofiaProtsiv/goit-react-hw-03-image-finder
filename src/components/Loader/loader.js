import { ImSpinner } from "react-icons/im";
import ImageGalleryItem from "../ImageGalleryItem";
import style from "./loader.module.css";

const styles = {
  spinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    fontSize: 28,
  },
};

export default function Loader() {
  const images = {
    hits: [],
  };
  return (
    <div role="alert">
      <div style={styles.spinner}>
        <ImSpinner size="32" className={style.spinner} />
        Loading...
      </div>
      <ImageGalleryItem images={images} />
    </div>
  );
}
