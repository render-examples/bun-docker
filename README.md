# bun-docker

> Deploy a simple Bun [HTTP server](https://bun.sh/docs/api/http) on Render

[Bun](https://bun.sh/) is a JavaScript runtime that serves as a bundler, test runner, and package manager.

## Prerequisites

Refer to the [Bun documentation](https://bun.sh/docs/installation) to install Bun.

## Usage

### `bun install`

To run this app locally, first run `bun install` to install the dependencies.

### `bun dev`

Run `bun dev` to start the server locally.

Running the app in dev uses the [`--hot` reload flag](https://bun.sh/docs/runtime/hot#hot-mode), which Bun uses to re-run changed files without restarting the `bun` process.

The server will run on port `8081` if not `PORT` is specified. Visit [http://localhost:8081](http://localhost:8081) to view the app.

### `bun start`

Run `bun start` to start the server locally without the `--hot` reload flag.

## Deploy to Render

Use the official [Bun Docker image](https://hub.docker.com/r/oven/bun) to deploy this app to Render.

### Manual deploy

1. [Fork this repo](https://github.com/render-examples/bun-docker/fork) on GitHub or click **Use this template**.
2. Create a new **web service** on Render, and give Render permission to access your new repo.
3. Select **Docker** as your service's runtime.

That's it! Your web service will be live on your Render URL as soon as the build finishes.

### One-click deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/bun-docker)
