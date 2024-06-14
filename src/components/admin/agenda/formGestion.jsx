import { html } from 'hono/html'


import { SelectPlans } from './plans'

export const FormGestion = ({data}) => { 

    const id = data ? data.agenda.id : null
    
    return(
        <div class="modal" id={data ? `event-modal-${id}` : 'event-modal'}>
                <div class="modal-background"></div>
                <div class="modal-content" style="width: 80%; height:80%;overflow:hidden;">
                <form id="create-event-form" hx-ext="json-enc" hx-swap="none" {...(!data ? {'hx-post': '/api/v1/agenda'}:{'hx-put': `/api/v1/agenda/${id}`})}>
                    <div class="columns">
                        <div class="column is-3">
                            <div class="box">
                                <h3 class="title">Crear Evento</h3>
                                <div class="field">
                                        <label class="label">Evento</label>
                                        <div class="control">
                                            <input class="input" type="text" name="evento" id="event-title" value={data? data.agenda.evento : ''} required/>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Descripcion</label>
                                        <div class="control">
                                            <textarea class="textarea" rows="5" name="descripcion" >{data? data.agenda.descripcion : ''}</textarea>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Numero contacto</label>
                                        <div class="control">
                                            <input class="input" type="text" name="numero_contacto" id="event-title" value={data? data.agenda.numero_contacto : ''} required/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="box">
                                <h3 class="title">Detalles</h3>                                    
                                    
                                <div class="field">
                                    <label class="label">Fecha</label>
                                    <div class="control">
                                        <input class="input" type="date" name="fecha" id="event-start" value={data? data.agenda.fecha : ''} required/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Hora Comienzo</label>
                                    <div class="control">
                                        <input class="input" type="time" name="start" id="event-end" value={data? data.agenda.start : ''} required/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Hora Termino</label>
                                    <div class="control">
                                        <input class="input" type="time" name="end" id="event-end" value={data? data.agenda.end : ''} required/>
                                    </div>
                                </div>
                                
                                <div class="control">
                                    <button type="submit" class="button is-primary">{id ? 'Actualizar' : 'Crear'} Evento</button>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="box">
                                <h3 class="title">Realizar Pago</h3>
                                <div class="columns">
                                    <div class="column is-6">
                                        <div class="field">
                                            <SelectPlans data={data? data.agenda.planId : ''} type={'evento'}/>
                                        </div>
                                    </div>
                                    <div class="column is-6">
                                        <div class="field">
                                            <label class="label">Monto a Pagar</label>
                                            <div class="control">
                                                <input class="input" type="number" name="amount" id="abono" min="0" />
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="columns">
                                    <div class="column is-6">
                                        <div class="field">
                                            <label class="label">Documento</label>
                                            <div class="control">
                                                <div class="file has-name">
                                                    <label class="file-label">
                                                        <input class="file-input" type="file" name="resume" multiple />
                                                        <span class="file-cta">
                                                            <span class="file-icon">
                                                            <i class="fas fa-upload"></i>
                                                            </span>
                                                            <span class="file-label"> Elija un archivo</span>
                                                        </span>
                                                        <span class="file-name"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6">
                                        {data? html`
                                            <div class="field">
                                                <label class="label" id="valor_plan" >Valor Plan: ${data.plans.price}</label>
                                                <label class="label" id="restante-${data.agenda.id}"></label>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-12">
                            <div class="box">
                                <h3 class="title">Historial Pagos</h3>
                            </div>
                        </div>
                    </div>                
                    </form>
                </div>
                <button class="modal-close is-large" id="button-close-modal" aria-label="close"></button>
                {html`
                    <script type='module'>

                        document.getElementById('button-close-modal').addEventListener('click', () => {
                            let form = document.querySelector("[id^=event-modal]")
                            form.remove()
                        })

                        document.getElementById('create-event-form').addEventListener('htmx:afterRequest', evt => {
                            if (event.detail.xhr.responseURL.includes('/api/v1/agenda') && event.detail.requestConfig.verb === 'post' && event.detail.xhr.status === 201) {
                                let form = document.querySelector("[id^=event-modal]")
                                form.classList.remove('is-active')
                                form.remove()
                                bulmaToast.toast({
                                    message: 'Evento creado.',
                                    type: 'is-success',
                                    duration: 3000,
                                    dismissible: true,
                                    position: 'top-center',
                                    animate: { in: 'fadeIn', out: 'fadeOut' }
                                })                            
                            }
                            if (event.detail.xhr.responseURL.includes('/api/v1/agenda') && event.detail.requestConfig.verb === 'put' && event.detail.xhr.status === 200) {
                                let form = document.querySelector("[id^=event-modal-]")
                                form.classList.remove('is-active')
                                form.remove()
                                bulmaToast.toast({
                                    message: 'Evento actualizado.',
                                    type: 'is-success',
                                    duration: 3000,
                                    dismissible: true,
                                    position: 'top-center',
                                    animate: { in: 'fadeIn', out: 'fadeOut' }
                                })                            
                            }
                        })

                        document.addEventListener('DOMContentLoaded', function() {
                            if(document.querySelector("[id^=event-modal-]")){
                                let form = document.getElementById('create-event-form')
                                form.removeAttribute('hx-post')
                            }                                
                        })

                        let abono = document.getElementById('abono')
                        abono.addEventListener('keyup', evt => {
                            let input_abono = document.querySelector("[id^=restante-]")
                            let valor_plan = document.querySelector("[id^=valor_plan]")
                            let final = parseInt(valor_plan.innerText.split(':')[1]) - (parseInt(evt.target.value > 0 ? evt.target.value : 0))
                            input_abono.innerHTML = 'Monto Restante: ' +  (final >= 0 ? final : 0)
                        })
                    </script>`
                }
            
        </div>

    )
}