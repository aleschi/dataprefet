class Api::V1::RegionsController < ApplicationController
	protect_from_forgery with: :null_session

  def index
  	regions = Region.all 
  	response = {regions: regions}
    render json: response
  end

  def create
  end

  def destroy
  end

  def import
  	Region.import(params[:file])
    render json: { message: 'region ajouté!' }
  end 
end
