class Api::V1::CoutsController < ApplicationController
	protect_from_forgery with: :null_session
  def index
  	couts = Cout.all 
  	response = {couts: couts}
    render json: response
  end

  def import
  	Cout.import(params[:file])
    couts = Cout.all 
  	response = {couts: couts}
    render json: response
  end
end
