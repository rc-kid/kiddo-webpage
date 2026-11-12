---
title: "v3.2 Beaver King (version 2)"
date: 2026-05-30 17:58
abstract: "I have decided to actually print even the prototypes in beautiful black & ENIG finish. How else can I judge if it really is as beautiful as I hope:) As part of that I have also decided to remove almost all of the visual clutter from the silkscreen."
image: /assets/img/log/v32-beaver-king-version-2-1.jpg
hackaday: https://hackaday.io/project/205276/log/248063-v32-beaver-king-version-2
tags: [hardware, pcb]
---

I have decided to actually print even the prototypes in beautiful black & ENIG finish. How else can I judge if it really is as beautiful as I hope:) As part of that I have also decided to remove almost all of the visual clutter from the silkscreen. The outlines where top panel touches the PCB are not necessary to be visible. The text is not very useful for pre-literate children so I swapped it with pretty icons. The component markings are not necessary either, they mostly belong to assembly layer and will just make the board look uglier.

In EasyEDA this is super easy, I just right-clicked on the component, then Edit footprint -> for all and I moved all the silkscreen markings from silkscreen to assembly layer. The board preview looked super pretty, product like.

BIG MISTAKE

I placed the order and a few days later comes an email from JLCPCB to verify component placement. This has happened in the past a few times, but was always a formality - not once did I spot any error. But the boards were pretty expensive this time so I still do my due diligence and look carefully. I found 22 components to be badly oriented. 22!! Ranging from diodes all the way to big chips.

I verified all of them manually, indicated correct placement and sent the images back to JLCPCB. They were very nice and accommodating. I was very careful, tested everything twice, but I still have the nagging feeling in my head that I missed something and the boards will be broken.

I went to the editor and put all the orientation marks from assembly back to silkscreen. They will hopefully save me a lot of stress in the future, and they are barely noticeable. Clean silkscreen is great - empty silkscreen is not.

![]({{ '/assets/img/log/v32-beaver-king-version-2-1.jpg' | relative_url }})
