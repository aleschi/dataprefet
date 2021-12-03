require "test_helper"

class Api::V1::MouvementsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_mouvements_index_url
    assert_response :success
  end

  test "should get new" do
    get api_v1_mouvements_new_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_mouvements_create_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_mouvements_update_url
    assert_response :success
  end

  test "should get edit" do
    get api_v1_mouvements_edit_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_mouvements_destroy_url
    assert_response :success
  end
end
