class Api::V1::MouvementsController < ApplicationController
  before_action :authenticate_user!
  protect_from_forgery with: :null_session
  def index
    programmes = Programme.all
    region = Region.where(id: current_user.region_id).first.nom
    region_id = Region.where(id: current_user.region_id).first.id
    mouvements = Mouvement.where(region_id: current_user.region_id).order(created_at: :desc)
    etp_supp = mouvements.where(type_mouvement: "suppression").sum('quotite')
    etp_supp_a = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'A').sum('quotite')
    etp_supp_b = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'B').sum('quotite')
    etp_supp_c = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'C').sum('quotite')
    etp_add = mouvements.where(type_mouvement: "ajout").sum('quotite')
    etp_add_a = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'A').sum('quotite')
    etp_add_b = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'B').sum('quotite')
    etp_add_c = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'C').sum('quotite')

    etpt_supp = mouvements.where(type_mouvement: "suppression").sum('etpt')
    etpt_supp_a = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'A').sum('etpt')
    etpt_supp_b = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'B').sum('etpt')
    etpt_supp_c = mouvements.where('type_mouvement = ? AND grade = ?', "suppression", 'C').sum('etpt')
    etpt_add = mouvements.where(type_mouvement: "ajout").sum('etpt')
    etpt_add_a = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'A').sum('etpt')
    etpt_add_b = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'B').sum('etpt')
    etpt_add_c = mouvements.where('type_mouvement = ? AND grade = ?', "ajout", 'C').sum('etpt')

    etp_cible = Objectif.where(region_id: current_user.region_id).sum('etp_cible')
    etp_3 = (0.03 * Objectif.where(region_id: current_user.region_id).sum('etp_cible')).to_f
    solde_etp = (0.03 * Objectif.where(region_id: current_user.region_id).sum('etp_cible')).to_f-etp_supp
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
    mouvement.date_effet = params[:date_effet].to_date + 1.day
    mouvement.service_id = params[:service_id][:value]
    mouvement.programme_id = params[:programme_id][:value]
    if params[:ponctuel] == true && params[:type_mouvement][:value] == "ajout"
      mouvement.ponctuel = true
    end
    if !params[:mouvement_id].nil? && !params[:mouvement_id][:value].nil? && params[:type_mouvement][:value] == "ajout"
      mouvement.mouvement_lien = params[:mouvement_id][:value]
    end
    cout_etp = Cout.where('programme_id = ? AND categorie = ?',params[:programme_id][:value], params[:grade][:value]).first.cout
    if params[:type_mouvement][:value] == "suppression"
      mouvement.cout_etp = -(params[:quotite][:value].to_f * cout_etp).round(2)
      mouvement.credits_gestion = -(params[:quotite][:value].to_f * cout_etp * (DateTime.new(2022,12,31)-params[:date_effet].to_date).to_i / 365).round(2)
      mouvement.etpt =  (params[:quotite][:value].to_f * (params[:date_effet].to_date-DateTime.new(2022,1,1)).to_i / 365).round(2)
    else
      if !params[:mouvement_id][:value].nil? 
        mouvement.mouvement_lien = params[:mouvement_id][:value]
        mouvement_supp = Mouvement.where(id: params[:mouvement_id][:value]).first
        mouvement.credits_gestion = (params[:quotite][:value].to_f * mouvement_supp.programme.couts.where(categorie: params[:grade][:value]).first.cout * (DateTime.new(2022,12,31)-params[:date_effet].to_date).to_i / 365).round(2)
        if params[:ponctuel] == true
          mouvement.cout_etp = 0
        else
          mouvement.cout_etp = (params[:quotite][:value].to_f * mouvement_supp.programme.couts.where(categorie: params[:grade][:value]).first.cout).round(2)
        end
      else
        mouvement.cout_etp = 0
      end
      mouvement.etpt =  (params[:quotite][:value].to_f * (DateTime.new(2022,12,31)-params[:date_effet].to_date).to_i / 365).round(2)
    end
    
    mouvement.save
    if mouvement
      render json: mouvement
    else
      render json: mouvement.errors
    end
  end

  def update
    if params[:mouvement_id][:value]
      mouvement = Mouvement.where(id: params[:mouvement_id][:value]).first
      mouvement.update(grade: params[:grade][:value], quotite: params[:quotite][:value].to_f, programme_id: params[:programme_id][:value], service_id: params[:service_id][:value])
      mouvement.save
      render json: mouvement
    end 
  end

  def edit
  end

  def destroy
    Mouvement.where(type_mouvement: 'ajout').all.each do |m|
      if !m.mouvement_lien.nil?
        if Mouvement.where(id: m.mouvement_lien).count == 0 
          m.mouvement_lien = ''
          m.save
        end
      end 
    end
    if Mouvement.where(mouvement_lien: mouvement&.id).count > 0 
      Mouvement.where(mouvement_lien: mouvement&.id).each do |m|
        m.mouvement_lien = ''
        m.save 
      end
    end 
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

  def get_mouvement
    if params[:mouvement_id]
      mouvement = Mouvement.where(id: params[:mouvement_id]).first
      mouvement_id = {label: mouvement.type_mouvement + '- ETP ' + mouvement.grade + ' - ' + (mouvement.quotite*100).to_i.to_s + '% - Programme ' + mouvement.programme.numero.to_s + ' - N' + mouvement.id.to_s + ' - ' + mouvement.service.nom ,value: mouvement.id,name: "mouvement_id"}
      grade = { value: mouvement.grade, label: mouvement.grade, name:"grade" }
      quotite = { value: mouvement.quotite, label: (mouvement.quotite*100).to_i.to_s+'%', name:"quotite" }
      programme_id = {label: mouvement.programme.numero.to_s + ' - ' + mouvement.programme.ministere.nom ,value: mouvement.programme.id,name: "programme_id"}
      service_id = {label: mouvement.service.nom,value: mouvement.service.id,name: "service_id"}
      services = Service.where(programme_id: mouvement.programme_id)
      response = {mouvement: mouvement, mouvement_id: mouvement_id, grade: grade, quotite: quotite, programme_id: programme_id, services: services, service_id: service_id}
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
    programmes = Programme.all
    liste_programmes_mvt = Programme.where(id: mouvements.pluck(:programme_id).uniq).pluck(:numero)
    liste_regions_mvt = Region.where(id: mouvements.pluck(:region_id).uniq).pluck(:nom)
    response = { nom: nom , regions: regions.as_json(:include => [:objectifs, :mouvements]), mouvements: mouvements.as_json(:include => [:region, :service, :programme]), objectifs: objectifs, liste_programmes_mvt: liste_programmes_mvt, liste_regions_mvt: liste_regions_mvt,programmes: programmes.as_json(:include => [:ministere, :mouvements, :objectifs])}
    render json: response
  end

  def search
    mouvements_grades = params[:grades_selected]
    mouvements_type_mouvements = params[:types_selected]
    mouvements_programmes = params[:programmes_selected]
    mouvements_programmes_id = Programme.where(numero: mouvements_programmes).pluck(:id)
    mouvements_region = params[:regions_selected]


    if current_user.statut == "admin"
      mouvements = Mouvement.all.order(created_at: :desc)
      mouvements_region_id = Region.where(nom: mouvements_region).pluck(:id)
    elsif current_user.statut == "CBR" || current_user.statut == "prefet"
      mouvements = Mouvement.where(region_id: current_user.region_id).order(date: :desc)
      mouvements_region = current_user.region_id
      mouvements_region_id = current_user.region_id
    end

    
    if params[:selected_new] && params[:selected_new].length > 0
      if params[:name] == "programme"
        mouvements_programmes = params[:selected_new]
        programmes_id = Programme.where(numero: params[:selected_new]).pluck(:id)
        mouvements = mouvements.where(programme_id: programmes_id, region_id: mouvements_region_id, grade: mouvements_grades,type_mouvement: mouvements_type_mouvements)
      end
      if params[:name] == "region"
        mouvements_region = params[:selected_new]
        regions_id = Region.where(nom: params[:selected_new]).pluck(:id)
        mouvements = mouvements.where(region_id: regions_id, programme_id: mouvements_programmes_id,grade: mouvements_grades, type_mouvement: mouvements_type_mouvements)
      end
      if params[:name] == "grade"
        mouvements_grades = params[:selected_new]
        mouvements = mouvements.where(grade: params[:selected_new], region_id: mouvements_region_id, programme_id: mouvements_programmes_id,type_mouvement: mouvements_type_mouvements)
      end
      if params[:name] == "type_mouvement"
        mouvements_type_mouvements = params[:selected_new]
        mouvements = mouvements.where(type_mouvement: params[:selected_new], programme_id: mouvements_programmes_id, region_id: mouvements_region_id, grade: mouvements_grades,)
      end
    end

    response = { mouvements: mouvements.as_json(:include => [:region, :programme,:service,]), types_selected: mouvements_type_mouvements, grades_selected: mouvements_grades, programmes_selected: mouvements_programmes, regions_selected: mouvements_region}
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
