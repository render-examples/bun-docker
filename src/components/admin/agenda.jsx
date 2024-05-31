import { html } from 'hono/html'

import SchedulerComp from '../scheduler'

export default function Agenda() {

    return(html
        `
            <section class="hero is-fullheight">
                <h1 class="title">Agenda de eventos</h1>
                <p class="subtitle">
                    Desde aquí podrás administrar tu agenda de eventos
                </p>
                ${<SchedulerComp/>}
            </section>
        `
    )
}