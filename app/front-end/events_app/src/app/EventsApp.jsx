import React from 'react'
import Filters from './../components/Filters'
import Events from './../components/Events'
import NewEvent from './../components/NewEvent'

export default class EventsApp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            genres: window.events_app_data.genres,
            artists: window.events_app_data.artists,

            activeGenres: [],
            activeExceptions: [],

            isNewEventOpen: false,

            results: []
        }
    }

    // responsible for display new event form
    handlerClickNew = (el) => {
        el.preventDefault()
        this.setState({ isNewEventOpen: true })
    }

    // request new results on filters change
    onToggleGenre = (genre) => {
        // check if selected genre exists in genres array
        if (this.state.activeGenres.includes(genre)) {
            // remove from selected genres list
            const activeGenres = this.state.activeGenres.filter((stateGenre) => stateGenre !== genre)
            this.setState({ activeGenres })
        } else {
            // include selected genre
            const activeGenres = [... this.state.activeGenres, genre]
            this.setState({ activeGenres })
        }
    }

    // request new results on exceptions change
    onToggleException = (genre) => {
        // check if selected genre exists in exceptions array
        if (this.state.activeExceptions.includes(genre)) {
            // remove from exceptions genres list
            const activeExceptions = this.state.activeExceptions.filter((stateGenre) => stateGenre !== genre)
            this.setState({ activeExceptions })
        } else {
            // include exception genre
            const activeExceptions = [... this.state.activeExceptions, genre]
            this.setState({ activeExceptions })
        }
    }

    onCancelNewEvent = () => {
        this.setState({ isNewEventOpen: false })
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
                                onCancelNewEvent={this.onCancelNewEvent}
                            />
                            :
                            <div>
                                <a className="btn new" onClick={this.handlerClickNew}>New event</a>
                            </div>
                        }
                    </div>
                </section>

                <section className="results">
                    <Events results={this.state.results} />
                </section>
            </>
        )
    }

}