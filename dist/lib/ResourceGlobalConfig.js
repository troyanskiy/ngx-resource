"use strict";
var ResourceGlobalConfig = (function () {
    function ResourceGlobalConfig() {
    }
    ResourceGlobalConfig.url = null;
    ResourceGlobalConfig.path = null;
    ResourceGlobalConfig.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    ResourceGlobalConfig.params = null;
    ResourceGlobalConfig.data = null;
    return ResourceGlobalConfig;
}());
exports.ResourceGlobalConfig = ResourceGlobalConfig;
