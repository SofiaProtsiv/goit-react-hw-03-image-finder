import style from "./imageGalleryItem.module.css";

export default function ImageGalleryItem({ images: { hits }, openModal }) {
  return (
    <>
      <ul className={style.imageGallery}>
        {hits.map((entry) => (
          <li
            key={entry.id}
            id={entry.id}
            className={style.item}
            onClick={openModal}
          >
            <img
              className={style.image}
              src={entry.largeImageURL}
              alt={entry.id}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
