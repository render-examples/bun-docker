import { html } from 'hono/html'

import { TablePlans } from './planes/tablePlan'

export default function Planes() {

    return(html
        `
            <section class="hero is-fullheight"  x-data="{ tab: 'planes', url: '/api/v1/' }" >
                <div id="event-modal" class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <form id="create-plan" hx-swap="none" x-init="$watch('tab', () => htmx.process($el))" x-bind:hx-post="url+tab">
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
                            <div class="field" x-show="tab === 'planes'">
                                <label class="label">Tipo</label>
                                <div class="control">
                                    <select class="input" name="type" required>
                                        <option value="pase">Pase/Entrada</option>
                                        <option value="evento">Evento</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field" x-show="tab === 'planes'">
                                <label class="label">Duracion</label>
                                <div class="control">
                                    <input class="input" type="number" name="duration" id="event-title" x-bind:required="tab === 'planes'">
                                </div>
                            </div>
                            <div class="control">
                                <button type="submit" class="button is-primary" x-text="'Crear' + ' ' + tab"></button>
                            </div>
                        </form>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" hx-on:click="htmx.find('#event-modal').classList.remove('is-active')"></button>
            </div>

            <div class="container" hx-ext="client-side-templates">
                
                <h1 class="title">Planes</h1>
                <h2 class="subtitle">Aquí podrás administrar todos los planes de tu negocio.</h2>
                
                <div class="tabs is-toggle is-toggle-rounded"> 
                  <ul>
                    <li :class="{ 'is-active': tab === 'planes' }" 
                      hx-trigger="click, load, refreshTablePlans from:body" id="plan_trigger" 
                      hx-get="/api/v1/planes" hx-swap="innerHTML"
                      hx-target="#tab-content"
                      @click="tab = 'planes'"
                      nunjucks-array-template="tab-template"
                    >
                      <a>Planes</a>
                    </li>
                    <li 
                      @click="tab = 'extras'" :class="{ 'is-active': tab === 'extras' }"
                      hx-trigger="click, refreshTableExtras from:body"  
                      hx-get="/api/v1/extras" hx-swap="innerHTML"
                      hx-target="#tab-content"
                      nunjucks-array-template="tab-template"
                    >
                      <a>Extras</a>
                    </li>
                  </ul>
                </div>

                <div id="tab-content">
                  
                </div>


                <script type="text/template" id="tab-template">

                  <button class="button is-primary is-pulled-right" hx-on:click="htmx.find('#event-modal').classList.add('is-active')" x-text="'Crear' + ' ' + tab"></button>

                  <table class="table mt-6 is-fullwidth">
                      <thead>
                          <tr>
                              <th>Nombre</th>
                              <th>Precio</th>
                              <th x-show="tab == 'planes'" >duracion</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody id="plans_rows">
                      {%  for item in data %}
                        <tr>
                          <td>{{ item.name }}</td>
                          <td>{{ item.price }}</td>
                          <td x-show="tab == 'planes'">{{ item.duration }}</td>
                          <td>
                            <button class="button is-danger" x-bind:hx-delete="'/api/v1/'+tab+'/'+{{ item.id }}" hx-confirm="¿Estás seguro de eliminar este registro?" hx-target="#plans_rows">Eliminar</button>
                          </td>
                        </tr>
                      {% endfor %}
                      </tbody>
                  </table>
                </script>
            </div>
        </section>
        <script>

        document.addEventListener('DOMContentLoaded', function() {

            document.getElementById('create-plan').addEventListener('htmx:afterRequest', evt => {
                if(evt.detail.xhr.status === 201){
                    bulmaToast.toast({
                        message: 'Registro guardado con éxito',
                        type: 'is-success',
                        duration: 3000,
                        dismissible: true,
                        position: 'top-center',
                        animate: { in: 'fadeIn', out: 'fadeOut' }
                    })
                }
                else{

                bulmaToast.toast({
                  message: 'Error al guardar el registro',
                  type: 'is-danger',
                  duration: 3000,
                  dismissible: true,
                  position: 'top-center',
                  animate: { in: 'fadeIn', out: 'fadeOut' }
                })

                }
            htmx.find('#event-modal').classList.remove('is-active')
            htmx.find('#create-plan').reset()

            })
            
        })
        </script>
        `
    )
}
