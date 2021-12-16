class Api::V1::ServicesController < ApplicationController
	protect_from_forgery with: :null_session
  before_action :authenticate_user!
  def index
  	services = Service.all 
  	response = {services: services}
    render json: response
  end

  def import
  	Service.import(params[:file])
    services = Service.all 
  	response = {services: services}
    render json: response
  end 
end
