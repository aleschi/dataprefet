class CreateObjectifs < ActiveRecord::Migration[6.1]
  def change
    create_table :objectifs do |t|
      t.date :date
      t.integer :etp_cible
      t.float :etpt_plafond
      t.references :programme, null: false, foreign_key: true
      t.references :region, null: false, foreign_key: true
      t.integer :etp_3

      t.timestamps
    end
  end
end
