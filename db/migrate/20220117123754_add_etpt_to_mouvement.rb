class AddEtptToMouvement < ActiveRecord::Migration[6.1]
  def change
    add_column :mouvements, :etpt, :float
  end
end
