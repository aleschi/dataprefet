class ChangeEtpCibleToBeFloatInObjectifs < ActiveRecord::Migration[6.1]
  def change
  	change_column :objectifs, :etp_cible, :float
  end
end
