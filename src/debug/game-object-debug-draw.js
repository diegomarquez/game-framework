/**
 * # game-object-debug-draw.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from:
 *
 * Depends of: 
 * [draw](@@draw@@)
 * [gb](@@gb@@)
 * 
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * This is  used in [game-object](@@game-object@@) to call the **debug_draw** method
 * of all the components. It also draws the registration point of the the [game-object](@@game-object@@)
 * calling it's **debug_draw** method.
 */

/**
 * Visual aid
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(function(require){
	
	var DebugDraw = {}

	var r = {};
	var draw = null;
	var gb = null;

	/**
	 * <p style='color:#AD071D'><strong>debugDraw</strong></p>
	 *
	 * Draw info about a <a href=@@game-object@@>game-object</a>.
	 * 
	 * This method only does something if the **debug** property in [gb](@@gb@@) is set to **true** and the 
	 * property **skipDebug** of the [game-object](@@game-object@@) making the call is set to **false**.
	 * 
	 * @param  {Context 2D} context [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
	 * @param  {Object} viewport The [viewport](@@viewport@@) the [game-object](@@game-object@@) is drawn too
	 */
	DebugDraw.gameObject = function(context, viewport) {
		if (!gb) {
			gb = require('gb');
		}

		if (!draw) {
			draw = require('draw');
		}
		
		if(gb.debug && !this.skipDebug) {
			// Store current context
			context.save();
			// Reset transformation
			context.setTransform(1, 0, 0, 1, 0, 0);			
			// Apply transformations for the current [viewport](@@viewport@@)
			viewport.transformContext(context);

    	// Draw what ever the [renderer](@@renderer@@) wants to show in debug mode
    	if (this.renderer) {
    		this.renderer.debug_draw(context, viewport, draw, gb);
    	}

			if (this.components) {
				// Draw whatever the [components](@@component@@) want to draw in debug mode
				for(var i=0; i<this.components.length; i++) {
					this.components[i].debug_draw(context, viewport, draw, gb);
				}
			}
			
			// Draw what ever the [game-object](@@game-object@@) wants to show in debug mode
	    this.debug_draw(context, viewport, draw, gb);

			// Restore original context
			context.restore();
		}
	}
	/**
	 * --------------------------------
	 */

	return DebugDraw;
});