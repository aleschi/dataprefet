require "test_helper"

class Api::V1::RegionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_regions_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_regions_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_regions_destroy_url
    assert_response :success
  end
end
