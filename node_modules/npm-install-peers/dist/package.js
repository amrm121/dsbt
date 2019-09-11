"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = function () {
    function Package(contents) {
        _classCallCheck(this, Package);

        try {
            this.contents = JSON.parse(contents);
        } catch (error) {
            this.contents = null;
        }
    }

    _createClass(Package, [{
        key: "isValid",
        value: function isValid() {
            return this.contents !== null;
        }
    }, {
        key: "hasPeerDependencies",
        value: function hasPeerDependencies() {
            return this.contents.peerDependencies !== undefined;
        }
    }, {
        key: "peerDependencies",
        get: function get() {
            return this.contents.peerDependencies || [];
        }
    }, {
        key: "peerInstallOptions",
        get: function get() {
            return this.contents.peerInstallOptions || {};
        }
    }]);

    return Package;
}();

module.exports = Package;