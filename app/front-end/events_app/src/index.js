const eventsEl = document.getElementById("events-app")
import React from "react"
import ReactDOM from "react-dom"
import EventsApp from './app/EventsApp.jsx'

if (eventsEl) {
  ReactDOM.render(< EventsApp />, eventsEl)
}