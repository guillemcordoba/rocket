/** @typedef {import('../types/main').MetaPlugin} MetaPlugin */

/**
 * @param {object} options
 * @param {string} options.name
 * @param {any} options.plugin
 * @param {any} [options.options]
 * @param {string} [options.how]
 * @param {string} [options.location]
 */
export function addPlugin({
  name,
  plugin,
  options = undefined,
  how = 'after',
  location = 'bottom',
}) {
  /**
   * @param {MetaPlugin[]} plugins
   */
  const addPluginFn = plugins => {
    if (plugins === undefined) {
      plugins = [];
    }
    // only add if name is not already in the meta plugin list
    if (plugins.findIndex(pluginObj => pluginObj.name === name) === -1) {
      let index = -1;
      let _how = how;
      switch (location) {
        case 'top':
          index = 0;
          _how = 'fixed';
          break;
        case 'bottom':
          index = plugins.length;
          _how = 'fixed';
          break;
        default:
          index = plugins.findIndex(plugin => plugin.name === location);
      }
      if (index < 0) {
        throw new Error(
          `Could not find a plugin with the name "${location}" to insert "${name}" ${how} it.`,
        );
      }

      if (_how === 'after') {
        index += 1;
      }

      plugins.splice(index, 0, {
        name,
        plugin,
        options,
      });
    }
    return plugins;
  };
  return addPluginFn;
}
