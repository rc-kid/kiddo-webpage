---
title: "BOM Optimization"
date: 2026-08-31 20:09
abstract: "Although the latest prototype (v3.2 Beaver King) has a few problems - most importantly the new headphone detection circuit is not working, I am now in a happy place as across all my prototypes, I have every hardware feature working at least once:) This is great, because technically I can just put together the..."
hackaday: https://hackaday.io/project/205276/log/250429-bom-optimization
tags: [hardware, cost]
---

Although the latest prototype (v3.2 Beaver King) has a few problems - most importantly the new headphone detection circuit is not working, I am now in a happy place as across all my prototypes, I have every hardware feature working at least once:) This is great, because technically I can just put together the working parts into a single prototype and call it a day. But at the Lancaster summer school I've been to, Paul Dietz was showing a super neat trick that makes a single LED both emit and sense light and I would really like to use it in my device, partly because the light detection sensor is a bit expensive and hard to get.

But why stop at the light sensor you say:) So I decided that I should look at my entire bill of materials and see if I can improve things. And what I found shocked me!

The numbers below are for my fictional order of 50 units, where the entire BOM of that would be roughly 1k EUR. Out of this, those are the biggest offenders:

- 200 EUR for the accelerometer, which I use in the most primitive way, but I paid the premium because it also counts steps
- 162 EUR (!!!) for 220uF capacitors for 3v3 buffer and headphones filter
- 81 EUR (!!!) for the ATTiny3217 which is glorified IO controller. Note this is *more* expensive than the RP2350 which is the main brain.
- 80 EUR for the light sensor, that is slow to measure, I use it in the most basic way, but I liked it because it also measures the UV light
- 55 EUR for the analog/digital cartridge mux which allows cartridge to output directly to the audio codec inputs (analog)

Combined, this is roughly half of my BOM (the part of BOM that is assembled by JLCPCB anyways), which is crazy. So I started thinking on how to optimize it. As a programmer, I am probably the most upset (in the what is wrong with this world sense) with the fact that the tiny ATTiny (pun intended:) costs more than the powerful RP2350. I started researching at what are the cheaper options here and I was almost ready to defect to the PIC camp (funny enough atmels and pics are now both microchip so maybe not that bad for my karma), but the price difference will only be small.

So I went radical - what are the *cheapest* MCUs available? I need them to work as RTC, have enough pins, have flash in them, and have enough power/peripherals to do what ATTiny did. I was really surprised when I found the Puya microchips line. They are super cheap, come in variety of packages (including my favourite QFN), have enough pins, are a lot more powerful than the ATTiny, and are based on ARM Cortex M0+ (similar architecture to the RP2350's M33). Crucially they can be programmed via ARM's SWD which I already use for the RP2350. And they are cheap - at "volume" pricing of 50 units, they'll cost only 14 EUR.

The light sensor obviously goes and will be replaced by a cheap LED. But I have decided to also part ways with the accelerometer. Instead I'll get the cheapest accelerometer available, and I can always write the pedometer in software on the Puya chip, should I choose to (also, its power consumption is better that ATTiny's:). Cheap accelerometers will cost me 9 EUR for 50 units.

As for the capacitors, I have two options. For some reason, I was using some really expensive ones - I can get 220uF caps for essentially half the price, or if I use 2x100uF instead, I can drop the price to 29 EUR only (if I find place on the board).

Finally, the analog multiplexer for the cartridge is purely optional item and I do not have to have it assembled (I can revisit this in the future if I ever change my mind).

Overall, my savings can be up to 10 EUR per device in BOM alone, which is HUGE:

| Component | Before | After |
| --- | --- | --- |
| Accelerometer | 200 (LSM6DSVETR) | 9 (MSA3S02) |
| Capacitors | 162 (220uF) | 29 (2x 100uF) |
| MCU | 82 (ATTiny3217) | 14 (PY32F030K28U6TR) |
| Light Sensor | 80 (LTR-390UV) | 2 (cheap LED) |
| Analog Mux | 56 (DG2723DN-T1-E4) | 0 (do not fit) |
| TOTAL | 580 EUR | 54 EUR |

I was a bit worried though about the Puya MCU and I want to test it before redrawing my device and paying the money for it, so I created a simple Puya breakout board and ordered it from JLCPCB. It has just the barebones Puya chip, the external RTC crystal and SWD header out. I got a notice last week that I have a package ready so I ran to the post office today. But instead of the breakout boards, it was a notice informing me that I owe some TV license fees:( My package is still on the way, so to be continued...
