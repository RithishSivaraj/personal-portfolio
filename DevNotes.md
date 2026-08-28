# Reminders and Notes
<br>

### <u>Build Progression</u>:

#### _Boot Sequence Animation:_
08/04/2026 - Initial Landing page now completed. Need to configure where the button leads to, i.e the boot sequence animation.
<br>
Tools for this: state storage, since I am not using a React Router. React router would just add a lot of complexity for such a small portion of the site, just to add some novelty.
<br>
This will essentially look like this: <br>
* At landing screen -> state: Landing <br>
* After power button is clicked, boot sequence starts -> state: Bootsequence <br>
* After boot sequence completes -> state: active [site is now visible]

<br>
<br>
08/08/2026 <br>

I now have a terminal window which runs a faux boot sequence. Still needs to be refined a lot. Some refines to add: <br>
* Need to make it seem like the bash window opens up after a short time after boot rather than just be booted as soon as button is clicked.
* Need to make a reusable system for the messages to print. Without rendering two messages at a time. 
* Need to initialize the ascii art to print one by one as well.
* Need to make a user input area where a user could type (y/n) themselves to access the site.
* Goal is to finish this portion up in two days.

08/22/2026 <br>
The entire boot sequence animation is complete. I utilized claude to produce the ASCII art, and the log messages for the boot sequence. I am now moving on to constructing the actual site. <br>
Note to self: Boot sequence animation might be taking too long, and might be better to look for ways to shorten.

#### _Navbar:_

Navbar was completed. I initially chose a Navy bluish color, but I think the black and white scheme looks a lot better. <br>
Possible design note: The linkedin and github icons are the original color of their actual logos. Maybe I should make them both white, and glow in their original colors when hovering?

#### _Landing Hero:_
I built a react 2d force graph representing my projects and tools that I have worked with. This took SUPER LONG. GPT helped in figuring out the positioning, but building the graph itself was relatively easy.
<br>
Note: Need to test how this graph comes up on mobile. I think it might honestly be a little too choppy on phone/tablet, so I may hide the graph view for those devices alone.
#### _About:_
I completed a simple about section. Perhaps I could just embed my certs in that too? Still have to decide between creating an individual certification tab or not.
#### _Experience:_
Thinking of a timeline design, where theres a black timeline with black nodes. Each node is clickable and will follow a left-right chronological order.
#### _Projects:_

#### _Resume:_


██████╗ ██╗████████╗██╗  ██╗██╗███████╗██╗  ██╗         ██████╗ ███████╗
██╔══██╗██║╚══██╔══╝██║  ██║██║██╔════╝██║  ██║        ██╔═══██╗██╔════╝
██████╔╝██║   ██║   ███████║██║███████╗███████║ ██████ ██║   ██║███████╗
██╔══██╗██║   ██║   ██╔══██║██║╚════██║██╔══██║        ██║   ██║╚════██║
██║  ██║██║   ██║   ██║  ██║██║███████║██║  ██║        ╚██████╔╝███████║
╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝         ╚═════╝ ╚══════╝