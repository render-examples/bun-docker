import { html} from 'hono/html'

const SelectPlans = (data) => {
    return(
        <div>
            <label class="label">Plan</label>
        <div class="control">
            <div class="select" >
                <select id="planId" hx-get="/api/v1/planes" hx-swap="none" hx-trigger="load" name="planId">
                </select>
            </div>
        </div>

        {(data.data) ? html`
            <script>
                document.getElementById('planId').addEventListener('htmx:afterRequest', evt => {
                    let select = document.getElementById('planId')
                    let plans = evt.detail.xhr.response
                    plans = JSON.parse(plans)
                    select.innerHTML = plans.map(plan => {
                        return \`<option value="\${plan.id}" \${plan.id === ${data.data} ? 'selected' : ''}>\${plan.name}</option>\`
                    }).join('')
                })
            </script>` : html`
            <script>
                document.getElementById('planId').addEventListener('htmx:afterRequest', evt => {
                    let select = document.getElementById('planId')
                    let plans = evt.detail.xhr.response
                    plans = JSON.parse(plans)
                    select.innerHTML = plans.map(plan => {
                        return \`<option value="\${plan.id}">\${plan.name}</option>\`
                    }).join('')
                })
            </script>`}
        </div>
    )
}

export { SelectPlans }