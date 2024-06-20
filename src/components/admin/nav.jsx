import { html} from 'hono/html'

export default function Nav() {

    return (html
        `
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/admin/home">
                    <img src="/logo.png" style="height:350px !important;" alt="Jungla Magica">
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="/admin/home">
                        Inicio
                    </a>
                    <a class="navbar-item" href="/admin/kids">
                        Ingreso Niños
                    </a>
                    <a class="navbar-item" href="/admin/agenda">
                        Agenda
                    </a>

                    <a class="navbar-item" href="/admin/planes">
                        Planes
                    </a>
                </div>

                <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                Mas
                </a>

                <div class="navbar-dropdown">
                <a class="navbar-item">
                    Perfil
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item" hx-get="/api/v1/auth/logout" hx-swap="none">
                    Cerrar Sesión
                </a>
                </div>
            </div>
                </div>
            </div>
            </nav>
        `)
    }