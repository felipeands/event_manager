class Api::EventsController < Api::ApplicationController

	def create

		# start a transaction to prevent save data
		ActiveRecord::Base.transaction do
			new_event_params = get_new_event_params()
			event = Event.enabled.new(new_event_params)
			event.save!

			genres_params = get_genres_params[:genres]

			# limit to one artist if event type is concert
			genres_params = genres_params.first if event.concert?

			# save event genres 
			genres_params.each do |genre_id|
				genre = Genre.find_by_id(genre_id)
				event.event_genres.create(genre: genre) if genre.present?
			end if genres_params.present?

			artists_params = get_artists_params[:artists]

			# save event artists
			artists_params.each do |artist_id|
				artist = Artist.find_by_id(artist_id)
				event.event_artists.create(artist: artist) if artist.present?
			end if artists_params.present?
		end

		return render json: {msg: 'Success'}
	end



	def list
		results = Event.enabled.joins(:genres).joins(:artists).group('events.id').order(begin_at: :desc)

		# get events by genres
		genres_params = get_filters_params[:genres]
		results = results.where(genres: {id: genres_params.split(',')}) if genres_params.present?



		# filter genre exceptions routine
		exceptions_params = get_filters_params[:exceptions]

		# get events in exception genres
		exceptions = []
		exceptions = EventGenre.where(genre: exceptions_params.split(',')).select(:event_id) if exceptions_params.present?

		# remove exceptions from filter results
		results = results.where.not(id: exceptions)



		# format events dates
		dates = []
		results.each do |result|
			dates << result.begin_at.beginning_of_day unless dates.include?(result.begin_at.beginning_of_day)
		end


		# group results per day
		organized_results = []
		dates.each do |date|
			organized_results << {
				date: date,
				events: results.where('begin_at >= ? AND begin_at <= ?', date, date)
			}
		end


		render json: organized_results
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

	def get_exceptions_params
		params.permit(exceptions: [])
	end


	def get_filters_params
		params.permit(:genres, :exceptions)
	end

end
