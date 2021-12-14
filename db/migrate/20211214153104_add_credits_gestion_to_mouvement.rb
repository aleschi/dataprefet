class AddCreditsGestionToMouvement < ActiveRecord::Migration[6.1]
  def change
    add_column :mouvements, :credits_gestion, :float
  end
end
