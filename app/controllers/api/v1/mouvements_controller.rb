class Api::V1::MouvementsController < ApplicationController
  def index
    programmes = Programme.all
    region = Region.where(id: current_user.region_id).first.nom
    region_id = Region.where(id: current_user.region_id).first.id
    mouvements = Mouvement.where(user_id: current_user.id).order(date: :desc)
    etp_supp = mouvements.where(type_mouvement: "suppression").count
    etp_supp_a = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'A').count
    etp_supp_b = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'B').count
    etp_supp_c = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'C').count
    etp_add = mouvements.where(type_mouvement: "ajout").count
    etp_add_a = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'A').count
    etp_add_b = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'B').count
    etp_add_c = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'C').count

    etpt_supp = mouvements.where(type_mouvement: "suppression").sum('quotite')
    etpt_supp_a = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'A').sum('quotite')
    etpt_supp_b = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'B').sum('quotite')
    etpt_supp_c = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'C').sum('quotite')
    etpt_add = mouvements.where(type_mouvement: "ajout").sum('quotite')
    etpt_add_a = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'A').sum('quotite')
    etpt_add_b = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'B').sum('quotite')
    etpt_add_c = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'C').sum('quotite')

    etp_cible = Objectif.where(region_id: current_user.region_id).sum('etp_cible')
    etp_3 = (0.03 * Objectif.where(region_id: current_user.region_id).sum('etp_cible')).to_i
    solde_etp = (0.03 * Objectif.where(region_id: current_user.region_id).sum('etp_cible')).to_i-etp_supp
    etpt_plafond = Objectif.where(region_id: current_user.region_id).sum('etpt_plafond')

    response = {programmes: programmes.as_json(:include => [:ministere, :mouvements, :objectifs]), region: region,region_id: region_id, mouvements: mouvements.as_json(:include => [:programme,:service,]), 
      etp_supp: etp_supp, etp_supp_a: etp_supp_a, etp_supp_b: etp_supp_b, etp_supp_c: etp_supp_c,
      etp_add: etp_add, etp_add_a: etp_add_a,etp_add_b: etp_add_b, etp_add_c: etp_add_c,
      etpt_supp: etpt_supp, etpt_supp_a: etpt_supp_a, etpt_supp_b: etpt_supp_b, etpt_supp_c: etpt_supp_c,
      etpt_add: etpt_add, etpt_add_a: etpt_add_a,etpt_add_b: etpt_add_b, etpt_add_c: etpt_add_c,
      solde_etp: solde_etp, etp_cible: etp_cible, etpt_plafond: etpt_plafond, etp_3: etp_3
    }
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
