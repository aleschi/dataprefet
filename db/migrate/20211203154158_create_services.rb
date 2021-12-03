class CreateServices < ActiveRecord::Migration[6.1]
  def change
    create_table :services do |t|
      t.string :nom
      t.references :programme, null: false, foreign_key: true

      t.timestamps
    end
  end
end
