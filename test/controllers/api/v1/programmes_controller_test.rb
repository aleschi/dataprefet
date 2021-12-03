require "test_helper"

class Api::V1::ProgrammesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_programmes_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_programmes_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_programmes_destroy_url
    assert_response :success
  end
end
