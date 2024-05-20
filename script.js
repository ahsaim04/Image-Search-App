const accessKey = "";

async function main() {
  const searchResultsContainer = document.querySelector(".search-results");
  const form = document.querySelector("#form");
  const inputElement = document.querySelector("#search-input");
  const showMoreButton = document.querySelector("#show-more-button"); // Corrected the selector

  let page = 1;
  let searchInput = '';

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    searchInput = inputElement.value;
    page = 1; // reset to the first page on new search
    searchResultsContainer.innerHTML = "";

    form.reset();

    await fetchResults();
  });

  const fetchResults = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?client_id=Mnj7m34iQyXuVH6wHOVfQyl1MZ0MDGhR1PCtmFC2yDE&query=${searchInput}&page=${page}`
      );

      const x = await response.json();

      for (const result of x.results) {
        const container = document.createElement("div");
        container.classList.add("search-result");

        const imageElement = document.createElement("img");
        imageElement.src = result.urls.full;

        container.appendChild(imageElement);
        searchResultsContainer.appendChild(container);
      }
    } catch (error) {
      console.error("Here is your error: ", error);
    }
  };

  showMoreButton.addEventListener("click", async () => {
    page++;
    await fetchResults();
  });
}

main();
