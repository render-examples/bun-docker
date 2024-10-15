import { html, raw } from 'hono/html'

export default function LoginLayout({section}) {
    return (html
        `
            <!DOCTYPE html>
            <html lang="es">        
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
                <script src="https://cdn.jsdelivr.net/npm/bulma-toast@2.4.4/dist/bulma-toast.min.js"></script>
                <script src="https://unpkg.com/htmx.org@1.9.12"></script>                
                <title>Jungla Magica!</title>
            </head>
            <body>
                <main>
                    ${section}
                </main>                
            </body>
            </html>
            
        `
    )
}