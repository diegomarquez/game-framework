/**
 * # component.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html)
 *
 * Depends of:
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * Every components extends from the object defined in this module. If you add this
 * to a [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) it will do nothing, so it needs to be extended.
 *
 * The idea behind components is being able to add logic to the [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)
 * using the components with out hardcoding it in the [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) itself.
 *
 * If you are crafty enough when writting components you may even be able to share their
 * functionality between completely different [game-objects](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)
 *
 * The Component object extends [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html) so it provides a few events to hook into:
 *
 * ### **added** 
 * When it is added to a [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) 
 * 
 * Registered callbacks get the component as argument. 
 * ``` javascript  
 * component.on(component.ADDED, function(component) {});
 * ``` 
 *
 * ### **removed**
 * When a component completes. 
 *
 * Registered callbacks get the component as argument.
 * ``` javascript  
 * component.on(component.REMOVED, function(component) {});
 * ```
 *
 * ### **recycle**
 * When a component completes. 
 *
 * Registered callbacks get the component as argument.
 * ``` javascript  
 * component.on(component.RECYCLE, function(component) {});
 * ```
 * 
 */

/**
 * Extend logic
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["delegate"], function(Delegate) {

	var Component = Delegate.extend({
		init: function() {
			this._super();

			this.poolId = null;
			this.parent = null;
		},

		/**
		 * <p style='color:#AD071D'><strong>configure</strong> Configures properties
		 * set via the <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/component-pool.html>component-pool</a></p>
		 *
		 * This method is important as it applies all the configuration needed for 
		 * the component to work as expected.
		 * 
		 * @param  {Object} args An object with all the properties to write into the component
		 */
		configure: function(args) {
			if (!args) return;

			for (var ha in args) {
				this[ha] = args[ha];
			}

			this.args = args;
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>onAdded</strong></p>
		 *
		 * This is called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) when it
		 * adds this component to it's list.
		 * 
		 * @param  {[game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)} parent 
		 */
		onAdded: function(parent) {
			this.parent = parent;
			this.execute(this.ADDED, this);
			this.added(parent);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>onRemoved</strong></p>
		 *
		 * This is called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) when it
		 * removed this component to it's list.
		 */
		onRemoved: function() {
			this.removed(parent);
			this.execute(this.REMOVED, this);
			this.parent = null;
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>added</strong></p>
		 *
		 * Much like **onAdded**, but this method is only meant to be overriden
		 * with out having to remember calling **_super()**
		 * 
		 * @param  {[game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)} parent 
		 */
		added: function(parent) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>removed</strong></p>
		 *
		 * Much like **onRemoved**, but this method is only meant to be overriden
		 * with out having to remember calling **_super()**
		 * 
		 * @param  {[game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)} parent
		 */
		removed: function(parent) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>start</strong></p>
		 *
		 * Called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) when
		 * it is started
		 *
		 * @param  {[game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)} parent 
		 */
		start: function(parent) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>update</strong></p>
		 *
		 * Called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) 
		 * after updating itself.
		 * 
		 * @param  {Number} delta Time elapsed since last update cycle
		 */
		update: function(delta) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>debug_draw</strong></p>
		 *
		 * This method is only executed if the **debug** property of the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)
		 * is set to true. It is better to leave the drawing to the [renderer](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/rendering/renderer.html) components.
		 * 
		 * @param  {Context 2D} context Context 2D property of the Canvas.
		 */
		debug_draw: function(context) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>destroy</strong></p>
		 *
		 * Called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) 
		 * when it is sent back to it's pool for reuse.
		 */
		destroy: function() {
			this.execute(this.RECYCLE, this);
		}
		/**
		 * --------------------------------
		 */
	});

	// # Getters for all the types of events a Component can hook into
	Object.defineProperty(Component.prototype, "ADDED", { get: function() { return 'added'; } });
	Object.defineProperty(Component.prototype, "REMOVED", { get: function() { return 'removed'; } });
	Object.defineProperty(Component.prototype, "RECYCLED", { get: function() { return 'recycle'; } });
	/**
	 * --------------------------------
	 */

	return Component;
});