require 'rails_helper'

RSpec.describe User do
  describe "associations" do 
    it { should have_one(:avatar) }
    it { should have_many(:enrollments) }
    it { should have_many(:attendances) }
    it { should have_many(:courses).through(:enrollments) }
    it { should have_many(:user_badges).dependent(:destroy) }
    it { should have_many(:badges).through(:user_badges) }
    it { should have_many(:notes).with_foreign_key(:recipient_id) }
    it { should have_many(:sent_notes).with_foreign_key(:sender_id) }
  end

  describe "attributes" do 
    it { should respond_to(:first_name)}
    it { should respond_to(:last_name)}
  end 

  describe "validations" do 
    it { should validate_presence_of(:first_name)}
    it { should validate_presence_of(:last_name)}
  end 

  describe "instance methods" do 
    before(:each) do 
      @user = User.create(
        first_name: "First",
        last_name: "Last"
      )
    end 
    
    it "#full name- has a full name" do 
      expect(@user.first_name).to eq("First")
      expect(@user.last_name).to eq("Last")
    end 
   

  end

end