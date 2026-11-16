---
title: "Making Programming as Personal as the Device Itself"
date: 2026-10-26 21:19
abstract: "A lot of things have converged over the past few weeks, enough that I'm excited to finally write about one of the hardest and most rewarding parts of designing RCKid: making programming (I almost don't want to use that word - \"algorithmics\" is closer to what I mean, but almost nobody uses it, so programming it is)..."
image: /assets/img/log/making-programming-as-personal-as-the-device-itself-1.png
hackaday: https://hackaday.io/project/205276/log/252382-making-programming-as-personal-as-the-device-itself
tags: [software, language]
---

A lot of things have converged over the past few weeks, enough that I'm excited to finally write about one of the hardest and most rewarding parts of designing RCKid: making programming (I almost don't want to use that word - "algorithmics" is closer to what I mean, but almost nobody uses it, so programming it is) as personal to kids as the device itself.

Here's why this matters so much to me: kids don't have a computer with them 24/7. Not on the school bus, not during a five-minute break, not at the exact moment they get an idea and want to try it. But they can have a small handheld like RCKid in those moments. I think that changes a lot - not just *when* kids can create, but how much, and how deep.

**The constraint that shapes everything**

To make that possible, kids need to be able to program on a tiny device with no touchscreen - just a d-pad and a few buttons. I spent a long time trying to make the device itself bigger, fancier, more capable (trust me, I wasted a lot of hours on this :), but every version of that tradeoff made the device *less* personal - bigger, more expensive, more like "a classroom thing" and less like something that's truly theirs. So the only path left was adapting how *programming itself* works.

That led me to a series of on-device editors, all built around one shared idea, with increasing visual expressiveness as kids grow into them - and one underlying language that all the editors are really just different views of.

![]({{ '/assets/img/log/making-programming-as-personal-as-the-device-itself-1.png' | relative_url }})

**Hole-based editing**

The editors work by letting a program grow through holes - gaps where new code can go. A kid navigates between existing tokens with the d-pad, and selecting a hole opens a menu of valid things to put there. Different editor levels will show icons for pre-literate kids, simplified version with chevron delimiters for the older ones and a full readable text for the teenagers. Critically, only syntactically correct programs can ever be built this way. Types are used to filter and order the menu, so kids see fewer, more relevant choices and spend fewer keystrokes getting to something real. The image above shows one such screen, where this editing model produces a small visual DSL.

The whole environment - and the language underneath it - is designed around sharing and emergent exploration: a kid who gets ahead can build something (a new icon, a new component) that lowers the bar for everyone else, not just for themselves.

**A peek at the language**

A few things I think are genuinely interesting about the language itself: It is indentation-based, like Python - the editors handle nesting for you, so there's never a need to type a block's start or end.

Numbers are rational, not floating point - built on what kids understand from school and not machine epsilons and IEEE 754 weirdness. Comparisons chain the way they expect them to:

```
if 1 <= x < 10
    ... # this is the hole :)
```

Objects support inheritance, but deliberately *not* virtual dispatch - a child type can extend a parent and be used anywhere the parent is expected, but it can never override the parent's behavior. Methods are also defined *outside* the object declaration, which means kids can organically extend an existing object with new behavior at any point, without ever touching the original:

```
fun Sprite.moveHorizontally(by : num)
    self.moveBy(by, 0)
```

Everything is event-based. Kids define handlers for the events their game objects expose:

```
device.onButtonDown += fun(b)
    ... # called for any button b
```

The language, despite being primitive tries to teach some good practices. Functions are first class citizens (as seen above in the event definitions). A limited form of pattern matching works on event arguments:

```
device.onButtonDown += fun(Btn.Down)
    ... # called only when the down button is pressed
```

And separately, for functions that may or may not return a value, which always have to be checked and unwrapped before use:

```
if let a = myMap["foo"]
    ... # a exists, and was stored under "foo"
else
    ... # no such key
```

There is a `match` statement (think switch, but sharper), plus simple `test`/assertion support, and arrays, maps, and tuples all get dedicated, token-saving syntax and limited generics ability.

In keeping with RCKid's whole philosophy, cartridges can add their own game objects - so, for example, an RC cartridge lets a kid program their own LEGO creation using the exact same editors and the exact same language they already know from their games.

**Where things actually stand**

To be clear about what's real right now: The actual execution engine this language runs on is validated on-device. The asset editor is built; the editors shown here and the full language design are the part I am actively working through right now.

If you want to dig deeper: the editor design is written up [here (SPLASH-E)](https://2026.splashcon.org/details/splash-2026-splash-e/8/RCKid-Designing-a-Programming-Language-Through-Its-Editors), and the full language spec is at [Github](https://github.com/rc-kid/rckid/blob/main/LANGUAGE.md).
