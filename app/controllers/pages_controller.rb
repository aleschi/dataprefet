class PagesController < ApplicationController
	before_action :authenticate_user!

	def index
	end

    def check_user_status

	  	if user_signed_in? 
	  		if current_user.email == "admin@finances.gouv.fr"
	  			admin = "admin"
	  		else
	  			admin = "admin"
	  		end
	  	response = {isLoggedIn: true, statut: admin}    
	    render json: response
	  	else
	  	response = {isLoggedIn: false, statut: "admin"}    
	    render json: response
	  	end

    end
end
