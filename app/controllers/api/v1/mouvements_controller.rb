class Api::V1::MouvementsController < ApplicationController
  def index
    programmes = Programme.all
    region = Region.where(id: current_user.region_id).first.nom
    mouvements = Mouvement.where(user_id: current_user.id)
    response = {programmes: programmes.as_json(:include => [:ministere]), region: region, mouvements: mouvements.as_json(:include => [:programme,:service,])}
    render json: response
  end

  def new
  end

  def create
    mouvement = Mouvement.new
    mouvement.date = Date.today
    mouvement.type_mouvement= params[:type_mouvement][:value]
    mouvement.user_id = current_user.id
    mouvement.region_id = current_user.region_id
    mouvement.quotite = params[:quotite][:value].to_f
    mouvement.grade = params[:grade][:value]
    mouvement.date_effet = params[:date_effet].to_date
    mouvement.service_id = params[:service_id][:value]
    mouvement.programme_id = params[:programme_id][:value]
    cout_etp = Cout.where('programme_id = ? AND categorie = ?',params[:programme_id][:value], params[:grade][:value]).first.cout
    mouvement.cout_etp = params[:quotite][:value].to_f * cout_etp
    mouvement.save
    if mouvement
      render json: mouvement
    else
      render json: mouvement.errors
    end
  end

  def update
  end

  def edit
  end

  def destroy
    mouvement&.destroy
    render json: { message: 'mouvement deleted!' }
  end

  def get_services
    if params[:programme_id][:value]
      services = Service.where(programme_id: params[:programme_id][:value])
      response = {services: services}
      render json: response
    end
  end 

  def sort_table
    if params[:search] == "date"
      mouvements = Mouvement.where(id: params[:mouvements].map{|x| x[:id]}).order(date: :asc)
    elsif params[:search] == "date_effet"
      mouvements = Mouvement.where(id: params[:mouvements].map{|x| x[:id]}).order(date_effet: :asc)
    end
    response = { mouvements: mouvements.as_json(:include => [:programme,:service,])}
    render json: response
  end

  private

  def mouvement_params
    params.permit(:date, :user_id, :region_id, :date_effet, :quotite, :grade, :type_mouvement, :service_id, :programme_id, :cout_etp )
  end
  def mouvement
    @mouvement ||= Mouvement.find(params[:id])
  end
end
