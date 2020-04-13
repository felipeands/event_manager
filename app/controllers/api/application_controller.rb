class Api::ApplicationController < ApplicationController

	# skip rails token authenticity to api requests
	skip_before_action :verify_authenticity_token
end
