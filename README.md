# PokerMoons

<!-- Status tags -->

[![poker-moons](https://circleci.com/gh/broology/poker-moons.svg?style=svg&circle-token=a65d3e691f3d216ca5885e9e209a598b7520b4b7)](https://app.circleci.com/projects/project-dashboard/github/broology/)

<a href="https://pokermoons.net" rel="poker-moons-logo">![Poker Moons](https://user-images.githubusercontent.com/22535375/204163134-7c6e99ce-86a4-4b6e-897b-3216cfbb402c.png)</a>

This project was generated using [Nx](https://nx.dev).

## Description

PokerMoons makes it easy to connect with friends and family for a fun game of free online poker.

The goal of this project is to test our ability to work as a team and get a project finished. Taking the time to teach each other new frameworks, techniques, and coding patterns that some of us haven't used before.

## Quick Start

### Pre-requisites

-   [Node v14 (using nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)
-   [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
-   [Docker Desktop](https://docs.docker.com/engine/install/)

### Setting up repo

_After installing all [pre-requisites](#pre-requisites)_

```bash
# Install all project dependencies
yarn
```

### Testing changes

```bash
# After making changes to a library you may test the library be running:
yarn nx test <LIBRARY>
```

### Serving apps locally

**1. Setup `.env` file.**

```bash
# Local log level (options: info, warn, error, debug)
LOG_LEVEL=info

# Local redis configuration
REDIS_HOST=localhost
REDIS_PORT=6379
```

**2. Setup docker compose**

_You must have redis running before you can serve the apps locally._

```bash
# If docker is installed then this will provision a local redis instance under "localhost:6379"
docker compose up
```

**3. Serving apps**

In a terminal run the following to serve the frontend (Angular app).

```bash
yarn nx serve frontend
```

In a separate terminal run the following to serve the backend (NestJS API server).

```bash
yarn nx serve backend
```

Open `localhost:4200` in a browser.

### Further readings

To understand more about how the repo is structure and tools that can be utilized in the repo, see resources below.

-   [Nx Concepts](https://nx.dev/concepts)
-   [NestJS Documentation](https://docs.nestjs.com/)
-   [Angular Documentation](https://angular.io/guide/what-is-angular)
