module Api::EventsHelper

	# format data for api events grouped by day
	def format_for_api_dates_list(events)

		# get dates in events results
		dates = get_events_dates(events)

		# group events per day
		formatted_events = []
		dates.each do |date|

			# filter events of day
			date_events = events.get_day_events(date)

			# get event type, genres and artists
			events_data = get_events_genres_and_artists(date_events)

			formatted_events << {
				date: date,
				events: events_data
			}
		end

		# return formatted data
		formatted_events
	end


	# get dates from events
	def get_events_dates(events)
		dates = []
		
		events.each do |event|
			dates << event.begin_at.beginning_of_day unless dates.include?(event.begin_at.beginning_of_day)
		end

		dates
	end

	# return array of events with genres and artists
	def get_events_genres_and_artists(events)
		events_data = []
		events.each do |event|
			events_data << {
				event: event,
				genres: event.genres,
				artists: event.artists
			}
		end

		events_data
	end

end
