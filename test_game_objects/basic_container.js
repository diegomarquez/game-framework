define(["game_object_container", "draw"], function(GameObjectContainer, draw){

	var Container = GameObjectContainer.extend({
		init: function() {
			this._super();
		},

		start: function(x, y) {
			this._super();
			
			this.x = x;
			this.y = y;
		},

		update: function(delta) {
			this._super();
			this.rotation++;
		},

		draw: function(context) {
			draw.rectangle(context, -10, -10, 20, 20, null, "#ff0000", 1);
		}
	});

	return Container;
});