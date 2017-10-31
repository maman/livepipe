# LivePipe [pretty much WIP]

Video content management which include a RTMP streaming server that re-stream to any RTMP streaming endpoint

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
4. Stream feeds using ffmpeg - on my MBP, it's `ffmpeg -f avfoundation -framerate 30 -i "0" -video_size 1280x720 -c:v h264 -preset veryfast -maxrate 1984k -bufsize 3968k -vf "format=yuyv422" -g 60 -c:a aac -b:a 128k -ar 44100 -f flv rtmp://localhost:8956`.

## Limitations

I restrict the input format to be H264 video, AAC audio only to comply with FB/YouTube/Twitch format.

## Troubleshooting

<details>
  <summary>1. FFMPEG input devices</summary>
   You can find out available devices with `ffmpeg -devices` command. In my example, I use `avfoundation`.
</details>
<details>
<summary>2. FFMPEG hardware input</summary>
   You can find out available hardware input devices with `ffmpeg -f ${INPUT_DEVICE} -list_devices true -i ""` command. In my MBP, The webcam shows at `[0]`, so I need to use `-i "0"` flags on my ffmpeg command.
</details>
