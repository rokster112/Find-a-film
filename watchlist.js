
const main = document.querySelector(".watchlist-main")
const homeBtn = document.querySelector(".nav-watchlist")

  async function getMovies() {
    main.replaceChildren()
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
      if (key !== "backstopjs" && key) {
        const res = await fetch(`https://www.omdbapi.com/?&apikey=e5c482bc&i=${key}`)
        const data = await res.json()
        main.insertAdjacentHTML('beforeend', `<div class="main-card">
        <div class="card-image-container"><img class="card-image" src=${data.Poster} alt=${data.Title}></div>
        <div class="card-content__container">
        <div class="card-content__heading">
          <h3 class="card-title">${data.Title}</h3>
          <p class="card-rating">⭐ ${data.imdbRating}</p>
        </div>
        <div class="card-content__main">
          <p class="card-duration">${data.Runtime}</p>
          <p class="card-genre">${data.Genre}</p>
          <div class="card-button__container">
            <button class="card-button" id=watchlist-${data.imdbID}>-</button>
            <p>Remove</p>
          </div>
          </div>
          <p class="description">${data.Plot}</p>
        </div>
      </div><hr>`)
        document.getElementById(`watchlist-${data.imdbID}`).addEventListener("click", () => {
          localStorage.removeItem(key)
          location.reload()
        })
      } else if ((localStorage.length < 2 && !key.startsWith("tt")) || !key) {
        main.innerHTML = `<p style="color: #DFDDDD; font-size: 18px;">Your watchlist is looking a little empty...</p>
                          <div class="watchlist-noContent">
                          <a class="card-button" id="home-link" href="index.html">+</a><p style="color: black; font-size: 14px; font-weight: 700;">Let’s add some movies!</p>
                          </div>`
        homeBtn.addEventListener("click", () => {})
      }

      } 
    }

    getMovies()