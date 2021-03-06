/*!
    localForage -- Offline Storage, Improved
    Version 1.2.3
    https://mozilla.github.io/localForage
    (c) 2013-2015 Mozilla, Apache License 2.0
*/
"use strict";

(function () {
    "use strict";function a(a, b) {
        var c = "";if ((a && (c = a.toString()), a && ("[object ArrayBuffer]" === a.toString() || a.buffer && "[object ArrayBuffer]" === a.buffer.toString()))) {
            var e,
                g = f;a instanceof ArrayBuffer ? (e = a, g += h) : (e = a.buffer, "[object Int8Array]" === c ? g += j : "[object Uint8Array]" === c ? g += k : "[object Uint8ClampedArray]" === c ? g += l : "[object Int16Array]" === c ? g += m : "[object Uint16Array]" === c ? g += o : "[object Int32Array]" === c ? g += n : "[object Uint32Array]" === c ? g += p : "[object Float32Array]" === c ? g += q : "[object Float64Array]" === c ? g += r : b(new Error("Failed to get type for BinaryArray"))), b(g + d(e));
        } else if ("[object Blob]" === c) {
            var s = new FileReader();s.onload = function () {
                var a = d(this.result);b(f + i + a);
            }, s.readAsArrayBuffer(a);
        } else try {
            b(JSON.stringify(a));
        } catch (t) {
            window.console.error("Couldn't convert value into a JSON string: ", a), b(null, t);
        }
    }function b(a) {
        if (a.substring(0, g) !== f) {
            return JSON.parse(a);
        }var b = a.substring(s),
            d = a.substring(g, s),
            e = c(b);switch (d) {case h:
                return e;case i:
                return new Blob([e]);case j:
                return new Int8Array(e);case k:
                return new Uint8Array(e);case l:
                return new Uint8ClampedArray(e);case m:
                return new Int16Array(e);case o:
                return new Uint16Array(e);case n:
                return new Int32Array(e);case p:
                return new Uint32Array(e);case q:
                return new Float32Array(e);case r:
                return new Float64Array(e);default:
                throw new Error("Unkown type: " + d);}
    }function c(a) {
        var b,
            c,
            d,
            f,
            g,
            h = 0.75 * a.length,
            i = a.length,
            j = 0;"=" === a[a.length - 1] && (h--, "=" === a[a.length - 2] && h--);var k = new ArrayBuffer(h),
            l = new Uint8Array(k);for (b = 0; i > b; b += 4) c = e.indexOf(a[b]), d = e.indexOf(a[b + 1]), f = e.indexOf(a[b + 2]), g = e.indexOf(a[b + 3]), l[j++] = c << 2 | d >> 4, l[j++] = (15 & d) << 4 | f >> 2, l[j++] = (3 & f) << 6 | 63 & g;return k;
    }function d(a) {
        var b,
            c = new Uint8Array(a),
            d = "";for (b = 0; b < c.length; b += 3) d += e[c[b] >> 2], d += e[(3 & c[b]) << 4 | c[b + 1] >> 4], d += e[(15 & c[b + 1]) << 2 | c[b + 2] >> 6], d += e[63 & c[b + 2]];return (c.length % 3 === 2 ? d = d.substring(0, d.length - 1) + "=" : c.length % 3 === 1 && (d = d.substring(0, d.length - 2) + "=="), d);
    }var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        f = "__lfsc__:",
        g = f.length,
        h = "arbf",
        i = "blob",
        j = "si08",
        k = "ui08",
        l = "uic8",
        m = "si16",
        n = "si32",
        o = "ur16",
        p = "ui32",
        q = "fl32",
        r = "fl64",
        s = g + h.length,
        t = { serialize: a, deserialize: b, stringToBuffer: c, bufferToString: d };"undefined" != typeof module && module.exports && "undefined" != typeof require ? module.exports = t : "function" == typeof define && define.amd ? define("localforageSerializer", function () {
        return t;
    }) : this.localforageSerializer = t;
}).call(window), (function () {
    "use strict";function a(a) {
        var b = this,
            c = { db: null };if (a) for (var d in a) c[d] = a[d];return new k(function (a, d) {
            var e = l.open(c.name, c.version);e.onerror = function () {
                d(e.error);
            }, e.onupgradeneeded = function () {
                e.result.createObjectStore(c.storeName);
            }, e.onsuccess = function () {
                c.db = e.result, b._dbInfo = c, a();
            };
        });
    }function b(a, b) {
        var c = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var d = new k(function (b, d) {
            c.ready().then(function () {
                var e = c._dbInfo,
                    f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                    g = f.get(a);g.onsuccess = function () {
                    var a = g.result;void 0 === a && (a = null), b(a);
                }, g.onerror = function () {
                    d(g.error);
                };
            })["catch"](d);
        });return (j(d, b), d);
    }function c(a, b) {
        var c = this,
            d = new k(function (b, d) {
            c.ready().then(function () {
                var e = c._dbInfo,
                    f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                    g = f.openCursor(),
                    h = 1;g.onsuccess = function () {
                    var c = g.result;if (c) {
                        var d = a(c.value, c.key, h++);void 0 !== d ? b(d) : c["continue"]();
                    } else b();
                }, g.onerror = function () {
                    d(g.error);
                };
            })["catch"](d);
        });return (j(d, b), d);
    }function d(a, b, c) {
        var d = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var e = new k(function (c, e) {
            d.ready().then(function () {
                var f = d._dbInfo,
                    g = f.db.transaction(f.storeName, "readwrite"),
                    h = g.objectStore(f.storeName);null === b && (b = void 0);var i = h.put(b, a);g.oncomplete = function () {
                    void 0 === b && (b = null), c(b);
                }, g.onabort = g.onerror = function () {
                    var a = i.error ? i.error : i.transaction.error;e(a);
                };
            })["catch"](e);
        });return (j(e, c), e);
    }function e(a, b) {
        var c = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var d = new k(function (b, d) {
            c.ready().then(function () {
                var e = c._dbInfo,
                    f = e.db.transaction(e.storeName, "readwrite"),
                    g = f.objectStore(e.storeName),
                    h = g["delete"](a);f.oncomplete = function () {
                    b();
                }, f.onerror = function () {
                    d(h.error);
                }, f.onabort = function () {
                    var a = h.error ? h.error : h.transaction.error;d(a);
                };
            })["catch"](d);
        });return (j(d, b), d);
    }function f(a) {
        var b = this,
            c = new k(function (a, c) {
            b.ready().then(function () {
                var d = b._dbInfo,
                    e = d.db.transaction(d.storeName, "readwrite"),
                    f = e.objectStore(d.storeName),
                    g = f.clear();e.oncomplete = function () {
                    a();
                }, e.onabort = e.onerror = function () {
                    var a = g.error ? g.error : g.transaction.error;c(a);
                };
            })["catch"](c);
        });return (j(c, a), c);
    }function g(a) {
        var b = this,
            c = new k(function (a, c) {
            b.ready().then(function () {
                var d = b._dbInfo,
                    e = d.db.transaction(d.storeName, "readonly").objectStore(d.storeName),
                    f = e.count();f.onsuccess = function () {
                    a(f.result);
                }, f.onerror = function () {
                    c(f.error);
                };
            })["catch"](c);
        });return (j(c, a), c);
    }function h(a, b) {
        var c = this,
            d = new k(function (b, d) {
            return 0 > a ? void b(null) : void c.ready().then(function () {
                var e = c._dbInfo,
                    f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                    g = !1,
                    h = f.openCursor();h.onsuccess = function () {
                    var c = h.result;return c ? void (0 === a ? b(c.key) : g ? b(c.key) : (g = !0, c.advance(a))) : void b(null);
                }, h.onerror = function () {
                    d(h.error);
                };
            })["catch"](d);
        });return (j(d, b), d);
    }function i(a) {
        var b = this,
            c = new k(function (a, c) {
            b.ready().then(function () {
                var d = b._dbInfo,
                    e = d.db.transaction(d.storeName, "readonly").objectStore(d.storeName),
                    f = e.openCursor(),
                    g = [];f.onsuccess = function () {
                    var b = f.result;return b ? (g.push(b.key), void b["continue"]()) : void a(g);
                }, f.onerror = function () {
                    c(f.error);
                };
            })["catch"](c);
        });return (j(c, a), c);
    }function j(a, b) {
        b && a.then(function (a) {
            b(null, a);
        }, function (a) {
            b(a);
        });
    }var k = "undefined" != typeof module && module.exports && "undefined" != typeof require ? require("promise") : this.Promise,
        l = l || this.indexedDB || this.webkitIndexedDB || this.mozIndexedDB || this.OIndexedDB || this.msIndexedDB;if (l) {
        var m = { _driver: "asyncStorage", _initStorage: a, iterate: c, getItem: b, setItem: d, removeItem: e, clear: f, length: g, key: h, keys: i };"undefined" != typeof module && module.exports && "undefined" != typeof require ? module.exports = m : "function" == typeof define && define.amd ? define("asyncStorage", function () {
            return m;
        }) : this.asyncStorage = m;
    }
}).call(window), (function () {
    "use strict";function a(a) {
        var b = this,
            c = {};if (a) for (var d in a) c[d] = a[d];c.keyPrefix = c.name + "/", b._dbInfo = c;var e = new k(function (a) {
            q === p.DEFINE ? require(["localforageSerializer"], a) : a(q === p.EXPORT ? require("./../utils/serializer") : l.localforageSerializer);
        });return e.then(function (a) {
            return (m = a, k.resolve());
        });
    }function b(a) {
        var b = this,
            c = b.ready().then(function () {
            for (var a = b._dbInfo.keyPrefix, c = n.length - 1; c >= 0; c--) {
                var d = n.key(c);0 === d.indexOf(a) && n.removeItem(d);
            }
        });return (j(c, a), c);
    }function c(a, b) {
        var c = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var d = c.ready().then(function () {
            var b = c._dbInfo,
                d = n.getItem(b.keyPrefix + a);return (d && (d = m.deserialize(d)), d);
        });return (j(d, b), d);
    }function d(a, b) {
        var c = this,
            d = c.ready().then(function () {
            for (var b = c._dbInfo.keyPrefix, d = b.length, e = n.length, f = 0; e > f; f++) {
                var g = n.key(f),
                    h = n.getItem(g);if ((h && (h = m.deserialize(h)), h = a(h, g.substring(d), f + 1), void 0 !== h)) return h;
            }
        });return (j(d, b), d);
    }function e(a, b) {
        var c = this,
            d = c.ready().then(function () {
            var b,
                d = c._dbInfo;try {
                b = n.key(a);
            } catch (e) {
                b = null;
            }return (b && (b = b.substring(d.keyPrefix.length)), b);
        });return (j(d, b), d);
    }function f(a) {
        var b = this,
            c = b.ready().then(function () {
            for (var a = b._dbInfo, c = n.length, d = [], e = 0; c > e; e++) 0 === n.key(e).indexOf(a.keyPrefix) && d.push(n.key(e).substring(a.keyPrefix.length));return d;
        });return (j(c, a), c);
    }function g(a) {
        var b = this,
            c = b.keys().then(function (a) {
            return a.length;
        });return (j(c, a), c);
    }function h(a, b) {
        var c = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var d = c.ready().then(function () {
            var b = c._dbInfo;n.removeItem(b.keyPrefix + a);
        });return (j(d, b), d);
    }function i(a, b, c) {
        var d = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var e = d.ready().then(function () {
            void 0 === b && (b = null);var c = b;return new k(function (e, f) {
                m.serialize(b, function (b, g) {
                    if (g) f(g);else try {
                        var h = d._dbInfo;n.setItem(h.keyPrefix + a, b), e(c);
                    } catch (i) {
                        ("QuotaExceededError" === i.name || "NS_ERROR_DOM_QUOTA_REACHED" === i.name) && f(i), f(i);
                    }
                });
            });
        });return (j(e, c), e);
    }function j(a, b) {
        b && a.then(function (a) {
            b(null, a);
        }, function (a) {
            b(a);
        });
    }var k = "undefined" != typeof module && module.exports && "undefined" != typeof require ? require("promise") : this.Promise,
        l = this,
        m = null,
        n = null;try {
        if (!(this.localStorage && "setItem" in this.localStorage)) return;n = this.localStorage;
    } catch (o) {
        return;
    }var p = { DEFINE: 1, EXPORT: 2, WINDOW: 3 },
        q = p.WINDOW;"undefined" != typeof module && module.exports && "undefined" != typeof require ? q = p.EXPORT : "function" == typeof define && define.amd && (q = p.DEFINE);var r = { _driver: "localStorageWrapper", _initStorage: a, iterate: d, getItem: c, setItem: i, removeItem: h, clear: b, length: g, key: e, keys: f };q === p.EXPORT ? module.exports = r : q === p.DEFINE ? define("localStorageWrapper", function () {
        return r;
    }) : this.localStorageWrapper = r;
}).call(window), (function () {
    "use strict";function a(a) {
        var b = this,
            c = { db: null };if (a) for (var d in a) c[d] = "string" != typeof a[d] ? a[d].toString() : a[d];var e = new k(function (a) {
            p === o.DEFINE ? require(["localforageSerializer"], a) : a(p === o.EXPORT ? require("./../utils/serializer") : l.localforageSerializer);
        }),
            f = new k(function (d, e) {
            try {
                c.db = n(c.name, String(c.version), c.description, c.size);
            } catch (f) {
                return b.setDriver(b.LOCALSTORAGE).then(function () {
                    return b._initStorage(a);
                }).then(d)["catch"](e);
            }c.db.transaction(function (a) {
                a.executeSql("CREATE TABLE IF NOT EXISTS " + c.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], function () {
                    b._dbInfo = c, d();
                }, function (a, b) {
                    e(b);
                });
            });
        });return e.then(function (a) {
            return (m = a, f);
        });
    }function b(a, b) {
        var c = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var d = new k(function (b, d) {
            c.ready().then(function () {
                var e = c._dbInfo;e.db.transaction(function (c) {
                    c.executeSql("SELECT * FROM " + e.storeName + " WHERE key = ? LIMIT 1", [a], function (a, c) {
                        var d = c.rows.length ? c.rows.item(0).value : null;d && (d = m.deserialize(d)), b(d);
                    }, function (a, b) {
                        d(b);
                    });
                });
            })["catch"](d);
        });return (j(d, b), d);
    }function c(a, b) {
        var c = this,
            d = new k(function (b, d) {
            c.ready().then(function () {
                var e = c._dbInfo;e.db.transaction(function (c) {
                    c.executeSql("SELECT * FROM " + e.storeName, [], function (c, d) {
                        for (var e = d.rows, f = e.length, g = 0; f > g; g++) {
                            var h = e.item(g),
                                i = h.value;if ((i && (i = m.deserialize(i)), i = a(i, h.key, g + 1), void 0 !== i)) return void b(i);
                        }b();
                    }, function (a, b) {
                        d(b);
                    });
                });
            })["catch"](d);
        });return (j(d, b), d);
    }function d(a, b, c) {
        var d = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var e = new k(function (c, e) {
            d.ready().then(function () {
                void 0 === b && (b = null);var f = b;m.serialize(b, function (b, g) {
                    if (g) e(g);else {
                        var h = d._dbInfo;h.db.transaction(function (d) {
                            d.executeSql("INSERT OR REPLACE INTO " + h.storeName + " (key, value) VALUES (?, ?)", [a, b], function () {
                                c(f);
                            }, function (a, b) {
                                e(b);
                            });
                        }, function (a) {
                            a.code === a.QUOTA_ERR && e(a);
                        });
                    }
                });
            })["catch"](e);
        });return (j(e, c), e);
    }function e(a, b) {
        var c = this;"string" != typeof a && (window.console.warn(a + " used as a key, but it is not a string."), a = String(a));var d = new k(function (b, d) {
            c.ready().then(function () {
                var e = c._dbInfo;e.db.transaction(function (c) {
                    c.executeSql("DELETE FROM " + e.storeName + " WHERE key = ?", [a], function () {
                        b();
                    }, function (a, b) {
                        d(b);
                    });
                });
            })["catch"](d);
        });return (j(d, b), d);
    }function f(a) {
        var b = this,
            c = new k(function (a, c) {
            b.ready().then(function () {
                var d = b._dbInfo;d.db.transaction(function (b) {
                    b.executeSql("DELETE FROM " + d.storeName, [], function () {
                        a();
                    }, function (a, b) {
                        c(b);
                    });
                });
            })["catch"](c);
        });return (j(c, a), c);
    }function g(a) {
        var b = this,
            c = new k(function (a, c) {
            b.ready().then(function () {
                var d = b._dbInfo;d.db.transaction(function (b) {
                    b.executeSql("SELECT COUNT(key) as c FROM " + d.storeName, [], function (b, c) {
                        var d = c.rows.item(0).c;a(d);
                    }, function (a, b) {
                        c(b);
                    });
                });
            })["catch"](c);
        });return (j(c, a), c);
    }function h(a, b) {
        var c = this,
            d = new k(function (b, d) {
            c.ready().then(function () {
                var e = c._dbInfo;e.db.transaction(function (c) {
                    c.executeSql("SELECT key FROM " + e.storeName + " WHERE id = ? LIMIT 1", [a + 1], function (a, c) {
                        var d = c.rows.length ? c.rows.item(0).key : null;b(d);
                    }, function (a, b) {
                        d(b);
                    });
                });
            })["catch"](d);
        });return (j(d, b), d);
    }function i(a) {
        var b = this,
            c = new k(function (a, c) {
            b.ready().then(function () {
                var d = b._dbInfo;d.db.transaction(function (b) {
                    b.executeSql("SELECT key FROM " + d.storeName, [], function (b, c) {
                        for (var d = [], e = 0; e < c.rows.length; e++) d.push(c.rows.item(e).key);a(d);
                    }, function (a, b) {
                        c(b);
                    });
                });
            })["catch"](c);
        });return (j(c, a), c);
    }function j(a, b) {
        b && a.then(function (a) {
            b(null, a);
        }, function (a) {
            b(a);
        });
    }var k = "undefined" != typeof module && module.exports && "undefined" != typeof require ? require("promise") : this.Promise,
        l = this,
        m = null,
        n = this.openDatabase;if (n) {
        var o = { DEFINE: 1, EXPORT: 2, WINDOW: 3 },
            p = o.WINDOW;"undefined" != typeof module && module.exports && "undefined" != typeof require ? p = o.EXPORT : "function" == typeof define && define.amd && (p = o.DEFINE);var q = { _driver: "webSQLStorage", _initStorage: a, iterate: c, getItem: b, setItem: d, removeItem: e, clear: f, length: g, key: h, keys: i };p === o.DEFINE ? define("webSQLStorage", function () {
            return q;
        }) : p === o.EXPORT ? module.exports = q : this.webSQLStorage = q;
    }
}).call(window), (function () {
    "use strict";function a(a, b) {
        a[b] = function () {
            var c = arguments;return a.ready().then(function () {
                return a[b].apply(a, c);
            });
        };
    }function b() {
        for (var a = 1; a < arguments.length; a++) {
            var b = arguments[a];if (b) for (var c in b) b.hasOwnProperty(c) && (arguments[0][c] = n(b[c]) ? b[c].slice() : b[c]);
        }return arguments[0];
    }function c(a) {
        for (var b in g) if (g.hasOwnProperty(b) && g[b] === a) {
            return !0;
        }return !1;
    }function d(c) {
        this._config = b({}, k, c), this._driverSet = null, this._ready = !1, this._dbInfo = null;for (var d = 0; d < i.length; d++) a(this, i[d]);this.setDriver(this._config.driver);
    }var e = "undefined" != typeof module && module.exports && "undefined" != typeof require ? require("promise") : this.Promise,
        f = {},
        g = { INDEXEDDB: "asyncStorage", LOCALSTORAGE: "localStorageWrapper", WEBSQL: "webSQLStorage" },
        h = [g.INDEXEDDB, g.WEBSQL, g.LOCALSTORAGE],
        i = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"],
        j = { DEFINE: 1, EXPORT: 2, WINDOW: 3 },
        k = { description: "", driver: h.slice(), name: "localforage", size: 4980736, storeName: "keyvaluepairs", version: 1 },
        l = j.WINDOW;"undefined" != typeof module && module.exports && "undefined" != typeof require ? l = j.EXPORT : "function" == typeof define && define.amd && (l = j.DEFINE);var m = (function (a) {
        var b = b || a.indexedDB || a.webkitIndexedDB || a.mozIndexedDB || a.OIndexedDB || a.msIndexedDB,
            c = {};return (c[g.WEBSQL] = !!a.openDatabase, c[g.INDEXEDDB] = !!(function () {
            if ("undefined" != typeof a.openDatabase && a.navigator && a.navigator.userAgent && /Safari/.test(a.navigator.userAgent) && !/Chrome/.test(a.navigator.userAgent)) return !1;try {
                return b && "function" == typeof b.open && "undefined" != typeof a.IDBKeyRange;
            } catch (c) {
                return !1;
            }
        })(), c[g.LOCALSTORAGE] = !!(function () {
            try {
                return a.localStorage && "setItem" in a.localStorage && a.localStorage.setItem;
            } catch (b) {
                return !1;
            }
        })(), c);
    })(this),
        n = Array.isArray || function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
    },
        o = this;d.prototype.INDEXEDDB = g.INDEXEDDB, d.prototype.LOCALSTORAGE = g.LOCALSTORAGE, d.prototype.WEBSQL = g.WEBSQL, d.prototype.config = function (a) {
        if ("object" == typeof a) {
            if (this._ready) return new Error("Can't call config() after localforage has been used.");for (var b in a) "storeName" === b && (a[b] = a[b].replace(/\W/g, "_")), this._config[b] = a[b];return ("driver" in a && a.driver && this.setDriver(this._config.driver), !0);
        }return "string" == typeof a ? this._config[a] : this._config;
    }, d.prototype.defineDriver = function (a, b, d) {
        var g = new e(function (b, d) {
            try {
                var g = a._driver,
                    h = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),
                    j = new Error("Custom driver name already in use: " + a._driver);if (!a._driver) return void d(h);if (c(a._driver)) return void d(j);for (var k = i.concat("_initStorage"), l = 0; l < k.length; l++) {
                    var n = k[l];if (!n || !a[n] || "function" != typeof a[n]) return void d(h);
                }var o = e.resolve(!0);"_support" in a && (o = a._support && "function" == typeof a._support ? a._support() : e.resolve(!!a._support)), o.then(function (c) {
                    m[g] = c, f[g] = a, b();
                }, d);
            } catch (p) {
                d(p);
            }
        });return (g.then(b, d), g);
    }, d.prototype.driver = function () {
        return this._driver || null;
    }, d.prototype.ready = function (a) {
        var b = this,
            c = new e(function (a, c) {
            b._driverSet.then(function () {
                null === b._ready && (b._ready = b._initStorage(b._config)), b._ready.then(a, c);
            })["catch"](c);
        });return (c.then(a, a), c);
    }, d.prototype.setDriver = function (a, b, d) {
        function g() {
            h._config.driver = h.driver();
        }var h = this;return ("string" == typeof a && (a = [a]), this._driverSet = new e(function (b, d) {
            var g = h._getFirstSupportedDriver(a),
                i = new Error("No available storage method found.");if (!g) return (h._driverSet = e.reject(i), void d(i));if ((h._dbInfo = null, h._ready = null, c(g))) {
                var k = new e(function (a) {
                    if (l === j.DEFINE) require([g], a);else if (l === j.EXPORT) switch (g) {case h.INDEXEDDB:
                            a(require("./drivers/indexeddb"));break;case h.LOCALSTORAGE:
                            a(require("./drivers/localstorage"));break;case h.WEBSQL:
                            a(require("./drivers/websql"));} else a(o[g]);
                });k.then(function (a) {
                    h._extend(a), b();
                });
            } else f[g] ? (h._extend(f[g]), b()) : (h._driverSet = e.reject(i), d(i));
        }), this._driverSet.then(g, g), this._driverSet.then(b, d), this._driverSet);
    }, d.prototype.supports = function (a) {
        return !!m[a];
    }, d.prototype._extend = function (a) {
        b(this, a);
    }, d.prototype._getFirstSupportedDriver = function (a) {
        if (a && n(a)) for (var b = 0; b < a.length; b++) {
            var c = a[b];if (this.supports(c)) return c;
        }return null;
    }, d.prototype.createInstance = function (a) {
        return new d(a);
    };var p = new d();l === j.DEFINE ? define("localforage", function () {
        return p;
    }) : l === j.EXPORT ? module.exports = p : this.localforage = p;
}).call(window);

//# sourceMappingURL=localforage.nopromises.min-compiled.js.map