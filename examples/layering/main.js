define(['require',
		'./concrete_game_objects/basic_game_object',
		'./concrete_game_objects/basic_container',
		'./concrete_components/box_renderer'],

	function(require) {
		var main = function(){};

		main.prototype.start = function(game, assembler, game_object_pool, component_pool, layers) {
			game.on("init", this, function() {
				
				//This example will be using a Container. You can add other game_objects
				//as childs to these, and they will follow their parent everywhere using
				//matrix transformations I do not understand. God bless them.

				//The childs of a container are drawn on top of it.

				//Childs will follow translation, rotation, scaling and opacity of the parent. 
				
				container = require('./concrete_game_objects/basic_container');

				basic_game_object = require('./concrete_game_objects/basic_game_object'); 
				box_renderer = require('./concrete_components/box_renderer');		

				component_pool.createPool("Box_Renderer", box_renderer, 4);

				component_pool.createConfiguration("Red_Renderer", 'Box_Renderer').args({color:'#FF0000'});
				component_pool.createConfiguration("Green_Renderer", 'Box_Renderer').args({color:'#00FF00'});
				component_pool.createConfiguration("Blue_Renderer", 'Box_Renderer').args({color:'#0000FF'});
				component_pool.createConfiguration("White_Renderer", 'Box_Renderer').args({color:'#FFFFFF'});

				game_object_pool.createPool("Base", basic_game_object, 3);
				game_object_pool.createPool("Container", container, 1);

				//Here we can see that the x and y properties of a game_object are relative to 
				//the respective parent. In the previous example since the parent was the root,
				//the position seemed like canvas coordinates
				game_object_pool.createConfiguration("Base_1", "Base")
					.args({x: 0, y: -50, rotation_speed: 2})
					.setRenderer('Red_Renderer');

				game_object_pool.createConfiguration("Base_2", "Base")
					.args({x: 35, y: 35, rotation_speed: 1})
					.setRenderer('Green_Renderer');

				game_object_pool.createConfiguration("Base_3", "Base")
					.args({x: -35, y: 35, rotation_speed: 0.5})
					.setRenderer('Blue_Renderer');

				//Here a configuration for a Container is created, it has 3 childs,
				//among other things
				game_object_pool.createConfiguration("Container_1", "Container")
					.args({x: game.canvas.width/2, y: game.canvas.height/2})
					.addChild("Base_1")
					.addChild("Base_2")
					.addChild("Base_3")
					.setRenderer('White_Renderer');

				//This syntax is a little different to the one used in the first example.
				//But it does the same thing. Create a game_object, in this case "Container_1"
				//Add it to a display layer, and finally start it. 
				layers.get('Middle').add(assembler.get('Container_1')).start();				
			});
		}

		return new main()
	}
);