class Programme < ApplicationRecord
  	belongs_to :ministere
    has_many :services
    has_many :mouvements
    has_many :objectifs
  	require 'roo'
  	require 'axlsx'

  	def self.import(file)
  		Ministere.destroy_all
  		Programme.destroy_all

  		data = Roo::Spreadsheet.open(file.path)
    	headers = data.row(1) # get header row
    	data.each_with_index do |row, idx|
      		next if idx == 0 # skip header
      		row_data = Hash[[headers, row].transpose]
      		Ministere.where('nom = ?',row_data['Ministere'].to_s).first_or_create do |ministere|
        		ministere.nom = row_data['Ministere'].to_s
      		end
      		if Programme.where('numero = ?',row_data['Numero'].to_s).count > 0
		        @programme = Programme.where('numero = ?',row_data['Numero'].to_s).first
		        @programme.ministere_id = Ministere.where('nom = ?',row_data['Ministere']).first.id
		        @programme.save
		    else
		        @programme = Programme.new 
		        @programme.numero = row_data['Numero'].to_s
		        @programme.ministere_id = Ministere.where('nom = ?',row_data['Ministere']).first.id
		        @programme.save
		    end
      	end
  	end
end
