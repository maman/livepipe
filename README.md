# LivePipe [pretty much WIP]

Video content management that includes a RTMP streaming server which "duplicates" your stream to multiple RTMP endpoint

## Concept

1. Create an 'event', with optional FB, YouTube, and Twitch account
2. When the day comes, start your streaming software, and enable FB, YouTube, or Twitch.
3. Stream your video to livepipe's RTMP stream endpoint.
4. Your video will be saved to livepipe's storage, while it'll re-stream your video to FB, YouTube, and Twitch.
5. You can watch saved videos!

## Develop the app

1. I use [Docker](https://store.docker.com/search?offering=community&type=edition) and ffmpeg (`brew install ffmpeg`) to develop this app - so, install it first.
2. Run the app with `docker-compose up`.
3. The app will be available on `http://localhost:3000`, and the RTMP server will be available on `rtmp://localhost:8956` (you can set another port on [.env](./.env) file).
4. Stream feeds using ffmpeg - on my MBP, it's `ffmpeg -f avfoundation -framerate 30 -i "0:1" -pix_fmt yuv420p -profile:v high -s 1280x720 -vb 400k -maxrate 4000k -minrate 4000k -bufsize 600k -deinterlace -vcodec libx264 -preset veryfast -g 30 -r 30 -strict -2 -codec:a aac -ac 1 -ar 44100 -b:a 128k -f flv rtmp://localhost:8956`.

## Limitations

I restrict the input format to be H264 video, AAC audio only to comply with FB/YouTube/Twitch format.

## Troubleshooting

#### FFMPEG Input driver

You can find out available devices with `ffmpeg -devices` command. In my example, I use `avfoundation`.

#### FFMPEG Select input device

You can find out available hardware input devices with `ffmpeg -f ${INPUT_DEVICE} -list_devices true -i ""` command. In my MBP, The webcam shows at `[0]`, and my microphone shows at `[1]` so I need to use `-i "0:1"` flags on my ffmpeg command.
