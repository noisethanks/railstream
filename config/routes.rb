Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'events#index'

  get 'initial', to: 'events#initialget'

  post 'initial', to: 'events#initialpost'

  get 'getKinesisStream', to: 'events#getKinesisStream'
end
