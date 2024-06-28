<a href="https://last9.io"><img src="https://last9.github.io/assets/last9-github-badge.svg" align="right" /></a>

# Awesome Prometheus Toolkit

_The most apt toolkit for your Prometheus setup._

Kickstarting your monitoring journey with Prometheus is a broken experience and one struggles with a standardized set of components, alerting rules, and dashboards to use. APT aims to build a standardized resource across the instrumentation, query, and alerting pipelines.

With the v0.1 of Awesome Prometheus Toolkit, we are setting a foundation for the developer experience we want:

1. You point APT to your running Prometheus server
2. APT identifies which components are sending metrics to Prometheus
3. APT gives recommendations on what alert rules (sourced from [awesome-prometheus-alerts](https://github.com/samber/awesome-prometheus-alerts)) should be applied

Read our launch blog post [here](https://last9.io/blog/announcing-awesome-prometheus-toolkit).

[![Demo of Awesome Prometheus Toolkit](https://github.com/last9/awesome-prometheus-toolkit/assets/1834234/b0ed8f22-f2f2-4a3f-a8bb-76bd00753681)](https://www.youtube.com/watch?v=yFqCdkc23Gc)

Currently, APT gives you recommendations and tracks which rules are already applied for the following components:

1. Clickhouse
2. Elasticsearch
3. HaProxy
4. Kubernetes
5. Nginx
6. PostgreSQL

## 💻 Getting Started

1. Run `npm install` to install the dependencies
2. Run `npm run dev` to run the dev server
3. Open `localhost:3000` in your browser
4. Enter the URL of your local/test/production Prometheus server, and click Connect
   - You can also set the auth, if your server requires it
5. Once APT identifies the supported components in your emitted metrics, you can view the recommendations. You can simply copy the recommended rules and apply them in your Prometheus’ `rules.yml`
6. If you have any additional components, you can also use the Browse Library section to find and copy those rules

## 🔧 Setup Demo Prometheus Server (Optional)

If you don’t have a Prometheus server handy but still want to play around with APT, you can also use the demo setup provided in the repo to generate metrics for the supported components (except Kubernetes).

1. Run `cd promtheus-server`
2. Run `docker compose up` to start the local server
3. Use `localhost:9090` as the source URL on the APT home screen, without any required auth

## About Last9

[Last9](https://last9.io) builds reliability tools for SRE and DevOps.

<a href="https://last9.io"><img src="https://last9.github.io/assets/email-logo-green.png" alt="" loading="lazy" height="40px" /></a>
