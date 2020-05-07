Rails.application.routes.draw do
  get '/trainers/:trainer_id/pokemons/:pokemon_id/delete', to: 'pokemons#destroy'
  resources :trainers, only: [:index, :show] do
    resources :pokemons, only: [:new]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
