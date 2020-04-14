import React from 'react'
import Filters from './../components/Filters'
import Events from './../components/Events'
import NewEvent from './../components/NewEvent'
import Config from '../Config'
import axios from 'axios'

export default class EventsApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      genres: window.events_app_data.genres,
      artists: window.events_app_data.artists,

      activeGenres: [],
      activeExceptions: [],

      isNewEventOpen: false,
      isLoading: false,

      results: []
    }
  }

  componentDidMount() {
    this.getApiResults()
  }

  // responsible for display new event form
  handlerClickNew = (el) => {
    el.preventDefault()
    this.setState({ isNewEventOpen: true })
  }

  // request new results on filters change
  onToggleGenre = (genre) => {
    let activeGenres = []

    // check if selected genre exists in genres array
    if (this.state.activeGenres.includes(genre)) {
      // remove from selected genres list
      activeGenres = this.state.activeGenres.filter((stateGenre) => stateGenre !== genre)
    } else {
      // include selected genre
      activeGenres = [... this.state.activeGenres, genre]
    }

    // remove from exceptions
    const activeExceptions = this.state.activeExceptions.filter((stateException) => stateException !== genre)

    this.setState({ activeGenres, activeExceptions }, this.getApiResults)
  }

  // request new results on exceptions change
  onToggleException = (genre) => {
    let activeExceptions = []

    // check if selected genre exists in exceptions array
    if (this.state.activeExceptions.includes(genre)) {
      // remove from exceptions genres list
      activeExceptions = this.state.activeExceptions.filter((stateGenre) => stateGenre !== genre)
    } else {
      // include exception genre
      activeExceptions = [... this.state.activeExceptions, genre]
    }
    this.setState({ activeExceptions }, this.getApiResults)
  }

  onCloseNewEvent = () => {
    this.setState({ isNewEventOpen: false })
  }

  onFormNewEventSubmit = (data) => {
    this.setState({ isLoading: true })
    axios.post(`${Config.getApiUrl()}create`, data).then(() => {
      this.onCloseNewEvent()
      this.getApiResults()
    })
  }

  getApiResults = () => {
    this.setState({ isLoading: true })

    // extract ids from genres array
    const genres = this.state.activeGenres.map((genre) => genre.id)

    // extract ids from artists array
    const exceptions = this.state.activeExceptions.map((exception) => exception.id)

    // prepara params to api request
    const params = {
      genres: genres.join(','),
      exceptions: exceptions.join(',')
    }

    axios.get(`${Config.getApiUrl()}list`, { params: params }).then((res) => {
      this.updateResults(res.data).then(() => this.setState({ isLoading: false }))
    })
  }

  updateResults(data) {
    return new Promise((resolve) => {
      this.setState({ results: data }, resolve)
    })
  }



  render() {
    return (
      <>
        <header>
          <div className="container">
            <div className="filters">
              <Filters
                genres={this.state.genres}
                artists={this.state.artists}
                activeGenres={this.state.activeGenres}
                activeExceptions={this.state.activeExceptions}
                onToggleGenre={this.onToggleGenre}
                onToggleException={this.onToggleException} />
            </div>
          </div>
        </header>

        <section className="new_event">
          <div className="container">
            {this.state.isNewEventOpen
              ?
              <NewEvent
                genres={this.state.genres}
                artists={this.state.artists}
                onFormNewEventSubmit={this.onFormNewEventSubmit}
                onCloseNewEvent={this.onCloseNewEvent}
                isLoading={this.state.isLoading} />
              :
              <div>
                <a className="btn new" onClick={this.handlerClickNew}>New event</a>
              </div>
            }
          </div>
        </section>

        <section className="results">
          <div className="container">
            <Events
              results={this.state.results}
              isLoading={this.state.isLoading} />
          </div>
        </section>
      </>
    )
  }

}