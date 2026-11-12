---
title: Device
permalink: /device/
body_class: device
prose: true
lead: A pocket-sized handheld with a proper screen, real sound, glowing buttons and a cartridge slot that turns it into whatever you need. Open source, all the way down.
---

{% include placeholder.html label="kidDo mkIV, full device, front view on a plain background" src="/assets/img/device/full-front.jpg" ratio="3/4" %}

kidDo looks like a small console and is used like one: games, music, an alarm clock, messages, drawings. It is built to be carried around in a child's pocket every day, so it has to feel like a real product, not a kit. Underneath, it is a fully open, hackable computer, and the cartridge on its back decides what it becomes.

What follows describes the current design, **mkIV** (October 2026), the version I hope will be the last one before a small production run.

## At a glance

<div class="list specs">
    <div class="row row-split"><p class="row-meta"><strong>Brain</strong></p><p class="row-body">RP2350B: two Cortex M33 cores at 150MHz, 520KB of RAM, and PIO for all the clever I/O tricks</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Screen</strong></p><p class="row-body">2.8" 320×240 IPS, 16-bit parallel bus, 60 FPS</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Sound</strong></p><p class="row-body">16-bit audio codec, stereo headphone jack, mono speaker, MEMS microphone</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Controls</strong></p><p class="row-body">D-pad, four face buttons, home and volume buttons</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Feedback</strong></p><p class="row-body">8 RGB LEDs behind the buttons, a rumble motor</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Sensors</strong></p><p class="row-body">accelerometer, light sensing LED, temperature</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Storage</strong></p><p class="row-body">microSD card for music, drawings and settings; programs live on the cartridge</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Power</strong></p><p class="row-body">1200mAh LiPo, about 10 hours of normal use, USB charging, real-time clock that never sleeps</p></div>
    <div class="row row-split"><p class="row-meta"><strong>Expansion</strong></p><p class="row-body">cartridge slot with QSPI flash, 8 high speed pins, 2 analog inputs and up to 500mA of power</p></div>
</div>

<div class="features device-features">
    <div class="feature">
        <div class="feature-text">
            <h2 class="accent">The cartridge is the computer</h2>
            <p>The RP2350 has no flash of its own, it has to run its program from an external chip. kidDo turns that limitation into its main feature: the flash sits on a cartridge in the back of the device.</p>
            <p>Swap the cartridge and you have a different device. Make a game and it lives on something you can hold, label and give to a friend.</p>
            <p>A cartridge can also carry hardware. WiFi, an FM radio, a flashlight, an IR remote for the TV, <a href="{{ '/log/2026/08/jacdac/' | relative_url }}">Jacdac</a> modules, or just bare pins for tinkering.</p>
        </div>
        <div class="feature-img">
            <img src="{{ '/assets/img/device-back.jpg' | relative_url }}" alt="Back of a kidDo mkIII in a clear case: a cartridge with an antenna plugged into the cartridge connector, above the battery." loading="lazy">
        </div>
    </div>
    <div class="feature feature-flip">
        <div class="feature-text">
            <h2 class="accent">A screen made for pixel art</h2>
            <p>320×240 pixels is the sweet spot. Enough detail to look good, few enough that a child can draw every sprite, icon and map by hand without it becoming a chore.</p>
            <p>The display hangs off a full 16-bit parallel bus, so the RP2350 can push complete frames at 60 FPS and still have time left for the game itself.</p>
        </div>
        <div class="feature-img">
            {% include placeholder.html label="Close-up of the display showing pixel art drawn on the device" src="/assets/img/device/detail-display.jpg" %}
        </div>
    </div>
    <div class="feature">
        <div class="feature-text">
            <h2 class="accent">Real sound</h2>
            <p>A dedicated audio codec plays 16-bit stereo through the headphone jack and drives the speaker directly. It switches between the two by itself when headphones are plugged in.</p>
            <p>There is a microphone too, so kidDo can record, which opens the door to voice messages, sound effects made by the kids themselves, and the occasional walkie talkie.</p>
        </div>
        <div class="feature-img">
            {% include placeholder.html label="Detail of the speaker grille and headphone jack" src="/assets/img/device/detail-audio.jpg" %}
        </div>
    </div>
    <div class="feature feature-flip">
        <div class="feature-text">
            <h2 class="accent">Lights, rumble, motion</h2>
            <p>Eight RGB LEDs sit behind the buttons, so the whole front can glow, flash on a new message, or match a child's favourite colour.</p>
            <p>A rumble motor gives games a punch, the accelerometer knows when the device is tilted or shaken, and a single LED above the display doubles as a light sensor, a neat trick I learned from Paul Dietz.</p>
        </div>
        <div class="feature-img">
            {% include placeholder.html label="kidDo in the dark with the RGB backlit buttons glowing" src="/assets/img/device/detail-buttons-glow.jpg" %}
        </div>
    </div>
    <div class="feature">
        <div class="feature-text">
            <h2 class="accent">Always awake</h2>
            <p>Next to the RP2350 sits a tiny PY32F030 that never turns off. It keeps the time, watches the buttons and the battery, and wakes the main chip when it is needed. That is what lets kidDo be an alarm clock that rings even when the device is "off".</p>
            <p>It also guards the cartridge slot: power to the cartridge goes through a current limiting switch, so even a badly soldered homemade cartridge cannot damage the device.</p>
        </div>
        <div class="feature-img">
            {% include placeholder.html label="Close-up of the PY32F030 and power section on the PCB" src="/assets/img/device/detail-io-mcu.jpg" %}
        </div>
    </div>
</div>

## Inside

Everything is on a single board. The main components are assembled by the factory, which leaves only the display, battery, speaker and rumble motor to put in by hand, and the speaker and motor just press against spring contacts. No soldering needed.

<div class="gallery">
    {% include placeholder.html label="mkIV PCB render, front side" src="/assets/img/device/pcb-render-front.png" ratio="3/4" %}
    {% include placeholder.html label="mkIV PCB render, back side" src="/assets/img/device/pcb-render-back.png" ratio="3/4" %}
    {% include placeholder.html label="Assembled mkIV PCB photo" src="/assets/img/device/pcb-photo.jpg" ratio="3/4" %}
</div>

{% include placeholder.html label="Annotated mkIV board: RP2350B, audio codec, PY32F030, cartridge connector, SD card, battery charger" src="/assets/img/device/pcb-annotated.png" ratio="16/9" %}

A few things I am particularly happy with:

- **Two chips, two jobs.** The RP2350 does everything interesting, the PY32F030 does everything that has to keep running. They talk over I2C, and the accelerometer hangs off the small chip so the always-on part stays fully separate.
- **One battery, one rail.** A buck-boost converter keeps a steady 3.3V from a full battery down to an almost empty one.
- **Cheap where it does not matter.** After a [big BOM diet]({{ '/log/2026/08/bom-optimization/' | relative_url }}) the IO chip, accelerometer and light sensor together cost a fraction of what they used to, without losing a single feature kids would notice.
- **Easy to debug.** Both chips have the same small debug port, usable with a header or pogo pins, so a dead device is never a mystery.

## The case

The enclosure is 3D printed, and it is clear. Kids love seeing what is inside, and they should: there is nothing to hide. The case is held together with six M2 screws in threaded inserts and has room for the debug headers, so it can be opened and closed many times. The buttons are printed in two colours in one go.

<div class="gallery">
    {% include placeholder.html label="Case render, exploded view with PCB, battery and buttons" src="/assets/img/device/case-render-exploded.png" %}
    {% include placeholder.html label="Case render, front and back" src="/assets/img/device/case-render.png" %}
    {% include placeholder.html label="Printed clear case with coloured buttons, photo" src="/assets/img/device/case-photo.jpg" %}
</div>

## Cartridges

A cartridge is a small PCB with a flash chip and, optionally, anything else. The connector gives it eight high speed pins, two analog inputs, power, and a protected supply. Some I have built, some are on the drawing board:

<div class="gallery">
    {% include placeholder.html label="Basic game cartridge, just the flash chip" src="/assets/img/device/cartridge-basic.jpg" %}
    {% include placeholder.html label="WiFi cartridge" src="/assets/img/device/cartridge-wifi.jpg" %}
    {% include placeholder.html label="Flashlight and IR remote cartridge" src="/assets/img/device/cartridge-flashlight.jpg" %}
</div>

- **WiFi & Bluetooth**, for messages and updates
- **FM radio**, which used to be built in and now lives on its own cartridge
- **Flashlight & TV remote**, because every parent has been asked for both
- **Jacdac**, plug and play sensors and modules
- **Lab tools**, on the drawing board: an oscilloscope, a multimeter, a logic analyzer
- **Development cartridge**, that turns one kidDo into a debugger for another

## How it got here

kidDo has been rebuilt from scratch more than once. The full story, is in the [lab log]({{ '/log/2026/03/meet-the-family/' | relative_url }}).

## Build one yourself

Everything is open. The schematics and PCB are on [OSHWLab]({{ site.oshwlab }}), the case models, firmware and SDK on [GitHub]({{ site.github }}), and the detailed [hardware notes](https://github.com/rc-kid/rckid/blob/main/HARDWARE.md) explain every design decision down to the resistor values. Or, if you just want to see it run, [try it in your browser]({{ '/demo.html' | relative_url }}).
