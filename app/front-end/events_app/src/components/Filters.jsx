import React from 'react'

export default class Filters extends React.Component {

    handleSelectGenre(el, genre) {
        el.preventDefault()
        this.props.onToggleGenre(genre)
    }

    handleDisableGenre(el, genre) {
        el.preventDefault()
        el.stopPropagation()
        this.props.onToggleException(genre)
    }

    render() {
        return (
            <div className="filterOptions">

                <div className="label">Filter by genres:</div>

                {this.props.genres.map((genre, key) =>
                    <div
                        key={key}
                        className={`btn genre ${(this.props.activeGenres.includes(genre) ? 'active' : '')}`}
                        onClick={(el) => this.handleSelectGenre(el, genre)}>

                        <span>{genre.name}</span>

                        <a
                            className={`except ${(this.props.activeExceptions.includes(genre) ? 'active' : '')}`}
                            onClick={(el) => this.handleDisableGenre(el, genre)}
                            title="Add to exceptions list">
                            x
                        </a>
                    </div>
                )}

            </div>
        )
    }

}