/*!
 * Copyright 2014 Drifty Co.
 * http://drifty.com/
 *
 * Ionic, v1.0.0
 * A powerful HTML5 mobile app framework.
 * http://ionicframework.com/
 *
 * By @maxlynch, @benjsperry, @adamdbradley <3
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

"use strict";

!(function () {
  function e(e, t, n) {
    t !== !1 ? Y.addEventListener(e, Q[e], n) : Y.removeEventListener(e, Q[e]);
  }function t(e) {
    var t = T(e.target),
        i = E(t);if (ionic.tap.requiresNativeClick(i) || U) {
      return !1;
    }var o = ionic.tap.pointerCoord(e);n("click", i, o.x, o.y), h(i);
  }function n(e, t, n, i) {
    var o = document.createEvent("MouseEvents");o.initMouseEvent(e, !0, !0, window, 1, 0, 0, n, i, !1, !1, !1, !1, 0, null), o.isIonicTap = !0, t.dispatchEvent(o);
  }function i(e) {
    return "submit" == e.target.type && 0 === e.detail ? null : ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target) || !e.isIonicTap && !ionic.tap.requiresNativeClick(e.target) ? (e.stopPropagation(), ionic.tap.isLabelWithTextInput(e.target) || e.preventDefault(), !1) : void 0;
  }function o(t) {
    return t.isIonicTap || _(t) ? null : W ? (t.stopPropagation(), ionic.tap.isTextInput(t.target) && K === t.target || /^(select|option)$/i.test(t.target.tagName) || t.preventDefault(), !1) : (U = !1, q = ionic.tap.pointerCoord(t), e("mousemove"), void ionic.activator.start(t));
  }function r(n) {
    return W ? (n.stopPropagation(), n.preventDefault(), !1) : _(n) || /^(select|option)$/i.test(n.target.tagName) ? !1 : (v(n) || t(n), e("mousemove", !1), ionic.activator.end(), void (U = !1));
  }function s(t) {
    return v(t) ? (e("mousemove", !1), ionic.activator.end(), U = !0, !1) : void 0;
  }function a(t) {
    if (!_(t) && (U = !1, d(), q = ionic.tap.pointerCoord(t), e(Z), ionic.activator.start(t), ionic.Platform.isIOS() && ionic.tap.isLabelWithTextInput(t.target))) {
      var n = E(T(t.target));n !== X && t.preventDefault();
    }
  }function l(e) {
    _(e) || (d(), v(e) || (t(e), /^(select|option)$/i.test(e.target.tagName) && e.preventDefault()), K = e.target, u());
  }function c(t) {
    return v(t) ? (U = !0, e(Z, !1), ionic.activator.end(), !1) : void 0;
  }function u() {
    e(Z, !1), ionic.activator.end(), U = !1;
  }function d() {
    W = !0, clearTimeout($), $ = setTimeout(function () {
      W = !1;
    }, 600);
  }function _(e) {
    return e.isTapHandled ? !0 : (e.isTapHandled = !0, ionic.scroll.isScrolling && ionic.tap.containsOrIsTextInput(e.target) ? (e.preventDefault(), !0) : void 0);
  }function h(e) {
    B = null;var t = !1;"SELECT" == e.tagName ? (n("mousedown", e, 0, 0), e.focus && e.focus(), t = !0) : g() === e ? t = !0 : /^(input|textarea)$/i.test(e.tagName) || e.isContentEditable ? (t = !0, e.focus && e.focus(), e.value = e.value, W && (B = e)) : f(), t && (g(e), ionic.trigger("ionic.focusin", { target: e }, !0));
  }function f() {
    var e = g();e && (/^(input|textarea|select)$/i.test(e.tagName) || e.isContentEditable) && e.blur(), g(null);
  }function p(e) {
    W && ionic.tap.isTextInput(g()) && ionic.tap.isTextInput(B) && B !== e.target && (B.focus(), B = null), ionic.scroll.isScrolling = !1;
  }function m() {
    g(null);
  }function g(e) {
    return (arguments.length && (X = e), X || document.activeElement);
  }function v(e) {
    if (!e || 1 !== e.target.nodeType || !q || 0 === q.x && 0 === q.y) {
      return !1;
    }var t = ionic.tap.pointerCoord(e),
        n = !(!e.target.classList || !e.target.classList.contains || "function" != typeof e.target.classList.contains),
        i = n && e.target.classList.contains("button") ? J : j;return Math.abs(q.x - t.x) > i || Math.abs(q.y - t.y) > i;
  }function T(e, t) {
    for (var n = e, i = 0; 6 > i && n; i++) {
      if ("LABEL" === n.tagName) {
        return n;
      }n = n.parentElement;
    }return t !== !1 ? e : void 0;
  }function E(e) {
    if (e && "LABEL" === e.tagName) {
      if (e.control) {
        return e.control;
      }if (e.querySelector) {
        var t = e.querySelector("input,textarea,select");if (t) {
          return t;
        }
      }
    }return e;
  }function S() {
    ionic.keyboard.isInitialized || (R() ? (window.addEventListener("native.keyboardshow", de), window.addEventListener("native.keyboardhide", y)) : document.body.addEventListener("focusout", y), document.body.addEventListener("ionic.focusin", ue), document.body.addEventListener("focusin", ue), window.navigator.msPointerEnabled ? document.removeEventListener("MSPointerDown", S) : document.removeEventListener("touchstart", S), ionic.keyboard.isInitialized = !0);
  }function b(e) {
    clearTimeout(ie), (!ionic.keyboard.isOpen || ionic.keyboard.isClosing) && (ionic.keyboard.isOpening = !0, ionic.keyboard.isClosing = !1), ionic.keyboard.height = e.keyboardHeight, ae ? M(A, !0) : M(I, !0);
  }function w(e) {
    return (clearTimeout(ie), e.target && !e.target.readOnly && ionic.tap.isKeyboardElement(e.target) && (te = V(e.target)) ? (ee = e.target, document.body.scrollTop = 0, te.scrollTop = 0, ionic.requestAnimationFrame(function () {
      document.body.scrollTop = 0, te.scrollTop = 0;
    }), (!ionic.keyboard.isOpen || ionic.keyboard.isClosing) && (ionic.keyboard.isOpening = !0, ionic.keyboard.isClosing = !1), document.addEventListener("keydown", L, !1), window.navigator.msPointerEnabled ? document.addEventListener("MSPointerMove", x, !1) : document.addEventListener("touchmove", x, !1), void (ionic.keyboard.isOpen || R() ? ionic.keyboard.isOpen && I() : M(I, !0))) : void (ee = null));
  }function y() {
    clearTimeout(ie), (ionic.keyboard.isOpen || ionic.keyboard.isOpening) && (ionic.keyboard.isClosing = !0, ionic.keyboard.isOpening = !1), ie = setTimeout(function () {
      ionic.requestAnimationFrame(function () {
        ae ? M(function () {
          A(), N();
        }, !1) : M(N, !1);
      });
    }, 50);
  }function D() {
    ionic.keyboard.isLandscape = !ionic.keyboard.isLandscape, ionic.Platform.isIOS() && A(), ionic.Platform.isAndroid() && (ionic.keyboard.isOpen && R() ? ae = !0 : M(A, !1));
  }function L(e) {
    ionic.scroll.isScrolling && x(e);
  }function x(e) {
    "TEXTAREA" !== e.target.tagName && e.preventDefault();
  }function M(e, t) {
    clearInterval(ne);var n,
        i = 0,
        o = k(),
        r = o;return (n = ionic.Platform.isAndroid() && ionic.Platform.version() < 4.4 ? 30 : ionic.Platform.isAndroid() ? 10 : 1, ne = setInterval(function () {
      r = k(), (!(++i < n) || (O(r) || P(r)) && ionic.keyboard.height) && (R() || (ionic.keyboard.height = Math.abs(o - window.innerHeight)), ionic.keyboard.isOpen = t, clearInterval(ne), e());
    }, 50), n);
  }function N() {
    clearTimeout(ie), ionic.keyboard.isOpen = !1, ionic.keyboard.isClosing = !1, ee && ionic.trigger("resetScrollView", { target: ee }, !0), ionic.requestAnimationFrame(function () {
      document.body.classList.remove(le);
    }), window.navigator.msPointerEnabled ? document.removeEventListener("MSPointerMove", x) : document.removeEventListener("touchmove", x), document.removeEventListener("keydown", L), ionic.Platform.isAndroid() && (R() && cordova.plugins.Keyboard.close(), ee && ee.blur()), ee = null;
  }function I() {
    ionic.keyboard.isOpen = !0, ionic.keyboard.isOpening = !1;var e = { keyboardHeight: C(), viewportHeight: oe };if (ee) {
      e.target = ee;var t = ee.getBoundingClientRect();e.elementTop = Math.round(t.top), e.elementBottom = Math.round(t.bottom), e.windowHeight = e.viewportHeight - e.keyboardHeight, e.isElementUnderKeyboard = e.elementBottom > e.windowHeight, ionic.trigger("scrollChildIntoView", e, !0);
    }return (setTimeout(function () {
      document.body.classList.add(le);
    }, 400), e);
  }function C() {
    if (ionic.keyboard.height) {
      return ionic.keyboard.height;
    }if (ionic.Platform.isAndroid()) {
      if (ionic.Platform.isFullScreen) {
        return 275;
      }var e = window.innerHeight;return oe > e ? oe - e : 0;
    }return ionic.Platform.isIOS() ? ionic.keyboard.isLandscape ? 206 : ionic.Platform.isWebView() ? 260 : 216 : 275;
  }function O(e) {
    return !!(!ionic.keyboard.isLandscape && re && Math.abs(re - e) < 2);
  }function P(e) {
    return !!(ionic.keyboard.isLandscape && se && Math.abs(se - e) < 2);
  }function A() {
    ae = !1, oe = k(), ionic.keyboard.isLandscape && !se ? se = oe : ionic.keyboard.isLandscape || re || (re = oe), ee && ionic.trigger("resetScrollView", { target: ee }, !0), ionic.keyboard.isOpen && ionic.tap.isTextInput(ee) && I();
  }function G() {
    var e = k();e / window.innerWidth < 1 && (ionic.keyboard.isLandscape = !0), oe = e, ionic.keyboard.isLandscape && !se ? se = oe : ionic.keyboard.isLandscape || re || (re = oe);
  }function k() {
    var e = window.innerHeight;return ionic.Platform.isAndroid() && ionic.Platform.isFullScreen || !ionic.keyboard.isOpen && !ionic.keyboard.isOpening || ionic.keyboard.isClosing ? e : e + C();
  }function V(e) {
    for (; e;) {
      if (e.classList.contains(ce)) {
        return e;
      }e = e.parentElement;
    }return null;
  }function R() {
    return !!(window.cordova && cordova.plugins && cordova.plugins.Keyboard);
  }function z() {
    var e;for (e = 0; e < document.head.children.length; e++) if ("viewport" == document.head.children[e].name) {
      _e = document.head.children[e];break;
    }if (_e) {
      var t,
          n = _e.content.toLowerCase().replace(/\s+/g, "").split(",");for (e = 0; e < n.length; e++) n[e] && (t = n[e].split("="), he[t[0]] = t.length > 1 ? t[1] : "_");H();
    }
  }function H() {
    var e = he.width,
        t = he.height,
        n = ionic.Platform,
        i = n.version(),
        o = "device-width",
        r = "device-height",
        s = ionic.viewport.orientation();delete he.height, he.width = o, n.isIPad() ? i > 7 ? delete he.width : n.isWebView() ? 90 == s ? he.height = "0" : 7 == i && (he.height = r) : 7 > i && (he.height = "0") : n.isIOS() && (n.isWebView() ? i > 7 ? delete he.width : 7 > i ? t && (he.height = "0") : 7 == i && (he.height = r) : 7 > i && t && (he.height = "0")), (e !== he.width || t !== he.height) && F();
  }function F() {
    var e,
        t = [];for (e in he) he[e] && t.push(e + ("_" == he[e] ? "" : "=" + he[e]));_e.content = t.join(", ");
  }window.ionic = window.ionic || {}, window.ionic.views = {}, window.ionic.version = "1.0.0", (function (e) {
    e.DelegateService = function (e) {
      function t() {
        return !0;
      }if (e.indexOf("$getByHandle") > -1) throw new Error("Method '$getByHandle' is implicitly added to each delegate service. Do not list it as a method.");return ["$log", function (n) {
        function i(e, t) {
          this._instances = e, this.handle = t;
        }function o() {
          this._instances = [];
        }function r(e) {
          return function () {
            var t,
                i = this.handle,
                o = arguments,
                r = 0;return (this._instances.forEach(function (n) {
              if ((!i || i == n.$$delegateHandle) && n.$$filterFn(n)) {
                r++;var s = n[e].apply(n, o);1 === r && (t = s);
              }
            }), !r && i ? n.warn("Delegate for handle \"" + i + "\" could not find a corresponding element with delegate-handle=\"" + i + "\"! " + e + "() was not called!\nPossible cause: If you are calling " + e + "() immediately, and your element with delegate-handle=\"" + i + "\" is a child of your controller, then your element may not be compiled yet. Put a $timeout around your call to " + e + "() and try again.") : t);
          };
        }return (e.forEach(function (e) {
          i.prototype[e] = r(e);
        }), o.prototype = i.prototype, o.prototype._registerInstance = function (e, n, i) {
          var o = this._instances;return (e.$$delegateHandle = n, e.$$filterFn = i || t, o.push(e), function () {
            var t = o.indexOf(e);-1 !== t && o.splice(t, 1);
          });
        }, o.prototype.$getByHandle = function (e) {
          return new i(this._instances, e);
        }, new o());
      }];
    };
  })(window.ionic), (function (e, t, n) {
    function i() {
      r = !0;for (var e = 0; e < o.length; e++) n.requestAnimationFrame(o[e]);o = [], t.removeEventListener("DOMContentLoaded", i);
    }var o = [],
        r = "complete" === t.readyState || "interactive" === t.readyState;r || t.addEventListener("DOMContentLoaded", i), e._rAF = (function () {
      return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function (t) {
        e.setTimeout(t, 16);
      };
    })();var s = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelRequestAnimationFrame;n.DomUtil = { requestAnimationFrame: function requestAnimationFrame(t) {
        return e._rAF(t);
      }, cancelAnimationFrame: function cancelAnimationFrame(e) {
        s(e);
      }, animationFrameThrottle: function animationFrameThrottle(e) {
        var t, i, o;return function () {
          t = arguments, o = this, i || (i = !0, n.requestAnimationFrame(function () {
            e.apply(o, t), i = !1;
          }));
        };
      }, contains: function contains(e, t) {
        for (var n = t; n;) {
          if (n === e) {
            return !0;
          }n = n.parentNode;
        }
      }, getPositionInParent: function getPositionInParent(e) {
        return { left: e.offsetLeft, top: e.offsetTop };
      }, ready: function ready(e) {
        r ? n.requestAnimationFrame(e) : o.push(e);
      }, getTextBounds: function getTextBounds(n) {
        if (t.createRange) {
          var i = t.createRange();if ((i.selectNodeContents(n), i.getBoundingClientRect)) {
            var o = i.getBoundingClientRect();if (o) {
              var r = e.scrollX,
                  s = e.scrollY;return { top: o.top + s, left: o.left + r, right: o.left + r + o.width, bottom: o.top + s + o.height, width: o.width, height: o.height };
            }
          }
        }return null;
      }, getChildIndex: function getChildIndex(e, t) {
        if (t) for (var n, i = e.parentNode.children, o = 0, r = 0, s = i.length; s > o; o++) if ((n = i[o], n.nodeName && n.nodeName.toLowerCase() == t)) {
          if (n == e) {
            return r;
          }r++;
        }return Array.prototype.slice.call(e.parentNode.children).indexOf(e);
      }, swapNodes: function swapNodes(e, t) {
        t.parentNode.insertBefore(e, t);
      }, elementIsDescendant: function elementIsDescendant(e, t, n) {
        var i = e;do {
          if (i === t) {
            return !0;
          }i = i.parentNode;
        } while (i && i !== n);return !1;
      }, getParentWithClass: function getParentWithClass(e, t, n) {
        for (n = n || 10; e.parentNode && n--;) {
          if (e.parentNode.classList && e.parentNode.classList.contains(t)) {
            return e.parentNode;
          }e = e.parentNode;
        }return null;
      }, getParentOrSelfWithClass: function getParentOrSelfWithClass(e, t, n) {
        for (n = n || 10; e && n--;) {
          if (e.classList && e.classList.contains(t)) {
            return e;
          }e = e.parentNode;
        }return null;
      }, rectContains: function rectContains(e, t, n, i, o, r) {
        return n > e || e > o ? !1 : i > t || t > r ? !1 : !0;
      }, blurAll: function blurAll() {
        return t.activeElement && t.activeElement != t.body ? (t.activeElement.blur(), t.activeElement) : null;
      }, cachedAttr: function cachedAttr(e, t, n) {
        if ((e = e && e.length && e[0] || e, e && e.setAttribute)) {
          var i = "$attr-" + t;return (arguments.length > 2 ? e[i] !== n && (e.setAttribute(t, n), e[i] = n) : "undefined" == typeof e[i] && (e[i] = e.getAttribute(t)), e[i]);
        }
      }, cachedStyles: function cachedStyles(e, t) {
        if ((e = e && e.length && e[0] || e, e && e.style)) for (var n in t) e["$style-" + n] !== t[n] && (e.style[n] = e["$style-" + n] = t[n]);
      } }, n.requestAnimationFrame = n.DomUtil.requestAnimationFrame, n.cancelAnimationFrame = n.DomUtil.cancelAnimationFrame, n.animationFrameThrottle = n.DomUtil.animationFrameThrottle;
  })(window, document, ionic), (function (e) {
    e.CustomEvent = (function () {
      if ("function" == typeof window.CustomEvent) return CustomEvent;var e = (function (_e2) {
        var _eWrapper = function e(_x, _x2) {
          return _e2.apply(this, arguments);
        };

        _eWrapper.toString = function () {
          return _e2.toString();
        };

        return _eWrapper;
      })(function (e, t) {
        var n;t = t || { bubbles: !1, cancelable: !1, detail: void 0 };try {
          n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail);
        } catch (i) {
          n = document.createEvent("Event");for (var o in t) n[o] = t[o];n.initEvent(e, t.bubbles, t.cancelable);
        }return n;
      });return (e.prototype = window.Event.prototype, e);
    })(), e.EventController = { VIRTUALIZED_EVENTS: ["tap", "swipe", "swiperight", "swipeleft", "drag", "hold", "release"], trigger: function trigger(t, n, i, o) {
        var r = new e.CustomEvent(t, { detail: n, bubbles: !!i, cancelable: !!o });n && n.target && n.target.dispatchEvent && n.target.dispatchEvent(r) || window.dispatchEvent(r);
      }, on: function on(t, n, i) {
        for (var o = i || window, r = 0, s = this.VIRTUALIZED_EVENTS.length; s > r; r++) if (t == this.VIRTUALIZED_EVENTS[r]) {
          var a = new e.Gesture(i);return (a.on(t, n), a);
        }o.addEventListener(t, n);
      }, off: function off(e, t, n) {
        n.removeEventListener(e, t);
      }, onGesture: function onGesture(t, n, i, o) {
        var r = new e.Gesture(i, o);return (r.on(t, n), r);
      }, offGesture: function offGesture(e, t, n) {
        e && e.off(t, n);
      }, handlePopState: function handlePopState() {} }, e.on = function () {
      e.EventController.on.apply(e.EventController, arguments);
    }, e.off = function () {
      e.EventController.off.apply(e.EventController, arguments);
    }, e.trigger = e.EventController.trigger, e.onGesture = function () {
      return e.EventController.onGesture.apply(e.EventController.onGesture, arguments);
    }, e.offGesture = function () {
      return e.EventController.offGesture.apply(e.EventController.offGesture, arguments);
    };
  })(window.ionic), (function (e) {
    function t() {
      if (!e.Gestures.READY) {
        e.Gestures.event.determineEventTypes();for (var t in e.Gestures.gestures) e.Gestures.gestures.hasOwnProperty(t) && e.Gestures.detection.register(e.Gestures.gestures[t]);e.Gestures.event.onTouch(e.Gestures.DOCUMENT, e.Gestures.EVENT_MOVE, e.Gestures.detection.detect), e.Gestures.event.onTouch(e.Gestures.DOCUMENT, e.Gestures.EVENT_END, e.Gestures.detection.detect), e.Gestures.READY = !0;
      }
    }e.Gesture = function (t, n) {
      return new e.Gestures.Instance(t, n || {});
    }, e.Gestures = {}, e.Gestures.defaults = { stop_browser_behavior: "disable-user-behavior" }, e.Gestures.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, e.Gestures.HAS_TOUCHEVENTS = "ontouchstart" in window, e.Gestures.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, e.Gestures.NO_MOUSEEVENTS = e.Gestures.HAS_TOUCHEVENTS && window.navigator.userAgent.match(e.Gestures.MOBILE_REGEX), e.Gestures.EVENT_TYPES = {}, e.Gestures.DIRECTION_DOWN = "down", e.Gestures.DIRECTION_LEFT = "left", e.Gestures.DIRECTION_UP = "up", e.Gestures.DIRECTION_RIGHT = "right", e.Gestures.POINTER_MOUSE = "mouse", e.Gestures.POINTER_TOUCH = "touch", e.Gestures.POINTER_PEN = "pen", e.Gestures.EVENT_START = "start", e.Gestures.EVENT_MOVE = "move", e.Gestures.EVENT_END = "end", e.Gestures.DOCUMENT = window.document, e.Gestures.plugins = {}, e.Gestures.READY = !1, e.Gestures.Instance = function (n, i) {
      var o = this;return null === n ? this : (t(), this.element = n, this.enabled = !0, this.options = e.Gestures.utils.extend(e.Gestures.utils.extend({}, e.Gestures.defaults), i || {}), this.options.stop_browser_behavior && e.Gestures.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), e.Gestures.event.onTouch(n, e.Gestures.EVENT_START, function (t) {
        o.enabled && e.Gestures.detection.startDetect(o, t);
      }), this);
    }, e.Gestures.Instance.prototype = { on: function on(e, t) {
        for (var n = e.split(" "), i = 0; i < n.length; i++) this.element.addEventListener(n[i], t, !1);return this;
      }, off: function off(e, t) {
        for (var n = e.split(" "), i = 0; i < n.length; i++) this.element.removeEventListener(n[i], t, !1);return this;
      }, trigger: function trigger(t, n) {
        var i = e.Gestures.DOCUMENT.createEvent("Event");i.initEvent(t, !0, !0), i.gesture = n;var o = this.element;return (e.Gestures.utils.hasParent(n.target, o) && (o = n.target), o.dispatchEvent(i), this);
      }, enable: function enable(e) {
        return (this.enabled = e, this);
      } };var n = null,
        i = !1,
        o = !1;e.Gestures.event = { bindDom: function bindDom(e, t, n) {
        for (var i = t.split(" "), o = 0; o < i.length; o++) e.addEventListener(i[o], n, !1);
      }, onTouch: function onTouch(t, r, s) {
        var a = this;this.bindDom(t, e.Gestures.EVENT_TYPES[r], function (l) {
          var c = l.type.toLowerCase();if (!c.match(/mouse/) || !o) {
            c.match(/touch/) || c.match(/pointerdown/) || c.match(/mouse/) && 1 === l.which ? i = !0 : c.match(/mouse/) && 1 !== l.which && (i = !1), c.match(/touch|pointer/) && (o = !0);var u = 0;i && (e.Gestures.HAS_POINTEREVENTS && r != e.Gestures.EVENT_END ? u = e.Gestures.PointerEvent.updatePointer(r, l) : c.match(/touch/) ? u = l.touches.length : o || (u = c.match(/up/) ? 0 : 1), u > 0 && r == e.Gestures.EVENT_END ? r = e.Gestures.EVENT_MOVE : u || (r = e.Gestures.EVENT_END), (u || null === n) && (n = l), s.call(e.Gestures.detection, a.collectEventData(t, r, a.getTouchList(n, r), l)), e.Gestures.HAS_POINTEREVENTS && r == e.Gestures.EVENT_END && (u = e.Gestures.PointerEvent.updatePointer(r, l))), u || (n = null, i = !1, o = !1, e.Gestures.PointerEvent.reset());
          }
        });
      }, determineEventTypes: function determineEventTypes() {
        var t;t = e.Gestures.HAS_POINTEREVENTS ? e.Gestures.PointerEvent.getEvents() : e.Gestures.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], e.Gestures.EVENT_TYPES[e.Gestures.EVENT_START] = t[0], e.Gestures.EVENT_TYPES[e.Gestures.EVENT_MOVE] = t[1], e.Gestures.EVENT_TYPES[e.Gestures.EVENT_END] = t[2];
      }, getTouchList: function getTouchList(t) {
        return e.Gestures.HAS_POINTEREVENTS ? e.Gestures.PointerEvent.getTouchList() : t.touches ? t.touches : (t.identifier = 1, [t]);
      }, collectEventData: function collectEventData(t, n, i, o) {
        var r = e.Gestures.POINTER_TOUCH;return ((o.type.match(/mouse/) || e.Gestures.PointerEvent.matchType(e.Gestures.POINTER_MOUSE, o)) && (r = e.Gestures.POINTER_MOUSE), { center: e.Gestures.utils.getCenter(i), timeStamp: new Date().getTime(), target: o.target, touches: i, eventType: n, pointerType: r, srcEvent: o, preventDefault: function preventDefault() {
            this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault;
          }, stopPropagation: function stopPropagation() {
            this.srcEvent.stopPropagation();
          }, stopDetect: function stopDetect() {
            return e.Gestures.detection.stopDetect();
          } });
      } }, e.Gestures.PointerEvent = { pointers: {}, getTouchList: function getTouchList() {
        var e = this,
            t = [];return (Object.keys(e.pointers).sort().forEach(function (n) {
          t.push(e.pointers[n]);
        }), t);
      }, updatePointer: function updatePointer(t, n) {
        return (t == e.Gestures.EVENT_END ? this.pointers = {} : (n.identifier = n.pointerId, this.pointers[n.pointerId] = n), Object.keys(this.pointers).length);
      }, matchType: function matchType(t, n) {
        if (!n.pointerType) {
          return !1;
        }var i = {};return (i[e.Gestures.POINTER_MOUSE] = n.pointerType == n.MSPOINTER_TYPE_MOUSE || n.pointerType == e.Gestures.POINTER_MOUSE, i[e.Gestures.POINTER_TOUCH] = n.pointerType == n.MSPOINTER_TYPE_TOUCH || n.pointerType == e.Gestures.POINTER_TOUCH, i[e.Gestures.POINTER_PEN] = n.pointerType == n.MSPOINTER_TYPE_PEN || n.pointerType == e.Gestures.POINTER_PEN, i[t]);
      }, getEvents: function getEvents() {
        return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"];
      }, reset: function reset() {
        this.pointers = {};
      } }, e.Gestures.utils = { extend: function extend(e, t, n) {
        for (var i in t) void 0 !== e[i] && n || (e[i] = t[i]);return e;
      }, hasParent: function hasParent(e, t) {
        for (; e;) {
          if (e == t) {
            return !0;
          }e = e.parentNode;
        }return !1;
      }, getCenter: function getCenter(e) {
        for (var t = [], n = [], i = 0, o = e.length; o > i; i++) t.push(e[i].pageX), n.push(e[i].pageY);return { pageX: (Math.min.apply(Math, t) + Math.max.apply(Math, t)) / 2, pageY: (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2 };
      }, getVelocity: function getVelocity(e, t, n) {
        return { x: Math.abs(t / e) || 0, y: Math.abs(n / e) || 0 };
      }, getAngle: function getAngle(e, t) {
        var n = t.pageY - e.pageY,
            i = t.pageX - e.pageX;return 180 * Math.atan2(n, i) / Math.PI;
      }, getDirection: function getDirection(t, n) {
        var i = Math.abs(t.pageX - n.pageX),
            o = Math.abs(t.pageY - n.pageY);return i >= o ? t.pageX - n.pageX > 0 ? e.Gestures.DIRECTION_LEFT : e.Gestures.DIRECTION_RIGHT : t.pageY - n.pageY > 0 ? e.Gestures.DIRECTION_UP : e.Gestures.DIRECTION_DOWN;
      }, getDistance: function getDistance(e, t) {
        var n = t.pageX - e.pageX,
            i = t.pageY - e.pageY;return Math.sqrt(n * n + i * i);
      }, getScale: function getScale(e, t) {
        return e.length >= 2 && t.length >= 2 ? this.getDistance(t[0], t[1]) / this.getDistance(e[0], e[1]) : 1;
      }, getRotation: function getRotation(e, t) {
        return e.length >= 2 && t.length >= 2 ? this.getAngle(t[1], t[0]) - this.getAngle(e[1], e[0]) : 0;
      }, isVertical: function isVertical(t) {
        return t == e.Gestures.DIRECTION_UP || t == e.Gestures.DIRECTION_DOWN;
      }, stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(e, t) {
        e && e.classList && (e.classList.add(t), e.onselectstart = function () {
          return !1;
        });
      } }, e.Gestures.detection = { gestures: [], current: null, previous: null, stopped: !1, startDetect: function startDetect(t, n) {
        this.current || (this.stopped = !1, this.current = { inst: t, startEvent: e.Gestures.utils.extend({}, n), lastEvent: !1, name: "" }, this.detect(n));
      }, detect: function detect(t) {
        if (!this.current || this.stopped) {
          return null;
        }t = this.extendEventData(t);for (var n = this.current.inst.options, i = 0, o = this.gestures.length; o > i; i++) {
          var r = this.gestures[i];if (!this.stopped && n[r.name] !== !1 && r.handler.call(r, t, this.current.inst) === !1) {
            this.stopDetect();break;
          }
        }return (this.current && (this.current.lastEvent = t), t.eventType == e.Gestures.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t);
      }, stopDetect: function stopDetect() {
        this.previous = e.Gestures.utils.extend({}, this.current), this.current = null, this.stopped = !0;
      }, extendEventData: function extendEventData(t) {
        var n = this.current.startEvent;if (n && (t.touches.length != n.touches.length || t.touches === n.touches)) {
          n.touches = [];for (var i = 0, o = t.touches.length; o > i; i++) n.touches.push(e.Gestures.utils.extend({}, t.touches[i]));
        }var r = t.timeStamp - n.timeStamp,
            s = t.center.pageX - n.center.pageX,
            a = t.center.pageY - n.center.pageY,
            l = e.Gestures.utils.getVelocity(r, s, a);return (e.Gestures.utils.extend(t, { deltaTime: r, deltaX: s, deltaY: a, velocityX: l.x, velocityY: l.y, distance: e.Gestures.utils.getDistance(n.center, t.center), angle: e.Gestures.utils.getAngle(n.center, t.center), direction: e.Gestures.utils.getDirection(n.center, t.center), scale: e.Gestures.utils.getScale(n.touches, t.touches), rotation: e.Gestures.utils.getRotation(n.touches, t.touches), startEvent: n }), t);
      }, register: function register(t) {
        var n = t.defaults || {};return (void 0 === n[t.name] && (n[t.name] = !0), e.Gestures.utils.extend(e.Gestures.defaults, n, !0), t.index = t.index || 1000, this.gestures.push(t), this.gestures.sort(function (e, t) {
          return e.index < t.index ? -1 : e.index > t.index ? 1 : 0;
        }), this.gestures);
      } }, e.Gestures.gestures = e.Gestures.gestures || {}, e.Gestures.gestures.Hold = { name: "hold", index: 10, defaults: { hold_timeout: 500, hold_threshold: 1 }, timer: null, handler: function handler(t, n) {
        switch (t.eventType) {case e.Gestures.EVENT_START:
            clearTimeout(this.timer), e.Gestures.detection.current.name = this.name, this.timer = setTimeout(function () {
              "hold" == e.Gestures.detection.current.name && (e.tap.cancelClick(), n.trigger("hold", t));
            }, n.options.hold_timeout);break;case e.Gestures.EVENT_MOVE:
            t.distance > n.options.hold_threshold && clearTimeout(this.timer);break;case e.Gestures.EVENT_END:
            clearTimeout(this.timer);}
      } }, e.Gestures.gestures.Tap = { name: "tap", index: 100, defaults: { tap_max_touchtime: 250, tap_max_distance: 10, tap_always: !0, doubletap_distance: 20, doubletap_interval: 300 }, handler: function handler(t, n) {
        if (t.eventType == e.Gestures.EVENT_END && "touchcancel" != t.srcEvent.type) {
          var i = e.Gestures.detection.previous,
              o = !1;if (t.deltaTime > n.options.tap_max_touchtime || t.distance > n.options.tap_max_distance) {
            return;
          }i && "tap" == i.name && t.timeStamp - i.lastEvent.timeStamp < n.options.doubletap_interval && t.distance < n.options.doubletap_distance && (n.trigger("doubletap", t), o = !0), (!o || n.options.tap_always) && (e.Gestures.detection.current.name = "tap", n.trigger("tap", t));
        }
      } }, e.Gestures.gestures.Swipe = { name: "swipe", index: 40, defaults: { swipe_max_touches: 1, swipe_velocity: 0.4 }, handler: function handler(t, n) {
        if (t.eventType == e.Gestures.EVENT_END) {
          if (n.options.swipe_max_touches > 0 && t.touches.length > n.options.swipe_max_touches) {
            return;
          }(t.velocityX > n.options.swipe_velocity || t.velocityY > n.options.swipe_velocity) && (n.trigger(this.name, t), n.trigger(this.name + t.direction, t));
        }
      } }, e.Gestures.gestures.Drag = { name: "drag", index: 50, defaults: { drag_min_distance: 10, correct_for_drag_min_distance: !0, drag_max_touches: 1, drag_block_horizontal: !0, drag_block_vertical: !0, drag_lock_to_axis: !1, drag_lock_min_distance: 25, prevent_default_directions: [] }, triggered: !1, handler: function handler(t, n) {
        if (("touchstart" == t.srcEvent.type || "touchend" == t.srcEvent.type ? this.preventedFirstMove = !1 : this.preventedFirstMove || "touchmove" != t.srcEvent.type || (-1 != n.options.prevent_default_directions.indexOf(t.direction) && t.srcEvent.preventDefault(), this.preventedFirstMove = !0), e.Gestures.detection.current.name != this.name && this.triggered)) {
          return (n.trigger(this.name + "end", t), void (this.triggered = !1));
        }if (!(n.options.drag_max_touches > 0 && t.touches.length > n.options.drag_max_touches)) switch (t.eventType) {case e.Gestures.EVENT_START:
            this.triggered = !1;break;case e.Gestures.EVENT_MOVE:
            if (t.distance < n.options.drag_min_distance && e.Gestures.detection.current.name != this.name) {
              return;
            }if (e.Gestures.detection.current.name != this.name && (e.Gestures.detection.current.name = this.name, n.options.correct_for_drag_min_distance)) {
              var i = Math.abs(n.options.drag_min_distance / t.distance);e.Gestures.detection.current.startEvent.center.pageX += t.deltaX * i, e.Gestures.detection.current.startEvent.center.pageY += t.deltaY * i, t = e.Gestures.detection.extendEventData(t);
            }(e.Gestures.detection.current.lastEvent.drag_locked_to_axis || n.options.drag_lock_to_axis && n.options.drag_lock_min_distance <= t.distance) && (t.drag_locked_to_axis = !0);var o = e.Gestures.detection.current.lastEvent.direction;t.drag_locked_to_axis && o !== t.direction && (e.Gestures.utils.isVertical(o) ? t.direction = t.deltaY < 0 ? e.Gestures.DIRECTION_UP : e.Gestures.DIRECTION_DOWN : t.direction = t.deltaX < 0 ? e.Gestures.DIRECTION_LEFT : e.Gestures.DIRECTION_RIGHT), this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), n.trigger(this.name + t.direction, t), (n.options.drag_block_vertical && e.Gestures.utils.isVertical(t.direction) || n.options.drag_block_horizontal && !e.Gestures.utils.isVertical(t.direction)) && t.preventDefault();break;case e.Gestures.EVENT_END:
            this.triggered && n.trigger(this.name + "end", t), this.triggered = !1;}
      } }, e.Gestures.gestures.Transform = { name: "transform", index: 45, defaults: { transform_min_scale: 0.01, transform_min_rotation: 1, transform_always_block: !1 }, triggered: !1, handler: function handler(t, n) {
        if (e.Gestures.detection.current.name != this.name && this.triggered) {
          return (n.trigger(this.name + "end", t), void (this.triggered = !1));
        }if (!(t.touches.length < 2)) switch ((n.options.transform_always_block && t.preventDefault(), t.eventType)) {case e.Gestures.EVENT_START:
            this.triggered = !1;break;case e.Gestures.EVENT_MOVE:
            var i = Math.abs(1 - t.scale),
                o = Math.abs(t.rotation);if (i < n.options.transform_min_scale && o < n.options.transform_min_rotation) {
              return;
            }e.Gestures.detection.current.name = this.name, this.triggered || (n.trigger(this.name + "start", t), this.triggered = !0), n.trigger(this.name, t), o > n.options.transform_min_rotation && n.trigger("rotate", t), i > n.options.transform_min_scale && (n.trigger("pinch", t), n.trigger("pinch" + (t.scale < 1 ? "in" : "out"), t));break;case e.Gestures.EVENT_END:
            this.triggered && n.trigger(this.name + "end", t), this.triggered = !1;}
      } }, e.Gestures.gestures.Touch = { name: "touch", index: -(1 / 0), defaults: { prevent_default: !1, prevent_mouseevents: !1 }, handler: function handler(t, n) {
        return n.options.prevent_mouseevents && t.pointerType == e.Gestures.POINTER_MOUSE ? void t.stopDetect() : (n.options.prevent_default && t.preventDefault(), void (t.eventType == e.Gestures.EVENT_START && n.trigger(this.name, t)));
      } }, e.Gestures.gestures.Release = { name: "release", index: 1 / 0, handler: function handler(t, n) {
        t.eventType == e.Gestures.EVENT_END && n.trigger(this.name, t);
      } };
  })(window.ionic), (function (e, t, n) {
    function i(e) {
      e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
          n = t.exec(location.search);return null === n ? "" : decodeURIComponent(n[1].replace(/\+/g, " "));
    }function o() {
      d.isWebView() ? t.addEventListener("deviceready", r, !1) : r(), s && e.removeEventListener("load", o, !1);
    }function r() {
      d.isReady = !0, d.detect();for (var e = 0; e < f.length; e++) f[e]();f = [], n.trigger("platformready", { target: t }), u(function () {
        t.body.classList.add("platform-ready");
      });
    }var s,
        a = "ios",
        l = "android",
        c = "windowsphone",
        u = n.requestAnimationFrame,
        d = n.Platform = { navigator: e.navigator, isReady: !1, isFullScreen: !1, platforms: null, grade: null, ua: navigator.userAgent, ready: function ready(e) {
        d.isReady ? e() : f.push(e);
      }, detect: function detect() {
        d._checkPlatforms(), u(function () {
          for (var e = 0; e < d.platforms.length; e++) t.body.classList.add("platform-" + d.platforms[e]);
        });
      }, setGrade: function setGrade(e) {
        var n = d.grade;d.grade = e, u(function () {
          n && t.body.classList.remove("grade-" + n), t.body.classList.add("grade-" + e);
        });
      }, device: function device() {
        return e.device || {};
      }, _checkPlatforms: function _checkPlatforms() {
        d.platforms = [];var t = "a";d.isWebView() ? (d.platforms.push("webview"), e.cordova || e.PhoneGap || e.phonegap ? d.platforms.push("cordova") : e.forge && d.platforms.push("trigger")) : d.platforms.push("browser"), d.isIPad() && d.platforms.push("ipad");var n = d.platform();if (n) {
          d.platforms.push(n);var i = d.version();if (i) {
            var o = i.toString();o.indexOf(".") > 0 ? o = o.replace(".", "_") : o += "_0", d.platforms.push(n + o.split("_")[0]), d.platforms.push(n + o), d.isAndroid() && 4.4 > i ? t = 4 > i ? "c" : "b" : d.isWindowsPhone() && (t = "b");
          }
        }d.setGrade(t);
      }, isWebView: function isWebView() {
        return !!(e.cordova || e.PhoneGap || e.phonegap || e.forge);
      }, isIPad: function isIPad() {
        return /iPad/i.test(d.navigator.platform) ? !0 : /iPad/i.test(d.ua);
      }, isIOS: function isIOS() {
        return d.is(a);
      }, isAndroid: function isAndroid() {
        return d.is(l);
      }, isWindowsPhone: function isWindowsPhone() {
        return d.is(c);
      }, platform: function platform() {
        return (null === _ && d.setPlatform(d.device().platform), _);
      }, setPlatform: function setPlatform(e) {
        _ = "undefined" != typeof e && null !== e && e.length ? e.toLowerCase() : i("ionicplatform") ? i("ionicplatform") : d.ua.indexOf("Android") > 0 ? l : /iPhone|iPad|iPod/.test(d.ua) ? a : d.ua.indexOf("Windows Phone") > -1 ? c : d.navigator.platform && navigator.platform.toLowerCase().split(" ")[0] || "";
      }, version: function version() {
        return (null === h && d.setVersion(d.device().version), h);
      }, setVersion: function setVersion(e) {
        if ("undefined" != typeof e && null !== e && (e = e.split("."), e = parseFloat(e[0] + "." + (e.length > 1 ? e[1] : 0)), !isNaN(e))) {
          return void (h = e);
        }h = 0;var t = d.platform(),
            n = { android: /Android (\d+).(\d+)?/, ios: /OS (\d+)_(\d+)?/, windowsphone: /Windows Phone (\d+).(\d+)?/ };n[t] && (e = d.ua.match(n[t]), e && e.length > 2 && (h = parseFloat(e[1] + "." + e[2])));
      }, is: function is(e) {
        if ((e = e.toLowerCase(), d.platforms)) for (var t = 0; t < d.platforms.length; t++) if (d.platforms[t] === e) {
          return !0;
        }var n = d.platform();return n ? n === e.toLowerCase() : d.ua.toLowerCase().indexOf(e) >= 0;
      }, exitApp: function exitApp() {
        d.ready(function () {
          navigator.app && navigator.app.exitApp && navigator.app.exitApp();
        });
      }, showStatusBar: function showStatusBar(n) {
        d._showStatusBar = n, d.ready(function () {
          u(function () {
            d._showStatusBar ? (e.StatusBar && e.StatusBar.show(), t.body.classList.remove("status-bar-hide")) : (e.StatusBar && e.StatusBar.hide(), t.body.classList.add("status-bar-hide"));
          });
        });
      }, fullScreen: function fullScreen(e, i) {
        d.isFullScreen = e !== !1, n.DomUtil.ready(function () {
          u(function () {
            d.isFullScreen ? t.body.classList.add("fullscreen") : t.body.classList.remove("fullscreen");
          }), d.showStatusBar(i === !0);
        });
      } },
        _ = null,
        h = null,
        f = [];"complete" === t.readyState ? o() : (s = !0, e.addEventListener("load", o, !1));
  })(this, document, ionic), (function (e, t) {
    "use strict";t.CSS = {}, (function () {
      var n,
          i = ["webkitTransform", "transform", "-webkit-transform", "webkit-transform", "-moz-transform", "moz-transform", "MozTransform", "mozTransform", "msTransform"];for (n = 0; n < i.length; n++) if (void 0 !== e.documentElement.style[i[n]]) {
        t.CSS.TRANSFORM = i[n];break;
      }for (i = ["webkitTransition", "mozTransition", "msTransition", "transition"], n = 0; n < i.length; n++) if (void 0 !== e.documentElement.style[i[n]]) {
        t.CSS.TRANSITION = i[n];break;
      }var o = t.CSS.TRANSITION.indexOf("webkit") > -1;t.CSS.TRANSITION_DURATION = (o ? "-webkit-" : "") + "transition-duration", t.CSS.TRANSITIONEND = (o ? "webkitTransitionEnd " : "") + "transitionend";
    })(), "classList" in e.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", { get: function get() {
        function e(e) {
          return function () {
            var n,
                i = t.className.split(/\s+/);for (n = 0; n < arguments.length; n++) e(i, i.indexOf(arguments[n]), arguments[n]);t.className = i.join(" ");
          };
        }var t = this;return { add: e(function (e, t, n) {
            ~t || e.push(n);
          }), remove: e(function (e, t) {
            ~t && e.splice(t, 1);
          }), toggle: e(function (e, t, n) {
            ~t ? e.splice(t, 1) : e.push(n);
          }), contains: function contains(e) {
            return !! ~t.className.split(/\s+/).indexOf(e);
          }, item: function item(e) {
            return t.className.split(/\s+/)[e] || null;
          } };
      } });
  })(document, ionic);var Y,
      X,
      W,
      $,
      U,
      q,
      B,
      K,
      Z = "touchmove",
      j = 12,
      J = 50,
      Q = {
    click: i, mousedown: o, mouseup: r, mousemove: s, touchstart: a, touchend: l, touchcancel: u, touchmove: c, pointerdown: a, pointerup: l, pointercancel: u, pointermove: c, MSPointerDown: a, MSPointerUp: l, MSPointerCancel: u, MSPointerMove: c, focusin: p, focusout: m };ionic.tap = { register: function register(t) {
      return (Y = t, e("click", !0, !0), e("mouseup"), e("mousedown"), window.navigator.pointerEnabled ? (e("pointerdown"), e("pointerup"), e("pointcancel"), Z = "pointermove") : window.navigator.msPointerEnabled ? (e("MSPointerDown"), e("MSPointerUp"), e("MSPointerCancel"), Z = "MSPointerMove") : (e("touchstart"), e("touchend"), e("touchcancel")), e("focusin"), e("focusout"), function () {
        for (var t in Q) e(t, !1);Y = null, X = null, W = !1, U = !1, q = null;
      });
    }, ignoreScrollStart: function ignoreScrollStart(e) {
      return e.defaultPrevented || /^(file|range)$/i.test(e.target.type) || "true" == (e.target.dataset ? e.target.dataset.preventScroll : e.target.getAttribute("data-prevent-scroll")) || !!/^(object|embed)$/i.test(e.target.tagName) || ionic.tap.isElementTapDisabled(e.target);
    }, isTextInput: function isTextInput(e) {
      return !!e && ("TEXTAREA" == e.tagName || "true" === e.contentEditable || "INPUT" == e.tagName && !/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i.test(e.type));
    }, isDateInput: function isDateInput(e) {
      return !!e && "INPUT" == e.tagName && /^(date|time|datetime-local|month|week)$/i.test(e.type);
    }, isKeyboardElement: function isKeyboardElement(e) {
      return !ionic.Platform.isIOS() || ionic.Platform.isIPad() ? ionic.tap.isTextInput(e) && !ionic.tap.isDateInput(e) : ionic.tap.isTextInput(e) || !!e && "SELECT" == e.tagName;
    }, isLabelWithTextInput: function isLabelWithTextInput(e) {
      var t = T(e, !1);return !!t && ionic.tap.isTextInput(E(t));
    }, containsOrIsTextInput: function containsOrIsTextInput(e) {
      return ionic.tap.isTextInput(e) || ionic.tap.isLabelWithTextInput(e);
    }, cloneFocusedInput: function cloneFocusedInput(e) {
      ionic.tap.hasCheckedClone || (ionic.tap.hasCheckedClone = !0, ionic.requestAnimationFrame(function () {
        var t = e.querySelector(":focus");if (ionic.tap.isTextInput(t)) {
          var n = t.cloneNode(!0);n.value = t.value, n.classList.add("cloned-text-input"), n.readOnly = !0, t.isContentEditable && (n.contentEditable = t.contentEditable, n.innerHTML = t.innerHTML), t.parentElement.insertBefore(n, t), t.classList.add("previous-input-focus"), n.scrollTop = t.scrollTop;
        }
      }));
    }, hasCheckedClone: !1, removeClonedInputs: function removeClonedInputs(e) {
      ionic.tap.hasCheckedClone = !1, ionic.requestAnimationFrame(function () {
        var t,
            n = e.querySelectorAll(".cloned-text-input"),
            i = e.querySelectorAll(".previous-input-focus");for (t = 0; t < n.length; t++) n[t].parentElement.removeChild(n[t]);for (t = 0; t < i.length; t++) i[t].classList.remove("previous-input-focus"), i[t].style.top = "", ionic.keyboard.isOpen && !ionic.keyboard.isClosing && i[t].focus();
      });
    }, requiresNativeClick: function requiresNativeClick(e) {
      return !e || e.disabled || /^(file|range)$/i.test(e.type) || /^(object|video)$/i.test(e.tagName) || ionic.tap.isLabelContainingFileInput(e) ? !0 : ionic.tap.isElementTapDisabled(e);
    }, isLabelContainingFileInput: function isLabelContainingFileInput(e) {
      var t = T(e);if ("LABEL" !== t.tagName) {
        return !1;
      }var n = t.querySelector("input[type=file]");return n && n.disabled === !1 ? !0 : !1;
    }, isElementTapDisabled: function isElementTapDisabled(e) {
      if (e && 1 === e.nodeType) for (var t = e; t;) {
        if ("true" == (t.dataset ? t.dataset.tapDisabled : t.getAttribute("data-tap-disabled"))) {
          return !0;
        }t = t.parentElement;
      }return !1;
    }, setTolerance: function setTolerance(e, t) {
      j = e, J = t;
    }, cancelClick: function cancelClick() {
      U = !0;
    }, pointerCoord: function pointerCoord(e) {
      var t = { x: 0, y: 0 };if (e) {
        var n = e.touches && e.touches.length ? e.touches : [e],
            i = e.changedTouches && e.changedTouches[0] || n[0];i && (t.x = i.clientX || i.pageX || 0, t.y = i.clientY || i.pageY || 0);
      }return t;
    } }, ionic.DomUtil.ready(function () {
    var e = "undefined" != typeof angular ? angular : null;(!e || e && !e.scenario) && ionic.tap.register(document);
  }), (function (e, t) {
    "use strict";function n() {
      r = {}, t.requestAnimationFrame(o);
    }function i() {
      for (var e in r) r[e] && (r[e].classList.add(l), s[e] = r[e]);r = {};
    }function o() {
      if (t.transition && t.transition.isActive) {
        return void setTimeout(o, 400);
      }for (var e in s) s[e] && (s[e].classList.remove(l), delete s[e]);
    }var r = {},
        s = {},
        a = 0,
        l = "activated";t.activator = { start: function start(e) {
        var n = t.tap.pointerCoord(e).x;n > 0 && 30 > n || t.requestAnimationFrame(function () {
          if (!(t.scroll && t.scroll.isScrolling || t.tap.requiresNativeClick(e.target))) {
            for (var n, o = e.target, s = 0; 6 > s && (o && 1 === o.nodeType); s++) {
              if (n && o.classList && o.classList.contains("item")) {
                n = o;break;
              }if ("A" == o.tagName || "BUTTON" == o.tagName || o.hasAttribute("ng-click")) {
                n = o;break;
              }if (o.classList.contains("button")) {
                n = o;break;
              }if ("ION-CONTENT" == o.tagName || o.classList && o.classList.contains("pane") || "BODY" == o.tagName) break;o = o.parentElement;
            }n && (r[a] = n, t.requestAnimationFrame(i), a = a > 29 ? 0 : a + 1);
          }
        });
      }, end: function end() {
        setTimeout(n, 200);
      } };
  })(document, ionic), (function (e) {
    var t = 0;e.Utils = { arrayMove: function arrayMove(e, t, n) {
        if (n >= e.length) for (var i = n - e.length; i-- + 1;) e.push(void 0);return (e.splice(n, 0, e.splice(t, 1)[0]), e);
      }, proxy: function proxy(e, t) {
        var n = Array.prototype.slice.call(arguments, 2);return function () {
          return e.apply(t, n.concat(Array.prototype.slice.call(arguments)));
        };
      }, debounce: function debounce(e, t, n) {
        var i, o, r, s, a;return function () {
          r = this, o = arguments, s = new Date();var l = (function (_l) {
            var _lWrapper = function l() {
              return _l.apply(this, arguments);
            };

            _lWrapper.toString = function () {
              return _l.toString();
            };

            return _lWrapper;
          })(function () {
            var c = new Date() - s;t > c ? i = setTimeout(l, t - c) : (i = null, n || (a = e.apply(r, o)));
          }),
              c = n && !i;return (i || (i = setTimeout(l, t)), c && (a = e.apply(r, o)), a);
        };
      }, throttle: function throttle(e, t, n) {
        var i,
            o,
            r,
            s = null,
            a = 0;n || (n = {});var l = function l() {
          a = n.leading === !1 ? 0 : Date.now(), s = null, r = e.apply(i, o);
        };return function () {
          var c = Date.now();a || n.leading !== !1 || (a = c);var u = t - (c - a);return (i = this, o = arguments, 0 >= u ? (clearTimeout(s), s = null, a = c, r = e.apply(i, o)) : s || n.trailing === !1 || (s = setTimeout(l, u)), r);
        };
      }, inherit: function inherit(t, n) {
        var i,
            o = this;i = t && t.hasOwnProperty("constructor") ? t.constructor : function () {
          return o.apply(this, arguments);
        }, e.extend(i, o, n);var r = function r() {
          this.constructor = i;
        };return (r.prototype = o.prototype, i.prototype = new r(), t && e.extend(i.prototype, t), i.__super__ = o.prototype, i);
      }, extend: function extend(e) {
        for (var t = Array.prototype.slice.call(arguments, 1), n = 0; n < t.length; n++) {
          var i = t[n];if (i) for (var o in i) e[o] = i[o];
        }return e;
      }, nextUid: function nextUid() {
        return "ion" + t++;
      }, disconnectScope: function disconnectScope(e) {
        if (e && e.$root !== e) {
          var t = e.$parent;e.$$disconnected = !0, e.$broadcast("$ionic.disconnectScope", e), t.$$childHead === e && (t.$$childHead = e.$$nextSibling), t.$$childTail === e && (t.$$childTail = e.$$prevSibling), e.$$prevSibling && (e.$$prevSibling.$$nextSibling = e.$$nextSibling), e.$$nextSibling && (e.$$nextSibling.$$prevSibling = e.$$prevSibling), e.$$nextSibling = e.$$prevSibling = null;
        }
      }, reconnectScope: function reconnectScope(e) {
        if (e && e.$root !== e && e.$$disconnected) {
          var t = e.$parent;e.$$disconnected = !1, e.$broadcast("$ionic.reconnectScope", e), e.$$prevSibling = t.$$childTail, t.$$childHead ? (t.$$childTail.$$nextSibling = e, t.$$childTail = e) : t.$$childHead = t.$$childTail = e;
        }
      }, isScopeDisconnected: function isScopeDisconnected(e) {
        for (var t = e; t;) {
          if (t.$$disconnected) {
            return !0;
          }t = t.$parent;
        }return !1;
      } }, e.inherit = e.Utils.inherit, e.extend = e.Utils.extend, e.throttle = e.Utils.throttle, e.proxy = e.Utils.proxy, e.debounce = e.Utils.debounce;
  })(window.ionic);var ee,
      te,
      ne,
      ie,
      oe = 0,
      re = 0,
      se = 0,
      ae = !1,
      le = "keyboard-open",
      ce = "scroll-content",
      ue = ionic.debounce(w, 200, !0),
      de = ionic.debounce(b, 100, !0);ionic.keyboard = { isOpen: !1, isClosing: !1, isOpening: !1, height: 0, isLandscape: !1, isInitialized: !1, hide: function hide() {
      R() && cordova.plugins.Keyboard.close(), ee && ee.blur();
    }, show: function show() {
      R() && cordova.plugins.Keyboard.show();
    }, disable: function disable() {
      R() ? (window.removeEventListener("native.keyboardshow", de), window.removeEventListener("native.keyboardhide", y)) : document.body.removeEventListener("focusout", y), document.body.removeEventListener("ionic.focusin", ue), document.body.removeEventListener("focusin", ue), window.removeEventListener("orientationchange", D), window.navigator.msPointerEnabled ? document.removeEventListener("MSPointerDown", S) : document.removeEventListener("touchstart", S), ionic.keyboard.isInitialized = !1;
    }, enable: function enable() {
      S();
    } }, oe = k(), ionic.Platform.ready(function () {
    G(), window.addEventListener("orientationchange", D), setTimeout(G, 999), window.navigator.msPointerEnabled ? document.addEventListener("MSPointerDown", S, !1) : document.addEventListener("touchstart", S, !1);
  });var _e,
      he = {};ionic.viewport = { orientation: function orientation() {
      return window.innerWidth > window.innerHeight ? 90 : 0;
    } }, ionic.Platform.ready(function () {
    z(), window.addEventListener("orientationchange", function () {
      setTimeout(H, 1000);
    }, !1);
  }), (function (e) {
    "use strict";e.views.View = function () {
      this.initialize.apply(this, arguments);
    }, e.views.View.inherit = e.inherit, e.extend(e.views.View.prototype, { initialize: function initialize() {} });
  })(window.ionic);var fe = { effect: {} };!(function (e) {
    var t = Date.now || function () {
      return +new Date();
    },
        n = 60,
        i = 1000,
        o = {},
        r = 1;fe.effect.Animate = { requestAnimationFrame: (function () {
        var t = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame,
            n = !!t;if ((t && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(t.toString()) && (n = !1), n)) return function (e, n) {
          t(e, n);
        };var i = 60,
            o = {},
            r = 0,
            s = 1,
            a = null,
            l = +new Date();return function (e) {
          var t = s++;return (o[t] = e, r++, null === a && (a = setInterval(function () {
            var e = +new Date(),
                t = o;o = {}, r = 0;for (var n in t) t.hasOwnProperty(n) && (t[n](e), l = e);e - l > 2500 && (clearInterval(a), a = null);
          }, 1000 / i)), t);
        };
      })(), stop: function stop(e) {
        var t = null != o[e];return (t && (o[e] = null), t);
      }, isRunning: function isRunning(e) {
        return null != o[e];
      }, start: function start(e, s, a, l, c, u) {
        var d = t(),
            _ = d,
            h = 0,
            f = 0,
            p = r++;if ((u || (u = document.body), p % 20 === 0)) {
          var m = {};for (var g in o) m[g] = !0;o = m;
        }var v = (function (_v) {
          var _vWrapper = function v(_x) {
            return _v.apply(this, arguments);
          };

          _vWrapper.toString = function () {
            return _v.toString();
          };

          return _vWrapper;
        })(function (r) {
          var m = r !== !0,
              g = t();if (!o[p] || s && !s(p)) return (o[p] = null, void (a && a(n - f / ((g - d) / i), p, !1)));if (m) for (var T = Math.round((g - _) / (i / n)) - 1, E = 0; E < Math.min(T, 4); E++) v(!0), f++;l && (h = (g - d) / l, h > 1 && (h = 1));var S = c ? c(h) : h;e(S, g, m) !== !1 && 1 !== h || !m ? m && (_ = g, fe.effect.Animate.requestAnimationFrame(v, u)) : (o[p] = null, a && a(n - f / ((g - d) / i), p, 1 === h || null == l));
        });return (o[p] = !0, fe.effect.Animate.requestAnimationFrame(v, u), p);
      } };
  })(this), (function (e) {
    var t = function t() {},
        n = function n(e) {
      return Math.pow(e - 1, 3) + 1;
    },
        i = function i(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 3) : 0.5 * (Math.pow(e - 2, 3) + 2);
    };e.views.Scroll = e.views.View.inherit({ initialize: function initialize(n) {
        var i = this;i.__container = n.el, i.__content = n.el.firstElementChild, setTimeout(function () {
          i.__container && i.__content && (i.__container.scrollTop = 0, i.__content.scrollTop = 0);
        }), i.options = { scrollingX: !1, scrollbarX: !0, scrollingY: !0, scrollbarY: !0, startX: 0, startY: 0, wheelDampen: 6, minScrollbarSizeX: 5, minScrollbarSizeY: 5, scrollbarsFade: !0, scrollbarFadeDelay: 300, scrollbarResizeFadeDelay: 1000, animating: !0, animationDuration: 250, decelVelocityThreshold: 4, decelVelocityThresholdPaging: 4, bouncing: !0, locking: !0, paging: !1, snapping: !1, zooming: !1, minZoom: 0.5, maxZoom: 3, speedMultiplier: 1, deceleration: 0.97, preventDefault: !1, scrollingComplete: t, penetrationDeceleration: 0.03, penetrationAcceleration: 0.08, scrollEventInterval: 10, freeze: !1, getContentWidth: function getContentWidth() {
            return Math.max(i.__content.scrollWidth, i.__content.offsetWidth);
          }, getContentHeight: function getContentHeight() {
            return Math.max(i.__content.scrollHeight, i.__content.offsetHeight + 2 * i.__content.offsetTop);
          } };for (var o in n) i.options[o] = n[o];i.hintResize = e.debounce(function () {
          i.resize();
        }, 1000, !0), i.onScroll = function () {
          e.scroll.isScrolling ? (clearTimeout(i.scrollTimer), i.scrollTimer = setTimeout(i.setScrollStop, 80)) : setTimeout(i.setScrollStart, 50);
        }, i.freeze = function (e) {
          return (arguments.length && (i.options.freeze = e), i.options.freeze);
        }, i.setScrollStart = function () {
          e.scroll.isScrolling = Math.abs(e.scroll.lastTop - i.__scrollTop) > 1, clearTimeout(i.scrollTimer), i.scrollTimer = setTimeout(i.setScrollStop, 80);
        }, i.setScrollStop = function () {
          e.scroll.isScrolling = !1, e.scroll.lastTop = i.__scrollTop;
        }, i.triggerScrollEvent = e.throttle(function () {
          i.onScroll(), e.trigger("scroll", { scrollTop: i.__scrollTop, scrollLeft: i.__scrollLeft, target: i.__container });
        }, i.options.scrollEventInterval), i.triggerScrollEndEvent = function () {
          e.trigger("scrollend", { scrollTop: i.__scrollTop, scrollLeft: i.__scrollLeft, target: i.__container });
        }, i.__scrollLeft = i.options.startX, i.__scrollTop = i.options.startY, i.__callback = i.getRenderFn(), i.__initEventHandlers(), i.__createScrollbars();
      }, run: function run() {
        this.resize(), this.__fadeScrollbars("out", this.options.scrollbarResizeFadeDelay);
      }, __isSingleTouch: !1, __isTracking: !1, __didDecelerationComplete: !1, __isGesturing: !1, __isDragging: !1, __isDecelerating: !1, __isAnimating: !1, __clientLeft: 0, __clientTop: 0, __clientWidth: 0, __clientHeight: 0, __contentWidth: 0, __contentHeight: 0, __snapWidth: 100, __snapHeight: 100, __refreshHeight: null, __refreshActive: !1, __refreshActivate: null, __refreshDeactivate: null, __refreshStart: null, __zoomLevel: 1, __scrollLeft: 0, __scrollTop: 0, __maxScrollLeft: 0, __maxScrollTop: 0, __scheduledLeft: 0, __scheduledTop: 0, __scheduledZoom: 0, __lastTouchLeft: null, __lastTouchTop: null, __lastTouchMove: null, __positions: null, __minDecelerationScrollLeft: null, __minDecelerationScrollTop: null, __maxDecelerationScrollLeft: null, __maxDecelerationScrollTop: null, __decelerationVelocityX: null, __decelerationVelocityY: null, __transformProperty: null, __perspectiveProperty: null, __indicatorX: null, __indicatorY: null, __scrollbarFadeTimeout: null, __didWaitForSize: null, __sizerTimeout: null, __initEventHandlers: function __initEventHandlers() {
        function t(e) {
          return e.touches && e.touches.length ? e.touches : [{ pageX: e.pageX, pageY: e.pageY }];
        }var n,
            i = this,
            o = i.__container;if ((i.scrollChildIntoView = function (t) {
          var r = o.getBoundingClientRect().bottom;n = o.offsetHeight;var s = i.isShrunkForKeyboard,
              a = o.parentNode.classList.contains("modal"),
              l = a && window.innerWidth >= 680;if (!s) {
            if (e.Platform.isIOS() || e.Platform.isFullScreen || l) {
              var c = t.detail.viewportHeight - r,
                  u = Math.max(0, t.detail.keyboardHeight - c);e.requestAnimationFrame(function () {
                n -= u, o.style.height = n + "px", o.style.overflow = "visible", i.resize();
              });
            }i.isShrunkForKeyboard = !0;
          }t.detail.isElementUnderKeyboard && e.requestAnimationFrame(function () {
            o.scrollTop = 0, i.isShrunkForKeyboard && !s && (r = o.getBoundingClientRect().bottom);var a = 0.5 * n,
                l = (t.detail.elementBottom + t.detail.elementTop) / 2,
                c = l - r,
                u = c + a;u > 0 && (e.Platform.isIOS() && e.tap.cloneFocusedInput(o, i), i.scrollBy(0, u, !0), i.onScroll());
          }), t.stopPropagation();
        }, i.resetScrollView = function () {
          i.isShrunkForKeyboard && (i.isShrunkForKeyboard = !1, o.style.height = "", o.style.overflow = ""), i.resize();
        }, o.addEventListener("scrollChildIntoView", i.scrollChildIntoView), document.addEventListener("resetScrollView", i.resetScrollView), i.touchStart = function (n) {
          if ((i.startCoordinates = e.tap.pointerCoord(n), !e.tap.ignoreScrollStart(n))) {
            if ((i.__isDown = !0, e.tap.containsOrIsTextInput(n.target) || "SELECT" === n.target.tagName)) return void (i.__hasStarted = !1);i.__isSelectable = !0, i.__enableScrollY = !0, i.__hasStarted = !0, i.doTouchStart(t(n), n.timeStamp), n.preventDefault();
          }
        }, i.touchMove = function (n) {
          if (!(i.options.freeze || !i.__isDown || !i.__isDown && n.defaultPrevented || "TEXTAREA" === n.target.tagName && n.target.parentElement.querySelector(":focus"))) {
            if (!i.__hasStarted && (e.tap.containsOrIsTextInput(n.target) || "SELECT" === n.target.tagName)) return (i.__hasStarted = !0, i.doTouchStart(t(n), n.timeStamp), void n.preventDefault());if (i.startCoordinates) {
              var r = e.tap.pointerCoord(n);i.__isSelectable && e.tap.isTextInput(n.target) && Math.abs(i.startCoordinates.x - r.x) > 20 && (i.__enableScrollY = !1, i.__isSelectable = !0), i.__enableScrollY && Math.abs(i.startCoordinates.y - r.y) > 10 && (i.__isSelectable = !1, e.tap.cloneFocusedInput(o, i));
            }i.doTouchMove(t(n), n.timeStamp, n.scale), i.__isDown = !0;
          }
        }, i.touchMoveBubble = function (e) {
          i.__isDown && i.options.preventDefault && e.preventDefault();
        }, i.touchEnd = function (t) {
          i.__isDown && (i.doTouchEnd(t, t.timeStamp), i.__isDown = !1, i.__hasStarted = !1, i.__isSelectable = !0, i.__enableScrollY = !0, i.__isDragging || i.__isDecelerating || i.__isAnimating || e.tap.removeClonedInputs(o, i));
        }, i.mouseWheel = e.animationFrameThrottle(function (t) {
          var n = e.DomUtil.getParentOrSelfWithClass(t.target, "ionic-scroll");i.options.freeze || n !== i.__container || (i.hintResize(), i.scrollBy((t.wheelDeltaX || t.deltaX || 0) / i.options.wheelDampen, (-t.wheelDeltaY || t.deltaY || 0) / i.options.wheelDampen), i.__fadeScrollbars("in"), clearTimeout(i.__wheelHideBarTimeout), i.__wheelHideBarTimeout = setTimeout(function () {
            i.__fadeScrollbars("out");
          }, 100));
        }), "ontouchstart" in window)) o.addEventListener("touchstart", i.touchStart, !1), i.options.preventDefault && o.addEventListener("touchmove", i.touchMoveBubble, !1), document.addEventListener("touchmove", i.touchMove, !1), document.addEventListener("touchend", i.touchEnd, !1), document.addEventListener("touchcancel", i.touchEnd, !1);else if (window.navigator.pointerEnabled) o.addEventListener("pointerdown", i.touchStart, !1), i.options.preventDefault && o.addEventListener("pointermove", i.touchMoveBubble, !1), document.addEventListener("pointermove", i.touchMove, !1), document.addEventListener("pointerup", i.touchEnd, !1), document.addEventListener("pointercancel", i.touchEnd, !1), document.addEventListener("wheel", i.mouseWheel, !1);else if (window.navigator.msPointerEnabled) o.addEventListener("MSPointerDown", i.touchStart, !1), i.options.preventDefault && o.addEventListener("MSPointerMove", i.touchMoveBubble, !1), document.addEventListener("MSPointerMove", i.touchMove, !1), document.addEventListener("MSPointerUp", i.touchEnd, !1), document.addEventListener("MSPointerCancel", i.touchEnd, !1), document.addEventListener("wheel", i.mouseWheel, !1);else {
          var r = !1;i.mouseDown = function (n) {
            e.tap.ignoreScrollStart(n) || "SELECT" === n.target.tagName || (i.doTouchStart(t(n), n.timeStamp), e.tap.isTextInput(n.target) || n.preventDefault(), r = !0);
          }, i.mouseMove = function (e) {
            i.options.freeze || !r || !r && e.defaultPrevented || (i.doTouchMove(t(e), e.timeStamp), r = !0);
          }, i.mouseMoveBubble = function (e) {
            r && i.options.preventDefault && e.preventDefault();
          }, i.mouseUp = function (e) {
            r && (i.doTouchEnd(e, e.timeStamp), r = !1);
          }, o.addEventListener("mousedown", i.mouseDown, !1), i.options.preventDefault && o.addEventListener("mousemove", i.mouseMoveBubble, !1), document.addEventListener("mousemove", i.mouseMove, !1), document.addEventListener("mouseup", i.mouseUp, !1), document.addEventListener("mousewheel", i.mouseWheel, !1), document.addEventListener("wheel", i.mouseWheel, !1);
        }
      }, __cleanup: function __cleanup() {
        var n = this,
            i = n.__container;i.removeEventListener("touchstart", n.touchStart), i.removeEventListener("touchmove", n.touchMoveBubble), document.removeEventListener("touchmove", n.touchMove), document.removeEventListener("touchend", n.touchEnd), document.removeEventListener("touchcancel", n.touchCancel), i.removeEventListener("pointerdown", n.touchStart), i.removeEventListener("pointermove", n.touchMoveBubble), document.removeEventListener("pointermove", n.touchMove), document.removeEventListener("pointerup", n.touchEnd), document.removeEventListener("pointercancel", n.touchEnd), i.removeEventListener("MSPointerDown", n.touchStart), i.removeEventListener("MSPointerMove", n.touchMoveBubble), document.removeEventListener("MSPointerMove", n.touchMove), document.removeEventListener("MSPointerUp", n.touchEnd), document.removeEventListener("MSPointerCancel", n.touchEnd), i.removeEventListener("mousedown", n.mouseDown), i.removeEventListener("mousemove", n.mouseMoveBubble), document.removeEventListener("mousemove", n.mouseMove), document.removeEventListener("mouseup", n.mouseUp), document.removeEventListener("mousewheel", n.mouseWheel), document.removeEventListener("wheel", n.mouseWheel), i.removeEventListener("scrollChildIntoView", n.scrollChildIntoView), document.removeEventListener("resetScrollView", n.resetScrollView), e.tap.removeClonedInputs(i, n), delete n.__container, delete n.__content, delete n.__indicatorX, delete n.__indicatorY, delete n.options.el, n.__callback = n.scrollChildIntoView = n.resetScrollView = t, n.mouseMove = n.mouseDown = n.mouseUp = n.mouseWheel = n.touchStart = n.touchMove = n.touchEnd = n.touchCancel = t, n.resize = n.scrollTo = n.zoomTo = n.__scrollingComplete = t, i = null;
      }, __createScrollbar: function __createScrollbar(e) {
        var t = document.createElement("div"),
            n = document.createElement("div");return (n.className = "scroll-bar-indicator scroll-bar-fade-out", "h" == e ? t.className = "scroll-bar scroll-bar-h" : t.className = "scroll-bar scroll-bar-v", t.appendChild(n), t);
      }, __createScrollbars: function __createScrollbars() {
        var e,
            t,
            n = this;n.options.scrollingX && (e = { el: n.__createScrollbar("h"), sizeRatio: 1 }, e.indicator = e.el.children[0], n.options.scrollbarX && n.__container.appendChild(e.el), n.__indicatorX = e), n.options.scrollingY && (t = { el: n.__createScrollbar("v"), sizeRatio: 1 }, t.indicator = t.el.children[0], n.options.scrollbarY && n.__container.appendChild(t.el), n.__indicatorY = t);
      }, __resizeScrollbars: function __resizeScrollbars() {
        var t = this;if (t.__indicatorX) {
          var n = Math.max(Math.round(t.__clientWidth * t.__clientWidth / t.__contentWidth), 20);n > t.__contentWidth && (n = 0), n !== t.__indicatorX.size && e.requestAnimationFrame(function () {
            t.__indicatorX.indicator.style.width = n + "px";
          }), t.__indicatorX.size = n, t.__indicatorX.minScale = t.options.minScrollbarSizeX / n, t.__indicatorX.maxPos = t.__clientWidth - n, t.__indicatorX.sizeRatio = t.__maxScrollLeft ? t.__indicatorX.maxPos / t.__maxScrollLeft : 1;
        }if (t.__indicatorY) {
          var i = Math.max(Math.round(t.__clientHeight * t.__clientHeight / t.__contentHeight), 20);i > t.__contentHeight && (i = 0), i !== t.__indicatorY.size && e.requestAnimationFrame(function () {
            t.__indicatorY && (t.__indicatorY.indicator.style.height = i + "px");
          }), t.__indicatorY.size = i, t.__indicatorY.minScale = t.options.minScrollbarSizeY / i, t.__indicatorY.maxPos = t.__clientHeight - i, t.__indicatorY.sizeRatio = t.__maxScrollTop ? t.__indicatorY.maxPos / t.__maxScrollTop : 1;
        }
      }, __repositionScrollbars: function __repositionScrollbars() {
        var e,
            t,
            n,
            i,
            o,
            r,
            s = this,
            a = 0,
            l = 0;if (s.__indicatorX) {
          s.__indicatorY && (a = 10), o = Math.round(s.__indicatorX.sizeRatio * s.__scrollLeft) || 0, n = s.__scrollLeft - (s.__maxScrollLeft - a), s.__scrollLeft < 0 ? (t = Math.max(s.__indicatorX.minScale, (s.__indicatorX.size - Math.abs(s.__scrollLeft)) / s.__indicatorX.size), o = 0, s.__indicatorX.indicator.style[s.__transformOriginProperty] = "left center") : n > 0 ? (t = Math.max(s.__indicatorX.minScale, (s.__indicatorX.size - n) / s.__indicatorX.size), o = s.__indicatorX.maxPos - a, s.__indicatorX.indicator.style[s.__transformOriginProperty] = "right center") : (o = Math.min(s.__maxScrollLeft, Math.max(0, o)), t = 1);var c = "translate3d(" + o + "px, 0, 0) scaleX(" + t + ")";s.__indicatorX.transformProp !== c && (s.__indicatorX.indicator.style[s.__transformProperty] = c, s.__indicatorX.transformProp = c);
        }if (s.__indicatorY) {
          r = Math.round(s.__indicatorY.sizeRatio * s.__scrollTop) || 0, s.__indicatorX && (l = 10), i = s.__scrollTop - (s.__maxScrollTop - l), s.__scrollTop < 0 ? (e = Math.max(s.__indicatorY.minScale, (s.__indicatorY.size - Math.abs(s.__scrollTop)) / s.__indicatorY.size), r = 0, "center top" !== s.__indicatorY.originProp && (s.__indicatorY.indicator.style[s.__transformOriginProperty] = "center top", s.__indicatorY.originProp = "center top")) : i > 0 ? (e = Math.max(s.__indicatorY.minScale, (s.__indicatorY.size - i) / s.__indicatorY.size), r = s.__indicatorY.maxPos - l, "center bottom" !== s.__indicatorY.originProp && (s.__indicatorY.indicator.style[s.__transformOriginProperty] = "center bottom", s.__indicatorY.originProp = "center bottom")) : (r = Math.min(s.__maxScrollTop, Math.max(0, r)), e = 1);var u = "translate3d(0," + r + "px, 0) scaleY(" + e + ")";s.__indicatorY.transformProp !== u && (s.__indicatorY.indicator.style[s.__transformProperty] = u, s.__indicatorY.transformProp = u);
        }
      }, __fadeScrollbars: function __fadeScrollbars(e, t) {
        var n = this;if (n.options.scrollbarsFade) {
          var i = "scroll-bar-fade-out";n.options.scrollbarsFade === !0 && (clearTimeout(n.__scrollbarFadeTimeout), "in" == e ? (n.__indicatorX && n.__indicatorX.indicator.classList.remove(i), n.__indicatorY && n.__indicatorY.indicator.classList.remove(i)) : n.__scrollbarFadeTimeout = setTimeout(function () {
            n.__indicatorX && n.__indicatorX.indicator.classList.add(i), n.__indicatorY && n.__indicatorY.indicator.classList.add(i);
          }, t || n.options.scrollbarFadeDelay));
        }
      }, __scrollingComplete: function __scrollingComplete() {
        this.options.scrollingComplete(), e.tap.removeClonedInputs(this.__container, this), this.__fadeScrollbars("out");
      }, resize: function resize(e) {
        var t = this;t.__container && t.options && t.setDimensions(t.__container.clientWidth, t.__container.clientHeight, t.options.getContentWidth(), t.options.getContentHeight(), e);
      }, getRenderFn: function getRenderFn() {
        var e,
            t = this,
            n = t.__content,
            i = document.documentElement.style;"MozAppearance" in i ? e = "gecko" : "WebkitAppearance" in i ? e = "webkit" : "string" == typeof navigator.cpuClass && (e = "trident");var o,
            r = ({ trident: "ms", gecko: "Moz", webkit: "Webkit", presto: "O" })[e],
            s = document.createElement("div"),
            a = r + "Perspective",
            l = r + "Transform",
            c = r + "TransformOrigin";return (t.__perspectiveProperty = l, t.__transformProperty = l, t.__transformOriginProperty = c, s.style[a] !== o ? function (e, i, o, r) {
          var s = "translate3d(" + -e + "px," + -i + "px,0) scale(" + o + ")";s !== t.contentTransform && (n.style[l] = s, t.contentTransform = s), t.__repositionScrollbars(), r || t.triggerScrollEvent();
        } : s.style[l] !== o ? function (e, i, o, r) {
          n.style[l] = "translate(" + -e + "px," + -i + "px) scale(" + o + ")", t.__repositionScrollbars(), r || t.triggerScrollEvent();
        } : function (e, i, o, r) {
          n.style.marginLeft = e ? -e / o + "px" : "", n.style.marginTop = i ? -i / o + "px" : "", n.style.zoom = o || "", t.__repositionScrollbars(), r || t.triggerScrollEvent();
        });
      }, setDimensions: function setDimensions(e, t, n, i, o) {
        var r = this;(e || t || n || i) && (e === +e && (r.__clientWidth = e), t === +t && (r.__clientHeight = t), n === +n && (r.__contentWidth = n), i === +i && (r.__contentHeight = i), r.__computeScrollMax(), r.__resizeScrollbars(), o || r.scrollTo(r.__scrollLeft, r.__scrollTop, !0, null, !0));
      }, setPosition: function setPosition(e, t) {
        this.__clientLeft = e || 0, this.__clientTop = t || 0;
      }, setSnapSize: function setSnapSize(e, t) {
        this.__snapWidth = e, this.__snapHeight = t;
      }, activatePullToRefresh: function activatePullToRefresh(t, n) {
        var i = this;i.__refreshHeight = t, i.__refreshActivate = function () {
          e.requestAnimationFrame(n.activate);
        }, i.__refreshDeactivate = function () {
          e.requestAnimationFrame(n.deactivate);
        }, i.__refreshStart = function () {
          e.requestAnimationFrame(n.start);
        }, i.__refreshShow = function () {
          e.requestAnimationFrame(n.show);
        }, i.__refreshHide = function () {
          e.requestAnimationFrame(n.hide);
        }, i.__refreshTail = function () {
          e.requestAnimationFrame(n.tail);
        }, i.__refreshTailTime = 100, i.__minSpinTime = 600;
      }, triggerPullToRefresh: function triggerPullToRefresh() {
        this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, !0);var e = new Date();this.refreshStartTime = e.getTime(), this.__refreshStart && this.__refreshStart();
      }, finishPullToRefresh: function finishPullToRefresh() {
        var e = this,
            t = new Date(),
            n = 0;e.refreshStartTime + e.__minSpinTime > t.getTime() && (n = e.refreshStartTime + e.__minSpinTime - t.getTime()), setTimeout(function () {
          e.__refreshTail && e.__refreshTail(), setTimeout(function () {
            e.__refreshActive = !1, e.__refreshDeactivate && e.__refreshDeactivate(), e.__refreshHide && e.__refreshHide(), e.scrollTo(e.__scrollLeft, e.__scrollTop, !0);
          }, e.__refreshTailTime);
        }, n);
      }, getValues: function getValues() {
        return { left: this.__scrollLeft, top: this.__scrollTop, zoom: this.__zoomLevel };
      }, getScrollMax: function getScrollMax() {
        return { left: this.__maxScrollLeft, top: this.__maxScrollTop };
      }, zoomTo: function zoomTo(e, t, n, i) {
        var o = this;if (!o.options.zooming) throw new Error("Zooming is not enabled!");o.__isDecelerating && (fe.effect.Animate.stop(o.__isDecelerating), o.__isDecelerating = !1);var r = o.__zoomLevel;null == n && (n = o.__clientWidth / 2), null == i && (i = o.__clientHeight / 2), e = Math.max(Math.min(e, o.options.maxZoom), o.options.minZoom), o.__computeScrollMax(e);var s = (n + o.__scrollLeft) * e / r - n,
            a = (i + o.__scrollTop) * e / r - i;s > o.__maxScrollLeft ? s = o.__maxScrollLeft : 0 > s && (s = 0), a > o.__maxScrollTop ? a = o.__maxScrollTop : 0 > a && (a = 0), o.__publish(s, a, e, t);
      }, zoomBy: function zoomBy(e, t, n, i) {
        this.zoomTo(this.__zoomLevel * e, t, n, i);
      }, scrollTo: function scrollTo(e, t, n, i, o) {
        var r = this;if ((r.__isDecelerating && (fe.effect.Animate.stop(r.__isDecelerating), r.__isDecelerating = !1), null != i && i !== r.__zoomLevel)) {
          if (!r.options.zooming) throw new Error("Zooming is not enabled!");e *= i, t *= i, r.__computeScrollMax(i);
        } else i = r.__zoomLevel;r.options.scrollingX ? r.options.paging ? e = Math.round(e / r.__clientWidth) * r.__clientWidth : r.options.snapping && (e = Math.round(e / r.__snapWidth) * r.__snapWidth) : e = r.__scrollLeft, r.options.scrollingY ? r.options.paging ? t = Math.round(t / r.__clientHeight) * r.__clientHeight : r.options.snapping && (t = Math.round(t / r.__snapHeight) * r.__snapHeight) : t = r.__scrollTop, e = Math.max(Math.min(r.__maxScrollLeft, e), 0), t = Math.max(Math.min(r.__maxScrollTop, t), 0), e === r.__scrollLeft && t === r.__scrollTop && (n = !1), r.__publish(e, t, i, n, o);
      }, scrollBy: function scrollBy(e, t, n) {
        var i = this,
            o = i.__isAnimating ? i.__scheduledLeft : i.__scrollLeft,
            r = i.__isAnimating ? i.__scheduledTop : i.__scrollTop;i.scrollTo(o + (e || 0), r + (t || 0), n);
      }, doMouseZoom: function doMouseZoom(e, t, n, i) {
        var o = e > 0 ? 0.97 : 1.03;return this.zoomTo(this.__zoomLevel * o, !1, n - this.__clientLeft, i - this.__clientTop);
      }, doTouchStart: function doTouchStart(e, t) {
        var n = this;n.__decStopped = !(!n.__isDecelerating && !n.__isAnimating), n.hintResize(), t instanceof Date && (t = t.valueOf()), "number" != typeof t && (t = Date.now()), n.__interruptedAnimation = !0, n.__isDecelerating && (fe.effect.Animate.stop(n.__isDecelerating), n.__isDecelerating = !1, n.__interruptedAnimation = !0), n.__isAnimating && (fe.effect.Animate.stop(n.__isAnimating), n.__isAnimating = !1, n.__interruptedAnimation = !0);var i,
            o,
            r = 1 === e.length;r ? (i = e[0].pageX, o = e[0].pageY) : (i = Math.abs(e[0].pageX + e[1].pageX) / 2, o = Math.abs(e[0].pageY + e[1].pageY) / 2), n.__initialTouchLeft = i, n.__initialTouchTop = o, n.__initialTouches = e, n.__zoomLevelStart = n.__zoomLevel, n.__lastTouchLeft = i, n.__lastTouchTop = o, n.__lastTouchMove = t, n.__lastScale = 1, n.__enableScrollX = !r && n.options.scrollingX, n.__enableScrollY = !r && n.options.scrollingY, n.__isTracking = !0, n.__didDecelerationComplete = !1, n.__isDragging = !r, n.__isSingleTouch = r, n.__positions = [];
      }, doTouchMove: function doTouchMove(e, t, n) {
        t instanceof Date && (t = t.valueOf()), "number" != typeof t && (t = Date.now());var i = this;if (i.__isTracking) {
          var o, r;2 === e.length ? (o = Math.abs(e[0].pageX + e[1].pageX) / 2, r = Math.abs(e[0].pageY + e[1].pageY) / 2, !n && i.options.zooming && (n = i.__getScale(i.__initialTouches, e))) : (o = e[0].pageX, r = e[0].pageY);var s = i.__positions;if (i.__isDragging) {
            i.__decStopped = !1;var a = o - i.__lastTouchLeft,
                l = r - i.__lastTouchTop,
                c = i.__scrollLeft,
                u = i.__scrollTop,
                d = i.__zoomLevel;if (null != n && i.options.zooming) {
              var _ = d;if ((d = d / i.__lastScale * n, d = Math.max(Math.min(d, i.options.maxZoom), i.options.minZoom), _ !== d)) {
                var h = o - i.__clientLeft,
                    f = r - i.__clientTop;c = (h + c) * d / _ - h, u = (f + u) * d / _ - f, i.__computeScrollMax(d);
              }
            }if (i.__enableScrollX) {
              c -= a * i.options.speedMultiplier;var p = i.__maxScrollLeft;(c > p || 0 > c) && (i.options.bouncing ? c += a / 2 * i.options.speedMultiplier : c = c > p ? p : 0);
            }if (i.__enableScrollY) {
              u -= l * i.options.speedMultiplier;var m = i.__maxScrollTop;u > m || 0 > u ? i.options.bouncing || i.__refreshHeight && 0 > u ? (u += l / 2 * i.options.speedMultiplier, i.__enableScrollX || null == i.__refreshHeight || (0 > u ? (i.__refreshHidden = !1, i.__refreshShow()) : (i.__refreshHide(), i.__refreshHidden = !0), !i.__refreshActive && u <= -i.__refreshHeight ? (i.__refreshActive = !0, i.__refreshActivate && i.__refreshActivate()) : i.__refreshActive && u > -i.__refreshHeight && (i.__refreshActive = !1, i.__refreshDeactivate && i.__refreshDeactivate()))) : u = u > m ? m : 0 : i.__refreshHeight && !i.__refreshHidden && (i.__refreshHide(), i.__refreshHidden = !0);
            }s.length > 60 && s.splice(0, 30), s.push(c, u, t), i.__publish(c, u, d);
          } else {
            var g = i.options.locking ? 3 : 0,
                v = 5,
                T = Math.abs(o - i.__initialTouchLeft),
                E = Math.abs(r - i.__initialTouchTop);i.__enableScrollX = i.options.scrollingX && T >= g, i.__enableScrollY = i.options.scrollingY && E >= g, s.push(i.__scrollLeft, i.__scrollTop, t), i.__isDragging = (i.__enableScrollX || i.__enableScrollY) && (T >= v || E >= v), i.__isDragging && (i.__interruptedAnimation = !1, i.__fadeScrollbars("in"));
          }i.__lastTouchLeft = o, i.__lastTouchTop = r, i.__lastTouchMove = t, i.__lastScale = n;
        }
      }, doTouchEnd: function doTouchEnd(t, n) {
        n instanceof Date && (n = n.valueOf()), "number" != typeof n && (n = Date.now());var i = this;if (i.__isTracking) {
          if ((i.__isTracking = !1, i.__isDragging)) if ((i.__isDragging = !1, i.__isSingleTouch && i.options.animating && n - i.__lastTouchMove <= 100)) {
            for (var o = i.__positions, r = o.length - 1, s = r, a = r; a > 0 && o[a] > i.__lastTouchMove - 100; a -= 3) s = a;if (s !== r) {
              var l = o[r] - o[s],
                  c = i.__scrollLeft - o[s - 2],
                  u = i.__scrollTop - o[s - 1];i.__decelerationVelocityX = c / l * (1000 / 60), i.__decelerationVelocityY = u / l * (1000 / 60);var d = i.options.paging || i.options.snapping ? i.options.decelVelocityThresholdPaging : i.options.decelVelocityThreshold;(Math.abs(i.__decelerationVelocityX) > d || Math.abs(i.__decelerationVelocityY) > d) && (i.__refreshActive || i.__startDeceleration(n));
            } else i.__scrollingComplete();
          } else n - i.__lastTouchMove > 100 && i.__scrollingComplete();else i.__decStopped && (t.isTapHandled = !0, i.__decStopped = !1);if (!i.__isDecelerating) if (i.__refreshActive && i.__refreshStart) {
            i.__publish(i.__scrollLeft, -i.__refreshHeight, i.__zoomLevel, !0);var _ = new Date();i.refreshStartTime = _.getTime(), i.__refreshStart && i.__refreshStart(), e.Platform.isAndroid() || i.__startDeceleration();
          } else (i.__interruptedAnimation || i.__isDragging) && i.__scrollingComplete(), i.scrollTo(i.__scrollLeft, i.__scrollTop, !0, i.__zoomLevel), i.__refreshActive && (i.__refreshActive = !1, i.__refreshDeactivate && i.__refreshDeactivate());i.__positions.length = 0;
        }
      }, __publish: function __publish(e, t, o, r, s) {
        var a = this,
            l = a.__isAnimating;if ((l && (fe.effect.Animate.stop(l), a.__isAnimating = !1), r && a.options.animating)) {
          a.__scheduledLeft = e, a.__scheduledTop = t, a.__scheduledZoom = o;var c = a.__scrollLeft,
              u = a.__scrollTop,
              d = a.__zoomLevel,
              _ = e - c,
              h = t - u,
              f = o - d,
              p = function p(e, t, n) {
            n && (a.__scrollLeft = c + _ * e, a.__scrollTop = u + h * e, a.__zoomLevel = d + f * e, a.__callback && a.__callback(a.__scrollLeft, a.__scrollTop, a.__zoomLevel, s));
          },
              m = function m(e) {
            return a.__isAnimating === e;
          },
              g = function g(e, t, n) {
            t === a.__isAnimating && (a.__isAnimating = !1), (a.__didDecelerationComplete || n) && a.__scrollingComplete(), a.options.zooming && a.__computeScrollMax();
          };a.__isAnimating = fe.effect.Animate.start(p, m, g, a.options.animationDuration, l ? n : i);
        } else a.__scheduledLeft = a.__scrollLeft = e, a.__scheduledTop = a.__scrollTop = t, a.__scheduledZoom = a.__zoomLevel = o, a.__callback && a.__callback(e, t, o, s), a.options.zooming && a.__computeScrollMax();
      }, __computeScrollMax: function __computeScrollMax(e) {
        var t = this;null == e && (e = t.__zoomLevel), t.__maxScrollLeft = Math.max(t.__contentWidth * e - t.__clientWidth, 0), t.__maxScrollTop = Math.max(t.__contentHeight * e - t.__clientHeight, 0), t.__didWaitForSize || t.__maxScrollLeft || t.__maxScrollTop || (t.__didWaitForSize = !0, t.__waitForSize());
      }, __waitForSize: function __waitForSize() {
        var e = this;clearTimeout(e.__sizerTimeout);var t = function t() {
          e.resize(!0);
        };t(), e.__sizerTimeout = setTimeout(t, 500);
      }, __startDeceleration: function __startDeceleration() {
        var e = this;if (e.options.paging) {
          var t = Math.max(Math.min(e.__scrollLeft, e.__maxScrollLeft), 0),
              n = Math.max(Math.min(e.__scrollTop, e.__maxScrollTop), 0),
              i = e.__clientWidth,
              o = e.__clientHeight;e.__minDecelerationScrollLeft = Math.floor(t / i) * i, e.__minDecelerationScrollTop = Math.floor(n / o) * o, e.__maxDecelerationScrollLeft = Math.ceil(t / i) * i, e.__maxDecelerationScrollTop = Math.ceil(n / o) * o;
        } else e.__minDecelerationScrollLeft = 0, e.__minDecelerationScrollTop = 0, e.__maxDecelerationScrollLeft = e.__maxScrollLeft, e.__maxDecelerationScrollTop = e.__maxScrollTop, e.__refreshActive && (e.__minDecelerationScrollTop = -1 * e.__refreshHeight);var r = function r(t, n, i) {
          e.__stepThroughDeceleration(i);
        };e.__minVelocityToKeepDecelerating = e.options.snapping ? 4 : 0.1;var s = function s() {
          var t = Math.abs(e.__decelerationVelocityX) >= e.__minVelocityToKeepDecelerating || Math.abs(e.__decelerationVelocityY) >= e.__minVelocityToKeepDecelerating;return (t || (e.__didDecelerationComplete = !0, e.options.bouncing && !e.__refreshActive && e.scrollTo(Math.min(Math.max(e.__scrollLeft, 0), e.__maxScrollLeft), Math.min(Math.max(e.__scrollTop, 0), e.__maxScrollTop), e.__refreshActive)), t);
        },
            a = function a() {
          e.__isDecelerating = !1, e.__didDecelerationComplete && e.__scrollingComplete(), e.options.paging && e.scrollTo(e.__scrollLeft, e.__scrollTop, e.options.snapping);
        };e.__isDecelerating = fe.effect.Animate.start(r, s, a);
      }, __stepThroughDeceleration: function __stepThroughDeceleration(e) {
        var t = this,
            n = t.__scrollLeft + t.__decelerationVelocityX,
            i = t.__scrollTop + t.__decelerationVelocityY;if (!t.options.bouncing) {
          var o = Math.max(Math.min(t.__maxDecelerationScrollLeft, n), t.__minDecelerationScrollLeft);o !== n && (n = o, t.__decelerationVelocityX = 0);var r = Math.max(Math.min(t.__maxDecelerationScrollTop, i), t.__minDecelerationScrollTop);r !== i && (i = r, t.__decelerationVelocityY = 0);
        }if ((e ? t.__publish(n, i, t.__zoomLevel) : (t.__scrollLeft = n, t.__scrollTop = i), !t.options.paging)) {
          var s = t.options.deceleration;t.__decelerationVelocityX *= s, t.__decelerationVelocityY *= s;
        }if (t.options.bouncing) {
          var a = 0,
              l = 0,
              c = t.options.penetrationDeceleration,
              u = t.options.penetrationAcceleration;if ((n < t.__minDecelerationScrollLeft ? a = t.__minDecelerationScrollLeft - n : n > t.__maxDecelerationScrollLeft && (a = t.__maxDecelerationScrollLeft - n), i < t.__minDecelerationScrollTop ? l = t.__minDecelerationScrollTop - i : i > t.__maxDecelerationScrollTop && (l = t.__maxDecelerationScrollTop - i), 0 !== a)) {
            var d = a * t.__decelerationVelocityX <= t.__minDecelerationScrollLeft;d && (t.__decelerationVelocityX += a * c);var _ = Math.abs(t.__decelerationVelocityX) <= t.__minVelocityToKeepDecelerating;(!d || _) && (t.__decelerationVelocityX = a * u);
          }if (0 !== l) {
            var h = l * t.__decelerationVelocityY <= t.__minDecelerationScrollTop;h && (t.__decelerationVelocityY += l * c);var f = Math.abs(t.__decelerationVelocityY) <= t.__minVelocityToKeepDecelerating;(!h || f) && (t.__decelerationVelocityY = l * u);
          }
        }
      }, __getDistance: function __getDistance(e, t) {
        var n = t.pageX - e.pageX,
            i = t.pageY - e.pageY;return Math.sqrt(n * n + i * i);
      }, __getScale: function __getScale(e, t) {
        return e.length >= 2 && t.length >= 2 ? this.__getDistance(t[0], t[1]) / this.__getDistance(e[0], e[1]) : 1;
      } }), e.scroll = { isScrolling: !1, lastTop: 0 };
  })(ionic), (function (e) {
    var t = function t() {},
        n = function n(e) {};e.views.ScrollNative = e.views.View.inherit({ initialize: function initialize(n) {
        var i = this;i.__container = i.el = n.el, i.__content = n.el.firstElementChild, i.isNative = !0, i.__scrollTop = i.el.scrollTop, i.__scrollLeft = i.el.scrollLeft, i.__clientHeight = i.__content.clientHeight, i.__clientWidth = i.__content.clientWidth, i.__maxScrollTop = Math.max(i.__contentHeight - i.__clientHeight, 0), i.__maxScrollLeft = Math.max(i.__contentWidth - i.__clientWidth, 0), i.options = { freeze: !1, getContentWidth: function getContentWidth() {
            return Math.max(i.__content.scrollWidth, i.__content.offsetWidth);
          }, getContentHeight: function getContentHeight() {
            return Math.max(i.__content.scrollHeight, i.__content.offsetHeight + 2 * i.__content.offsetTop);
          } };for (var o in n) i.options[o] = n[o];i.onScroll = function () {
          e.scroll.isScrolling || (e.scroll.isScrolling = !0), clearTimeout(i.scrollTimer), i.scrollTimer = setTimeout(function () {
            e.scroll.isScrolling = !1;
          }, 80);
        }, i.freeze = t, i.__initEventHandlers();
      }, __callback: function __callback() {
        n("__callback");
      }, zoomTo: function zoomTo() {
        n("zoomTo");
      }, zoomBy: function zoomBy() {
        n("zoomBy");
      }, activatePullToRefresh: function activatePullToRefresh() {
        n("activatePullToRefresh");
      }, resize: function resize(e) {
        var t = this;t.__container && t.options && t.setDimensions(t.__container.clientWidth, t.__container.clientHeight, t.options.getContentWidth(), t.options.getContentHeight(), e);
      }, run: function run() {
        this.resize();
      }, getValues: function getValues() {
        var e = this;return (e.update(), { left: e.__scrollLeft, top: e.__scrollTop, zoom: 1 });
      }, update: function update() {
        var e = this;e.__scrollLeft = e.el.scrollLeft, e.__scrollTop = e.el.scrollTop;
      }, setDimensions: function setDimensions(e, t, n, i) {
        var o = this;(e || t || n || i) && (e === +e && (o.__clientWidth = e), t === +t && (o.__clientHeight = t), n === +n && (o.__contentWidth = n), i === +i && (o.__contentHeight = i), o.__computeScrollMax());
      }, getScrollMax: function getScrollMax() {
        return { left: this.__maxScrollLeft, top: this.__maxScrollTop };
      }, scrollBy: function scrollBy(e, t, n) {
        var i = this;i.update();var o = i.__isAnimating ? i.__scheduledLeft : i.__scrollLeft,
            r = i.__isAnimating ? i.__scheduledTop : i.__scrollTop;i.scrollTo(o + (e || 0), r + (t || 0), n);
      }, scrollTo: function scrollTo(t, n, i) {
        function o(t, n) {
          function i(e) {
            return --e * e * e + 1;
          }function o() {
            var u = Date.now(),
                d = Math.min(1, (u - s) / a),
                _ = i(d);l != t && (r.el.scrollTop = parseInt(_ * (t - l) + l, 10)), c != n && (r.el.scrollLeft = parseInt(_ * (n - c) + c, 10)), 1 > d ? e.requestAnimationFrame(o) : r.resize();
          }var s = Date.now(),
              a = 1000,
              l = r.el.scrollTop,
              c = r.el.scrollLeft;return l === t && c === n ? void r.resize() : void e.requestAnimationFrame(o);
        }var r = this;return i ? void o(n, t) : (r.el.scrollTop = n, r.el.scrollLeft = t, void r.resize());
      }, __waitForSize: function __waitForSize() {
        var e = this;clearTimeout(e.__sizerTimeout);var t = function t() {
          e.resize(!0);
        };t(), e.__sizerTimeout = setTimeout(t, 500);
      }, __computeScrollMax: function __computeScrollMax() {
        var e = this;e.__maxScrollLeft = Math.max(e.__contentWidth - e.__clientWidth, 0), e.__maxScrollTop = Math.max(e.__contentHeight - e.__clientHeight, 0), e.__didWaitForSize || e.__maxScrollLeft || e.__maxScrollTop || (e.__didWaitForSize = !0, e.__waitForSize());
      }, __initEventHandlers: function __initEventHandlers() {
        var n = this,
            i = n.__container;n.scrollChildIntoView = t, n.resetScrollView = function () {
          n.isScrolledIntoView && (n.isScrolledIntoView = !1, i.style.height = "", i.style.overflow = "", n.resize(), e.scroll.isScrolling = !1);
        }, i.addEventListener("resetScrollView", n.resetScrollView), i.addEventListener("scroll", n.onScroll), i.addEventListener("scrollChildIntoView", n.scrollChildIntoView), i.addEventListener("resetScrollView", n.resetScrollView);
      }, __cleanup: function __cleanup() {
        var n = this,
            i = n.__container;i.removeEventListener("resetScrollView", n.resetScrollView), i.removeEventListener("scroll", n.onScroll), i.removeEventListener("scrollChildIntoView", n.scrollChildIntoView), i.removeEventListener("resetScrollView", n.resetScrollView), e.tap.removeClonedInputs(i, n), delete n.__container, delete n.__content, delete n.__indicatorX, delete n.__indicatorY, delete n.options.el, n.resize = n.scrollTo = n.onScroll = n.resetScrollView = t, i = null;
      } });
  })(ionic), (function (e) {
    "use strict";var t = "item",
        n = "item-content",
        i = "item-sliding",
        o = "item-options",
        r = "item-placeholder",
        s = "item-reordering",
        a = "item-reorder",
        l = function l() {};l.prototype = { start: function start() {}, drag: function drag() {}, end: function end() {}, isSameItem: function isSameItem() {
        return !1;
      } };var c = function c(e) {
      this.dragThresholdX = e.dragThresholdX || 10, this.el = e.el, this.item = e.item, this.canSwipe = e.canSwipe;
    };c.prototype = new l(), c.prototype.start = function (r) {
      var s, a, l, c;this.canSwipe() && (s = r.target.classList.contains(n) ? r.target : r.target.classList.contains(t) ? r.target.querySelector("." + n) : e.DomUtil.getParentWithClass(r.target, n), s && (s.classList.remove(i), l = parseFloat(s.style[e.CSS.TRANSFORM].replace("translate3d(", "").split(",")[0]) || 0, a = s.parentNode.querySelector("." + o), a && (a.classList.remove("invisible"), c = a.offsetWidth, this._currentDrag = { buttons: a, buttonsWidth: c, content: s, startOffsetX: l })));
    }, c.prototype.isSameItem = function (e) {
      return e._lastDrag && this._currentDrag ? this._currentDrag.content == e._lastDrag.content : !1;
    }, c.prototype.clean = function (t) {
      function n() {
        i.buttons && i.buttons.classList.add("invisible");
      }var i = this._lastDrag;i && i.content && (i.content.style[e.CSS.TRANSITION] = "", i.content.style[e.CSS.TRANSFORM] = "", t ? (i.content.style[e.CSS.TRANSITION] = "none", n(), e.requestAnimationFrame(function () {
        i.content.style[e.CSS.TRANSITION] = "";
      })) : e.requestAnimationFrame(function () {
        setTimeout(n, 250);
      }));
    }, c.prototype.drag = e.animationFrameThrottle(function (t) {
      var n;if (this._currentDrag && (!this._isDragging && (Math.abs(t.gesture.deltaX) > this.dragThresholdX || Math.abs(this._currentDrag.startOffsetX) > 0) && (this._isDragging = !0), this._isDragging)) {
        n = this._currentDrag.buttonsWidth;var i = Math.min(0, this._currentDrag.startOffsetX + t.gesture.deltaX);-n > i && (i = Math.min(-n, -n + 0.4 * (t.gesture.deltaX + n))), this._currentDrag.content.$$ionicOptionsOpen = 0 !== i, this._currentDrag.content.style[e.CSS.TRANSFORM] = "translate3d(" + i + "px, 0, 0)", this._currentDrag.content.style[e.CSS.TRANSITION] = "none";
      }
    }), c.prototype.end = function (t, n) {
      var i = this;if (!i._currentDrag) return void (n && n());var o = -i._currentDrag.buttonsWidth;t.gesture.deltaX > -(i._currentDrag.buttonsWidth / 2) && ("left" == t.gesture.direction && Math.abs(t.gesture.velocityX) < 0.3 ? o = 0 : "right" == t.gesture.direction && (o = 0)), e.requestAnimationFrame(function () {
        if (0 === o) {
          i._currentDrag.content.style[e.CSS.TRANSFORM] = "";var t = i._currentDrag.buttons;setTimeout(function () {
            t && t.classList.add("invisible");
          }, 250);
        } else i._currentDrag.content.style[e.CSS.TRANSFORM] = "translate3d(" + o + "px,0,0)";i._currentDrag.content.style[e.CSS.TRANSITION] = "", i._lastDrag || (i._lastDrag = {}), e.extend(i._lastDrag, i._currentDrag), i._currentDrag && (i._currentDrag.buttons = null, i._currentDrag.content = null), i._currentDrag = null, n && n();
      });
    };var u = function u(e) {
      var t = this;if ((t.dragThresholdY = e.dragThresholdY || 0, t.onReorder = e.onReorder, t.listEl = e.listEl, t.el = t.item = e.el, t.scrollEl = e.scrollEl, t.scrollView = e.scrollView, t.listElTrueTop = 0, t.listEl.offsetParent)) {
        var n = t.listEl;do t.listElTrueTop += n.offsetTop, n = n.offsetParent; while (n);
      }
    };u.prototype = new l(), u.prototype._moveElement = function (t) {
      var n = t.gesture.center.pageY + this.scrollView.getValues().top - this._currentDrag.elementHeight / 2 - this.listElTrueTop;this.el.style[e.CSS.TRANSFORM] = "translate3d(0, " + n + "px, 0)";
    }, u.prototype.deregister = function () {
      this.listEl = this.el = this.scrollEl = this.scrollView = null;
    }, u.prototype.start = function (t) {
      var n = e.DomUtil.getChildIndex(this.el, this.el.nodeName.toLowerCase()),
          i = this.el.scrollHeight,
          o = this.el.cloneNode(!0);o.classList.add(r), this.el.parentNode.insertBefore(o, this.el), this.el.classList.add(s), this._currentDrag = { elementHeight: i, startIndex: n, placeholder: o, scrollHeight: scroll, list: o.parentNode }, this._moveElement(t);
    }, u.prototype.drag = e.animationFrameThrottle(function (t) {
      var n = this;if (this._currentDrag) {
        var i = 0,
            o = t.gesture.center.pageY,
            r = this.listElTrueTop;if (this.scrollView) {
          var s = this.scrollView.__container;i = this.scrollView.getValues().top;var a = s.offsetTop,
              l = a - o + this._currentDrag.elementHeight / 2,
              c = o + this._currentDrag.elementHeight / 2 - a - s.offsetHeight;t.gesture.deltaY < 0 && l > 0 && i > 0 && (this.scrollView.scrollBy(null, -l), e.requestAnimationFrame(function () {
            n.drag(t);
          })), t.gesture.deltaY > 0 && c > 0 && i < this.scrollView.getScrollMax().top && (this.scrollView.scrollBy(null, c), e.requestAnimationFrame(function () {
            n.drag(t);
          }));
        }!this._isDragging && Math.abs(t.gesture.deltaY) > this.dragThresholdY && (this._isDragging = !0), this._isDragging && (this._moveElement(t), this._currentDrag.currentY = i + o - r);
      }
    }), u.prototype._getReorderIndex = function () {
      for (var e, t = this, n = Array.prototype.slice.call(t._currentDrag.placeholder.parentNode.children).filter(function (e) {
        return e.nodeName === t.el.nodeName && e !== t.el;
      }), i = t._currentDrag.currentY, o = 0, r = n.length; r > o; o++) if ((e = n[o], o === r - 1)) {
        if (i > e.offsetTop) return o;
      } else if (0 === o) {
        if (i < e.offsetTop + e.offsetHeight) return o;
      } else if (i > e.offsetTop - e.offsetHeight / 2 && i < e.offsetTop + e.offsetHeight) return o;return t._currentDrag.startIndex;
    }, u.prototype.end = function (t, n) {
      if (!this._currentDrag) return void (n && n());var i = this._currentDrag.placeholder,
          o = this._getReorderIndex();this.el.classList.remove(s), this.el.style[e.CSS.TRANSFORM] = "", i.parentNode.insertBefore(this.el, i), i.parentNode.removeChild(i), this.onReorder && this.onReorder(this.el, this._currentDrag.startIndex, o), this._currentDrag = { placeholder: null, content: null }, this._currentDrag = null, n && n();
    }, e.views.ListView = e.views.View.inherit({ initialize: function initialize(t) {
        var n = this;t = e.extend({ onReorder: function onReorder() {}, virtualRemoveThreshold: -200, virtualAddThreshold: 200, canSwipe: function canSwipe() {
            return !0;
          } }, t), e.extend(n, t), !n.itemHeight && n.listEl && (n.itemHeight = n.listEl.children[0] && parseInt(n.listEl.children[0].style.height, 10)), n.onRefresh = t.onRefresh || function () {}, n.onRefreshOpening = t.onRefreshOpening || function () {}, n.onRefreshHolding = t.onRefreshHolding || function () {};var i = {};e.DomUtil.getParentOrSelfWithClass(n.el, "overflow-scroll") && (i.prevent_default_directions = ["left", "right"]), window.ionic.onGesture("release", function (e) {
          n._handleEndDrag(e);
        }, n.el, i), window.ionic.onGesture("drag", function (e) {
          n._handleDrag(e);
        }, n.el, i), n._initDrag();
      }, deregister: function deregister() {
        this.el = this.listEl = this.scrollEl = this.scrollView = null, this.isScrollFreeze && self.scrollView.freeze(!1);
      }, stopRefreshing: function stopRefreshing() {
        var e = this.el.querySelector(".list-refresher");e.style.height = "0";
      }, didScroll: function didScroll(e) {
        var t = this;if (t.isVirtual) {
          var n = t.itemHeight,
              i = e.target.scrollHeight,
              o = t.el.parentNode.offsetHeight,
              r = Math.max(0, e.scrollTop + t.virtualRemoveThreshold),
              s = Math.min(i, Math.abs(e.scrollTop) + o + t.virtualAddThreshold),
              a = parseInt(Math.abs(r / n), 10),
              l = parseInt(Math.abs(s / n), 10);t._virtualItemsToRemove = Array.prototype.slice.call(t.listEl.children, 0, a), t.renderViewport && t.renderViewport(r, s, a, l);
        }
      }, didStopScrolling: function didStopScrolling() {
        if (this.isVirtual) for (var e = 0; e < this._virtualItemsToRemove.length; e++) this.didHideItem && this.didHideItem(e);
      }, clearDragEffects: function clearDragEffects(e) {
        this._lastDragOp && (this._lastDragOp.clean && this._lastDragOp.clean(e), this._lastDragOp.deregister && this._lastDragOp.deregister(), this._lastDragOp = null);
      }, _initDrag: function _initDrag() {
        this._lastDragOp && this._lastDragOp.deregister && this._lastDragOp.deregister(), this._lastDragOp = this._dragOp, this._dragOp = null;
      }, _getItem: function _getItem(e) {
        for (; e;) {
          if (e.classList && e.classList.contains(t)) {
            return e;
          }e = e.parentNode;
        }return null;
      }, _startDrag: function _startDrag(t) {
        var n = this;n._isDragging = !1;var i,
            o = n._lastDragOp;n._didDragUpOrDown && o instanceof c && o.clean && o.clean(), !e.DomUtil.getParentOrSelfWithClass(t.target, a) || "up" != t.gesture.direction && "down" != t.gesture.direction ? !n._didDragUpOrDown && ("left" == t.gesture.direction || "right" == t.gesture.direction) && Math.abs(t.gesture.deltaX) > 5 && (i = n._getItem(t.target), i && i.querySelector(".item-options") && (n._dragOp = new c({ el: n.el, item: i, canSwipe: n.canSwipe }), n._dragOp.start(t), t.preventDefault(), n.isScrollFreeze = n.scrollView.freeze(!0))) : (i = n._getItem(t.target), i && (n._dragOp = new u({ listEl: n.el, el: i, scrollEl: n.scrollEl, scrollView: n.scrollView, onReorder: function onReorder(e, t, i) {
            n.onReorder && n.onReorder(e, t, i);
          } }), n._dragOp.start(t), t.preventDefault())), o && n._dragOp && !n._dragOp.isSameItem(o) && t.defaultPrevented && o.clean && o.clean();
      }, _handleEndDrag: function _handleEndDrag(e) {
        var t = this;t.scrollView && (t.isScrollFreeze = t.scrollView.freeze(!1)), t._didDragUpOrDown = !1, t._dragOp && t._dragOp.end(e, function () {
          t._initDrag();
        });
      }, _handleDrag: function _handleDrag(e) {
        var t = this;Math.abs(e.gesture.deltaY) > 5 && (t._didDragUpOrDown = !0), t.isDragging || t._dragOp || t._startDrag(e), t._dragOp && (e.gesture.srcEvent.preventDefault(), t._dragOp.drag(e));
      } });
  })(ionic), (function (e) {
    "use strict";e.views.Modal = e.views.View.inherit({ initialize: function initialize(t) {
        t = e.extend({ focusFirstInput: !1, unfocusOnHide: !0, focusFirstDelay: 600, backdropClickToClose: !0, hardwareBackButtonClose: !0 }, t), e.extend(this, t), this.el = t.el;
      }, show: function show() {
        var e = this;e.focusFirstInput && window.setTimeout(function () {
          var t = e.el.querySelector("input, textarea");t && t.focus && t.focus();
        }, e.focusFirstDelay);
      }, hide: function hide() {
        if (this.unfocusOnHide) {
          var e = this.el.querySelectorAll("input, textarea");window.setTimeout(function () {
            for (var t = 0; t < e.length; t++) e[t].blur && e[t].blur();
          });
        }
      } });
  })(ionic), (function (e) {
    "use strict";e.views.SideMenu = e.views.View.inherit({ initialize: function initialize(e) {
        this.el = e.el, this.isEnabled = "undefined" == typeof e.isEnabled ? !0 : e.isEnabled, this.setWidth(e.width);
      }, getFullWidth: function getFullWidth() {
        return this.width;
      }, setWidth: function setWidth(e) {
        this.width = e, this.el.style.width = e + "px";
      }, setIsEnabled: function setIsEnabled(e) {
        this.isEnabled = e;
      }, bringUp: function bringUp() {
        "0" !== this.el.style.zIndex && (this.el.style.zIndex = "0");
      }, pushDown: function pushDown() {
        "-1" !== this.el.style.zIndex && (this.el.style.zIndex = "-1");
      } }), e.views.SideMenuContent = e.views.View.inherit({ initialize: function initialize(t) {
        e.extend(this, { animationClass: "menu-animated", onDrag: function onDrag() {}, onEndDrag: function onEndDrag() {} }, t), e.onGesture("drag", e.proxy(this._onDrag, this), this.el), e.onGesture("release", e.proxy(this._onEndDrag, this), this.el);
      }, _onDrag: function _onDrag(e) {
        this.onDrag && this.onDrag(e);
      }, _onEndDrag: function _onEndDrag(e) {
        this.onEndDrag && this.onEndDrag(e);
      }, disableAnimation: function disableAnimation() {
        this.el.classList.remove(this.animationClass);
      }, enableAnimation: function enableAnimation() {
        this.el.classList.add(this.animationClass);
      }, getTranslateX: function getTranslateX() {
        return parseFloat(this.el.style[e.CSS.TRANSFORM].replace("translate3d(", "").split(",")[0]);
      }, setTranslateX: e.animationFrameThrottle(function (t) {
        this.el.style[e.CSS.TRANSFORM] = "translate3d(" + t + "px, 0, 0)";
      }) });
  })(ionic), (function (e) {
    "use strict";e.views.Slider = e.views.View.inherit({ initialize: function initialize(e) {
        function t() {
          if (p.offsetWidth) {
            m = E.children, T = m.length, m.length < 2 && (e.continuous = !1), f.transitions && e.continuous && m.length < 3 && (E.appendChild(m[0].cloneNode(!0)), E.appendChild(E.children[1].cloneNode(!0)), m = E.children), g = new Array(m.length), v = p.offsetWidth || p.getBoundingClientRect().width, E.style.width = m.length * v + "px";for (var t = m.length; t--;) {
              var n = m[t];n.style.width = v + "px", n.setAttribute("data-index", t), f.transitions && (n.style.left = t * -v + "px", s(t, S > t ? -v : t > S ? v : 0, 0));
            }e.continuous && f.transitions && (s(o(S - 1), -v, 0), s(o(S + 1), v, 0)), f.transitions || (E.style.left = S * -v + "px"), p.style.visibility = "visible", e.slidesChanged && e.slidesChanged();
          }
        }function n(t) {
          e.continuous ? r(S - 1, t) : S && r(S - 1, t);
        }function i(t) {
          e.continuous ? r(S + 1, t) : S < m.length - 1 && r(S + 1, t);
        }function o(e) {
          return (m.length + e % m.length) % m.length;
        }function r(t, n) {
          if (S != t) {
            if (f.transitions) {
              var i = Math.abs(S - t) / (S - t);if (e.continuous) {
                var r = i;i = -g[o(t)] / v, i !== r && (t = -i * m.length + t);
              }for (var a = Math.abs(S - t) - 1; a--;) s(o((t > S ? t : S) - a - 1), v * i, 0);t = o(t), s(S, v * i, n || b), s(t, 0, n || b), e.continuous && s(o(t - i), -(v * i), 0);
            } else t = o(t), l(S * -v, t * -v, n || b);S = t, h(e.callback && e.callback(S, m[S]));
          }
        }function s(e, t, n) {
          a(e, t, n), g[e] = t;
        }function a(e, t, n) {
          var i = m[e],
              o = i && i.style;o && (o.webkitTransitionDuration = o.MozTransitionDuration = o.msTransitionDuration = o.OTransitionDuration = o.transitionDuration = n + "ms", o.webkitTransform = "translate(" + t + "px,0)translateZ(0)", o.msTransform = o.MozTransform = o.OTransform = "translateX(" + t + "px)");
        }function l(t, n, i) {
          if (!i) {
            return void (E.style.left = n + "px");
          }var o = +new Date(),
              r = setInterval(function () {
            var s = +new Date() - o;return s > i ? (E.style.left = n + "px", D && c(), e.transitionEnd && e.transitionEnd.call(event, S, m[S]), void clearInterval(r)) : void (E.style.left = (n - t) * (Math.floor(s / i * 100) / 100) + t + "px");
          }, 4);
        }function c() {
          w = setTimeout(i, D);
        }function u() {
          D = e.auto || 0, clearTimeout(w);
        }var d = this,
            _ = function _() {},
            h = function h(e) {
          setTimeout(e || _, 0);
        },
            f = { addEventListener: !!window.addEventListener, touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, transitions: (function (e) {
            var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];for (var n in t) if (void 0 !== e.style[t[n]]) return !0;return !1;
          })(document.createElement("swipe")) },
            p = e.el;if (p) {
          var m,
              g,
              v,
              T,
              E = p.children[0];e = e || {};var S = parseInt(e.startSlide, 10) || 0,
              b = e.speed || 300;e.continuous = void 0 !== e.continuous ? e.continuous : !0;var w,
              y,
              D = e.auto || 0,
              L = {},
              x = {},
              M = { handleEvent: function handleEvent(n) {
              switch ((("mousedown" == n.type || "mouseup" == n.type || "mousemove" == n.type) && (n.touches = [{ pageX: n.pageX, pageY: n.pageY }]), n.type)) {case "mousedown":
                  this.start(n);break;case "touchstart":
                  this.start(n);break;case "touchmove":
                  this.touchmove(n);break;case "mousemove":
                  this.touchmove(n);break;case "touchend":
                  h(this.end(n));break;case "mouseup":
                  h(this.end(n));break;case "webkitTransitionEnd":case "msTransitionEnd":case "oTransitionEnd":case "otransitionend":case "transitionend":
                  h(this.transitionEnd(n));break;case "resize":
                  h(t);}e.stopPropagation && n.stopPropagation();
            }, start: function start(e) {
              var t = e.touches[0];L = { x: t.pageX, y: t.pageY, time: +new Date() }, y = void 0, x = {}, f.touch ? (E.addEventListener("touchmove", this, !1), E.addEventListener("touchend", this, !1)) : (E.addEventListener("mousemove", this, !1), E.addEventListener("mouseup", this, !1), document.addEventListener("mouseup", this, !1));
            }, touchmove: function touchmove(t) {
              if (!(t.touches.length > 1 || t.scale && 1 !== t.scale || d.slideIsDisabled)) {
                e.disableScroll && t.preventDefault();var n = t.touches[0];x = { x: n.pageX - L.x, y: n.pageY - L.y }, "undefined" == typeof y && (y = !!(y || Math.abs(x.x) < Math.abs(x.y))), y || (t.preventDefault(), u(), e.continuous ? (a(o(S - 1), x.x + g[o(S - 1)], 0), a(S, x.x + g[S], 0), a(o(S + 1), x.x + g[o(S + 1)], 0)) : (x.x = x.x / (!S && x.x > 0 || S == m.length - 1 && x.x < 0 ? Math.abs(x.x) / v + 1 : 1), a(S - 1, x.x + g[S - 1], 0), a(S, x.x + g[S], 0), a(S + 1, x.x + g[S + 1], 0)), e.onDrag && e.onDrag());
              }
            }, end: function end() {
              var t = +new Date() - L.time,
                  n = Number(t) < 250 && Math.abs(x.x) > 20 || Math.abs(x.x) > v / 2,
                  i = !S && x.x > 0 || S == m.length - 1 && x.x < 0;e.continuous && (i = !1);var r = x.x < 0;y || (n && !i ? (r ? (e.continuous ? (s(o(S - 1), -v, 0), s(o(S + 2), v, 0)) : s(S - 1, -v, 0), s(S, g[S] - v, b), s(o(S + 1), g[o(S + 1)] - v, b), S = o(S + 1)) : (e.continuous ? (s(o(S + 1), v, 0), s(o(S - 2), -v, 0)) : s(S + 1, v, 0), s(S, g[S] + v, b), s(o(S - 1), g[o(S - 1)] + v, b), S = o(S - 1)), e.callback && e.callback(S, m[S])) : e.continuous ? (s(o(S - 1), -v, b), s(S, 0, b), s(o(S + 1), v, b)) : (s(S - 1, -v, b), s(S, 0, b), s(S + 1, v, b))), f.touch ? (E.removeEventListener("touchmove", M, !1), E.removeEventListener("touchend", M, !1)) : (E.removeEventListener("mousemove", M, !1), E.removeEventListener("mouseup", M, !1), document.removeEventListener("mouseup", M, !1)), e.onDragEnd && e.onDragEnd();
            }, transitionEnd: function transitionEnd(t) {
              parseInt(t.target.getAttribute("data-index"), 10) == S && (D && c(), e.transitionEnd && e.transitionEnd.call(t, S, m[S]));
            } };this.update = function () {
            setTimeout(t);
          }, this.setup = function () {
            t();
          }, this.loop = function (t) {
            return (arguments.length && (e.continuous = !!t), e.continuous);
          }, this.enableSlide = function (e) {
            return (arguments.length && (this.slideIsDisabled = !e), !this.slideIsDisabled);
          }, this.slide = this.select = function (e, t) {
            u(), r(e, t);
          }, this.prev = this.previous = function () {
            u(), n();
          }, this.next = function () {
            u(), i();
          }, this.stop = function () {
            u();
          }, this.start = function () {
            c();
          }, this.autoPlay = function (e) {
            !D || 0 > D ? u() : (D = e, c());
          }, this.currentIndex = this.selected = function () {
            return S;
          }, this.slidesCount = this.count = function () {
            return T;
          }, this.kill = function () {
            u(), E.style.width = "", E.style.left = "", m && (m = []), f.addEventListener ? (E.removeEventListener("touchstart", M, !1), E.removeEventListener("webkitTransitionEnd", M, !1), E.removeEventListener("msTransitionEnd", M, !1), E.removeEventListener("oTransitionEnd", M, !1), E.removeEventListener("otransitionend", M, !1), E.removeEventListener("transitionend", M, !1), window.removeEventListener("resize", M, !1)) : window.onresize = null;
          }, this.load = function () {
            t(), D && c(), f.addEventListener ? (f.touch ? E.addEventListener("touchstart", M, !1) : E.addEventListener("mousedown", M, !1), f.transitions && (E.addEventListener("webkitTransitionEnd", M, !1), E.addEventListener("msTransitionEnd", M, !1), E.addEventListener("oTransitionEnd", M, !1), E.addEventListener("otransitionend", M, !1), E.addEventListener("transitionend", M, !1)), window.addEventListener("resize", M, !1)) : window.onresize = function () {
              t();
            };
          };
        }
      } });
  })(ionic), (function (e) {
    "use strict";e.views.Toggle = e.views.View.inherit({ initialize: function initialize(t) {
        var n = this;this.el = t.el, this.checkbox = t.checkbox, this.track = t.track, this.handle = t.handle, this.openPercent = -1, this.onChange = t.onChange || function () {}, this.triggerThreshold = t.triggerThreshold || 20, this.dragStartHandler = function (e) {
          n.dragStart(e);
        }, this.dragHandler = function (e) {
          n.drag(e);
        }, this.holdHandler = function (e) {
          n.hold(e);
        }, this.releaseHandler = function (e) {
          n.release(e);
        }, this.dragStartGesture = e.onGesture("dragstart", this.dragStartHandler, this.el), this.dragGesture = e.onGesture("drag", this.dragHandler, this.el), this.dragHoldGesture = e.onGesture("hold", this.holdHandler, this.el), this.dragReleaseGesture = e.onGesture("release", this.releaseHandler, this.el);
      }, destroy: function destroy() {
        e.offGesture(this.dragStartGesture, "dragstart", this.dragStartGesture), e.offGesture(this.dragGesture, "drag", this.dragGesture), e.offGesture(this.dragHoldGesture, "hold", this.holdHandler), e.offGesture(this.dragReleaseGesture, "release", this.releaseHandler);
      }, tap: function tap() {
        "disabled" !== this.el.getAttribute("disabled") && this.val(!this.checkbox.checked);
      }, dragStart: function dragStart(e) {
        this.checkbox.disabled || (this._dragInfo = { width: this.el.offsetWidth, left: this.el.offsetLeft, right: this.el.offsetLeft + this.el.offsetWidth, triggerX: this.el.offsetWidth / 2, initialState: this.checkbox.checked }, e.gesture.srcEvent.preventDefault(), this.hold(e));
      }, drag: function drag(t) {
        var n = this;this._dragInfo && (t.gesture.srcEvent.preventDefault(), e.requestAnimationFrame(function () {
          if (n._dragInfo) {
            var e = t.gesture.touches[0].pageX - n._dragInfo.left,
                i = n._dragInfo.width - n.triggerThreshold;n._dragInfo.initialState ? e < n.triggerThreshold ? n.setOpenPercent(0) : e > n._dragInfo.triggerX && n.setOpenPercent(100) : e < n._dragInfo.triggerX ? n.setOpenPercent(0) : e > i && n.setOpenPercent(100);
          }
        }));
      }, endDrag: function endDrag() {
        this._dragInfo = null;
      }, hold: function hold() {
        this.el.classList.add("dragging");
      }, release: function release(e) {
        this.el.classList.remove("dragging"), this.endDrag(e);
      }, setOpenPercent: function setOpenPercent(t) {
        if (this.openPercent < 0 || t < this.openPercent - 3 || t > this.openPercent + 3) if ((this.openPercent = t, 0 === t)) this.val(!1);else if (100 === t) this.val(!0);else {
          var n = Math.round(t / 100 * this.track.offsetWidth - this.handle.offsetWidth);n = 1 > n ? 0 : n, this.handle.style[e.CSS.TRANSFORM] = "translate3d(" + n + "px,0,0)";
        }
      }, val: function val(t) {
        return ((t === !0 || t === !1) && ("" !== this.handle.style[e.CSS.TRANSFORM] && (this.handle.style[e.CSS.TRANSFORM] = ""), this.checkbox.checked = t, this.openPercent = t ? 100 : 0, this.onChange && this.onChange()), this.checkbox.checked);
      } });
  })(ionic);
})();

//# sourceMappingURL=ionic.min-compiled.js.map