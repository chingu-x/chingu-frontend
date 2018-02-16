## Flag-Icon-Css-Library

The flag page utilizes the public flag-icon-css library from http://flag-icon-css.lip.is/

**However**, a big problem I ran into, was that there was no way to display data from the API and grab the correct flag image from the css library.

The css library organizes each flag into 2 letter names while the API organizes each country by an ID number and Country Name.

I figured that the best solution(performance wise), was to rebuild the library to organize it's flags by ID number vs two letter names.

## How it works

The rebuilt library works exactly the same as the one mentioned above in the link except that
instead of using ```class='flag flag-icon-background flag-icon-us'```, you would use ```class='flag flag-icon-background flag-icon-238'```.  The number 238 corresponds to the ID number within the API.

Right now, there are a few hiccups in the library such as unsupported countries, but most of these countries/territories such as Antarctica would highly unlikely have Chingu Members.

