import { html, raw } from 'hono/html'

export default function Home() {
    return (html
        `
            <section class="hero is-fullheight">
                <div class="container">
                    <h1 class="title">Bienvenido al panel de administración</h1>
                    <p class="subtitle">
                        Desde aquí podrás administrar tu sitio web
                    </p>
                </div>
            </section>
        `
    )
}