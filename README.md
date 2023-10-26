# Expand Layer

expand the cyan annotations layer by x amount of blocks in all directions
choose the chance for each new layer to stop generating

The script will generate layer by layer, like an onion, inside out

downloads: https://github.com/IR0NSIGHT/ExpandLayer/releases  
github: https://github.com/IR0NSIGHT/ExpandLayer

![](./PR/thumbnail.PNG)
![](./PR/example_4_ops.png)
1. Top left: 20 iterations, 1 chance
2. Top right: 1 iterations, 1 chance
3. Bottom left: 20 iterations, 0.7 chance
4. Bottom right: 20 iterations, 0.5 chance

# Instructions

### IMPORTANT: SAVE YOUR WORLD BEFORE RUNNING! THIS SCRIPT CAN CRASH WORLDPAINTER AND YOU LOOSE ALL UNSAVED CONTENT!

1. download the newest release as a zip file puddler.js file
2. unpack the zip folder somewhere
3. mark all the spots where rivers can start in your worldpainter world with the CYAN annotation layer. Be generous, a
   100x100 area is fine
4. in WorldPainter, on the top toolbar, center-right, open "run script" and select ExpandLayer_v?_?_?.js from the folder where you
   unpacked the zip file
5. Select your wanted parameters and run the script. Orange annotation will generate around the cyan annotations.

# Known issues
There used to be a performance bug that caused the script to get stuck indefinetly and would cause a force quit of WP.
Bug has been fixed, but if you encounter any issues, please report them on the github page.
