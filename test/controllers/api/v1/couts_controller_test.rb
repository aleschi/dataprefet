require "test_helper"

class Api::V1::CoutsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_couts_index_url
    assert_response :success
  end
end
