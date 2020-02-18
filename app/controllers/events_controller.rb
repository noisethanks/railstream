require 'aws-sdk-kinesisvideo'
require 'timeout'
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
    streamtimer = 20
    kinesisconnection = Aws::KinesisVideo::Client.new(region:'us-east-1',credentials:credentials)
    # stream =  kinesisconnection.create_stream({
    #   stream_name: "teststream100"
    #   # ,shard_count: 1
    # })
    stream = kinesisconnection.describe_stream({
      stream_name: 'teststream100'
    })
    p stream.stream_info.stream_name
    p stream.stream_info.stream_arn

    render json: {streamname: stream.stream_info.stream_name, streamarn: stream.stream_info.stream_arn, streamtimer: streamtimer-5}
    # render json: {stream: stream.stream_arn, timer:streamtimer-5}
    # Thread.new do
    #   sleep streamtimer-5
    #   # kinesisconnection.delete_stream({
    #   #   stream_arn: stream.stream_arn,
    #   # })
    #   # p 'killed the stream'
    #   active = false
    # end
  end
end