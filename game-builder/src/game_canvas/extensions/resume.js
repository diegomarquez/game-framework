/**
 * # resume.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: [extension](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/game_canvas/extensions/extension.html)
 *
 * Depends of: 
 * [groups](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/hierarchy/groups.html)
 * [viewports](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/view/viewports.html)
 * [gb](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/gb.html)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * This module defines an extension that uses [groups](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/hierarchy/groups.html) to resume all update activity
 * when the application gains focus.
 *
 * It also uses [viewports](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/view/viewports.html) check that any [layers](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/view/layer.html) hidden before pausing, remain hidden.
 *
 * The extension also adds a **resume** method to [game](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/game_canvas/game.html), to be able to resume the application
 * manually after pausing.
 *
 * ### This Extension adds an event [game](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/game_canvas/game.html) can hook into:
 *
 * ### **resume** 
 * When the application is resumed manually
 * 
 * ``` javascript  
 * game.on(game.RESUME, function() {});
 * ```
 */

/**
 * Resume activity
 * --------------------------------
 */

/**
 * --------------------------------
 */

define(["groups", "viewports", "gb", "extension"], function(Groups, Viewports, Gb, Extension) {
	var game = Gb.game;

	var Resume = Extension.extend({
		type: function() {
			// Notice the use of the constant FOCUS defined in [game](file://localhost/Users/johndoe/game-builder-gh-pages/game-builder-docs/src/game_canvas/game.html)
			// to define this extension should be executed on creation.
			return Gb.game.FOCUS;
		},

		execute: function() {
			Groups.all('resume');

			for (var k in Groups.groups) { 
				if (Groups.groups[k].drawAlreadyStopped) {
					Groups.stop_draw(k);			
				} 

				if (Groups.groups[k].updateAlreadyStopped) {
					Groups.stop_update(k);
				}

				Groups.groups[k].drawAlreadyStopped = false;
				Groups.groups[k].updateAlreadyStopped = false;
			}

			var viewports = Viewports.all();

			for (var v in viewports) {
				for (var l in v.layers) {
					if (l.alreadyHidden) {
						l.hide();	
					}

					l.alreadyHidden = false;					
				}
			}
		}
	});

	Object.defineProperty(game.prototype, "RESUME", { get: function() { return 'resume'; } });

	game.resume = function() {
		if(game.focusAction()) {
			game.execute(game.RESUME);
			window.addEventListener("blur", game.blurAction);
			window.addEventListener("focus", game.focusAction);	
		}
	}

	return Resume;
});