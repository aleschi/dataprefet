class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

    def self.import(file)
  		data = Roo::Spreadsheet.open(file.path)
    	headers = data.row(1) # get header row
    	Region.all.each do |region| #on regarde si la region est dans le fichier
    		count = 0 
    		data.each_with_index do |row, idx|
    			next if idx == 0 # skip header
      			row_data = Hash[[headers, row].transpose]
      			if row_data['region'] == region.nom
      				count += 1
      			end 
    		end
    		if count == 0  #si nest pas dans le fichier on la supp
          User.where(region_id: region.id).destroy_all
    			region.destroy
    		end
    	end


    	data.each_with_index do |row, idx|
      		next if idx == 0 # skip header
      		row_data = Hash[[headers, row].transpose]
      		if !row_data['region'].nil? && row_data['region'].length > 0 #region existe
	      		Region.where('nom = ?',row_data['region']).first_or_create do |region|
	        		region.nom = row_data['region']
	      		end
	      	end
      		if User.where('email = ?',row_data['email']).count > 0 #user existe avec meme email on met ses infos à jour
		        @user = User.where('email = ?',row_data['email']).first
		        @user.statut = row_data['statut']
		        if Region.where('nom = ?',row_data['region']).count > 0
		        	@user.region_id = Region.where('nom = ?',row_data['region']).first.id
		    	  end
            @user.nom = row_data['nom']
            @user.password = row_data['Mot de passe']
		        @user.save
          elsif Region.where('nom = ?',row_data['region']).count > 0 && User.where('statut = ? AND region_id = ?', row_data['statut'], Region.where('nom = ?',row_data['region']).first.id).count > 0 #user existe mais modification du mail
            @user = User.where('statut = ? AND region_id = ?', row_data['statut'], Region.where('nom = ?',row_data['region']).first.id).first
            @user.email = row_data['email']
            @user.nom = row_data['nom']
            @user.password = row_data['Mot de passe']
            @user.save
		      elsif !row_data['email'].nil? && row_data['email'].length > 0 #on vérifie que email bien rempli
		        @user = User.new 
		        @user.email = row_data['email']
		        @user.statut = row_data['statut']
		        if Region.where('nom = ?',row_data['region']).count > 0
		        	@user.region_id = Region.where('nom = ?',row_data['region']).first.id
		   		  end
            @user.nom = row_data['nom']
		   		  @user.password = row_data['Mot de passe']
  		      if !@user.email.nil?
  			      @user.save
  			    end
		      end
      end
  	end
end
