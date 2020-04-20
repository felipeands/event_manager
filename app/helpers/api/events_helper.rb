module Api::EventsHelper

	# format data for api events grouped by day
	def format_for_api_dates_list(events)
		dates = []
		
		events.each do |event|
			dates << event.begin_at.beginning_of_day unless dates.include?(event.begin_at.beginning_of_day)
		end

		# group events per day
		formatted_events = []
		dates.each do |date|

			# filter events of day
			date_events = events.get_day_events(date)

			# get event type, genres and artists
			events_data = []
			date_events.each do |event|
				events_data << {
					event: event,
					genres: event.genres,
					artists: event.artists
				}
			end

			formatted_events << {
				date: date,
				events: events_data
			}
		end
		formatted_events
	end

end
