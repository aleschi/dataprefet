class PagesController < ApplicationController
	before_action :authenticate_user!

	def index
	end

    def check_user_status

	  	if user_signed_in? 
	  		statut = current_user.statut	
		  	response = {isLoggedIn: true, statut: statut}    
		    render json: response
	  	else
	  		response = {isLoggedIn: false, statut: ""}    
	    	render json: response
	  	end

    end
end
