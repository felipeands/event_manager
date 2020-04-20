class Event < ApplicationRecord

	enum event_type: {
		concert: 1,
		festival: 2
	}

	enum state: {
		enabled: 1,
		canceled: 2
	}

	# relationship between the event and genres
	has_many :event_genres, dependent: :destroy
	has_many :genres, through: :event_genres

	# an event can has one or more artists
	has_many :event_artists, dependent: :destroy
	has_many :artists, through: :event_artists


	# return only events in genres array
	def self.filter_by_genres(genres_ids)
		joins(:genres)
		where(genres: {id: genres_ids})
	end

	# filter events present in genres exceptions array
	def self.filter_exceptions_by_genres(genres_ids)
		exceptions = EventGenre.get_events_by_genres(genres_ids)
		where.not(id: exceptions)
	end

	# filter events of day
	def self.get_day_events(date)
		select{ |event| event.begin_at >= date.beginning_of_day && event.begin_at <= date.end_of_day }
	end

end
