class AddMouvementLienToMouvement < ActiveRecord::Migration[6.1]
  def change
    add_column :mouvements, :mouvement_lien, :integer
  end
end
