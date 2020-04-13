class HomeController < ApplicationController

	def index
		# genres and artists available to filter and new events
		@genres = Genre.select(:id, :name).order(name: :asc)
		@artists = Artist.select(:id, :name).order(name: :asc)
	end
end
