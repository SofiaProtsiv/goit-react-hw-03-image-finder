function fetchImage(query, currentPage) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=24403830-5f6faa5cd05cf016990252735&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет покемона с именем ${query}`));
  });
}

const api = {
  fetchImage,
};

export default api;
