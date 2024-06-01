import { html, raw } from 'hono/html'


import { SelectPlans } from './admin/agenda/plans'

const moment = require('moment')

export default function Scheduler() {

    return(html
        `
        <div id="event-modal" class="modal">
                <div class="modal-background"></div>
                <div class="modal-content" style="width: 80%; height:80%;overflow:hidden;">
                <form id="create-event-form" hx-post="/api/v1/agenda" hx-ext="json-enc">
                    <div class="columns">
                        <div class="column is-3">
                            <div class="box">
                                <h3 class="title">Crear Evento</h3>
                                <div class="field">
                                        <label class="label">Evento</label>
                                        <div class="control">
                                            <input class="input" type="text" name="evento" id="event-title" required>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Descripcion</label>
                                        <div class="control">
                                            <textarea class="textarea" rows="5" name="descripcion"></textarea>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Numero contacto</label>
                                        <div class="control">
                                            <input class="input" type="text" name="numero_contacto" id="event-title" required>
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
                                        <input class="input" type="date" name="fecha" id="event-start">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Hora Comienzo</label>
                                    <div class="control">
                                        <input class="input" type="time" name="start" id="event-end">
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Hora Termino</label>
                                    <div class="control">
                                        <input class="input" type="time" name="end" id="event-end">
                                    </div>
                                </div>
                                
                                <div class="control">
                                    <button type="submit" class="button is-primary">Create Event</button>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="box">
                                <h3 class="title">Pagos</h3>
                                <div class="columns">
                                    <div class="column is-6">
                                        <div class="field">
                                            ${<SelectPlans />}
                                        </div>
                                    </div>
                                    <div class="column is-6">
                                        <div class="field">
                                            <label class="label">Monto a Pagar</label>
                                            <div class="control">
                                                <input class="input" type="number" name="amount" id="event-title" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Documento</label>
                                    <div class="control">
                                        <div class="file has-name">
                                            <label class="file-label">
                                                <input class="file-input" type="file" name="resume" />
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
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-12">
                            <div class="box">
                                <h3 class="title">Resumen</h3>
                            </div>
                        </div>
                    </div>                
                    </form>
                </div>
                <button class="modal-close is-large" aria-label="close" hx-on:click="htmx.find('#event-modal').classList.remove('is-active')"></button>
        </div>

        <div id='calendar' hx-get="/api/v1/agenda" hx-trigger="load, refreshCalendar from:body" hx-swap="none" ></div>

        <script>

            document.addEventListener('DOMContentLoaded', function() {
                
                document.getElementById('create-event-form').addEventListener('htmx:afterRequest', evt => {
                    if (event.detail.xhr.responseURL.includes('/api/v1/agenda') && event.detail.requestConfig.verb === 'post' && event.detail.xhr.status === 201) {
                        htmx.find('#event-modal').classList.remove('is-active')
                        bulmaToast.toast({
                            message: 'Evento creado correctamente',
                            type: 'is-success',
                            duration: 3000,
                            dismissible: true,
                            position: 'top-center',
                            animate: { in: 'fadeIn', out: 'fadeOut' }
                        })
                    }
                })


                var calendarEl = document.getElementById('calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'timeGridWeek',
                    locale: 'es',
                    timeZone: 'America/Santiago',
                    customButtons: {
                        createEventButton: {
                            text: 'Crear Evento',
                            click: function() {
                                var modal = document.getElementById('event-modal');
                                modal.classList.add('is-active');
                            }
                        }
                    },
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'createEventButton,dayGridMonth,timeGridWeek,timeGridDay'
                    },
                });

                document.getElementById('calendar').addEventListener('htmx:afterRequest', event => {
                    if (event.detail.xhr.responseURL.includes('/api/v1/agenda') && event.detail.requestConfig.verb === 'get') {
                        calendar.removeAllEvents()
                        const events = JSON.parse(event.detail.xhr.responseText)
                        let events_formatted = events.map(event => {

                            let fecha = event.fecha.split('T')[0]
                            let start = event.start.split('T')[1]
                            let end = event.end.split('T')[1]

                            return {
                                title: event.evento,
                                start: fecha + 'T' + start,
                                end: fecha + 'T' + end,
                            }
                        })
                        calendar.addEventSource(events_formatted)
                    }
                })                

                calendar.render();
            });
            
        </script>

        <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.13/index.global.min.js'></script>
        <script src='fullcalendar/core/locales/es.global.js'></script>
        `
    )
}