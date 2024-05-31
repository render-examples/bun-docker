import { html, raw } from 'hono/html'


import { SelectPlans } from './admin/agenda/plans'

const moment = require('moment')

export default function Scheduler() {

    return(html
        `
        <div id="event-modal" class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box">
                        <form id="create-event-form" hx-post="/api/v1/agenda" hx-ext="json-enc">
                            <div class="field">
                                <label class="label">Evento</label>
                                <div class="control">
                                    <input class="input" type="text" name="evento" id="event-title" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Descripcion</label>
                                <div class="control">
                                    <input class="input" type="text" name="descripcion" id="event-title" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Numero contacto</label>
                                <div class="control">
                                    <input class="input" type="text" name="numero_contacto" id="event-title" required>
                                </div>
                            </div>
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
                            <div class="field">
                                ${<SelectPlans />}
                            </div>
                            <div class="control">
                                <button type="submit" class="button is-primary">Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" hx-on:click="htmx.find('#event-modal').classList.remove('is-active')"></button>
        </div>

        <div id='calendar' hx-get="/api/v1/agenda" hx-trigger="load, refreshCalendar from:body" hx-swap="none" ></div>

        <script>

            document.addEventListener('DOMContentLoaded', function() {
                
                document.getElementById('create-event-form').addEventListener('htmx:afterRequest', evt => {
                    console.log(evt.detail)
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