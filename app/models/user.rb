class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

    def self.import(file)
  		data = Roo::Spreadsheet.open(file.path)
    	headers = data.row(1) # get header row
    	Region.destroy_all
    	data.each_with_index do |row, idx|
      		next if idx == 0 # skip header
      		row_data = Hash[[headers, row].transpose]
      		Region.where('nom = ?',row_data['region']).first_or_create do |region|
        		region.nom = row_data['region']
      		end
      		if User.where('email = ?',row_data['email']).count > 0
		        @user = User.where('email = ?',row_data['email']).first
		        @user.statut = row_data['statut']
		        if Region.where('nom = ?',row_data['region']).count > 0
		        	@user.region_id = Region.where('nom = ?',row_data['region']).first.id
		    	end
		        @user.save
		    elsif !row_data['email'].nil? && row_data['email'].length > 0 #on vérifie que email bien rempli
		        @user = User.new 
		        @user.email = row_data['email']
		        @user.statut = row_data['statut']
		        if Region.where('nom = ?',row_data['region']).count > 0
		        	@user.region_id = Region.where('nom = ?',row_data['region']).first.id
		   		end
		        if !@user.email.nil?
			        @user.save
			    end
		    end
      	end
  	end
end
