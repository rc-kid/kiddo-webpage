---
title: "Hello World!"
date: 2026-03-17 22:35
abstract: "I have been working on this \"quietly\" for the past 3+ years with various iterations, so I have a huge backlog of technical details and opinions that I would like to eventually share here, piece by piece as I will find some time to choose what its interesting and write it down, so stay tuned:)"
hackaday: https://hackaday.io/project/205276/log/246753-hello-world
tags: [news, hardware]
---

I have been working on this "quietly" for the past 3+ years with various iterations, so I have a huge backlog of technical details and opinions that I would like to eventually share here, piece by piece as I will find some time to choose what its interesting and write it down, so stay tuned:)

Let me start with technical details:

- RP2350 MCU from RaspberryPi that mixes raw power (520KB RAM, 2x Cortex M33 cores at 150MHz with overclocking possibility) and ease of use (C++ SDK). Further supported by great community and skillfully designed so that programming it is *fun* even for experienced developers (PIO)
- unique cartridge system: the firmware is not stored on the device, but in every cartridge. Cartridges can be swapped, shared, or reprogrammed with any computer easily. On top of the mandatory FLASH for the firmware, cartridges contain 8 high speed digital pins (HSTX, SPI, I2C, UART, PWM) and 2 analog pins to enable hardware tinkering
- 2.8" 320x240 IPS display with 65536 colors. Perfect for retro gaming and pixel art with enough catchy detail, but not too many pixels to design. 60 FPS refresh rate.
- 16bit stereo sound (headphones & mono speaker) with up to 48kHz playback. Powerful enough for MP3 playback
- SD card for media & settings, up to 64GB supported. FAT32 and exFAT filesystem - DPAD, A, B, Select and Start buttons with customizable RGB backlight
- 3 axis accelerometer with integrated pedometer
- rumbler for haptic feedback (simple motor)
- 1300mAh LiIon rechargeable battery with USB-C charging, or 3x AAA batteries, both options should give around 10 hours of active time.
