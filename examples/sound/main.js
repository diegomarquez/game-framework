/**
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Depends of:
 * [gb](@@gb@@),
 * [game](@@game@@),
 * [root](@@root@@),
 * [sound-player](@@sound-player@@),
 * [keyboard](@@keyboard@@)
 */

/**
 * --------------------------------
 */
define(function(require){
	var gb = require('gb');
	
	var game = gb.game;
	var root = gb.root;
	var assetMap = gb.assetMap();

	var sound_player = require('sound-player');
	var keyboard = require('keyboard');

	// This is the main initialization function
	game.on(game.CREATE, this, function() {
		console.log("Welcome to Game-Builder!");

		// This sets the amount of different channels that can be played at the same time
		sound_player.createChannels(4);

		// Add the sound resources that will be available
		sound_player.add('Sound_1', assetMap['BIRD.MP3']);
		sound_player.add('Sound_2', assetMap['HORSE.MP3']);
		sound_player.add('Sound_3', assetMap['SHEEP.MP3']);
		sound_player.add('Sound_4', assetMap['ELEVATOR.MP3']);

		sound_player.load('Sound_5', assetMap['CROW.WAV']);

		keyboard.onKeyDown(keyboard.C, this, function() {
			sound_player.playSingle('Sound_5');
		});

		// Call loadAll to load all the resources, the callback gets executed once everything is loaded.
		
		// Note: This method can not be called again until
		// it has completed downloading all previous resources.
		sound_player.loadAll(function() {
			console.log('Sound load complete')

			keyboard.onKeyDown(keyboard.A, this, function() {
				sound_player.playSingle('Sound_1', function(id) {
					console.log('Sound complete. Id: ' + id);
				});
			});

			keyboard.onKeyDown(keyboard.S, this, function() {
				sound_player.playSingle('Sound_2', function(id) {
					console.log('Sound complete. Id: ' + id);
				});
			});

			keyboard.onKeyDown(keyboard.D, this, function() {
				sound_player.playSingle('Sound_3', function(id) {
					console.log('Sound complete. Id: ' + id);
				});
			});	

			keyboard.onKeyDown(keyboard.Z, this, function() {
				sound_player.playLoop('Sound_4');
			});

			keyboard.onKeyDown(keyboard.X, this, function() {
				sound_player.stopAll();
			});
		});
	});

	// This is called when the canvas looses focus
	game.on(game.BLUR, this, function() {
		console.log("sound has lost focus");
	});

	// This is called when the canvas regains focus
	game.on(game.FOCUS, this, function() {
		console.log("sound has regained focus");
	});

	// This is the main update loop
	game.on(game.UPDATE, this, function() {
		// Updates ALL the things.
		root.update(game.delta);
		// Draws ALL the things.
		root.transformAndDraw(game.context);
	});

	// This is the main setup that kicks off the whole thing
	// Notice how it needs to find a '#main' and '#game' in the document
	game.create(document.getElementById('main'), document.getElementById('game'));
});
