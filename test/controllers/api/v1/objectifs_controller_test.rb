require "test_helper"

class Api::V1::ObjectifsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_objectifs_index_url
    assert_response :success
  end
end
