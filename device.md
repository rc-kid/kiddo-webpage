---
title: Device
permalink: /device/
body_class: device
prose: true
lead: kidDo is a handheld computer designed for children. It is sized to fit their hands and their pockets, takes cartridges, and is open source all the way down, from the firmware to the PCB and the case. This page walks through what is inside the device and why it is there.
---

<div class="gallery gallery-device">
    {% include placeholder.html label="kidDo mkIV, front view" src="/assets/img/device/full-front.webp" ratio="3/4" %}
    {% include placeholder.html label="kidDo mkIV, back view with a cartridge inserted" src="/assets/img/device/full-back.webp" ratio="3/4" %}
</div>

## Architecture

There are two chips at the heart of kidDo. The RP2350B is the CPU: it runs the applications and talks to the display, audio, storage and the cartridge. Next to it sits a small PY32F030 microcontroller that never turns off. It handles the buttons, lights and power, keeps the time, and switches the rest of the device on and off. The two are connected by an I2C bus, which the CPU also uses to configure the audio codec.

{% include device-diagram.html %}

<div class="feature">
    <div class="feature-text">
        <h2 id="cpu">CPU</h2>
        <p>The CPU is Raspberry Pi's <a href="https://www.raspberrypi.com/products/rp2350/">RP2350</a>, in its larger 80-pin B variant with 48 GPIO pins (and kidDo uses all of them:). It has two Cortex-M33 cores at 150 MHz and 520 KB of RAM. That is plenty for what kidDo needs to do: the everyday tools that make the device useful outside the classroom, such as an MP3 player, simple but good-looking games, and the editors kids use to make their own things.</p>
        <p>There are faster chips, and some would bring WiFi for free. I chose the RP2350 because its SDK is excellent and, honestly, because it is the most fun chip I have programmed. Its best feature is PIO: small programmable state machines that can implement almost any digital interface in software. On kidDo, PIO drives the display bus, the I2S audio and the SD card. It is also heavily used for the cartridges so that the CPU can connect effortlessly to virtually any digital peripheral.</p>
    </div>
    <div class="feature-img">
        {% include placeholder.html label="Close-up of the RP2350B on the mkIV board" src="/assets/img/device/detail-cpu.jpg" %}
    </div>
</div>

<div class="feature feature-flip">
    <div class="feature-text">
        <h2 id="display">Display</h2>
        <p>The display is a 2.8" IPS panel with a resolution of 320×240 pixels in 16-bit colour, a sweet spot for the size: there are enough pixels for things to look good, but few enough that a child can draw their own sprites, icons and maps pixel by pixel without being overwhelmed.</p>
        <p>The panel is connected through a 16-bit parallel (8080) interface, so that the CPU can make use of the framebuffer in the display and avoid strict timing of RGB modes, while spending as little time as possible on the transfer thanks to the wide bus, leaving more headroom for the application's main loop. In the rare cases where a full framebuffer is needed, it takes 150 KB and fits comfortably in the RP2350's memory.</p>
    </div>
    <div class="feature-img">
        {% include placeholder.html label="Close-up of the display showing pixel art drawn on the device" src="/assets/img/device/detail-display.png" class="pixelated" %}
    </div>
</div>

<div class="feature">
    <div class="feature-text">
        <h2 id="audio">Audio</h2>
        <p>Sound is important to kids, so kidDo has a dedicated audio codec, the Nuvoton NAU88C22GY, providing a 16-bit DAC at 48 kHz, enough for immersive experiences. The chip also integrates a stereo headphone amplifier and a mono speaker driver. The SDK comes with a simple but useful audio player capable of working with the common audio formats (MP3 and Opus especially).</p>
        <p>The audio codec also supports digital recording so kids can use the built-in MEMS microphone to record their own sound effects, or speech notes.</p>
    </div>
    <div class="feature-img">
        {% include placeholder.html label="Detail of the speaker and headphone jack" src="/assets/img/device/detail-audio.jpg" %}
    </div>
</div>

## Cartridges

The RP2350 has no flash memory of its own and runs its firmware from an external chip over QSPI. kidDo turns this cost-saving limitation into one of its best features: the firmware flash memory does not live inside the device, but on a cartridge that can be swapped and shared, like their namesakes from the handheld gaming consoles of the 90s.

Each cartridge also gets 10 extra GPIO pins connected to the GPIO/HSTX/ADC peripherals of the CPU. This allows the cartridge to carry extra hardware that extends the basic device functionality into almost anything: WiFi, NRF radio and [Jacdac]({{ '/log/2026/08/jacdac/' | relative_url }}) cartridges already exist, while many more are planned. A cartridge can draw up to 500 mA, which allows for surprisingly powerful wireless solutions.

<div class="gallery">
    {% include placeholder.html label="Basic cartridge, just the flash chip" src="/assets/img/device/cartridge-basic.webp" %}
    {% include placeholder.html label="Jacdac cartridge, with two Jacdac connectors on top" src="/assets/img/device/cartridge-jacdac.webp" %}
    {% include placeholder.html label="NRF radio cartridge, with an IR LED" src="/assets/img/device/cartridge-nrf.webp" %}
</div>

<div class="feature feature-flip">
    <div class="feature-text">
        <h2 id="buttons-lights-and-sensors">Buttons, lights and sensors</h2>
        <p>The front has eight buttons, the D-pad plus A, B, Select and Start. Each button has a distinct shape and its own RGB backlight. Three more buttons on the side are Home and dedicated volume up and down.</p>
        <p>kidDo comes with an accelerometer, light detector and a rumbler motor for feedback.</p>
        <p>Everything that has to keep working while the device is off is handled by a dedicated microcontroller, a PY32F030 with 64 KB of flash and 4 KB of RAM. It has a real-time clock with its own crystal, so kidDo can keep track of time and work as an alarm clock.</p>
    </div>
    <div class="feature-img">
        {% include placeholder.html label="kidDo in the dark with the RGB backlit buttons glowing" src="/assets/img/device/detail-buttons-multicolor.jpg" %}
    </div>
</div>

## SD card

The microSD card is the main storage for all projects and media files. It is connected to the RP2350 so that it can be used either in SPI mode or in the faster SDIO mode via the programmable IO.

## Power

kidDo runs from a 1200 mAh Li-ion battery, recharged over USB-C. It lasts about 10 hours of use and takes around 3 hours to charge. It is designed so that in theory, it can also run from three AAA batteries for a similar amount of time.

<div class="feature">
    <div class="feature-text">
        <h2 id="development">Development</h2>
        <p>Firmware for the RP2350 is uploaded over USB-C as UF2 files, no special tools needed. For deeper work, both the RP2350 and the IO controller have SWD debug headers, and each chip also has a serial TX line for debug output.</p>
        <p>In the future, kidDo development can be made with another kidDo via a SWD capable cartridge and serial monitor.</p>
    </div>
    <div class="feature-img">
        {% include placeholder.html label="Debug headers on the mkIV board" src="/assets/img/device/detail-debug-connector.png" %}
    </div>
</div>

## Assembly

The device consists of the main PCB and a connector daughterboard. Hand soldering is reduced to a minimum. The only items soldered by hand are the battery JST-PH connector and the optional debug headers, which are the only components on the bottom side, and the cartridge connector daughterboard, which is soldered to the main PCB. The speaker and rumbler use spring contacts, and the display connects with an FPC cable.

The case is 3D printed and screwed together with the PCB in the middle. A cartridge is a small PCB with a 3D printed cover glued on.

{% include exploded-diagram.html %}

## Specification

<div class="list specs">
    <div class="row row-split"><p class="row-meta"><strong>Dimensions</strong></p><p class="row-body">75 × 115 × 14 mm</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Case</strong></p><p class="row-body">3D printed, nylon or ASA</p></div>
    <div class="row row-split"><p class="row-meta"><strong>CPU</strong></p><p class="row-body">RP2350B, 2× Arm Cortex-M33 at 150 MHz</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Memory</strong></p><p class="row-body">520 KB RAM, program flash on the cartridge</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Storage</strong></p><p class="row-body">microSD card (SPI or SDIO)</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Display</strong></p><p class="row-body">2.8" IPS, 320×240, 16-bit colour, ST7789V, 16-bit parallel interface</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Audio</strong></p><p class="row-body">NAU88C22GY codec, 16-bit 48 kHz, 3.5 mm stereo headphone jack, mono speaker, microphone</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Controls</strong></p><p class="row-body">D-pad, A, B, Select, Start, Home, volume up and down</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Feedback</strong></p><p class="row-body">RGB backlight under each of the 8 front buttons, rumbler</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Sensors</strong></p><p class="row-body">accelerometer, ambient light, temperature</p></div>
    <div class="row row-split"><p class="row-meta"><strong>IO controller</strong></p><p class="row-body">PY32F030, Arm Cortex-M0+, 64 KB flash, 4 KB RAM, real-time clock</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Cartridge</strong></p><p class="row-body">QSPI flash, 8 HSTX-capable GPIO, 2 GPIO with ADC, 3.3 V at up to 500 mA</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Connectivity</strong></p><p class="row-body">USB-C, more via cartridges (e.g. WiFi, radio)</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Power</strong></p><p class="row-body">1200 mAh Li-ion, USB-C charging, about 10 hours of use, about 3 hours to charge</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Debugging</strong></p><p class="row-body">SWD and serial TX for both the RP2350 and the IO controller</p></div>
</div>

## Build your own

Everything is open source, so you can build your own. The schematics and PCB are on [OSHWLab]({{ site.oshwlab }}), and the case models, firmware and SDK are on [GitHub]({{ site.github }}). For the full technical details, including pin assignments, power budgets and the reasoning behind each component, see [HARDWARE.md](https://github.com/rc-kid/rckid/blob/main/HARDWARE.md).
