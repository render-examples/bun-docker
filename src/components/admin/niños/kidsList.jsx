
import { html,raw } from "hono/html"

const moment = require('moment')

const KidsList = (data) => {
    
    function renderKidsList() {
        return data.data.map((kid, index) => (
            index % 7 === 0 ? html`
                <div class="columns">
                    ${data.data.slice(index, index + 7).map(kid => html`
                        <div class="column is-2">
                            <div class="box pl-1 ${kid.kids.status === 'active'? 'has-background-success-light' : 'has-background-danger-light'}">
                                <div class="is-pulled-right is-clickable mr-2 ${kid.kids.status === 'finish'? 'is-inline': 'is-hidden'}"
                                    hx-put="/api/v1/kids/${kid.kids.id}/timer" hx-ext="json-enc" hx-swap="none" hx-trigger="click" hx-vals='{"status":"removed"}'>
                                    <i data-lucide="x" style="position:absolute" ></i>                            
                                </div>
                                <h2 class="title is-4 has-text-centered">${kid.kids.name}</h2>
                                <div class="media-content">
                                    <h4 class="title is-6 pt-2 mb-0">Contacto</h4>
                                    <p>${kid.kids.responsable}</p>
                                    <p>${kid.kids.phone}</p>
                                </div>
                            </div>
                        </div>
                    `)}
                </div>
                `
            : null
        ));
    }

    function setTimers(){

        let total_html = ``
        data.data.forEach(kid => {

            let tiempo_entrada = moment(kid.kids_plans.date)
            let current = moment()

            let tiempo_salida = Math.abs(current.diff(tiempo_entrada, 'minutes'))
            if(tiempo_salida >= kid.plans.duration){
                if(kid.kids.status === 'active'){
                    total_html +=`<div class="remove_kid" hx-put="/api/v1/kids/${kid.kids.id}/timer" hx-vals='{"status":"finish"}'
                                    hx-ext="json-enc" hx-swap="none" hx-trigger="load"></div>`
                }
            }
        })
        return raw(total_html)
    }

    return (
        <div>
            {renderKidsList()}
            {setTimers()}
            <script>
                lucide.createIcons();
            </script>
        </div>
    )
}


export default KidsList;