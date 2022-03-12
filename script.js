let searchInput = document.querySelector(".search-input");
let searchIcon = document.querySelector("#search-icon");
let cardSection = document.querySelector(".card-section");
let content = document.querySelector(".content");
let officeSection = document.querySelector(".box-office-section");

const cutText = (text) => {
  if (text.length > 550) {
    let cutTextResult = text.slice(0, 551);
    return cutTextResult + "...";
  } else {
    return text;
  }
};
searchIcon.addEventListener("click", () => {
  let searchInputValue = searchInput.value;
  if (!searchInputValue) return;
  let loaderIcon = document.querySelector(".loader-section");
  loaderIcon.style.display = "flex";
  fetch(`https://imdb-api.com/en/API/Search/k_q44ie874/${searchInputValue}`)
    .then((res) => res.json())
    .then((res) => {
      if (!res.results) return;
      let firstItem = res.results[0];
      let movieId = firstItem.id;
      fetch(
        `https://imdb-api.com/en/API/Title/k_q44ie874/${movieId}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`
      )
        .then((res) => res.json())
        .then((res) => {
          const {
            title: movieTitle,
            plot: movieDescription,
            year: releaseYear,
            runtimeStr: movieDuration,
            image: moviePoster,
          } = res;
          loaderIcon.style.display = "none";
          cardSection.style.display = "none";
          officeSection.style.display = "none";
          let movieDetailsElement = document.querySelector(".movie-details");
          movieDetailsElement.innerHTML = "";
          let movieTitleDiv = document.createElement("div");
          let movieNameElement = document.createElement("h1");
          let movieDurationElement = document.createElement("p");
          movieTitleDiv.classList.add("movie-title");
          movieNameElement.classList.add("movie-name");
          movieDurationElement.classList.add("movie-duration");
          movieNameElement.innerText = movieTitle;
          movieDurationElement.innerText = movieDuration;
          movieTitleDiv.appendChild(movieNameElement);
          movieTitleDiv.appendChild(movieDurationElement);
          movieDetailsElement.appendChild(movieTitleDiv);
          //////////////////////////////
          let movieDescriptionElement = document.createElement("p");
          let movieReleaseElement = document.createElement("p");
          movieDescriptionElement.classList.add("movie-description");
          movieReleaseElement.classList.add("movie-release-year");
          movieDescriptionElement.innerText = cutText(movieDescription);
          movieReleaseElement.innerText = `Year:${releaseYear}`;
          movieDetailsElement.appendChild(movieDescriptionElement);
          movieDetailsElement.appendChild(movieReleaseElement);
          //////////
          let imageSectionElement = document.querySelector(".image-section");
          imageSectionElement.style.backgroundImage = `linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #1d1d1d 92.27%), url(${moviePoster})`;
        });
    });
});

addEventListener("load", (event) => {
  fetch(`https://imdb-api.com/en/API/BoxOffice/k_q44ie874/`)
    .then((res) => res.json())
    .then((res) => {
      //box office
      let boxOffice = document.createElement("h1");
      boxOffice.classList.add(".box-office");
      boxOffice.innerText = "Show in Cinema";
      officeSection.appendChild(boxOffice);

      res.items.forEach((element, index) => {
        if (index <= 8) {
          const { title: movieTitle, image: moviePoster } = element;

          //div card
          let card = document.createElement("div");
          card.classList.add("card");
          // card img
          let cardImg = document.createElement("img");
          cardImg.src = moviePoster;
          cardImg.classList.add("card-img");
          // card title
          let cardTitle = document.createElement("h4");
          cardTitle.classList.add("crad-title");

          cardTitle.innerText = movieTitle;
          card.appendChild(cardTitle);
          card.appendChild(cardImg);
          cardSection.appendChild(card);
        }
      });
    });
});