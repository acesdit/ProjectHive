**Contributor:** Munazir151

# Food Delivery Frontend (Demo)

This is a small, single-file demo of a food delivery frontend built with plain HTML, CSS and JavaScript.

Files
- `index.html` — Self-contained single-file app (contains HTML, inline CSS and JS).

How to use

Option A — Open locally (quick)
1. In File Explorer, double-click `index.html` to open it in your default browser.

Option B — Run a local static server (recommended)
Open PowerShell in this folder and run either of the following commands.

- If you have Python 3 installed:

```powershell
python -m http.server 8080
```

Then open http://localhost:8080 in your browser.

- If you have Node.js installed you can use a simple static server such as `http-server` (install once):

```powershell
npm install -g http-server
http-server -p 8080
```

Notes
- This is a demo with mock data in `index.html`. There is no backend.
- Feel free to extend with more restaurants, persist cart to localStorage, or wire to an API.

License
- MIT
