class Api::V1::MouvementsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    programmes = Programme.all
    region = Region.where(id: current_user.region_id).first.nom
    region_id = Region.where(id: current_user.region_id).first.id
    mouvements = Mouvement.where(region_id: current_user.region_id).order(created_at: :desc)
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

    liste_programmes_mvt = Programme.where(id: mouvements.pluck(:programme_id).uniq).pluck(:numero)

    mouvement_last_supp = mouvements.where(type_mouvement: "suppression").order(created_at: :desc).first

    response = {programmes: programmes.as_json(:include => [:ministere, :mouvements, :objectifs]), region: region,region_id: region_id, mouvements: mouvements.as_json(:include => [:programme,:service,]), 
      etp_supp: etp_supp, etp_supp_a: etp_supp_a, etp_supp_b: etp_supp_b, etp_supp_c: etp_supp_c,
      etp_add: etp_add, etp_add_a: etp_add_a,etp_add_b: etp_add_b, etp_add_c: etp_add_c,
      etpt_supp: etpt_supp, etpt_supp_a: etpt_supp_a, etpt_supp_b: etpt_supp_b, etpt_supp_c: etpt_supp_c,
      etpt_add: etpt_add, etpt_add_a: etpt_add_a,etpt_add_b: etpt_add_b, etpt_add_c: etpt_add_c,
      solde_etp: solde_etp, etp_cible: etp_cible, etpt_plafond: etpt_plafond, etp_3: etp_3,
      liste_programmes_mvt: liste_programmes_mvt,mouvement_last_supp: mouvement_last_supp.as_json(:include => [:programme,])
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
    if params[:ponctuel] == true
      mouvement.ponctuel = true
    end
    if !params[:mouvement_id].nil? && !params[:mouvement_id][:value].nil?
      mouvement.mouvement_lien = params[:mouvement_id][:value]
    end
    cout_etp = Cout.where('programme_id = ? AND categorie = ?',params[:programme_id][:value], params[:grade][:value]).first.cout
    if params[:type_mouvement][:value] == "suppression"
      mouvement.cout_etp = -(params[:quotite][:value].to_f * cout_etp)
      mouvement.credits_gestion = -(params[:quotite][:value].to_f * cout_etp * (DateTime.new(2021,12,31)-params[:date_effet].to_date).to_i / 365)
    else
      if !params[:mouvement_id][:value].nil? 
        mouvement.mouvement_lien = params[:mouvement_id][:value]
        mouvement_supp = Mouvement.where(id: params[:mouvement_id][:value]).first
        mouvement.credits_gestion = (params[:quotite][:value].to_f * mouvement_supp.programme.couts.where(categorie: params[:grade][:value]).first.cout * (DateTime.new(2021,12,31)-params[:date_effet].to_date).to_i / 365)
        if params[:ponctuel] == true
          mouvement.cout_etp = 0
        else
          mouvement.cout_etp = params[:quotite][:value].to_f * mouvement_supp.programme.couts.where(categorie: params[:grade][:value]).first.cout
        end
      else
        mouvement.cout_etp = 0
      end
    end
    
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
    mouvements = Mouvement.where(user_id: current_user.id).order(created_at: :desc)
    response = { mouvements: mouvements.as_json(:include => [:programme,:service,]) }
    render json: response
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
      if params[:date_croissant] == true #cetait deja croissant donc on change en desc
        mouvements = Mouvement.where(id: params[:mouvements].map{|x| x[:id]}).order(created_at: :desc)
        date_croissant = false 
        date_effet_croissant = params[:date_effet_croissant]
      else
        mouvements = Mouvement.where(id: params[:mouvements].map{|x| x[:id]}).order(created_at: :asc)
        date_croissant = true
        date_effet_croissant = params[:date_effet_croissant]
      end
    elsif params[:search] == "date_effet"
      if params[:date_effet_croissant] == true
        mouvements = Mouvement.where(id: params[:mouvements].map{|x| x[:id]}).order(date_effet: :desc)
        date_effet_croissant = false 
        date_croissant = params[:date_croissant]
      else
        mouvements = Mouvement.where(id: params[:mouvements].map{|x| x[:id]}).order(date_effet: :asc)
        date_effet_croissant = true 
        date_croissant = params[:date_croissant]
      end
    end
    response = { mouvements: mouvements.as_json(:include => [:region,:programme,:service,]), date_effet_croissant: date_effet_croissant, date_croissant: date_croissant}
    
    render json: response
  end

  

  def mouvements_globaux
    regions = Region.all
    if current_user.statut == "admin"
      mouvements = Mouvement.all.order(created_at: :desc)
      nom = "Direction du Budget"
      objectifs = Objectif.all
    elsif current_user.statut == "ministere"
      nom = current_user.nom 
      ministere = Ministere.where(nom: current_user.nom).first
      programme_id = Programme.where(ministere_id: ministere.id).pluck(:id)
      mouvements = Mouvement.where(programme_id: programme_id).order(created_at: :desc)
      objectifs = Objectif.where(programme_id: programme_id)
    end

    liste_programmes_mvt = Programme.where(id: mouvements.pluck(:programme_id).uniq).pluck(:numero)
    liste_regions_mvt = Region.where(id: mouvements.pluck(:region_id).uniq).pluck(:nom)
    response = { nom: nom , regions: regions.as_json(:include => [:objectifs, :mouvements]), mouvements: mouvements.as_json(:include => [:region, :service, :programme]), objectifs: objectifs, liste_programmes_mvt: liste_programmes_mvt, liste_regions_mvt: liste_regions_mvt}
    render json: response
  end

  def search
    if current_user.statut == "admin"
      mouvements = Mouvement.all.order(created_at: :desc)
    elsif current_user.statut == "CBR" || current_user.statut == "prefet"
      mouvements = Mouvement.where(region_id: current_user.region_id).order(date: :desc)
    end

    if params[:selected_new] && params[:selected_new].length > 0
      if params[:name] == "programme"
        programmes_id = Programme.where(numero: params[:selected_new]).pluck(:id)
        mouvements = mouvements.where(programme_id: programmes_id)
      end
      if params[:name] == "region"
        regions_id = Region.where(nom: params[:selected_new]).pluck(:id)
        mouvements = mouvements.where(region_id: regions_id)
      end
      if params[:name] == "grade"
        mouvements = mouvements.where(grade: params[:selected_new])
      end
      if params[:name] == "type_mouvement"
        mouvements = mouvements.where(type_mouvement: params[:selected_new])
      end
    end
    response = { mouvements: mouvements.as_json(:include => [:region, :programme,:service,])}
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
