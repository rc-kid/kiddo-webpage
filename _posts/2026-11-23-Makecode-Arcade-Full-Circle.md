---
title: "Makecode Arcade Full Circle"
date: 2026-11-23
abstract: "I originally wanted MakeCode Arcade support for kidDo, then abandoned the idea when on-device programming became the bigger priority. But I have realized something important: before studying on-device programming, I can first study what happens when children's creations become physical, shareable artifacts. This post is about bringing MakeCode Arcade to kidDo cartridges and why I suddenly think it matters."
image: /assets/img/log/makecode-arcade-full-circle-1.png
---

Although it is now that I am working on the *doLang* and the on device editors, I wanted kidDo to pe programmable by kids even before I had the first prototype in my hands. But my original idea was to use the really amazing [Makecode Arcade](https://arcade.makecode.com/) from Microsoft. If you are not familiar with it, I highly recommend giving the website a peek. Think of it as a fantasy console (kinda like Pico8), but programmable in Scratch-like blocks based web ide. On top of that you also get the games to run on real hardware if you want. And I thought one of those devices could be kidDo. 

So eagerly I started slowly moving my kids from Scratch to Makecode to see how they will take it and I started thinking how to make the Arcade support my kidDo. Back then this was non-trivial as the Arcade is a big project built on top of other big projects. It is really modular and just figuring out where to put your code is well... hard. But I was confident it can be done. 

But I started seeing cracks in my world of low-res pixel art rainbows & unicorns. Kids had to wait for the computer to be able to program stuff. Every time the device disconnected, they had to reconnect in order to flash the device again and that required reading and writing, and while they still pushed through, I saw that for kidDo, I really want on device programming and lost interest in porting the Arcade runtime.

Enter late 2026. I still absolutely believe that on-device programming is essential for kidDo. But there are other essential things, such as shareable cartridges. And recently I realized that I can test the idea of shareable cartridges without first having on-device programming. In other words, I can explore how (if at all:) the tangibility and physical shareability of a cartridge changes kids workflow. You probably see now where I am heading with this...

Yes. I went back to the Makecode Arcade support. Kids already use Makecode Arcade to create games. Those games live in a browser and can be flashed on a device. With kidDo, they can be flashed on a cartridge. This cartridge can be shared with a friend, shown off at home, collected, and what not. The game code and assets can also live on the cartridge, so that when a cartridge is shared, the game can be copied off the catridge and extended further, and so on. Importantly, there will be a baseline - Makecode Arcade without shareable cartridges and kidDo, so a comparison can be made. And equally importantly, this will be a baseline for the future on device editors - where we can check how the on device editors change the development dynamics alone. 

I only need the Makecode Arcade suppport now:)

![]({{ '/assets/img/log/makecode-arcade-full-circle-1.png' | relative_url }})

But we live in 2026 and we have AI. I really enjoy programming for kidDo and I want to do it myself. And I already have all the display, audio and IO drivers in the kidDo SDK. What I do not particularly enjoy, like most programmers, is reading very large unfamiliar codebases. But AI does not care, so with the actual functionality already present in my repository, the task became integrating it into the MakeCode Arcade ecosystem. This is still a substantial effort - you have to build the beast locally, figure out where things go, ensure things do not break, and do the actual porting. My drivers depend on supporting code around them, so it is not as simple as copying files from one project to another. But as a human, I would likely spend weeks navigating and understanding several large codebases before writing much kidDo-specific functionality. AI turned out to be remarkably effective at accelerating exactly that process. As a result, in just a few days (of which I really only had the evenings, as usual:) I was able to create RP2350 support, port my display, IO and sound drivers, and integrate everything into a local build of MakeCode Arcade.

![]({{ '/assets/img/log/makecode-arcade-full-circle-2.jpg' | relative_url }})
 
It is not perfect - the sound hisses a bit when not on, battery voltage is not detected properly, I haven't yet managed to intergate enough so that the device can be flashed *from* the browser, and some parts in the editor do not work yet. But I have now a version of Makecode Arcade that will generate `uf2` files that can be downloaded to kidDo cartridges and then the cartridge will become the Makecode Arcade game. And of course, the cartridge can then be shared:)

To be continued...:)
