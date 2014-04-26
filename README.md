cs171-project-mazur-rebecca
===========================

Related sites
-------------
Project site: http://theredsetter.com/cs171/

Screencast: https://vimeo.com/93013472

The files
--------
Final code and assets are all included in the root of the repository; all snapshots have been moved to the snapshot directory.  The only library used here is d3; it's linked to externally (due to the way Drupal works, when the project appears live on the SEAS site there will also be a small amount of jQuery, but that has been left out here for simplicity's sake).  The Process Book is also in the root of the repository (ProcessBook.pdf).

The Drupal module is also included here (drupalmodule); it will be next to useless on any Drupal instance other than SEAS' as it's extremely specific about what it needs to pull out to work, but you can have a look at what's involved at least.  One of these days I plan to generalize it so it can be used against Views, but that will come later.

Please note that when visiting the website or using the code in the repository locally you will have to click the "Explore SEAS Connections" button to bring up the visualization itself -- this is to give you a feel for the final experience when the vis moves to the public SEAS site.  It will be located on multiple pages and triggered by a button as an overlay rather than being a separate page of its own.
