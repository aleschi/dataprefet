class Api::V1::ObjectifsController < ApplicationController
	before_action :authenticate_user!
	protect_from_forgery with: :null_session

	def index
		objectifs = Objectif.all 
  		response = {objectifs: objectifs}
    	render json: response
	end

	def import
  	Objectif.import(params[:file])
    render json: { message: 'objectif ajouté!' }
  end 
end
