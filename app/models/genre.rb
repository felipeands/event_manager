class Genre < ApplicationRecord

	# relationship between genre and events
	has_many :event_genres
	has_many :events, through: :event_genres
end
