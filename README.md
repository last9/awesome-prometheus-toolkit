<a href="https://last9.io"><img src="https://last9.github.io/assets/last9-github-badge.svg" align="right" /></a>

# Awesome Prometheus Toolkit

_The most apt toolkit for your Prometheus setup._

Kickstart your monitoring journey using Prometheus by letting APT make your life easier. Based on what you are monitoring, APT will give you recommendations to improve your setup.

1. Connect your Prometheus setup
2. Discover components emitting metrics
3. Get recommended rules to be applied

Note: Rule configs are fetched from Samuel Berte's [awesome-prometheus-alerts](https://github.com/samber/awesome-prometheus-alerts). Read our launch blog post [here](https://last9.io/blog/).

[![Demo of Awesome Prometheus Toolkit](https://github.com/last9/awesome-prometheus-toolkit/assets/1834234/b0ed8f22-f2f2-4a3f-a8bb-76bd00753681)](https://www.youtube.com/watch?v=yFqCdkc23Gc)

Currently supported components for discovery:

- Kubernetes
- Nginx
- PostgreSQL

## 💻 Getting Started

2. Run `npm install` to install the dependencies
3. Run `npm run dev` to run the dev server
4. Open `localhost:3000` in your browser
5. Enter the URL of your local/test/production Prometheus server, and click Connect
   - You can also set the auth, if your server requires it
6. Once APT identifies the supported components in your emitted metrics, you can view the recommendations. You can simply copy the recommended rules and apply them in your Prometheus’ `rules.yml`
7. If you have any additional components, you can also use the Browse Library section to find and copy those rules

## 🔧 Setup Demo Prometheus Server (Optional)

If you don’t have a Prometheus server handy but still want to play around with APT, you can also use the demo setup provided in the repo to generate Nginx metrics.

1. Run `cd promtheus-server`
2. Run `docker compose up` to start the local server
3. Use `localhost:9090` as the source URL on the APT home screen, without any required auth

## About Last9

[Last9](https://last9.io) builds reliability tools for SRE and DevOps.

<a href="https://last9.io"><img src="https://last9.github.io/assets/email-logo-green.png" alt="" loading="lazy" height="40px" /></a>
