class Api::V1::ServicesController < ApplicationController
	before_action :authenticate_user!

  protect_from_forgery with: :null_session
  
  def index
  	services = Service.all.order(programme_id: 'ASC') 
  	response = {services: services.as_json(:include => [:programme])}
    render json: response
  end

  def import
  	Service.import(params[:file])
    services = Service.all 
  	response = {services: services}
    render json: response
  end 
end
