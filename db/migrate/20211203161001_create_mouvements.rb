class CreateMouvements < ActiveRecord::Migration[6.1]
  def change
    create_table :mouvements do |t|
      t.date :date
      t.references :user, null: false, foreign_key: true
      t.references :region, null: false, foreign_key: true
      t.float :quotite
      t.string :grade
      t.date :date_effet
      t.string :type_mouvement
      t.references :service, null: false, foreign_key: true
      t.references :programme, null: false, foreign_key: true
      t.float :cout_etp

      t.timestamps
    end
  end
end
