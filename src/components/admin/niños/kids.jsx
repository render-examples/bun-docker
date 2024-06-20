

import { html } from 'hono/html'
import { SelectPlans } from '../agenda/plans'


export default function Kids() {

    return(
            <section class="hero is-fullheight" style="display:block;">
                <h1 class="title">Ingreso de niños</h1>
                <p class="subtitle">
                    Desde aquí podrás monitorear el tiempo de los niños en la jungla mágica.
                </p>
                <div class="mt-6">
                    <button class="button is-primary" hx-on:click="htmx.find('#event-modal').classList.add('is-active')">Ingresar niño</button>
                    <h4 >Sugerencia: Tener confirmación visual de la salida de los niños antes de eliminarlos.</h4>
                </div>

                <div class="modal" id="event-modal">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <div class="box">
                            <form id="create-kid" hx-ext="json-enc" hx-post="/api/v1/kids" hx-trigger="create_kid" hx-swap="none">
                                <div class="field">
                                    <label class="label">Nombre y Apellido Niño</label>
                                    <div class="control">
                                        <input class="input" type="text" name="name" id="form_name" />
                                        <span id="nameError" class="error"></span>
                                    </div>
                                </div>
                                <div class="field">
                                    {<SelectPlans type={'pase'}/> }
                                </div>
                                <div class="field">
                                    <label class="label">Rut Responsable</label>
                                    <div class="control">
                                        <input class="input" type="text" name="rut" id="form_rut" />
                                        <span id="rutError" class="error"></span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Nombre Responsable</label>
                                    <div class="control">
                                        <input class="input" type="text" name="responsable" id="form_responsable" />
                                        <span id="responsableError" class="error"></span>
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Telefono</label>
                                    <div class="control">
                                        <input class="input" type="number" name="phone" id="form_phone" />
                                        <span id="phoneError" class="error"></span>
                                    </div>
                                </div>
                                <div class="control">
                                    <button type="submit" class="button is-primary">Ingresar niño</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close" hx-on:click="htmx.find('#event-modal').classList.remove('is-active')"></button>
                </div>

                <div id="kids" hx-get="/api/v1/kids" hx-trigger="load,every 15s, refreshKids from:body" class="mt-6">
                </div>
                {
                    html`
                        <script>
                            let elem = htmx.find('#create-kid')
                            elem.addEventListener('htmx:afterRequest', evt => {
                                if(evt.detail.xhr.status === 201){
                                    htmx.find('#create-kid').reset()
                                    htmx.find('#event-modal').classList.remove('is-active')

                                    bulmaToast.toast({
                                        message: 'Niño Ingresado',
                                        type: 'is-success',
                                        duration: 3000,
                                        dismissible: true,
                                        position: 'top-center',
                                        animate: { in: 'fadeIn', out: 'fadeOut' }
                                    })   
                                }
                            })
                        </script>
                        <script type="module">

                            const z = window.Zod
                            let form = null

                            const schema = z.object({
                                name: z.string().min(5, "Campo debe tener minimo 5 caracteres").max(50, "Campo supera el maximo de 50 caracteres").nonempty("Nombre es requerido"),
                                rut: z.string().min(9, "Campo debe tener 9 caracteres").max(9, "Campo debe tener 9 caracteres").nonempty("Rut es requerido"),
                                responsable: z.string().min(1, "Campo debe tener minimo 1 caracter").max(30, "Campo supera el maximo de 30 caracteres").nonempty("Campo requerido"),
                                phone: z.string().min(9, "Campo debe tener 9 caracteres").max(9, "Campo debe tener 9 caracteres").nonempty("Campo requerido"),
                            });

                            const errorMessages = {
                                name: document.getElementById('nameError'),
                                rut: document.getElementById('rutError'),
                                responsable: document.getElementById('responsableError'),
                                phone: document.getElementById('phoneError')
                            };

                            function clearErrors() {
                                const errorElements = document.querySelectorAll('.error');
                                errorElements.forEach(error =>{
                                     error.textContent = ''
                                     error.previousElementSibling.classList.remove('is-danger')

                                });
                            }

                            document.getElementById('create-kid').addEventListener('submit', function(e){
                                e.preventDefault()
                                form = Object.fromEntries(new FormData(e.target))
                                const result = schema.safeParse(form);
                                if(!result.success){
                                    clearErrors();
                                    result.error.errors.forEach(error => {
                                        if(error.path in errorMessages){
                                            let input = htmx.find('#form_'+error.path)
                                            input.classList.add('is-danger')
                                            input.nextElementSibling.textContent = error.message
                                            input.nextElementSibling.classList.add('has-text-danger')
                                        }   
                                    })
                                }
                                else{
                                    htmx.trigger('#create-kid', 'create_kid')
                                }
                            })
                        </script>
                    `
                }
            </section>
    )
}