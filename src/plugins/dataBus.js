let dataBus = (app) => {
    if (!app.$_data_bus) {
        app.$_data_bus = {
            read(event, callback) {
                app.$root.$on(event, callback);
            },

            write(event, data) {
                app.$root.$emit(event, data);
            },
        };
    }

    return app.$_data_bus;
};

export default dataBus;