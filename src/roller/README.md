# Roll Player Dice Rolling

The current goal of this dice roller is to support general use caases for rolling dice. There are considerations for more advanced features and output but those are not considered part of the core dice rolling for now.

## Roll Operations

d - roll a die, examples: 1d6, 2d6, 10d20
k - keep n number of die from a roll, examples 2d6k1, must follow a die roll
r - reroll: 1d6r1 will reroll the d6 until it is not a 1
r<,r> - 2d6r<2: Rerolls any dice that are 2 or less until they are not a 2 or less. Same for r> but greater than
ro - reroll once: 2d6ro1 rerolls any dice that are a 1 once. Does not reroll any ones from new rolls
+,- - Modifiers, add or subtract values from a roll. 2d6+1, 2d6-2

## Planned

ro<,ro> - Reroll less than or equal to the target number once
!,!! - Exploding Die rolls
min, max, ceil, floor, round - as named
