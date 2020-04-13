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
	has_many :event_genres
	has_many :genres, through: :event_genres

	# an event can has one or more artists
	has_many :artists
end
