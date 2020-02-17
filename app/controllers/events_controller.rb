class EventsController < ApplicationController
  def index
  end

  def initialget
    p 'get recieved'
    p params[:message]
    render plain: 'get request recieved'
  end
  def initialpost
    p 'post recieved'
    render plain: 'post request recieved'
  end
end