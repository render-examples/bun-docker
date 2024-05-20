import { html, raw } from 'hono/html'

export default function Login() {
    return (html
        `
            <section class="section">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-half">
                            <img src="/logo.png" style="height:350px !important;" alt="Jungla Magica">
                            <h1 class="title">Iniciar Sesión</h1>
                            <form>
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" type="email" placeholder="Email">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Contraseña</label>
                                    <div class="control">
                                        <input class="input" type="password" placeholder="Contraseña">
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-primary">Ingresar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `
    )
}