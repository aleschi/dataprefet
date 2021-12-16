class AddNomToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :nom, :string
  end
end
