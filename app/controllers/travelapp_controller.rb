class TravelappController < ApplicationController
	def index
		render 'home'
	end

	def login
		render 'login'
	end

	def share
		render 'share'
	end
end
