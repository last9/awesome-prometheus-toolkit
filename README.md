<a href="https://last9.io"><img src="https://last9.github.io/assets/last9-github-badge.svg" align="right" /></a>

# Awesome Prometheus Toolkit

_The most apt alert rules toolkit for your Prometheus setup._

Connect your Prometheus setup. Discover components emitting metrics. Get recommendations of rules to be applied.

Currently supported components:

- Kubernetes
- Nginx
- PostgreSQL

## 📝 Convention

- [Gitmoji](https://gitmoji.dev/) for commits
- [npm](https://npm.io/) as package manager

## 💻 Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the dev server

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Setup Demo Prometheus Server (Optional)

You can spin up a prometheus server with Nginx and some alerts locally to test APT. Here's how:

1. Navigate to prometheus-server

   ```bash
   cd prometheus-server
   ```

2. Start the local prometheus server

   ```bash
   docker compose up
   ```

You can now access [http://localhost:9090](http://localhost:9090) through APT.

## About Last9

[Last9](https://last9.io) builds reliability tools for SRE and DevOps.

<a href="https://last9.io"><img src="https://last9.github.io/assets/email-logo-green.png" alt="" loading="lazy" height="40px" /></a>
