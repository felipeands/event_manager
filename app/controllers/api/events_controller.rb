class Api::EventsController < Api::ApplicationController

	def create

		# start a transaction to prevent save data
		ActiveRecord::Base.transaction do
			new_event_params = get_new_event_params()
			event = Event.enabled.new(new_event_params)
			event.save!

			genres_params = get_genres_params()

			# limit to one artist if event type is concert
			genres_params = genres_params.first if event.concert?

			# save event genres 
			genres_params.each do |genre_id|
				genre = Genre.find_by_id(genre_id)
				event.event_genres.create(genre: genre) if genre.present?
			end if genres_params.present?


			artists_params = get_artists_params()

			# save event artists
			artists_params.each do |artist_id|
				artist = Artist.find_by_id(artist_id)
				event.event_artists.create(artist: artist) if artist.present?
			end if artists_params.present?
		end

		return render json: {}
	end



	def list

	end



	private
	def get_new_event_params
		params.permit(:name, :location, :begin_at)
	end

	def get_genres_params
		params.permit(genres: [])
	end

	def get_artists_params
		params.permit(artists: [])
	end

end
