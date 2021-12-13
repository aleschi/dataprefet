class Region < ApplicationRecord
  has_many :objectifs
  has_many :mouvements
	require 'roo'
  require 'axlsx'

  	def self.import(file)
  		data = Roo::Spreadsheet.open(file.path)
    	headers = data.row(1) # get header row
    	data.each_with_index do |row, idx|
      		next if idx == 0 # skip header
      		row_data = Hash[[headers, row].transpose]
      		if Region.where('nom = ?',row_data['Nom']).count > 0
		        @region = Region.where('nom = ?',row_data['Nom']).first
		    else
		        @region = Region.new 
		        @region.nom = row_data['Nom']
		        @region.save
		    end
      	end
  	end
end
