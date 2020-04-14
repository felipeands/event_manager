import React from 'react'
import moment from 'moment'

export default class Events extends React.Component {

  render() {
    return (
      <>
        {(this.props.results.length === 0)
          ? <b>No events available</b>
          :
          <div className="dates">
            {this.props.results.map((result, dayKey) =>
              <div key={`day_${dayKey}`} className="date">

                <h3>{moment(result.date, "YYYY-MM-DD").locale("pt-BR").format("D/M/Y")}</h3>

                {result.events.map((event, eventKey) =>
                  <div key={`event_${eventKey}`} className="event">
                    <h2>{event.event.name} <small>{moment(event.event.begin_at, "YYYY-MM-DDTHH:mm:ss").locale("pt-BR").format("kk:mm A")}</small></h2>

                    <div className="location">
                      Location: {event.event.location}
                    </div>

                    <div className="genres">
                      Genres:
                        <div className="items">
                        {event.genres.map((genre, genreKey) =>
                          <div key={`genre_${genreKey}`} className="genre">{genre.name}</div>
                        )}
                      </div>
                    </div>

                    <div className="artists">
                      {event.event.event_type == 'concert'
                        ? 'Artist:'
                        : 'Line up:'
                      }

                      <ul>
                        {event.artists.map((artist, artistKey) =>
                          <li><div key={`artist_${artistKey}`} className="artist">{artist.name}</div></li>
                        )}
                      </ul>
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>
        }
      </>
    )
  }

}