# [GAME-BUILDER][game-builder]

![game][game]

These are some files I decided to extract from a previous javascript project. These should provide all the things a simple arcade game needs. I am talking Asteroids or Galaga simple. 

By itself this repository is kind of useless, as it is nothing more than a collection of requirejs modules. You could try and figure out how to use them, though. 

For better results it is better to use it in conjuction with [generator-game-builder][generator], a [Yeoman][yeoman] generator that generates(dur) the basic setup to start working with this stuff. Or you could just copy/paste stuff like crazy, your call.

-----------------------------------

###### TODO List:

- Update all examples 
    - new index.html
    - font-data.js
- Update Seed
    - new index.html
    - font-data.js

- Update website documentation
    - font-data.js

- Tag latest version of game-builder

- New Stuff on generator
    - Text
        - index.html
        - font-data.js
    - Renderers

- Annoying tasks
    - sound-player.js
        - Be able to set channels appart for a specific task, so that they don't need to be reloaded each time. The prototype basically crawls when it plays sound.
    - Rename delegate.js to broadcaster.js (think about a proper name)
    - Links to explanations of known errors, like requireJS
        - Normalize Error format. Maybe a little module to do so, it should recieve an object type and a message and with that build an error message
        - Single page in the website

- Examples v6 
    - Add feedback about the internals of each example
        - Pooled Objects
        - Active Objects
        - Pooled Sound Channels
        - Active Sound Channels
        - Cached Images
        - Cached Paths

- Figure out how to use r.js

- Do a simple game and get this over with for fucks sake!

-----------------------------------

###### After First game:

- Frame Animation System
- Shared Renderers. Share logic which does not need to keep state.
- Proper Tests

### [This is the prototype game][tirador] which spurred the creation of this project.

[game]: http://diegomarquez.github.io/game-builder/Galaga.png
[tirador]: http://www.treintipollo.com/tirador/index.html
[generator]: https://github.com/diegomarquez/generator-game-builder
[yeoman]: http://yeoman.io/
[game-builder]: http://diegomarquez.github.io/game-builder
