---
title: "Audio Woes"
date: 2026-04-12 21:40
abstract: "I am pure software engineer by trade, and while I can deal with digital circuits, analog circuits, of which audio is prime example as really hard for me, so the audio system of RCKid has been quite a journey so far..."
image: /assets/img/log/audio-woes-1.png
hackaday: https://hackaday.io/project/205276/log/247218-audio-woes
tags: [hardware, audio]
---

I am pure software engineer by trade, and while I can deal with digital circuits, analog circuits, of which audio is prime example as really hard for me, so the audio system of RCKid has been quite a journey so far...

**Bit of History**

Before working on RCKid, my MP3 Radio for kids used PT8211 and a class D opamp for a speaker. PT8211 is a really cheap easily solderable SOIC-8 I2S DAC. While I wanted to reuse my trusted setup, I ran into problems quickly as the SOIC chip + speaker amp + headphone amp were just way too big for RCkid. Also, the new batch of chips I ordered from China all came as duds. And finally, I did not have I2S pins available (this was the RPi zero time and the I2S pins were already used by the display SPI).

So I started looking how the real Raspberry Pi was doing and I found the, in my opinion, ingenious way of using PWM via Schmitt Trigger (for voltage stability) and low pass filter for nice analog output, which is what the first RPis were doing:

![]({{ '/assets/img/log/audio-woes-1.png' | relative_url }})

I have blatantly copied this design, the Schmitt triggers are actually capable of driving small headphones on their own, so I only needed a D-Class opamp for the speaker. I have used autogain microphone module from Adafruit and connected it to the ATTiny, which is just capable enough to record 9kHz 8bit mono audio and stream it to the RPi via I2C.

**MkII**

When I switched to RP2040 and started the MkII, I have decided to reuse this new trusted circuit and attached it to RP2040 PWM pins as I have calculated that I can easily output 44kHz 8bit stereo audio this way. But when I listened to it, it sounded *awful*. I am no audiophile, but this was bad. Started hissing as soon as I enabled the playback and the quality of the output sound was terrible. With speaker, it was barely ok, but headphones were torture.

At first I brushed it off thinking this is probably just some noise from the breadboard (on which the device lived at that time), but when I got my first PCBs back, the same noise was there. This was the time when I added "audio woes" section in my TODO list as I tried almost everything. I double, and triple checked the schematics (there were some changes between Raspberry Pi versions, and I did not copy the schematics verbatim. No amount of component changes and value adjustments fixed the problems.

Desperate, I turned to software. I fixed a few minor playback bugs, such as tiny hiccups during buffer switching. Those had no effect - as expected, but at this time I doubted everything. My lucky break came when one night I wanted to torture myself and listen to the exact same music on my laptop to rub salt into my wounds by hearing how it might have sounded. But it sounded awful too!

**Becoming Audiophile:)**

I quickly started researching and realized that with 8bit audio, the quantization noise (rounding to the 256 amplitude levels supported) creates the horrible sound. I could not do 16bit on RP2040 as the chip was not fast enough to give me all 65536 levels with decent sample rate, but luckily at 12bits the audio sounded already great. Nor did my kids complain about any sound issues:)

But for MkIII I wanted something better. I realized audio codecs are not just compression programs, but also super useful chips that integrate DAC, ADC, amplifiers, equalizers and what not into a single, small package. I have chosen NAU88C22GY, which is really cheap and quite capable. Furthermore, it has allowed me to do proper microphone recording this time with the codec outputting in I2S, which RP2350 is really good at reading, thanks to the PIO.

The noise came back! Though this time I blamed the data format first - the new chip was so good that the old MP3 files (I transcoded them many years back at 64kbps because the radio could not handle more back then) were pretty bad. So I retranscoded everything at decent bitrate and stereo and gave the devices to my kids.

"Woooow, wooow! They are right here! I am at the concert!" my daughter started screaming with headphones on as she was subjected to the power of 16bit 44.1kHz stereo audio for the first time:)
