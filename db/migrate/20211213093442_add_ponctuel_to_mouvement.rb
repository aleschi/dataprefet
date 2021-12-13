class AddPonctuelToMouvement < ActiveRecord::Migration[6.1]
  def change
    add_column :mouvements, :ponctuel, :boolean
  end
end
