---
title: "Puya Has Arrived!"
date: 2026-09-06 11:21
abstract: "The Puya breakout boards I have created have arrived. More specifically, the PY32F030:"
image: /assets/img/log/puya-has-arrived-1.jpg
hackaday: https://hackaday.io/project/205276/log/250554-puya-has-arrived
tags: [hardware, firmware]
---

The Puya breakout boards I have created have arrived. More specifically, the PY32F030:

![]({{ '/assets/img/log/puya-has-arrived-1.jpg' | relative_url }})

I have been trying to bring it to life so far, and this is report about the work in progress,. because I am not at blinky yet:) But not all is lost:

First I had to change my setup - for rckid's debugging I was using OpenOCD connected to raspberry pi GPIO, which worked nice so far, but required the actual Raspberry Pi. There is also the debug probe from RPi, which is essentially a RP2040 with the SWD and UART out and a few LEDs. I was always thinking that it would be really nice to have a cartridge for RCKid that does exactly this (and more - in the ATTiny3217 days I planned SWD, UART and UPDI interfaces). And because OpenOCD does not work trivially with Puya, this felt like a good option to try to switch.

But as I did not want to debug multiple things at the same time, I first just flashed the default debugprobe code to an old RPi Pico I had lying around unused (fun fact: This pico was used to prototype the rckid *before* the Rpi zero days (see the history log:). I also tried pyOCD, which looks a bit more modern and I was hoping I can run it from my laptop - which I can!

I then tried to list the targets and scope at the gpios to see if the SWD is working, and it seemed it was not/. But my mistake. The debugprobe will *not* detect a device is connected and connect to it automatically, you *must* tell it to. It took me some time to realize this when staring at flat scope lines at night:) But now I connect to the puya, I can flash, and I can inspect the chp state. So I know hardware-wise the puya is really simple to use, almost as much as the ATTiny was.

But this was the easy part - the hard part is figuring out the code to run. In the past I was shielded from all this by the RPi Pico SDK, but now I am digging through Chinese documents, ARM Keil CMSIS and friends. So I do not have a blinky yet. To be continued...
