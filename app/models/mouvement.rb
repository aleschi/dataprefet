class Mouvement < ApplicationRecord
	belongs_to :user
	belongs_to :region
	belongs_to :service
	belongs_to :programme

  	
end
