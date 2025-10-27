# 💖 Kind Act Generator (2025)

**Contributor:** supritimishra  
**Domain:** Frontend / Web Application  
**Last Updated:** October 2025  

---

## 🌟 Overview

A delightful and simple web app that **generates a new act of kindness every day**, encouraging users to make the world a little brighter 🌈.  
Built with a focus on smooth animations, positive UX, and daily engagement, this project also allows contributors to add their own kind acts to the pool.

✅ Daily random act of kindness (stored in localStorage)  
✅ Modern, responsive UI with soft gradients and animations  
✅ User-contributed kindness ideas  
✅ Designed for web browsers — lightweight and offline-friendly  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **Styling** | CSS Animations, Flexbox/Grid, Gradient Backgrounds |
| **Storage** | LocalStorage (for daily act saving) |
| **Version Control** | Git + GitHub |
| **Deployment** | Vercel / Netlify (recommended) |

---

## ⚙️ Prerequisites

No complex setup — works out of the box 🎉

You only need:
- A modern web browser (Chrome, Edge, Firefox, Safari)
- (Optional) Node.js ≥ v18 if you plan to use a local development server

---

## 🚀 Getting Started

### Option 1 — Run Locally (No Installation)
Just open the `index.html` file in your browser.

### Option 2 — Run via Local Server
```bash
# Clone the repository
git clone https://github.com/your-username/kind-act-generator.git

# Navigate into project
cd kind-act-generator

# Open with VS Code Live Server or any static server


---

// Example random act generator snippet
const acts = [
  "Compliment a stranger 😊",
  "Leave a kind note for someone 💌",
  "Help a friend without being asked 🤝",
  "Share your favorite song with someone 🎵"
];

function showRandomAct() {
  const randomIndex = Math.floor(Math.random() * acts.length);
  document.getElementById("actDisplay").innerText = acts[randomIndex];
}


---


🌍 Useful Resources
MDN Web Docs: JavaScript

CSS Gradient Generator

Vercel Deployment Docs

Netlify Deploy Guide