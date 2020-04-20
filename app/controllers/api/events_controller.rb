class Api::EventsController < Api::ApplicationController

	include Api::EventsHelper

	def create

		# start a transaction to prevent save data
		ActiveRecord::Base.transaction do
			new_event_params = get_new_event_params()

			# create new event from params
			event = Event.enabled.new(new_event_params)
			event.save!


			# limit to one artist if event type is concert
			genres_params = get_genres_params[:genres]
			genres_params = [genres_params.first] if event.concert?


			# save event genres 
			genres_params.each do |genre_id|
				genre = Genre.find_by_id(genre_id)
				event.event_genres.create(genre: genre) if genre.present?
			end if genres_params.present?


			# save event artists
			artists_params = get_artists_params[:artists]
			artists_params.each do |artist_id|
				artist = Artist.find_by_id(artist_id)
				event.event_artists.create(artist: artist) if artist.present?
			end if artists_params.present?
		end

		render json: {msg: 'Success'}
	end



	def list
		# default params for event results
		results = Event.enabled.joins(:genres).joins(:artists).group('events.id').order(begin_at: :desc)

		# get events by genres
		genres_params = get_filters_params[:genres]
		results = results.filter_by_genres(genres_params.split(',')) if genres_params.present?

		# remove exceptions from filter results
		exceptions_params = get_filters_params[:exceptions]
		results = results.filter_exceptions_by_genres(exceptions_params.split(',')) if exceptions_params.present?

		# format events by dates for api result
		formatted_results = format_for_api_dates_list(results)
		
		render json: formatted_results
	end



	private
	def get_new_event_params
		params.permit(:event_type, :name, :location, :begin_at)
	end

	def get_genres_params
		params.permit(genres: [])
	end

	def get_artists_params
		params.permit(artists: [])
	end

	def get_exceptions_params
		params.permit(exceptions: [])
	end

	def get_filters_params
		params.permit(:genres, :exceptions)
	end

end
