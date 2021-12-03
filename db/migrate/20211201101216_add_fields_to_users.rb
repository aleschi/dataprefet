class AddFieldsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :statut, :string
    add_reference :users, :region, foreign_key: true
  end
end
