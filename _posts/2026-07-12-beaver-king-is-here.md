---
title: "Beaver King is here!"
date: 2026-07-12 15:18
abstract: "Past few weeks I have been busy with bringing the mk3.2 to life, and it has mostly been success:"
image: /assets/img/log/beaver-king-is-here-1.jpg
hackaday: https://hackaday.io/project/205276/log/249204-beaver-king-is-here
tags: [hardware]
---

Past few weeks I have been busy with bringing the mk3.2 to life, and it has mostly been success:

- the enclosure (after some manual adjustments) looks great and fits nicely. The raised edges around the front cover work great too

- battery connector works nicely - it is not perfect though, the clearance between it and the rumbler enclosure in the bottom case is a bit too tight and the battery wire is a bit longer than necessary

- rumbler with sprint contacts works great! So much easier than clipping & soldering wires. The only thing that clouds my joy is the fact that LCSC discontinued (apparently, the page just says 404) the exact model I used.

- speaker with spring contacts works absolutely great too - even the enclosure made of the case works rather nice as it is already. I made some small mistakes so I had to print a frame ring for the speaker and I realized that I can actually turn this into feature as it makes the whole enclosure a bit easier to do & to glue the protective cloth. I might post details on this a bit later

- new top buttons are great too! Their feel is so much better and the assembly is a lot simpler too. I also realized I can manually swap color mid-print, which means no more gluing of the two button parts together

- and finally, the microphone seems to work rather well this time. I have only tested it with looking at the waveform, but I *can* produce a waveform this time;-D

That said, there were some hiccups, two most important are:

- the new headphone detection does not work at all. And I do not know why - the headphone detection line reads 0.3V whether headphones are connected, or not. I have verified the obvious (i.e. the headphone jack switch does indeed switch on/off)

- the new side buttons do not feel better than the old ones - maybe even worse. Furthermore of the 3 devices I assembled already, 1 button was soldered wrongly (fixed that with a wire), and one was not properly working (part problem, not soldering, you need to really press hard on it in a special way to work)

But overall, I am very excited as I can always go back to the old buttons & old headphone detection that worked. So finally, all hardware issues seem to be fixed now. Also, the new debug connector with the UART TX from both RP2350 and AVR are absolute godsend!

![]({{ '/assets/img/log/beaver-king-is-here-1.jpg' | relative_url }})![]({{ '/assets/img/log/beaver-king-is-here-2.jpg' | relative_url }})
