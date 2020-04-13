class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.string :location
      t.datetime :begin_at
      t.integer :event_type
      t.integer :state

      t.timestamps
    end
  end
end
