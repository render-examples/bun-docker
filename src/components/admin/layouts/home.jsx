import { html, raw } from "hono/html";

export default function AdminLayout({ nav, main }) {
  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link rel="stylesheet" href="/main.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css"
        />
        <script
          src="https://unpkg.com/htmx.org@2.0.2"
          integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/nunjucks@3.2.4/browser/nunjucks.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
        <script src="https://unpkg.com/htmx-ext-client-side-templates@2.0.0/client-side-templates.js"></script>
        <script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/class-tools.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bulma-toast@2.4.4/dist/bulma-toast.min.js"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/zod@3.23.8/lib/index.umd.min.js"></script>
        <script
          src="https://kit.fontawesome.com/e862562e60.js"
          crossorigin="anonymous"
        ></script>

        <title>Jungla Magica!</title>
      </head>
      <body>
        <nav>{nav}</nav>
        <main class="has-background-light mt-5">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-four-fifths">{main}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
