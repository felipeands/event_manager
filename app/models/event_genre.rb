class EventGenre < ApplicationRecord
	belongs_to :event
	belongs_to :genre

	# get event ids filter by genre ids
	def self.get_events_by_genres(genres_ids)
		where(genre: genres_ids).select(:event_id)
	end
	
end
