---
title: "RCKid Demo In The Browser"
date: 2026-04-01 20:52
abstract: "Allright, I promised audio, I know:) But:"
image: /assets/img/log/rckid-demo-in-the-browser-1.jpg
hackaday: https://hackaday.io/project/205276/log/247041-rckid-demo-in-the-browser
tags: [software, demo]
---

Allright, I promised audio, I know:) But:

![]({{ '/assets/img/log/rckid-demo-in-the-browser-1.jpg' | relative_url }})

This is RCKid, latest SDK revision that I am currently working on, running in browser (!) via Emscripten, thanks to Raylib. But what is the most impressive about it is that it only required about 90 minutes of work. Basically, I have done the following:

1. installed the emscripten sdk (very easy)
2. run emcmake with my cmakefiles. I got errors because libcurl not supported by emscripten and threads not supported by emscripten out of the box
3. I only need pthreads for the libcurl, and I only need libcurl for the WiFi, which is optional capability so I just added code (long overdue) that allows turning that capability off, and then reran cmake
4. now I got errors from my C++ code - particularly for the constexpr descriptors for the game engine objects (so that I can have kids program the device from the device itselfs, a feature I am currently building). The issue is I have lambda that calls method of an object inside the object before the type is finalized. gcc was ok with it, emscripten not. Cold sweat ran down my forehead because I was fighting those descriptors for the past 4 days and they are absolutely crucial. But then I realized there is a neat workaround. Those were non-capturing lambdas, so I can turn them to static functions. Emscripten was happy with those, and since the generators are already semi-heavy preprocessor affair, very little actually changed from user's perspective (you just don't specify the empty capture braces)
5. fixed few other C++ irregularities between gcc/clang and emscripten and I got wasm and js files.
6. googled what to do with them, turns out you need to provide a html file that loads them. Internets were helpful and I quickly had a working prototype, by working I mean it now crashed in browser
7. Added asyncify which raylib needs
8. Realized that my html initialization runs the module in JS and also the module runs on its own, so it ran twice, not supported by emscripten & raylib. Fixed.

And I have RCkid fantasy console working in browser. I am really impressed how simple it was. What I could test works (graphics mostly), audio probably too, inputs, animations. SD card emulation (unsurprisingly) does not. And of course it needs a lot of polish, addition to CI, demo on the webpage, ...

But yay:-) Well, I promise I will try to talk about the audio woes next time:)
