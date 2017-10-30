Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

get '/', to: 'travelapp#index'
get 'login', to: 'travelapp#login'
get 'cities', to: 'travelapp#cities'
get 'events', to: 'travelapp#events'
get 'share', to: 'travelapp#share'
get 'posts', to: 'travelapp#posts'
end
