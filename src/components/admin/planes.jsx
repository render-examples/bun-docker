import { html } from 'hono/html'

import { TablePlans } from './planes/tablePlan'

export default function Planes() {

    return(html
        `
            <section class="hero is-fullheight">
                <div id="event-modal" class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <form id="create-plan" hx-post="/api/v1/planes" hx-ext="json-enc" hx-swap="none">
                            <div class="field">
                                <label class="label">Nombre</label>
                                <div class="control">
                                    <input class="input" type="text" name="name" id="event-title" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Precio</label>
                                <div class="control">
                                    <input class="input" type="number" name="price" id="event-title" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Duracion</label>
                                <div class="control">
                                    <input class="input" type="number" name="duration" id="event-title" required>
                                </div>
                            </div>
                            <div class="control">
                                <button type="submit" class="button is-primary">Crear Plan</button>
                            </div>
                        </form>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" hx-on:click="htmx.find('#event-modal').classList.remove('is-active')"></button>
            </div>

            <div class="container">
                <h1 class="title">Planes</h1>
                <h2 class="subtitle">Aquí podrás administrar todos los planes de tu negocio.</h2>
                <button class="button is-primary is-pulled-right" hx-on:click="htmx.find('#event-modal').classList.add('is-active')">Crear Plan</button>
                <table class="table mt-6 is-fullwidth" hx-get="/api/v1/planes" id="plan_trigger" hx-trigger="load, refreshTable from:body" hx-swap="none">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>duracion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="plans_rows">
                    </tbody>
                </table>
            </div>
        </section>
        <script>

        document.addEventListener('DOMContentLoaded', function() {

            document.getElementById('create-plan').addEventListener('htmx:afterRequest', evt => {
                if(evt.detail.xhr.status === 201){
                    bulmaToast.toast({
                        message: 'Plan creado correctamente.',
                        type: 'is-success',
                        duration: 3000,
                        dismissible: true,
                        position: 'top-center',
                        animate: { in: 'fadeIn', out: 'fadeOut' }
                    })
                    htmx.find('#event-modal').classList.remove('is-active')
                    htmx.find('#create-plan').reset()
                }

            })

            htmx.on('htmx:afterRequest', (event) => {
                if (event.detail.xhr.responseURL.includes('/api/v1/planes')) {
                    
                    const plans = JSON.parse(event.detail.xhr.responseText)
                    let table_rows = ''
                    plans.map(plan => {
                        table_rows += \`<tr>
                            <td>\${plan.name}</td>
                            <td>\${plan.price}</td>
                            <td>\${plan.duration}</td>
                            <td>
                                <button class="button is-danger" hx-delete="/api/v1/planes/\${plan.id}">Eliminar</button>
                            </td>
                        </tr>\`
                    })
                    let element = document.getElementById('plans_rows')
                    element.innerHTML = table_rows
                }
            })

        })
        </script>
        `
    )
}