/**
 * angular-localforage - Angular service & directive for https://github.com/mozilla/localForage (Offline storage, improved.)
 * @version v1.2.2
 * @link https://github.com/ocombe/angular-localForage
 * @license MIT
 * @author Olivier Combe <olivier.combe@gmail.com>
 */
"use strict";

!(function (e, r) {
  "use strict";if ("function" == typeof define && define.amd) define(["localforage"], function (t) {
    r(e.angular, t);
  });else if ("object" == typeof exports) {
    var t = e.angular || window && window.angular;module.exports = r(t, require("localforage"));
  } else r(e.angular, e.localforage);
})(undefined, function (e, r) {
  "use strict";var t = e.module("LocalForageModule", ["ng"]);t.provider("$localForage", function () {
    var t = {},
        n = { name: "lf" },
        o = { setItem: !1, removeItem: !1 },
        i = {};this.setNotify = function (e, r) {
      o = { setItem: e, removeItem: r };
    }, this.config = function (r) {
      if (!e.isObject(r)) throw new Error("The config parameter should be an object");e.extend(n, r);
    }, this.$get = ["$rootScope", "$q", "$parse", function (a, f, s) {
      var u = function u(t) {
        e.isDefined(t) ? this._localforage = r.createInstance(t) : (this._localforage = r, r.config(n));
      };u.prototype.createInstance = function (r) {
        if (e.isObject(r)) {
          if ((r = e.extend({}, n, r), e.isDefined(t[r.name]))) throw new Error("A localForage instance with the name " + r.name + " is already defined.");return (t[r.name] = new u(r), t[r.name]);
        }throw new Error("The parameter should be a config object.");
      }, u.prototype.instance = function (r) {
        if (e.isUndefined(r)) return t[n.name];if (e.isString(r)) {
          if (e.isDefined(t[r])) return t[r];throw new Error("No localForage instance of that name exists.");
        }throw new Error("The parameter should be a string.");
      }, u.prototype.setDriver = function (e) {
        return this._localforage.setDriver(e);
      }, u.prototype.driver = function () {
        return this._localforage.driver();
      }, u.prototype.setItem = function (r, t) {
        if (e.isUndefined(r)) throw new Error("You must define a key to set");var n = this;if (e.isArray(r)) {
          if (!e.isArray(t)) throw new Error("If you set an array of keys, the values should be an array too");var i = [];return (e.forEach(r, function (e, r) {
            i.push(n.setItem(e, t[r]));
          }), f.all(i));
        }var s = f.defer(),
            u = arguments,
            c = "undefined" != typeof Blob && t instanceof Blob ? t : e.copy(t);return (e.isObject(c) && e.isDefined(c.$promise) && delete c.$promise, n._localforage.setItem(n.prefix() + r, c).then(function () {
          o.setItem && a.$broadcast("LocalForageModule.setItem", { key: r, newvalue: c, driver: n.driver() }), s.resolve(c);
        }, function (e) {
          n.onError(e, u, n.setItem, s);
        }), s.promise);
      }, u.prototype.getItem = function (r) {
        if (e.isUndefined(r)) throw new Error("You must define a key to get");var t,
            n = f.defer(),
            o = arguments,
            i = this;if (e.isArray(r)) {
          var a = [],
              s = 0;t = i._localforage.iterate(function (e, t) {
            var n = r.indexOf(i.prefix() + t);return (n > -1 && (a[n] = e, s++), s === r.length ? a : void 0);
          });
        } else t = i._localforage.getItem(i.prefix() + r);return (t.then(function (e) {
          n.resolve(e || a);
        }, function (e) {
          i.onError(e, o, i.getItem, n);
        }), n.promise);
      }, u.prototype.iterate = function (r) {
        if (e.isUndefined(r)) throw new Error("You must define a callback to iterate");var t = f.defer(),
            n = arguments,
            o = this;return (o._localforage.iterate(r).then(function (e) {
          t.resolve(e);
        }, function (e) {
          o.onError(e, n, o.iterate, t);
        }), t.promise);
      }, u.prototype.removeItem = function (r) {
        if (e.isUndefined(r)) throw new Error("You must define a key to remove");var t = this;if (e.isArray(r)) {
          var n = [];return (e.forEach(r, function (e) {
            n.push(t.removeItem(e));
          }), f.all(n));
        }var i = f.defer(),
            s = arguments;return (t._localforage.removeItem(t.prefix() + r).then(function () {
          o.removeItem && a.$broadcast("LocalForageModule.removeItem", { key: r, driver: t.driver() }), i.resolve();
        }, function (e) {
          t.onError(e, s, t.removeItem, i);
        }), i.promise);
      }, u.prototype.pull = function (r) {
        if (e.isUndefined(r)) throw new Error("You must define a key to pull");var t = this,
            n = f.defer(),
            o = function o(e) {
          n.reject(e);
        };return (t.getItem(r).then(function (e) {
          t.removeItem(r).then(function () {
            n.resolve(e);
          }, o);
        }, o), n.promise);
      }, u.prototype.clear = function () {
        var e = f.defer(),
            r = arguments,
            t = this;return (t._localforage.clear().then(function () {
          e.resolve();
        }, function (n) {
          t.onError(n, r, t.clear, e);
        }), e.promise);
      }, u.prototype.key = function (r) {
        if (e.isUndefined(r)) throw new Error("You must define a position to get for the key function");var t = f.defer(),
            n = arguments,
            o = this;return (o._localforage.key(r).then(function (e) {
          t.resolve(e);
        }, function (e) {
          o.onError(e, n, o.key, t);
        }), t.promise);
      };var c = function c() {
        var e = f.defer(),
            r = arguments,
            t = this;return (t._localforage.keys().then(function (r) {
          if (n.oldPrefix && "localStorageWrapper" === t.driver()) {
            for (var o = [], i = 0, a = r.length; a > i; i++) o.push(r[i].substr(t.prefix().length, r[i].length));r = o;
          }e.resolve(r);
        }, function (n) {
          t.onError(n, r, t.keys, e);
        }), e.promise);
      };return (u.prototype.keys = c, u.prototype.getKeys = c, u.prototype.length = function () {
        var e = f.defer(),
            r = arguments,
            t = this;return (t._localforage.length().then(function (r) {
          e.resolve(r);
        }, function (n) {
          t.onError(n, r, length, e);
        }), e.promise);
      }, u.prototype.bind = function (r, o) {
        if (e.isString(o)) o = { key: o };else if (!e.isObject(o) || e.isUndefined(o.key)) throw new Error("You must define a key to bind");var a = { defaultValue: "", name: n.name };o = e.extend({}, a, o);var f = t[o.name];if (e.isUndefined(f)) throw new Error("You must use the name of an existing instance");var u = o.scopeKey || o.key,
            c = s(u);return f.getItem(o.key).then(function (t) {
          return (t ? c.assign(r, t) : o.defaultValue && (c.assign(r, o.defaultValue), f.setItem(o.key, o.defaultValue)), e.isDefined(i[o.key]) && i[o.key](), i[o.key] = r.$watch(u, function (r) {
            e.isDefined(r) && f.setItem(o.key, r);
          }, !0), t);
        });
      }, u.prototype.unbind = function (r, o) {
        if (e.isString(o)) o = { key: o };else if (!e.isObject(o) || e.isUndefined(o.key)) throw new Error("You must define a key to unbind");var a = { scopeKey: o.key, name: n.name };o = e.extend({}, a, o);var f = t[o.name];if (e.isUndefined(f)) throw new Error("You must use the name of an existing instance");return (s(o.scopeKey).assign(r, null), e.isDefined(i[o.key]) && (i[o.key](), delete i[o.key]), f.removeItem(o.key));
      }, u.prototype.prefix = function () {
        return "localStorageWrapper" === this.driver() && n.oldPrefix ? this._localforage.config().name + "." : "";
      }, u.prototype.onError = function (r, t, n, o) {
        if ((e.isObject(r) && r.name ? "InvalidStateError" === r.name : e.isString(r) && "InvalidStateError" === r) && "asyncStorage" === this.driver() || e.isObject(r) && r.code && 5 === r.code) {
          var i = this;i.setDriver("localStorageWrapper").then(function () {
            n.apply(i, t).then(function (e) {
              o.resolve(e);
            }, function (e) {
              o.reject(e);
            });
          }, function () {
            o.reject(r);
          });
        } else o.reject(r);
      }, t[n.name] = new u(), t[n.name]);
    }];
  }), t.directive("localForage", ["$localForage", function (r) {
    return { restrict: "A", link: function link(t, n, o) {
        var i = t.$eval(o.localForage);e.isObject(i) && e.isDefined(i.key) ? r.bind(t, i) : r.bind(t, o.localForage);
      } };
  }]);
});

//# sourceMappingURL=angular-localForage.min-compiled.js.map