# My Awesome Frontend App

**Project Name:** NewsNow - Live News Feed 📰
**Contributor:** YourGitHubUsername 👈 **(CRITICAL STEP for recognition)**

## Description

**NewsNow** is a modern, dynamic **Live News Feed** application that fetches and displays current news headlines using a third-party API. Built with vanilla HTML, CSS, and JavaScript, it features a clean, responsive design, a "glassmorphism" navigation bar, and key functionalities like **infinite scrolling** and an integrated search bar.

---

## Features

- **Real-time Data:** Fetches and displays actual news articles from the **NewsAPI**.
- **Infinite Scrolling:** Automatically loads the next page of articles as the user scrolls down the feed, providing a seamless browsing experience.
- **Modern UI:** Features a sleek "glass-navbar" style and a distinct, newspaper-themed background.
- **Search Functionality:** An integrated search bar is ready to be connected to the API for query-specific results.
- **Modular Design:** News articles are displayed in clean, structured cards with images, titles, descriptions, and a "Read more" link.

---

## Technologies Used

- **HTML5:** For the page structure and content.
- **CSS3:** For styling, including the modern glass-navbar, grid layout, and responsiveness.
- **JavaScript (ES6+):** For all core functionality, including API calls, DOM manipulation, infinite scrolling logic, and error handling.
- **NewsAPI:** The external service used to fetch the news data.

---

## How to Run & Setup 🛠️

Since this project relies on an external API, a one-time setup is required to make the news articles load.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/YourGitHubUsername/your-repo-name.git](https://github.com/YourGitHubUsername/your-repo-name.git)
    ```

    (Replace with your actual repository name)

2.  **Navigate to the project folder:**

    ```bash
    cd your-repo-name
    ```

3.  **Get Your API Key:**

    - Sign up for a free account at **[NewsAPI.org](https://newsapi.org/)** to get your personal API key.

4.  **Update `script.js`:**

    - Open the `script.js` file.
    - Replace the placeholder key in the following line with your _own_ key:
      ```javascript
      const apiKey = "YOUR_API_KEY_HERE"; // <--- PASTE YOUR KEY HERE
      ```
    - **Note:** The current key in the provided code is for demonstration only and may not be active. **Using your own key is critical.**

5.  **Run the App:**
    - Open `index.html` in your web browser (e.g., double-click the file).
    - The news feed should now load the latest articles, and you can scroll down to trigger the infinite loading!
