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
                            <form hx-post="/api/v1/auth/login" id="login-form" hx-swap="none">
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" name="email" type="email" placeholder="Email">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Contraseña</label>
                                    <div class="control">
                                        <input class="input" type="password" name="password" placeholder="Contraseña">
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-primary" type="submit"  >Ingresar</button>
                                    </div>                                  
                                </div>
                            </form>
                        </div>                        
                    </div>
                </div>
            </section>
            <script>
                document.getElementById('login-form').addEventListener('htmx:afterRequest', evt => {
                    if(evt.detail.xhr.status === 200){
                        bulmaToast.toast({
                            message: 'Bienvenido...redireccionando.',
                            type: 'is-success',
                            duration: 3000,
                            dismissible: true,
                            position: 'top-center',
                            animate: { in: 'fadeIn', out: 'fadeOut' }
                        })
                        setTimeout(()=>{window.location.href = '/admin/home'},3000)
                    }
                })
            </script>
        `
    )
}