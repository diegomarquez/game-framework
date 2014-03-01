# [GAME-BUILDER][game-builder]

![game][game]

These are some files I decided to extract from a previous javascript project. These should provide all the things a simple arcade game needs. I am talking Asteroids or Galaga simple. 

By itself this repository is kind of useless, as it is nothing more than a collection of requirejs modules. You could try and figure out how to use them, though. 

For better results it is better to use it in conjuction with [generator-game-builder][generator], a [Yeoman][yeoman] generator that generates(dur) the basic setup to start working with this stuff. 

-----------------------------------

###### TODO List:
        
- New Website sections
    - Getting started. BIG BLUE BUTTON in Jumbotron. 
        - Quick start
        - Overview of default files and folders
            - .bowerrc
            - .gitignore
            - bower.json
            - config.js
            - Gruntfile.js
            - index.html
            - package.json
        - Overview of available grunt tasks
        - Slow start
    - Links to running examples
        - Should have link to github, to view the code
        - Should have link to corresponding doc

- Use path to generate proper in all systems.
- Download game-builder with grunt instead of the generator
- Make Seed project for a quick start

- Update howto.html with any relevant changes introduced up until this point

- Make Sublime plugin to generate files from templates
    - Make an empty menu structure.
    - Hook yeoman generators into each option.
    - Hook Grunt tasks.

- Think about how to handle paths to images/sound
    - Grunt task to create a file with name/paths pairs.
    - Pick up urls from another file to create mappings for remote resources.
        - This could be loaded as a text file when needed, or maybe a module. In any case, should be lightweight.
        - The idea is to have something else other than raw strings in the code.
    - Refactor sound-player so it loads things and plays them as they become available.
    - Add functionality to manipulate an individual sound channel to the sound-player

- Tag latest version of game-builder

- Extensions 2
    - TimerFactory extension, pause and resume all timeout when pausing the game ( No Demo )
    - Keyboard extension, block keyboard keys when pausing the game ( No Demo )

-Examples v4
    - Use HTML to add some on screen explanation of what is going on
    - Or anything to make them look prettier.
    - Some CSS to decorate the sorroundings? Maybe a Frame for the canvas.

- Spike Performance Boost
    - Canvas caching
        * Cache static drawings (Drawing Renderer, NEW)
        * Cache Images (Bitmap renderer)       

- Sub state machine state. Special state which contains a state machine. Used for branching paths

- Text

- Premade renderer to draw rectangles, circles lines and triangles.

- Figure out how to use r.js

- Do a simple game and get this over with for fucks sake!

- Annoying tasks
    - Test garbage collection
        - Test delegate.js destroy method properly
    - Links to explanations of known errors, like requireJS
    - Rename delegate.js to broadcaster.js
    - Examples docs need another review
        - Get rid of "_" chars, because they mess with markdown
        - Don't forget about fullstops at the end of comments.

#### [This is the prototype game][tirador] which spurred the creation of this project.

[game]: http://f.cl.ly/items/3N420I093v3b03051W39/game.png
[tirador]: http://www.treintipollo.com/tirador/index.html
[generator]: https://github.com/diegomarquez/generator-game-builder
[yeoman]: http://yeoman.io/
[game-builder]: http://diegomarquez.github.io/game-builder