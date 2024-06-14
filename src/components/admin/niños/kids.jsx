

import { html } from 'hono/html'
import { SelectPlans } from '../agenda/plans'

export default function Kids() {

    return(
            <section class="hero is-fullheight" style="display:block;">
                <h1 class="title">Ingreso de niños</h1>
                <p class="subtitle">
                    Desde aquí podrás monitorear el tiempo de los niños en la jungla mágica.
                </p>
                <div class="mt-6">
                    <button class="button is-primary" hx-on:click="htmx.find('#event-modal').classList.add('is-active')">Ingresar niño</button>
                    <h4 >Sugerencia: Tener confirmación visual de la salida de los niños antes de eliminarlos.</h4>
                </div>

                <div class="modal" id="event-modal">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="box">
                            <form id="create-kid" hx-post="/api/v1/kids" hx-ext="json-enc" hx-swap="none">
                                <div class="field">
                                    <label class="label">Nombre Niño</label>
                                    <div class="control">
                                        <input class="input" type="text" name="name" id="event-title" required/>
                                    </div>
                                </div>
                                <div class="field">
                                    {<SelectPlans type={'pase'}/> }
                                </div>
                                <div class="field">
                                    <label class="label">Rut Responsable</label>
                                    <div class="control">
                                        <input class="input" type="text" name="rut" id="event-title" required/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Nombre Responsable</label>
                                    <div class="control">
                                        <input class="input" type="text" name="responsable" id="event-title" required/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Telefono</label>
                                    <div class="control">
                                        <input class="input" type="number" name="phone" id="event-title" required/>
                                    </div>
                                </div>
                                <div class="control">
                                    <button type="submit" class="button is-primary">Ingresar niño</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close" hx-on:click="htmx.find('#event-modal').classList.remove('is-active')"></button>
                </div>

                <div id="kids" hx-get="/api/v1/kids" hx-trigger="load,every 15s, refreshKids from:body" class="mt-6">
                </div>
                {
                    html`
                        <script>
                            let elem = htmx.find('#create-kid')
                            elem.addEventListener('htmx:afterRequest', evt => {
                                if(evt.detail.xhr.status === 201){
                                    htmx.find('#create-kid').reset()
                                    htmx.find('#event-modal').classList.remove('is-active')

                                    bulmaToast.toast({
                                        message: 'Niño Ingresado',
                                        type: 'is-success',
                                        duration: 3000,
                                        dismissible: true,
                                        position: 'top-center',
                                        animate: { in: 'fadeIn', out: 'fadeOut' }
                                    })   
                                }
                            })
                        </script>                            
                    `
                }
            </section>
    )
}