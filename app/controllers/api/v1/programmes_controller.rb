class Api::V1::ProgrammesController < ApplicationController
	protect_from_forgery with: :null_session
  def index
  	programmes = Programme.all 
  	response = {programmes: programmes}
    render json: response
  end

  def create
  end

  def destroy
  end

  def import
  	Programme.import(params[:file])
    programmes = Programme.all 
    response = {programmes: programmes}
    render json: response
  end 
end
