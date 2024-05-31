import { html, raw } from 'hono/html'


export default function AdminLayout({nav,main}) {
    return (html
        `
            <!DOCTYPE html>
            <html lang="es">        
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
                <script src="https://unpkg.com/htmx.org@1.9.12"></script>
                <script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/class-tools.js"></script>
                <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bulma-toast@2.4.4/dist/bulma-toast.min.js"></script>
                <style>
                #notif.htmx-added {
                opacity: 0;
                }
                #notif {
                opacity: 1;
                transition: opacity 1s ease-out;
                }
            </style>
                <title>Jungla Magica!</title>
            </head>
            <body>
                <nav>
                    ${nav}
                </nav>
                <main class="has-background-light mt-5">
                    <div class="container">
                        <div class="columns is-centered">
                            <div class="column is-four-fifths">
                                ${main}
                            </div>
                        </div>
                    </div>
                </main>                
            </body>
            </html>
        `
    )
}