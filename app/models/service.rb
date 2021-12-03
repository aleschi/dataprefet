class Service < ApplicationRecord
  belongs_to :programme
  require 'roo'
  require 'axlsx'

  	def self.import(file)
  		data = Roo::Spreadsheet.open(file.path)
    	headers = data.row(1) # get header row
    	data.each_with_index do |row, idx|
      		next if idx == 0 # skip header
      		row_data = Hash[[headers, row].transpose]
      		if Service.where('nom = ?',row_data['Nom']).count > 0
		        @service = Service.where('nom = ?',row_data['Nom']).first
		    else
		        @service = Service.new 
		        @service.nom = row_data['Nom']
		        @service.programme_id = Programme.where('numero = ?',row_data['Numéro']).first.id
		        @service.save
		    end
      	end
  	end
end
