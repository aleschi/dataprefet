class UsersController < ApplicationController
	before_action :authenticate_user!
	protect_from_forgery with: :null_session
	def index
		users = User.all 
  		response = {users: users}
    	render json: response
	end 
	def import
		User.import(params[:file])
    	render json: { message: 'utilisateur ajouté!' }
	end

end
