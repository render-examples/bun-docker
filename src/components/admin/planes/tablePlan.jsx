import { html } from 'hono/html'

const TablePlans = ({plans}) => {
    console.log(plans)
    let table_rows = '<tr><td>nada</td></tr>'

    if(plans){
        plans.map(plan => {
            table_rows += `
                <tr>
                    <td>${plan.name}</td>
                    <td>${plan.price}</td>
                    <td>${plan.duration}</td>
                    <td>
                        <button class="button is-danger" hx-delete="/api/v1/planes/${plan.id}" hx-trigger="refreshTable">Eliminar</button>
                    </td>
                </tr>
            `
        })
    }

    return (html `${table_rows}`)

}

export { TablePlans}