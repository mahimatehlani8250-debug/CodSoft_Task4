const recommendations = {
    action: [
        {
            title: "Avengers: Endgame",
            rating: 4.9,
            image: "https://via.placeholder.com/200x300?text=Avengers"
        },
        {
            title: "John Wick",
            rating: 4.8,
            image: "https://via.placeholder.com/200x300?text=John+Wick"
        },
        {
            title: "Mad Max",
            rating: 4.7,
            image: "https://via.placeholder.com/200x300?text=Mad+Max"
        }
    ],

    comedy: [
        {
            title: "The Mask",
            rating: 4.5,
            image: "https://via.placeholder.com/200x300?text=The+Mask"
        },
        {
            title: "Home Alone",
            rating: 4.8,
            image: "https://via.placeholder.com/200x300?text=Home+Alone"
        },
        {
            title: "Mr Bean",
            rating: 4.6,
            image: "https://via.placeholder.com/200x300?text=Mr+Bean"
        }
    ],

    romance: [
        {
            title: "Titanic",
            rating: 4.9,
            image: "https://via.placeholder.com/200x300?text=Titanic"
        },
        {
            title: "The Notebook",
            rating: 4.7,
            image: "https://via.placeholder.com/200x300?text=Notebook"
        },
        {
            title: "La La Land",
            rating: 4.8,
            image: "https://via.placeholder.com/200x300?text=La+La+Land"
        }
    ],

    "sci-fi": [
        {
            title: "Interstellar",
            rating: 4.9,
            image: "https://via.placeholder.com/200x300?text=Interstellar"
        },
        {
            title: "Inception",
            rating: 4.8,
            image: "https://via.placeholder.com/200x300?text=Inception"
        },
        {
            title: "The Martian",
            rating: 4.7,
            image: "https://via.placeholder.com/200x300?text=The+Martian"
        }
    ]
};

function recommendMovie() {

    let genre = document.getElementById("genre").value;
    let result = document.getElementById("result");

    if (!genre) {
        result.innerHTML = "<h3>Please select a genre!</h3>";
        return;
    }

    let movies = recommendations[genre];

    document.getElementById("stats").innerHTML =
        `Total Recommendations: ${movies.length}`;

    let html = "";

    movies.forEach(movie => {

        saveHistory(movie.title);

        let badge =
            movie.rating >= 4.8
                ? "<span class='badge'>🏆 Top Rated</span>"
                : "";

        html += `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.rating}</p>
                ${badge}
                <button onclick="addFavorite('${movie.title}')">
                    ❤️ Favorite
                </button>
            </div>
        `;
    });

    result.innerHTML = html;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

function searchMovie() {

    let input =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    let cards =
        document.querySelectorAll(".movie-card");

    cards.forEach(card => {

        let title =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

        card.style.display =
            title.includes(input)
                ? "inline-block"
                : "none";
    });
}

document
    .getElementById("searchBox")
    .addEventListener("keyup", searchMovie);

function addFavorite(movie) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites"))
        || [];

    if (!favorites.includes(movie)) {
        favorites.push(movie);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    displayFavorites();

    alert(movie + " added to favorites!");
}

function displayFavorites() {

    let favorites =
        JSON.parse(localStorage.getItem("favorites"))
        || [];

    let list =
        document.getElementById("favoriteList");

    if (!list) return;

    list.innerHTML = "";

    favorites.forEach(movie => {
        list.innerHTML += `<li>${movie}</li>`;
    });
}

function saveHistory(movie) {

    let history =
        JSON.parse(localStorage.getItem("history"))
        || [];

    history.push(movie);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    displayHistory();
}

function displayHistory() {

    let history =
        JSON.parse(localStorage.getItem("history"))
        || [];

    let historyList =
        document.getElementById("history");

    if (!historyList) return;

    historyList.innerHTML = "";

    history.forEach(movie => {
        historyList.innerHTML += `<li>${movie}</li>`;
    });
}

function startVoiceSearch() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice search not supported.");
        return;
    }

    let recognition =
        new webkitSpeechRecognition();

    recognition.start();

    recognition.onresult = function(event) {

        let speech =
            event.results[0][0].transcript;

        document.getElementById("searchBox").value =
            speech;

        searchMovie();
    };
}

if (
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
) {
    document.body.classList.add("dark");
}

displayFavorites();
displayHistory();