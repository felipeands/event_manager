import React from 'react'
import find from 'lodash/find'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export default class NewEvent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      artists: [],
      genres: [],
      formData: {
        event_type: 'festival',
        name: '',
        begin_at: '',
        location: ''
      },
      selectedArtist: ''
    }


  }

  handleArtistsSelectChange = (selectedOption) => {
    const selectedArtistId = parseInt(selectedOption.target.value)
    this.setState({ selectedArtist: selectedArtistId })
  }

  handleEventTypeSelectChange = (selectedOption) => {
    if (this.state.artists.length > 1) {
      if (confirm('This change will clear you artists selection. Continue?')) {
        this.clearArtistsSelecion()
      } else {
        return false;
      }
    }
    let formData = { ... this.state.formData }
    formData.event_type = selectedOption.target.value
    this.setState({ formData: formData })
  }

  handleNameChange = (event) => {
    let formData = { ... this.state.formData }
    formData.name = event.target.value
    this.setState({ formData: formData })
  }

  handleLocationChange = (event) => {
    let formData = { ... this.state.formData }
    formData.location = event.target.value
    this.setState({ formData: formData })
  }

  handleBeginAtChange = (date) => {
    let formData = { ... this.state.formData }
    formData.begin_at = date
    this.setState({ formData: formData })
  }

  handleGenreToggle(el, genre) {
    el.preventDefault()

    // check if selected genre exists in genres array
    if (this.state.genres.includes(genre)) {
      // remove from selected genres list
      const genres = this.state.genres.filter((stateGenre) => stateGenre !== genre)
      this.setState({ genres })
    } else {
      // include selected genre
      const genres = [... this.state.genres, genre]
      this.setState({ genres })
    }
  }

  handleArtistAdd = (el) => {
    el.preventDefault()

    // if has artist selected
    if (this.canAddArtist()) {
      const artist = find(this.props.artists, { id: this.state.selectedArtist })

      this.setState({
        artists: [...this.state.artists, artist],
        selectedArtist: ''
      })
    }
  }

  handleFormSubmit = (el) => {
    el.preventDefault()

    // check form validation
    if (this.canSubmitForm()) {
      const artists = this.state.artists.map((artist) => artist.id)
      const genres = this.state.genres.map((genre) => genre.id)

      const data = { ... this.state.formData, artists: artists, genres: genres }
      this.props.onFormNewEventSubmit(data)
    } else {
      alert('Ops.. Please, fill all the fields!')
    }
  }

  handleRemoveArtist(el, artist) {
    el.preventDefault()
    const artists = this.state.artists.filter((artistFilter) => artistFilter !== artist)
    this.setState({ artists: artists })
  }

  isArtistAvailable(artist) {
    return !(find(this.state.artists, { id: artist.id }))
  }

  clearArtistsSelecion() {
    this.setState({ artists: [] })
  }

  canAddArtist() {
    if (!this.isArtistSelected()) {
      return false;
    }

    // check if event allow more artists
    if (this.state.formData.event_type === 'concert' && this.state.artists.length > 0) {
      return false;
    }

    return true;
  }

  isArtistSelected() {
    return (this.state.selectedArtist !== '')
  }

  canSubmitForm = () => {
    return (
      this.state.genres.length > 0 &&
      this.state.artists.length > 0 &&
      this.state.formData.name !== "" &&
      this.state.formData.begin_at !== "" &&
      this.state.formData.location !== ""
    )
  }


  render() {
    return (
      <div className="new_event_form">

        <h2>New event</h2>

        <div className="form-group">
          <label htmlFor="event_type">Event type: </label>
          <select
            name="event_type"
            id="event_type"
            className="form-control"
            value={this.state.formData.event_type}
            onChange={this.handleEventTypeSelectChange}>
            <option value="concert">Concert</option>
            <option value="festival">Festival</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genres: </label>
          <div className="genres">
            {this.props.genres.map((genre, key) =>
              <div
                key={key}
                className={`btn genre ${(this.state.genres.includes(genre) ? 'active' : '')}`}
                onClick={(e) => this.handleGenreToggle(e, genre)}>{genre.name}</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Title: </label>
          <input name="name" id="name" className="form-control" value={this.state.formData.name} onChange={this.handleNameChange} />
        </div>

        <div className="form-group">
          <label htmlFor="begin_at">Date: </label>
          <DatePicker
            className="form-control"
            selected={this.state.formData.begin_at}
            onChange={this.handleBeginAtChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="yyyy-MM-dd h:mm:ss"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location: </label>
          <textarea name="location" id="location" className="form-control" value={this.state.formData.location} onChange={this.handleLocationChange}></textarea>
        </div>

        <section className="artists">

          <div>
            <label>Select event artists: </label>
            <select value={this.state.selectedArtist} className="form-control" name="artistSelected" onChange={this.handleArtistsSelectChange}>
              <option value=""></option>
              {this.props.artists.map((artist, key) =>
                <option key={key} value={artist.id} disabled={!this.isArtistAvailable(artist)}>{artist.name}</option>
              )}
            </select>
            <a className="btn" onClick={this.handleArtistAdd}>add</a>
          </div>

          <div className="list">
            {this.state.artists.length > 0
              ? (this.state.artists.map((artist, key) =>
                <div key={key} className="item"><a className="remove btn" onClick={(e) => this.handleRemoveArtist(e, artist)}>x</a> {artist.name}</div>
              ))
              : <p>Empty artists list</p>
            }
          </div>

        </section>

        <div className="btns">
          <button className="btn" onClick={this.handleFormSubmit}>Create</button>
          <a className="btn cancel" onClick={this.props.onCloseNewEvent}>Cancel</a>
        </div>

      </div >
    )
  }

}