---
title: "Puya has blinked!"
date: 2026-09-06 21:09
abstract: "Puya now blinks;-D All it took was downloading the CMSIS packs for Puya and core Cortex M0+, then creating the linker and startup scripts. This is because the CMSIS packs are for ARM Keil Toolchain, while I am using gcc `arm-eabi-none`."
hackaday: https://hackaday.io/project/205276/log/250570-puya-has-blinked
tags: [firmware]
---

Puya now blinks;-D All it took was downloading the CMSIS packs for Puya and core Cortex M0+, then creating the linker and startup scripts. This is because the CMSIS packs are for ARM Keil Toolchain, while I am using gcc `arm-eabi-none`. I did some guesswork and tweaking and the scripts now exists and blinky blinks;-D

The simple cmake template with necessary files can be found here: [zduka/puya-blinky: An attempt at a blinky for thePY32F030 chip I am considering for rckid. Might evolve into a template for puya projects in the future.](https://github.com/zduka/puya-blinky)

And I am really excited that I will be able to debug the small chip too now - hopefully, compared to the serial printfs on the AtTiny,  this will speed up the development where I need to bring up the parts of the chip I need (I2C, RTC, PWM, Neopixel RGBs). So as always, to be continued:)
