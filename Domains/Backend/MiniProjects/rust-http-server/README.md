# 🚀 A Simple HTTP server (Rust)

**Contributor:** AksharGoyal

## 🔍 Overview
A minimal, single-file HTTP server written in Rust. It serves files from the current working directory over HTTP and is intended as a learning/example project for how to accept TCP connections and respond to basic HTTP GET requests.

## ✨ Features
- Serve static files from the current working directory
- Basic HTTP/1.0 GET support
- Returns appropriate HTTP status codes (200, 404, 400)
- Simple request logging to stdout
- Safe path handling to avoid serving files outside the working directory (no directory traversal)
- Small, dependency-free implementation using the Rust standard library — ideal for learning

## 🧰 Tech stack
- Rust
- cargo (build/run/test)
- rustfmt (formatting) and clippy (lints) for development
  
## ⚡ Quickstart
1. Open a terminal in the project folder `rust-http-server`.
2. Build and run:
   - `cargo run`
3. By default the server listens on port 5500. In another terminal try:
   - `curl http://localhost:5500/Cargo.toml` — prints the file contents
   - `curl -i http://localhost:5500/Cargo.toml` — prints response headers and body
4. Stop the server with Ctrl+C.
