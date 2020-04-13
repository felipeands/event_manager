Rails.application.routes.draw do

	root 									to: 'home#index'

	# the api scope
	scope :api do

		# all the events routes
		scope :events do
			post 'create',					to: 'api/events#create'
			get 'list',						to: 'api/events#list'
		end

	end

end
