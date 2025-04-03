"use strict"

const main = document.querySelector(".main")
const searchInput = document.querySelector(".nav-input")
const submitButton = document.querySelector(".nav-search__btn")
let searchRes = []
let watchlist = []

async function handleChange(e) {
    e.preventDefault()
    searchRes = []
    let value = searchInput.value
    const res = await fetch(`https://www.omdbapi.com/?&apikey=e5c482bc&s=${value}`)
    const data = await res.json()
    if (data.Response === "True") {
    for (const item of data.Search) {
      const res2 = await fetch(`https://www.omdbapi.com/?&apikey=e5c482bc&i=${item.imdbID}`)
      const data2 = await res2.json()
      searchRes.push(data2)
    }
    main.replaceChildren()

      for (const item of searchRes) {
          main.insertAdjacentHTML('beforeend', `<div class="main-card">
          <div class="card-image-container"><img class="card-image" src=${item.Poster} alt=${item.Title}></div>
          <div class="card-content__container">
            <div class="card-content__heading">
              <h3 class="card-title">${item.Title}</h3>
              <p class="card-rating">⭐ ${item.imdbRating}</p>
            </div>
            <div class="card-content__main">
            <p class="card-duration">${item.Runtime}</p>
            <p class="card-genre">${item.Genre}</p>
            <div class="card-button__container">
            <button class="card-button" id=${item.imdbID}>+</button>
            <p>Watchlist</p>
            </div>
            </div>
            <p class="description">${item.Plot}</p>
          </div>
        </div><hr>`)
        document.getElementById(item.imdbID).addEventListener("click", addMovie)
      } 
    } else {
      main.innerHTML = '<p style="font-size: 18px; color: #DFDDDD; position: absolute; top: 30vh;">Unable to find what you’re looking for. Please try another search.</p>';
    }
    value = ""
  } 

  submitButton.addEventListener("click", handleChange)

  async function addMovie(e) {
    const res = await fetch(`https://www.omdbapi.com/?&apikey=e5c482bc&i=${e.target.id}`)
    const data = await res.json()
    localStorage.setItem(e.target.id, JSON.stringify(data))
    document.querySelector(`#${e.target.id}`).innerHTML = '✓'
  }

  document.querySelector(".nav-watchlist").addEventListener("click", () => {});
