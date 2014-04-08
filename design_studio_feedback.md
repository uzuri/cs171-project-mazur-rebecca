Feedback from Matthew Silva
---------------------------

>I took a look at your project and it is very impressive. I found it very
interesting that you are doing a work-related project and it is actually
solving a real problem.

>The design is very good and is visually appealing. It looks a professional
website.

>If I had to suggest some improvements, I would say the search box wasn't
completely intuitive. I wasn't sure what it was doing at first. While the items
on the graph where highlighted, maybe more could be done to make them stand out.

I'll definitely see what I can do here; I've toyed with several things, but settled on the small caps, bolding, and darker color; I may increase the font size slightly and darken the color another notch.  I'm somewhat stuck in a corner due to the fact that I can't use bold and black due to the fact that someone might search and hover at the same time -- it's important that they be distinct.

>Another issue is that with all the information shown, the text can be a little
small to read. Due to this I don't think the visualization would scale well to
a much larger dataset. It would get too crowded.

Definitely a known problem and one that I'm somewhat stuck on how to fix.  We'd planned to add two categories; if we do it's my intention to not show them on load -- they wouldn't appear unless chosen from the filter set in the sidebar and the filter set would limit the number of items you could have on-screen at the same time, much as it now prevents you from dropping the visible categories below two.

>Another possible improvement might be to allow more freedom to rotate the graph. The click to rotate is a little limited since rotation might make some of the text easier to read.

I'm going to put this on the nice to have list, but I'll plan to look into a couple ways to do this -- one would be click and drag to rotate and the other a click at any point rotates that point to the 270 deg. spot.  Both are a little more difficult to calculate than the current method, but should be doable.

Feedback from Roaseanne Feng
----------------------------

>I agree with Matthew, it looks really good and I could definitely see it in use, speaking as a SEAS student who isn't sure where anything goes! I also agree on the points he's raised, especially regarding the search - maybe make the terms a different color instead of just bolded, since that tends to get lost if you have a lot of items displaying. Also a minor detail, but I'd suggest that the read more links open a new window rather than staying in the old one.

Mentioned what I'd do for the search above; the new window suggestion is a tough one, as in web ui design it's usually considered to not be user-friendly to force a new window (I used to not believe this, but I've had the opportunity to teach a number of people how to use computers and the web... and yes, they definitely get confused when a new window is opened.  It's incredible to watch.).  Instead I'm going to work on making sure that the vis doesn't break the back button (you can get back to the vis) since in its final form it's going to live as a pop-over screen in several pages of the SEAS site and it would be very annoying to have to relaunch the vis every time you backed out.

>I'm also wondering if you could show connections between things in the same categories, mostly in the related research interests, if your user isn't familiar with all of the possibilities, ex. the various interests linked to environmental studies or even just which interests commonly overlap. 

This can definitely be done, though it's not in the data.  I'll plan to run this back to my content providers, though it probably won't make the final submission.

>Last nitpicky suggestion about colors, but is there a reason that the connections when you're hovering over an item show up red-orange? It's the only color encoding that doesn't seem intuitive to me, especially since when you have clicked on an item, the connections do turn to the appropriate colors. I think having the colors taken from the item linked to would help to distinguish your connections at a glance and improve readability.

Good catch here -- the orange color was just a default from the template I built on to.  I plan to experiment with the links always being the color of the targeted node; it should be doable as I already do it with the "zoomed" node.

Feedback summary
----------------

A lot of good stuff here, some that I was already painfully aware of (font sizes) and some not.  I should be able to implement most of it with no trouble.
