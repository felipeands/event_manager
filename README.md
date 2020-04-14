# Using Event Manager

Follow the step-by-step to start experiment the project.

1. Download the EventsManager repository
$ git clone git@github.com:felipeands/event_manager.git

2. Create and populate database
Into project directory `event_manager` run
$ rake db:create || rake db:migrate || rake db:seed

3. Install dependencies

	Rails dependencies: 
	Into project directory `event_manager` run
	$ bundle install

	Front-end dependencies
	Into front-end application directory `app/front-end/events_app` run
	$ npm install

	Build the front-end application
	Into front-end application directory `app/front-end/events_app` run
	$ npm run build:prod

4. Start rails server
Into project root directory run
$ rails s

5. Navigating through the application functions
Using an updated browser go to the url `http://localhost:3000`

	The available functions satisfy the project requirements like:
		- Filter events by genre
		- Filter events with exceptions
		- List events grouped by day
		- Display event genres and lineup on results
		- Create new events
		- Select one or more artists to the event looking for the event type on create
		- Select multiple genres on create

