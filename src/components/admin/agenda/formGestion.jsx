import { html } from "hono/html";

import { SelectPlans } from "./plans";

export const FormGestion = ({ data }) => {
  const id = data ? data.agenda.id : null;

  return (
    <div class="modal" id={data ? `event-modal-${id}` : "event-modal"}>
      <div class="modal-background"></div>
      <div
        class="modal-content"
        style="width: 85%; height:90%;overflow-y:scroll;overflow-x:hidden;"
      >
        <div class="columns">
          <div class="column is-8">
            <form
              id="create-event-form"
              hx-ext="json-enc"
              hx-swap="none"
              hx-vals="js:{...prepareContent()}"
              hx-trigger="submit"
              {...(!data
                ? { "hx-post": "/api/v1/agenda" }
                : { "hx-put": `/api/v1/agenda/${id}` })}
            >
              <div class="box">
                <div class="columns">
                  <div class="column is-6">
                    <h3 class="title">Crear Evento</h3>
                    <div class="field">
                      <label class="label">Evento</label>
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          name="evento"
                          id="event-title"
                          value={data ? data.agenda.evento : ""}
                          required
                        />
                      </div>
                    </div>

                    <div class="field">
                      <label class="label">Extras</label>
                      <div class="control">
                        <select
                          hx-get="/api/v1/extras/selector"
                          hx-swap="innerHTML"
                          class="js-choice"
                          hx-trigger="load"
                          id="extras"
                          multiple
                        ></select>
                      </div>
                    </div>

                    <div class="field">
                      <label class="label">Descripcion</label>
                      <div class="control">
                        <textarea class="textarea" rows="5" name="descripcion">
                          {data ? data.agenda.descripcion : ""}
                        </textarea>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Numero contacto</label>
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          name="numero_contacto"
                          id="event-title"
                          value={data ? data.agenda.numero_contacto : ""}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    <h3 class="title">Detalles</h3>

                    <div class="field">
                      <SelectPlans
                        id="planId"
                        data={data ? data.agenda.planId : ""}
                        type={"evento"}
                      />
                    </div>

                    <div class="field">
                      <label class="label">Fecha</label>
                      <div class="control">
                        <input
                          class="input"
                          type="date"
                          name="fecha"
                          id="event-start"
                          value={data ? data.agenda.fecha : ""}
                          required
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Hora Comienzo</label>
                      <div class="control">
                        <input
                          class="input"
                          type="time"
                          name="start"
                          id="event-end"
                          value={data ? data.agenda.start : ""}
                          required
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Hora Termino</label>
                      <div class="control">
                        <input
                          class="input"
                          type="time"
                          name="end"
                          id="event-end"
                          value={data ? data.agenda.end : ""}
                          required
                        />
                      </div>
                    </div>

                    <div class="control is-pulled-right">
                      <button type="submit" class="button is-primary">
                        {id ? "Actualizar" : "Crear"} Evento
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="column is-4">
            <div class="box">
              <h3 class="title">Pagos</h3>
              <form
                id="create-pagos-form"
                hx-post={"/api/v1/pagos/evento/" + id}
                hx-swap="none"
                hx-trigger="submit"
                hx-encoding="multipart/form-data"
                hx-include="#planId"
                hx-ext="ignore:json-enc"
              >
                <div class="columns">
                  <div class="column is-6">
                    <div class="field">
                      <label class="label">Monto a Pagar</label>
                      <div class="control">
                        <input
                          class="input"
                          type="number"
                          name="amount"
                          id="abono"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column is-6">
                    {data
                      ? html`
                          <div class="field">
                            <div class="mt-4">
                              <label class="label" id="valor_plan"
                                >Valor Plan: ${data.plans.price}</label
                              >
                              <label
                                class="label"
                                id="restante-${data.agenda.id}"
                              ></label>
                            </div>
                          </div>
                        `
                      : ""}
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-12">
                    <div class="field">
                      <label class="label">Documento</label>
                      <div class="control">
                        <div class="file has-name">
                          <label class="file-label">
                            <input
                              class="file-input"
                              type="file"
                              name="documentos"
                              multiple
                            />
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

                <div class="control is-pulled-right">
                  <button
                    type="submit"
                    class="button is-primary"
                    id="boton-pago"
                  >
                    Registrar Pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <div class="box">
              <h3 class="title">Historial Pagos</h3>

              <table
                id="payment-table"
                class="table is-stripped is-hoverable is-fullwidth"
                hx-get={`/api/v1/pagos/evento/${id}`}
                hx-trigger="load,reload-payment from:body"
                hx-target="#payment-table tbody"
                hx-ext="json-enc"
              >
                <thead>
                  <tr>
                    <th>
                      <abbr title="Position">Fecha Pago</abbr>
                    </th>
                    <th>
                      <abbr title="monto">Monto</abbr>
                    </th>
                    <th>
                      <abbr title="Won">Documento</abbr>
                    </th>
                    <th>
                      <abbr title="Drawn">Acciones</abbr>
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        id="button-close-modal"
        aria-label="close"
      ></button>

      {html`
        <script>
          function prepareContent() {
            console.log(
              Array.from(document.querySelector("#extras").selectedOptions).map(
                (option) => option.value,
              ),
            );
            return {
              evento: document.querySelector('[name="evento"]').value,
              descripcion: document.querySelector('[name="descripcion"]').value,
              numero_contacto: document.querySelector(
                '[name="numero_contacto"]',
              ).value,
              fecha: document.querySelector('[name="fecha"]').value,
              start: document.querySelector('[name="start"]').value,
              end: document.querySelector('[name="end"]').value,
              planId: document.querySelector("#planId").value,
              extras: Array.from(
                document.querySelector("#extras").selectedOptions,
                (option) => option.value,
              ),
            };
          }
        </script>
      `}

      {html` <script type="module">
        const fileInput = document.querySelector(".file-input");

        fileInput.onchange = () => {
          if (fileInput.files.length > 0) {
            const fileName = document.querySelector(".file-name");
            fileName.textContent = fileInput.files[0].name;
          }
        };

        document
          .getElementById("extras")
          .addEventListener("htmx:afterRequest", (evt) => {
            const elem = document.querySelector(".js-choice");
            const choices = new Choices(elem, {
              removeItemButton: true,
              duplicateItemsAllowed: false,
              searchResultLimit: 5,
              searchFields: ["label", "value"],
              position: "auto",
              resetScrollPosition: false,
              shouldSort: false,
              shouldSortItems: false,
              searchPlaceholderValue: "Busque una opción",
              noChoicesText: "No hay opciones para seleccionar",
              placeholder: true,
              placeholderValue: "Seleccione una opción",
              itemSelectText: "Presione para seleccionar",
              searchEnabled: true,
              searchChoices: true,
              searchFloor: 1,
              searchResultLimit: 4,
              searchFields: ["label", "value"],
              position: "auto",
              resetScrollPosition: false,
            });
          });

        document
          .getElementById("button-close-modal")
          .addEventListener("click", () => {
            let form = document.querySelector("[id^=event-modal]");
            form.remove();
          });

        document
          .getElementById("create-event-form")
          .addEventListener("htmx:afterRequest", (evt) => {
            if (
              event.detail.xhr.responseURL.includes("/api/v1/agenda") &&
              event.detail.requestConfig.verb === "post" &&
              event.detail.xhr.status === 201
            ) {
              let form = document.querySelector("[id^=event-modal]");
              form.classList.remove("is-active");
              form.remove();
              bulmaToast.toast({
                message: "Evento creado.",
                type: "is-success",
                duration: 3000,
                dismissible: true,
                position: "top-center",
                animate: { in: "fadeIn", out: "fadeOut" },
              });
            }
            if (
              event.detail.xhr.responseURL.includes("/api/v1/agenda") &&
              event.detail.requestConfig.verb === "put" &&
              event.detail.xhr.status === 200
            ) {
              let form = document.querySelector("[id^=event-modal-]");
              form.classList.remove("is-active");
              form.remove();
              bulmaToast.toast({
                message: "Evento actualizado.",
                type: "is-success",
                duration: 3000,
                dismissible: true,
                position: "top-center",
                animate: { in: "fadeIn", out: "fadeOut" },
              });
            }
          });
        // document
        //   .getElementById("create-event-form")
        //   .addEventListener("htmx:beforeRequest", function (evt) {
        //     console.log(evt.detail.parameters);
        //     const form = evt.detail.elt;
        //     evt.detail.parameters = {
        //       evento: form.querySelector('[name="evento"]').value,
        //       descripcion: form.querySelector('[name="descripcion"]').value,
        //       numero_contacto: form.querySelector('[name="numero_contacto"]')
        //         .value,
        //       fecha: form.querySelector('[name="fecha"]').value,
        //       start: form.querySelector('[name="start"]').value,
        //       end: form.querySelector('[name="end"]').value,
        //       planId: form.querySelector("#planId").value,
        //       extras: Array.from(
        //         document.querySelector("#extras").selectedOptions,
        //       ).map((option) => option.value),
        //     };
        //     console.log(evt.detail.parameters);
        //   });
        document.addEventListener("DOMContentLoaded", function () {
          if (document.querySelector("[id^=event-modal-]")) {
            let form = document.getElementById("create-event-form");
            form.removeAttribute("hx-post");
          }
        });

        function updateMontoRestante(evt = null) {
          let total_pagos = htmx.find("#total_pagos");

          let input_abono = document.querySelector("[id^=restante-]");
          let valor_plan = htmx.find("#valor_plan");
          let final =
            parseInt(valor_plan.innerText.split(":")[1]) - total_pagos.value;

          if (evt)
            final -= parseInt(evt.target.value > 0 ? evt.target.value : 0);

          if (final <= 0 && !evt) {
            let input_monto = htmx.find("#abono");
            input_monto.setAttribute("disabled", true);
            input_abono.innerHTML = "Pagado";
            let boton = htmx.find("#boton-pago").setAttribute("disabled", true);
          } else
            input_abono.innerHTML =
              "Monto Restante: " + (final >= 0 ? final : 0);
        }

        document
          .getElementById("payment-table")
          .addEventListener("htmx:afterRequest", (evt) => {
            if (
              evt.detail.xhr.status === 200 &&
              evt.detail.xhr.response.length > 0
            ) {
              updateMontoRestante();
            }
          });

        document
          .getElementById("create-pagos-form")
          .addEventListener("htmx:afterRequest", (evt) => {
            bulmaToast.toast({
              message:
                evt.detail.xhr.status === 200
                  ? "Pago registrado con éxito."
                  : "Error al registrar pago.",
              type: evt.detail.xhr.status === 200 ? "is-success" : "is-danger",
              duration: 3000,
              dismissible: true,
              position: "top-center",
              animate: { in: "fadeIn", out: "fadeOut" },
            });
            let elem = htmx.find("#create-pagos-form");
            elem.reset();
          });

        let abono = document.getElementById("abono");
        abono.addEventListener("keyup", (evt) => {
          updateMontoRestante(evt);
        });
      </script>`}
    </div>
  );
};
