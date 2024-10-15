import { html } from "hono/html";

export default function Scheduler() {
  return (
    <div>
      <div id="test"></div>
      <div
        id="calendar"
        hx-get="/api/v1/agenda"
        hx-trigger="load, refreshCalendar from:body"
        hx-swap="none"
      ></div>
      <div id="modal-confirmation"></div>

      {html`
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.13/index.global.min.js"></script>
        <script src="fullcalendar/core/locales/es.global.js"></script>
        <script
          src="https://kit.fontawesome.com/e862562e60.js"
          crossorigin="anonymous"
        ></script>
        <script type="module">
          let event_counter = 1;

          document.addEventListener("DOMContentLoaded", function () {
            var calendarEl = document.getElementById("calendar");
            var calendar = new FullCalendar.Calendar(calendarEl, {
              initialView: "timeGridWeek",
              locale: "es",
              timeZone: "America/Santiago",
              customButtons: {
                createEventButton: {
                  text: "Crear Evento",
                  click: function () {
                    let elem = htmx.find("#test");
                    elem.setAttribute("hx-ext", "json-enc");
                    htmx.ajax("get", "/api/v1/agenda/form", { target: elem });
                  },
                },
              },
              eventClick: function (info) {
                let elem = htmx.find("#test");
                elem.setAttribute("hx-ext", "json-enc");
                htmx.ajax(
                  "get",
                  "/api/v1/agenda/form/" + info.event.extendedProps.agenda.id,
                  { target: elem },
                );
              },
              eventDidMount: function (info) {
                let icon = document.createElement("i");
                icon.classList.add(
                  "fa-solid",
                  "fa-trash",
                  "is-pulled-right",
                  "is-clickable",
                  "pr-3",
                  "pt-1",
                  "delete-event",
                );
                icon.setAttribute("style", "z-index: 1000; color: white;");
                icon.setAttribute(
                  "hx-get",
                  "/api/v1/agenda/evento/modal-confirmation",
                );
                icon.setAttribute("hx-trigger", "click");
                icon.setAttribute("id", "delete-event" + event_counter);

                let evento = info.el.querySelector("div.fc-event-time");
                evento.append(icon);

                icon.addEventListener("click", function (event) {
                  event.stopPropagation();

                  htmx.ajax("get", icon.getAttribute("hx-get"), {
                    target: "#modal-confirmation",
                    values: { id: info.event.extendedProps.agenda.id },
                  });
                });

                event_counter++;
              },
              headerToolbar: {
                left: "prev,next today",
                center: "title",
                right:
                  "createEventButton,dayGridMonth,timeGridWeek,timeGridDay",
              },
            });

            document
              .getElementById("test")
              .addEventListener("htmx:afterSwap", (event) => {
                if (
                  event.detail.xhr.responseURL.includes(
                    "/api/v1/agenda/form",
                  ) &&
                  event.detail.requestConfig.verb === "get"
                ) {
                  let elem = htmx.find("#test");
                  let form = elem.querySelector("[id^=event-modal]");
                  form.classList.add("is-active");
                }
              });
            document
              .getElementById("calendar")
              .addEventListener("htmx:afterRequest", (event) => {
                if (
                  event.detail.xhr.responseURL.includes("/api/v1/agenda") &&
                  event.detail.requestConfig.verb === "get"
                ) {
                  calendar.removeAllEvents();
                  const events = JSON.parse(event.detail.xhr.responseText);
                  let events_formatted = events.map((event) => {
                    let fecha = event.agenda.fecha.split("T")[0];
                    let start = event.agenda.start.split("T")[1];
                    let end = event.agenda.end.split("T")[1];

                    return {
                      title: event.agenda.evento,
                      start: fecha + "T" + start,
                      end: fecha + "T" + end,
                      extendedProps: event,
                    };
                  });
                  calendar.addEventSource(events_formatted);
                }
              });
            calendar.render();
          });
        </script>
      `}
    </div>
  );
}
