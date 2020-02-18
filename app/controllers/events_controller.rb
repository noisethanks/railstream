require 'aws-sdk-kinesisvideo'

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


  def getKinesisStream
    credentials = Aws::Credentials.new('AKIA3CB4RW5EJYRIT5OZ',
    '1eO/bxS4WS1oTOP4L9jm7/PNhkVnVmJAqj8DoGg1')
    p params
    kinesisconnection = Aws::KinesisVideo::Client.new(region:'us-east-1',credentials:credentials)
    stream =  kinesisconnection.create_stream({
      stream_name: "teststream100"
      # ,shard_count: 1
    })
    p stream.stream_arn
    render plain: stream.stream_arn
  end
end