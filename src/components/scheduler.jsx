import { html } from 'hono/html'

  
export default function Scheduler() {    
        
    return(
        <div>
            <div id="test"></div>
            <div id='calendar' hx-get="/api/v1/agenda" hx-trigger="load, refreshCalendar from:body" hx-swap="none" ></div>
        
        {html`
            <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.13/index.global.min.js'></script>
            <script src='fullcalendar/core/locales/es.global.js'></script>
            <script type="module">
                document.addEventListener('DOMContentLoaded', function() {

                    var calendarEl = document.getElementById('calendar');
                    var calendar = new FullCalendar.Calendar(calendarEl, {
                        initialView: 'timeGridWeek',
                        locale: 'es',
                        timeZone: 'America/Santiago',
                        customButtons: {
                            createEventButton: {
                                text: 'Crear Evento',
                                click: function(){
                                    let elem = htmx.find('#test')
                                    elem.setAttribute('hx-ext','json-enc')
                                    htmx.ajax('get', '/api/v1/agenda/form' , {target: elem})
                                }
                            }
                        },
                        eventClick: function(info) {
                            let elem = htmx.find('#test')
                            elem.setAttribute('hx-ext','json-enc')
                            htmx.ajax('get', '/api/v1/agenda/form/' + info.event.extendedProps.id, {target: elem})
                        },
                        headerToolbar: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'createEventButton,dayGridMonth,timeGridWeek,timeGridDay'
                        },
                    });

                    document.getElementById('test').addEventListener('htmx:afterSwap', event => {
                        if (event.detail.xhr.responseURL.includes('/api/v1/agenda/form') && event.detail.requestConfig.verb === 'get') {
                    
                            let elem = htmx.find('#test')
                            let form = elem.querySelector("[id^=event-modal]")
                            form.classList.add('is-active')        
                        }
                    })

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
                                    extendedProps: event
                                }
                            })
                            calendar.addEventSource(events_formatted)
                        }
                    })
                    calendar.render();
                })                
            </script>
                `}
        </div>        
    )
}