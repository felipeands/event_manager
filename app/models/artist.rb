class Artist < ApplicationRecord

	# relationship between artist and events
	has_many :event_artists
	has_many :events, through: :event_artists
end
