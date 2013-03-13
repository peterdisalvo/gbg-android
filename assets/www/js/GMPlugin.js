var GMPlugin = {
    startGM: function(success, fail, params) {
        cordova.exec(success, fail, "GMPlugin", "startGM", [params]);
    },

};
