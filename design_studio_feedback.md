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

Feedback from David Downey
--------------------------

>- the 'snapshots' are good to see the process so far, it was a good idea

>- I like that you have added the 'show only' checkboxes to filter the
connections. In fact with all checked, the information is quite
overwhelming. I went straight to research interests and degree programs. In
this view the connections are clear and informative.

>- the tooltips are good, but I would hasten the transition.

I'm currently using the title tag which has no controls; I'll investigate building a tooltip that I could better control.

>- I like the current colour scheme.

>- change the highlighting from the search to a light coloured box or shadow
to improve the visibility

I'd contemplated this at one time, but it requires rendering some additional content (svg rects) and I'm not sure I can afford the overhead given that I can't depend on only support "good" browsers (it's pretty strained right now as it is in IE).  I will at least test it, though.  

>- on the other hand, when showing connections, find a way of keeping the
colour scheme. Some of you earlier snapshots had this. Maybe keep the
original colour and bold or increase the font instead of making it black.

I'll be looking into a number of things relating to the highlighting.  Most of this is CSS tweaks and can be played with quite easily.

>- add a explanation of the categories that can be in a tooltip when you
hover over the rings and/or the 'show only' checkbox labels. Especially for
' Areas'  which is not really clear, but which you explain in the notes is
' Learning Areas'. Also what is Faculty? All Faculty or just 'Ladder"...

I'll have to see if we have this content, but it would be easy enough to add.

>- perhaps make the font size dynamic, so that for filtered connections, the
names are more readable.

This is easier said than done, as I'm working with a couple contraints -- not having the nodes' text overlap at the diameter of the pie chart and not having the nodes' text cut off at the edges of the svg element.  I've already done a lot of work with this (that's where the truncated titles came from) but there's still a ways to go.

>- sorry, but just because I saw it - check the trailing comma in
"Engineering..." and "Energy, Environment..."

I'm already checking for trailing "&", so a check for commas will be easy enough.

>I am missing 'Courses' - this would bring a different perspective and if
perhaps out of scope, but it would be a natural extension to seeing
connections with Degree Programs and Teaching Areas. If you were to include
this additional category, then perhaps limit the starting view to less
categories checked.

We actually don't have access to structured course content at the moment; Computing does, but I'd put it at 6 months to a year before they can help us get a usable feed of the data.  When I can get it, I do want to at least use it to tie Faculty to Degrees -- right now that connection is not as accurate as I'd like it to be.  

>Other visualisations: I don't know if you are considering this but if so,
something I might consider is how to show the relative size of categories,
i.e. the importance of connections. How could this be embellished? For
example, right now, we only see how important any name or category is
through the number of connecting lines. If you had some measure of
importance you could consider an extension with a type of Sankey chart (or
maybe something with relative bubbles).

This could easily be done -- but we very intentionally didn't do it, due to politics.  We have to be very careful not to elevate one area or person above another.  It might be useful information for an internal vis, though -- who's doing the most, which areas are most cross-disciplinary.

>Coming back to the 'Courses' category, I am wondering if there is some
hierarchy that you can use to show links to course in a supplementary
visualisation. For example, if you click on a Degree Program, can you show
the dependent courses (maybe with a piece of sunburst off that ring) or
alternatively, link to the courses that faculty are involved in by clicking
on them - so that this additional info is shown in the box in the middle.

This would probably be doable, though our course requiremenst are so flexible at the moment that it may actually confuse more than it would help. 


Feedback summary
----------------

A lot of good stuff here, some that I was already painfully aware of (font sizes) and some not.  I should be able to implement much of it with no trouble, the exceptions being a couple of suggestions that were outside the data we have access to or off the table for internal reasons.
