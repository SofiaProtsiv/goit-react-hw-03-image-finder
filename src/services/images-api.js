async function fetchImages(query, currentPage) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=24403830-5f6faa5cd05cf016990252735&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`Нет покемона с именем ${query}`));
}
export default fetchImages;
