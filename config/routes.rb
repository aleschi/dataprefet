Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'objectifs/index'
      post 'objectifs/import'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'mouvements/index'
      get 'mouvements/new'
      get 'mouvements/edit'
      post 'mouvements/create'
      post 'mouvements/update'
      delete '/destroy/:id', to: 'mouvements#destroy'
      post 'mouvements/get_services'
      post 'mouvements/sort_table'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'couts/index'
      post 'couts/import'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'services/index'
      post 'services/import'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'programmes/index'
      post 'programmes/create'
      delete '/destroy/:id', to: 'programmes#destroy'
      post 'programmes/import'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'regions/index'
      post 'regions/create'
      delete '/destroy/:id', to: 'regions#destroy'
      post 'regions/import'
    end
  end
  devise_for :users, :path => "",
    :path_names =>  {:sign_in => "connexion", :sign_out => "logout"}
  root 'pages#index'
  get 'check_user_status' => 'pages#check_user_status'
  post 'users/import' => "users#import"
  get 'users/index' => "users#index"
  

  get '/*path' => 'pages#index' #redirige toutes les pages sans url vers la page d'accueil
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
