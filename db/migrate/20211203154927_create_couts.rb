class CreateCouts < ActiveRecord::Migration[6.1]
  def change
    create_table :couts do |t|
      t.string :categorie
      t.references :programme, null: false, foreign_key: true
      t.float :cout

      t.timestamps
    end
  end
end
