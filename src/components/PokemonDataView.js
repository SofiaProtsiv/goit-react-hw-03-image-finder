export default function ImageGalleryItem({ images: { hits } }) {
  return (
    <>
      <ul>
        {hits.map((entry) => (
          <li key={entry.id} className="item">
            <img src={entry.largeImageURL} alt={entry.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
