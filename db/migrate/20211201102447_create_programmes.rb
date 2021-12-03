class CreateProgrammes < ActiveRecord::Migration[6.1]
  def change
    create_table :programmes do |t|
      t.string :numero
      t.references :ministere, null: false, foreign_key: true

      t.timestamps
    end
  end
end
