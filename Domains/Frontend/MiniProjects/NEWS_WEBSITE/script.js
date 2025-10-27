const newsContainer = document.getElementById("news-container");
const loader = document.getElementById("loader");

// API Details
const pageSize = 10;
let page = 1;
let isLoading = false;



// Fetch News Function
async function fetchNews() {
    if (isLoading) return;
    isLoading = true;
    loader.style.display = "flex";

    try {
        // New, Secure way:
        const response = await fetch(`http://localhost:3000/api/news?q=India&pageSize=5&page=${page}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
            page++;
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        loader.style.display = "none";
        isLoading = false;
    }
}

// Display News Function
function displayNews(articles) {
    articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <div class="content">
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;
        newsContainer.appendChild(card);
    });
}
fetchNews();

// Infinite Scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchNews();
    }
});

// Initial Load

