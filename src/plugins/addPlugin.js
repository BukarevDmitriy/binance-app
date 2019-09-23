let addPlugin = (Vue, options) => {

    Vue.prototype.$addPlugin = (pluginName, plugin) => {
        Vue.prototype['$' + pluginName] = plugin;
    }
};

export default addPlugin;