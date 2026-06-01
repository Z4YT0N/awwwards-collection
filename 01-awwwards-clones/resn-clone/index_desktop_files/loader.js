// Device.js
// (c) 2014 Matthew Hudson
// Device.js is freely distributable under the MIT license.
// For all details and documentation:
// http://matthewhudson.me/projects/device.js/

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */

//     (c) 2010-2011 Jeremy Ashkenas, DocumentCloud Inc.
//     (c) 2011-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

// MIT license

(function() {
    var t, e, i, n, r, s, o, a, l, u;
    e = window.device, t = {}, window.device = t, n = window.document.documentElement, u = window.navigator.userAgent.toLowerCase(), t.ios = function() {
        return t.iphone() || t.ipod() || t.ipad()
    }, t.iphone = function() {
        return !t.windows() && r("iphone")
    }, t.ipod = function() {
        return r("ipod")
    }, t.ipad = function() {
        return r("ipad")
    }, t.android = function() {
        return !t.windows() && r("android")
    }, t.androidPhone = function() {
        return t.android() && r("mobile")
    }, t.androidTablet = function() {
        return t.android() && !r("mobile")
    }, t.blackberry = function() {
        return r("blackberry") || r("bb10") || r("rim")
    }, t.blackberryPhone = function() {
        return t.blackberry() && !r("tablet")
    }, t.blackberryTablet = function() {
        return t.blackberry() && r("tablet")
    }, t.windows = function() {
        return r("windows")
    }, t.windowsPhone = function() {
        return t.windows() && r("phone")
    }, t.windowsTablet = function() {
        return t.windows() && r("touch") && !t.windowsPhone()
    }, t.fxos = function() {
        return (r("(mobile;") || r("(tablet;")) && r("; rv:")
    }, t.fxosPhone = function() {
        return t.fxos() && r("mobile")
    }, t.fxosTablet = function() {
        return t.fxos() && r("tablet")
    }, t.meego = function() {
        return r("meego")
    }, t.cordova = function() {
        return window.cordova && "file:" === location.protocol
    }, t.nodeWebkit = function() {
        return "object" == typeof window.process
    }, t.mobile = function() {
        return t.androidPhone() || t.iphone() || t.ipod() || t.windowsPhone() || t.blackberryPhone() || t.fxosPhone() || t.meego()
    }, t.tablet = function() {
        return t.ipad() || t.androidTablet() || t.blackberryTablet() || t.windowsTablet() || t.fxosTablet()
    }, t.desktop = function() {
        return !t.tablet() && !t.mobile()
    }, t.television = function() {
        var t;
        for (television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"], t = 0; t < television.length;) {
            if (r(television[t])) return !0;
            t++
        }
        return !1
    }, t.portrait = function() {
        return window.innerHeight / window.innerWidth > 1
    }, t.landscape = function() {
        return window.innerHeight / window.innerWidth < 1
    }, t.noConflict = function() {
        return window.device = e, this
    }, r = function(t) {
        return -1 !== u.indexOf(t)
    }, o = function(t) {
        var e;
        return e = new RegExp(t, "i"), n.className.match(e)
    }, i = function(t) {
        var e = null;
        o(t) || (e = n.className.replace(/^\s+|\s+$/g, ""), n.className = e + " " + t)
    }, l = function(t) {
        o(t) && (n.className = n.className.replace(" " + t, ""))
    }, t.ios() ? t.ipad() ? i("ios ipad tablet") : t.iphone() ? i("ios iphone mobile") : t.ipod() && i("ios ipod mobile") : t.android() ? i(t.androidTablet() ? "android tablet" : "android mobile") : t.blackberry() ? i(t.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : t.windows() ? i(t.windowsTablet() ? "windows tablet" : t.windowsPhone() ? "windows mobile" : "desktop") : t.fxos() ? i(t.fxosTablet() ? "fxos tablet" : "fxos mobile") : t.meego() ? i("meego mobile") : t.nodeWebkit() ? i("node-webkit") : t.television() ? i("television") : t.desktop() && i("desktop"), t.cordova() && i("cordova"), s = function() {
        t.landscape() ? (l("portrait"), i("landscape")) : (l("landscape"), i("portrait"))
    }, a = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(a, s, !1) : window.attachEvent ? window.attachEvent(a, s) : window[a] = s, s(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define("libs/device", [], function() {
        return t
    }) : "undefined" != typeof module && module.exports ? module.exports = t : window.device = t
}).call(this), define("config", ["modernizr", "libs/device"], function(t, e) {
        var i = {
            SITE_URL: "http://",
            APP_URL: "https://apps.facebook.com/",
            CDN: "./assets",
            ENV: "live",
            SOUND_MUTED: !1,
            REEL_VIMEO_ID: "326303343",
            REEL_VIMEO_URL: "https://player.vimeo.com/external/326303343.hd.mp4?s=8ce10428144cb0e65bea7a275f7765eb76d2e38e&profile_id=175",
            OLD_DESKTOP: !t.csstransforms,
            MOBILE: e.mobile(),
            TABLET: e.tablet(),
            IOS: e.ios(),
            ANDROID: e.android(),
            MIN_WIDTH: 950,
            MIN_HEIGHT: 500,
            SCALE: {
                BASE_FONTSIZE: 10,
                MIN_FONTSIZE: 6,
                LARGE_FONTSIZE: 10,
                MAX_FONTSIZE: 12,
                BASE_COLUMNS: 12,
                PROJECT_COLUMNS: 8,
                BASE_WIDTH: 1536,
                LARGE_WIDTH: 2048,
                MAX_WIDTH: 2560
            },
            HI_DPI: window.devicePixelRatio > 1,
            PIXEL_RATIO: window.devicePixelRatio,
            FONT_WEIGHTS: ["Fort-Extralight", "Fort-Light", "Fort-Book", "Fort-Medium", "Fort-Bold"],
            IS_OPERA: !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
            IS_FIREFOX: "undefined" != typeof InstallTrigger,
            IS_SAFARI: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            IS_DESKTOP_SAFARI: Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0 && !e.tablet(),
            IS_CHROME: !!window.chrome && !this.IS_OPERA,
            IS_IE: !!document.documentMode,
            IS_EDGE: navigator.userAgent.indexOf(" Edge/") >= 0,
            getIOSVersion: function() {
                var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)][0]
            },
            BRIGHTNESS_EFFECT: !1,
            TEXT_EFFECT: !0,
            FLOWS: {
                BASIC: "BASIC",
                EXTENDED: "EXTENDED",
                MOBILE: "MOBILE",
                MOBILE_BASIC: "MOBILE_BASIC",
                TABLET: "TABLET"
            },
            FLOW: "none",
            FLASH_VESRION: "11.0.0",
            FLASH: null,
            FLASH_BYPASS: window.location.href.match(/bypass/),
            FACEBOOK_APP_IDS: {
                live: "",
                staging: "",
                dev: "",
                local: "205547496221381"
            },
            GET_INTERACTIVE_FLOW: function() {
                return this.MOBILE ? this.IS_IPHONE_5() ? this.FLOWS.MOBILE_BASIC : this.FLOWS.MOBILE : this.IS_SAFARI ? this.FLOWS.BASIC : this.FLOWS.EXTENDED
            },
            IS_IPHONE_5: function() {
                if (this.IOS && this.MOBILE) {
                    var t = window.innerWidth,
                        e = window.innerHeight;
                    return e < t && (t = e), t < 375
                }
                return !1
            },
            getFBID: function() {
                return this.FACEBOOK_APP_IDS[this.ENV]
            },
            SUBSCRIBE_API_URL: {
                live: "https://api.hsforms.com/submissions/v3/integration/submit/5452172/c258161e-3f7e-4726-910d-8031cb8a4895",
                staging: "https://api.hsforms.com/submissions/v3/integration/submit/5452172/c258161e-3f7e-4726-910d-8031cb8a4895",
                dev: "",
                local: "https://api.hsforms.com/submissions/v3/integration/submit/5452172/c258161e-3f7e-4726-910d-8031cb8a4895"
            },
            getSubscribeAPI: function() {
                return this.SUBSCRIBE_API_URL[this.ENV]
            }
        };
        return i.BASE_URL = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1), i
    }), define("events/app_events", [], function() {
        return {
            Scale: {
                Change: "events:scale:change"
            },
            Video: {
                Play: "events:video:play",
                Pause: "events:video:pause",
                Ended: "events:video:ended",
                Resume: "events:video:resume",
                Buffering: "events:video:buffering",
                Ready: "events:video:ready",
                Complete: "events:video:complete",
                CanPlay: "events:video:canplay"
            },
            Audio: {
                Ready: "events:audio:ready",
                RequestMute: "events:audio:requestmute",
                RequestUnmute: "events:audio:requestunmute",
                RequestPause: "events:audio:requestpause",
                RequestResume: "events:audio:requestresume",
                Mute: "events:audio:mute",
                Unmute: "events:audio:unmute",
                Pause: "events:audio:pause",
                Resume: "events:audio:resume",
                Play: "events:audio:play",
                Stop: "events:audio:stop",
                MuteAmbinet: "events:audio:muteambient",
                UnMuteAmbinet: "events:audio:unmuteambient",
                RegisterAudioSource: "events:audio:registeraudiosource",
                DestroyAudioSource: "events:audio:destroyaudiosource"
            },
            Menu: {
                Active: "menu:active",
                ItemClick: "menu:itemclick",
                Over: "MENU:OVER",
                Out: "MENU:OUT"
            },
            Project: {
                Active: "project:active",
                Scroll: "project:scroll",
                Update: "project:update"
            },
            Work: {
                PreUpdate: "work:preupdate"
            },
            Shell: {
                CloseProject: "shell:closeproject",
                OverItem: "SHELL:OVER:ITEM",
                OutItem: "SHELL:OUT:ITEM",
                Show: "SHELL:SHOW",
                ShowButton: "SHELL:SHOWBUTTON",
                ShowClose: "SHELL:SHOWCLOSE",
                OverMenu: "SHELL:OVER:MENU",
                OutMenu: "SHELL:OUT:MENU",
                OverAudio: "SHELL:OVER:AUDIO",
                OutAudio: "SHELL:OUT:AUDIO"
            },
            Gem: {
                ShowText: "gem:showtext"
            },
            Loader: {
                PreLoad: "LOADER:PRE",
                PostLoad: "LOADER:POST",
                Complete: "LOADER:COMPLETE",
                Hidden: "LOADER:HIDDEN",
                PreHidden: "LOADER:PREHIDDEN",
                AnimateBarOut: "loader:animatebarout"
            },
            Interactives: {
                Show: "INTERACTIVES:SHOW",
                Hide: "INTERACTIVES:HIDE"
            },
            Resize: {
                Attached: "resize:attached",
                Detached: "resize:detached",
                TriggerSound: "resize:triggersound",
                UpdateSound: "resize:updatesound",
                KillSound: "resize:killsound"
            },
            Link: {
                Click: "link:click"
            }
        }
    }),
    function() {
        function t(t) {
            function e(e, i, n, r, s, o) {
                for (; s >= 0 && s < o; s += t) {
                    var a = r ? r[s] : s;
                    n = i(n, e[a], a, e)
                }
                return n
            }
            return function(i, n, r, s) {
                n = y(n, s, 4);
                var o = !k(i) && v.keys(i),
                    a = (o || i).length,
                    l = t > 0 ? 0 : a - 1;
                return arguments.length < 3 && (r = i[o ? o[l] : l], l += t), e(i, n, r, o, l, a)
            }
        }

        function e(t) {
            return function(e, i, n) {
                i = x(i, n);
                for (var r = P(e), s = t > 0 ? 0 : r - 1; s >= 0 && s < r; s += t)
                    if (i(e[s], s, e)) return s;
                return -1
            }
        }

        function i(t, e, i) {
            return function(n, r, s) {
                var o = 0,
                    a = P(n);
                if ("number" == typeof s) t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;
                else if (i && s && a) return s = i(n, r), n[s] === r ? s : -1;
                if (r !== r) return s = e(h.call(n, o, a), v.isNaN), s >= 0 ? s + o : -1;
                for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t)
                    if (n[s] === r) return s;
                return -1
            }
        }

        function n(t, e) {
            var i = R.length,
                n = t.constructor,
                r = v.isFunction(n) && n.prototype || a,
                s = "constructor";
            for (v.has(t, s) && !v.contains(e, s) && e.push(s); i--;)(s = R[i]) in t && t[s] !== r[s] && !v.contains(e, s) && e.push(s)
        }
        var r = this,
            s = r._,
            o = Array.prototype,
            a = Object.prototype,
            l = Function.prototype,
            u = o.push,
            h = o.slice,
            c = a.toString,
            f = a.hasOwnProperty,
            p = Array.isArray,
            d = Object.keys,
            m = l.bind,
            g = Object.create,
            _ = function() {},
            v = function(t) {
                return t instanceof v ? t : this instanceof v ? void(this._wrapped = t) : new v(t)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = v), exports._ = v) : r._ = v, v.VERSION = "1.8.3";
        var y = function(t, e, i) {
                if (void 0 === e) return t;
                switch (null == i ? 3 : i) {
                    case 1:
                        return function(i) {
                            return t.call(e, i)
                        };
                    case 2:
                        return function(i, n) {
                            return t.call(e, i, n)
                        };
                    case 3:
                        return function(i, n, r) {
                            return t.call(e, i, n, r)
                        };
                    case 4:
                        return function(i, n, r, s) {
                            return t.call(e, i, n, r, s)
                        }
                }
                return function() {
                    return t.apply(e, arguments)
                }
            },
            x = function(t, e, i) {
                return null == t ? v.identity : v.isFunction(t) ? y(t, e, i) : v.isObject(t) ? v.matcher(t) : v.property(t)
            };
        v.iteratee = function(t, e) {
            return x(t, e, 1 / 0)
        };
        var b = function(t, e) {
                return function(i) {
                    var n = arguments.length;
                    if (n < 2 || null == i) return i;
                    for (var r = 1; r < n; r++)
                        for (var s = arguments[r], o = t(s), a = o.length, l = 0; l < a; l++) {
                            var u = o[l];
                            e && void 0 !== i[u] || (i[u] = s[u])
                        }
                    return i
                }
            },
            w = function(t) {
                if (!v.isObject(t)) return {};
                if (g) return g(t);
                _.prototype = t;
                var e = new _;
                return _.prototype = null, e
            },
            T = function(t) {
                return function(e) {
                    return null == e ? void 0 : e[t]
                }
            },
            S = Math.pow(2, 53) - 1,
            P = T("length"),
            k = function(t) {
                var e = P(t);
                return "number" == typeof e && e >= 0 && e <= S
            };
        v.each = v.forEach = function(t, e, i) {
            e = y(e, i);
            var n, r;
            if (k(t))
                for (n = 0, r = t.length; n < r; n++) e(t[n], n, t);
            else {
                var s = v.keys(t);
                for (n = 0, r = s.length; n < r; n++) e(t[s[n]], s[n], t)
            }
            return t
        }, v.map = v.collect = function(t, e, i) {
            e = x(e, i);
            for (var n = !k(t) && v.keys(t), r = (n || t).length, s = Array(r), o = 0; o < r; o++) {
                var a = n ? n[o] : o;
                s[o] = e(t[a], a, t)
            }
            return s
        }, v.reduce = v.foldl = v.inject = t(1), v.reduceRight = v.foldr = t(-1), v.find = v.detect = function(t, e, i) {
            var n;
            if (void 0 !== (n = k(t) ? v.findIndex(t, e, i) : v.findKey(t, e, i)) && -1 !== n) return t[n]
        }, v.filter = v.select = function(t, e, i) {
            var n = [];
            return e = x(e, i), v.each(t, function(t, i, r) {
                e(t, i, r) && n.push(t)
            }), n
        }, v.reject = function(t, e, i) {
            return v.filter(t, v.negate(x(e)), i)
        }, v.every = v.all = function(t, e, i) {
            e = x(e, i);
            for (var n = !k(t) && v.keys(t), r = (n || t).length, s = 0; s < r; s++) {
                var o = n ? n[s] : s;
                if (!e(t[o], o, t)) return !1
            }
            return !0
        }, v.some = v.any = function(t, e, i) {
            e = x(e, i);
            for (var n = !k(t) && v.keys(t), r = (n || t).length, s = 0; s < r; s++) {
                var o = n ? n[s] : s;
                if (e(t[o], o, t)) return !0
            }
            return !1
        }, v.contains = v.includes = v.include = function(t, e, i, n) {
            return k(t) || (t = v.values(t)), ("number" != typeof i || n) && (i = 0), v.indexOf(t, e, i) >= 0
        }, v.invoke = function(t, e) {
            var i = h.call(arguments, 2),
                n = v.isFunction(e);
            return v.map(t, function(t) {
                var r = n ? e : t[e];
                return null == r ? r : r.apply(t, i)
            })
        }, v.pluck = function(t, e) {
            return v.map(t, v.property(e))
        }, v.where = function(t, e) {
            return v.filter(t, v.matcher(e))
        }, v.findWhere = function(t, e) {
            return v.find(t, v.matcher(e))
        }, v.max = function(t, e, i) {
            var n, r, s = -1 / 0,
                o = -1 / 0;
            if (null == e && null != t) {
                t = k(t) ? t : v.values(t);
                for (var a = 0, l = t.length; a < l; a++)(n = t[a]) > s && (s = n)
            } else e = x(e, i), v.each(t, function(t, i, n) {
                ((r = e(t, i, n)) > o || r === -1 / 0 && s === -1 / 0) && (s = t, o = r)
            });
            return s
        }, v.min = function(t, e, i) {
            var n, r, s = 1 / 0,
                o = 1 / 0;
            if (null == e && null != t) {
                t = k(t) ? t : v.values(t);
                for (var a = 0, l = t.length; a < l; a++)(n = t[a]) < s && (s = n)
            } else e = x(e, i), v.each(t, function(t, i, n) {
                ((r = e(t, i, n)) < o || r === 1 / 0 && s === 1 / 0) && (s = t, o = r)
            });
            return s
        }, v.shuffle = function(t) {
            for (var e, i = k(t) ? t : v.values(t), n = i.length, r = Array(n), s = 0; s < n; s++) e = v.random(0, s), e !== s && (r[s] = r[e]), r[e] = i[s];
            return r
        }, v.sample = function(t, e, i) {
            return null == e || i ? (k(t) || (t = v.values(t)), t[v.random(t.length - 1)]) : v.shuffle(t).slice(0, Math.max(0, e))
        }, v.sortBy = function(t, e, i) {
            return e = x(e, i), v.pluck(v.map(t, function(t, i, n) {
                return {
                    value: t,
                    index: i,
                    criteria: e(t, i, n)
                }
            }).sort(function(t, e) {
                var i = t.criteria,
                    n = e.criteria;
                if (i !== n) {
                    if (i > n || void 0 === i) return 1;
                    if (i < n || void 0 === n) return -1
                }
                return t.index - e.index
            }), "value")
        };
        var C = function(t) {
            return function(e, i, n) {
                var r = {};
                return i = x(i, n), v.each(e, function(n, s) {
                    var o = i(n, s, e);
                    t(r, n, o)
                }), r
            }
        };
        v.groupBy = C(function(t, e, i) {
            v.has(t, i) ? t[i].push(e) : t[i] = [e]
        }), v.indexBy = C(function(t, e, i) {
            t[i] = e
        }), v.countBy = C(function(t, e, i) {
            v.has(t, i) ? t[i]++ : t[i] = 1
        }), v.toArray = function(t) {
            return t ? v.isArray(t) ? h.call(t) : k(t) ? v.map(t, v.identity) : v.values(t) : []
        }, v.size = function(t) {
            return null == t ? 0 : k(t) ? t.length : v.keys(t).length
        }, v.partition = function(t, e, i) {
            e = x(e, i);
            var n = [],
                r = [];
            return v.each(t, function(t, i, s) {
                (e(t, i, s) ? n : r).push(t)
            }), [n, r]
        }, v.first = v.head = v.take = function(t, e, i) {
            if (null != t) return null == e || i ? t[0] : v.initial(t, t.length - e)
        }, v.initial = function(t, e, i) {
            return h.call(t, 0, Math.max(0, t.length - (null == e || i ? 1 : e)))
        }, v.last = function(t, e, i) {
            if (null != t) return null == e || i ? t[t.length - 1] : v.rest(t, Math.max(0, t.length - e))
        }, v.rest = v.tail = v.drop = function(t, e, i) {
            return h.call(t, null == e || i ? 1 : e)
        }, v.compact = function(t) {
            return v.filter(t, v.identity)
        };
        var O = function(t, e, i, n) {
            for (var r = [], s = 0, o = n || 0, a = P(t); o < a; o++) {
                var l = t[o];
                if (k(l) && (v.isArray(l) || v.isArguments(l))) {
                    e || (l = O(l, e, i));
                    var u = 0,
                        h = l.length;
                    for (r.length += h; u < h;) r[s++] = l[u++]
                } else i || (r[s++] = l)
            }
            return r
        };
        v.flatten = function(t, e) {
            return O(t, e, !1)
        }, v.without = function(t) {
            return v.difference(t, h.call(arguments, 1))
        }, v.uniq = v.unique = function(t, e, i, n) {
            v.isBoolean(e) || (n = i, i = e, e = !1), null != i && (i = x(i, n));
            for (var r = [], s = [], o = 0, a = P(t); o < a; o++) {
                var l = t[o],
                    u = i ? i(l, o, t) : l;
                e ? (o && s === u || r.push(l), s = u) : i ? v.contains(s, u) || (s.push(u), r.push(l)) : v.contains(r, l) || r.push(l)
            }
            return r
        }, v.union = function() {
            return v.uniq(O(arguments, !0, !0))
        }, v.intersection = function(t) {
            for (var e = [], i = arguments.length, n = 0, r = P(t); n < r; n++) {
                var s = t[n];
                if (!v.contains(e, s)) {
                    for (var o = 1; o < i && v.contains(arguments[o], s); o++);
                    o === i && e.push(s)
                }
            }
            return e
        }, v.difference = function(t) {
            var e = O(arguments, !0, !0, 1);
            return v.filter(t, function(t) {
                return !v.contains(e, t)
            })
        }, v.zip = function() {
            return v.unzip(arguments)
        }, v.unzip = function(t) {
            for (var e = t && v.max(t, P).length || 0, i = Array(e), n = 0; n < e; n++) i[n] = v.pluck(t, n);
            return i
        }, v.object = function(t, e) {
            for (var i = {}, n = 0, r = P(t); n < r; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
            return i
        }, v.findIndex = e(1), v.findLastIndex = e(-1), v.sortedIndex = function(t, e, i, n) {
            i = x(i, n, 1);
            for (var r = i(e), s = 0, o = P(t); s < o;) {
                var a = Math.floor((s + o) / 2);
                i(t[a]) < r ? s = a + 1 : o = a
            }
            return s
        }, v.indexOf = i(1, v.findIndex, v.sortedIndex), v.lastIndexOf = i(-1, v.findLastIndex), v.range = function(t, e, i) {
            null == e && (e = t || 0, t = 0), i = i || 1;
            for (var n = Math.max(Math.ceil((e - t) / i), 0), r = Array(n), s = 0; s < n; s++, t += i) r[s] = t;
            return r
        };
        var A = function(t, e, i, n, r) {
            if (!(n instanceof e)) return t.apply(i, r);
            var s = w(t.prototype),
                o = t.apply(s, r);
            return v.isObject(o) ? o : s
        };
        v.bind = function(t, e) {
            if (m && t.bind === m) return m.apply(t, h.call(arguments, 1));
            if (!v.isFunction(t)) throw new TypeError("Bind must be called on a function");
            var i = h.call(arguments, 2),
                n = function() {
                    return A(t, n, e, this, i.concat(h.call(arguments)))
                };
            return n
        }, v.partial = function(t) {
            var e = h.call(arguments, 1),
                i = function() {
                    for (var n = 0, r = e.length, s = Array(r), o = 0; o < r; o++) s[o] = e[o] === v ? arguments[n++] : e[o];
                    for (; n < arguments.length;) s.push(arguments[n++]);
                    return A(t, i, this, this, s)
                };
            return i
        }, v.bindAll = function(t) {
            var e, i, n = arguments.length;
            if (n <= 1) throw new Error("bindAll must be passed function names");
            for (e = 1; e < n; e++) i = arguments[e], t[i] = v.bind(t[i], t);
            return t
        }, v.memoize = function(t, e) {
            var i = function(n) {
                var r = i.cache,
                    s = "" + (e ? e.apply(this, arguments) : n);
                return v.has(r, s) || (r[s] = t.apply(this, arguments)), r[s]
            };
            return i.cache = {}, i
        }, v.delay = function(t, e) {
            var i = h.call(arguments, 2);
            return setTimeout(function() {
                return t.apply(null, i)
            }, e)
        }, v.defer = v.partial(v.delay, v, 1), v.throttle = function(t, e, i) {
            var n, r, s, o = null,
                a = 0;
            i || (i = {});
            var l = function() {
                a = !1 === i.leading ? 0 : v.now(), o = null, s = t.apply(n, r), o || (n = r = null)
            };
            return function() {
                var u = v.now();
                a || !1 !== i.leading || (a = u);
                var h = e - (u - a);
                return n = this, r = arguments, h <= 0 || h > e ? (o && (clearTimeout(o), o = null), a = u, s = t.apply(n, r), o || (n = r = null)) : o || !1 === i.trailing || (o = setTimeout(l, h)), s
            }
        }, v.debounce = function(t, e, i) {
            var n, r, s, o, a, l = function() {
                var u = v.now() - o;
                u < e && u >= 0 ? n = setTimeout(l, e - u) : (n = null, i || (a = t.apply(s, r), n || (s = r = null)))
            };
            return function() {
                s = this, r = arguments, o = v.now();
                var u = i && !n;
                return n || (n = setTimeout(l, e)), u && (a = t.apply(s, r), s = r = null), a
            }
        }, v.wrap = function(t, e) {
            return v.partial(e, t)
        }, v.negate = function(t) {
            return function() {
                return !t.apply(this, arguments)
            }
        }, v.compose = function() {
            var t = arguments,
                e = t.length - 1;
            return function() {
                for (var i = e, n = t[e].apply(this, arguments); i--;) n = t[i].call(this, n);
                return n
            }
        }, v.after = function(t, e) {
            return function() {
                if (--t < 1) return e.apply(this, arguments)
            }
        }, v.before = function(t, e) {
            var i;
            return function() {
                return --t > 0 && (i = e.apply(this, arguments)), t <= 1 && (e = null), i
            }
        }, v.once = v.partial(v.before, 2);
        var E = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            R = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
        v.keys = function(t) {
            if (!v.isObject(t)) return [];
            if (d) return d(t);
            var e = [];
            for (var i in t) v.has(t, i) && e.push(i);
            return E && n(t, e), e
        }, v.allKeys = function(t) {
            if (!v.isObject(t)) return [];
            var e = [];
            for (var i in t) e.push(i);
            return E && n(t, e), e
        }, v.values = function(t) {
            for (var e = v.keys(t), i = e.length, n = Array(i), r = 0; r < i; r++) n[r] = t[e[r]];
            return n
        }, v.mapObject = function(t, e, i) {
            e = x(e, i);
            for (var n, r = v.keys(t), s = r.length, o = {}, a = 0; a < s; a++) n = r[a], o[n] = e(t[n], n, t);
            return o
        }, v.pairs = function(t) {
            for (var e = v.keys(t), i = e.length, n = Array(i), r = 0; r < i; r++) n[r] = [e[r], t[e[r]]];
            return n
        }, v.invert = function(t) {
            for (var e = {}, i = v.keys(t), n = 0, r = i.length; n < r; n++) e[t[i[n]]] = i[n];
            return e
        }, v.functions = v.methods = function(t) {
            var e = [];
            for (var i in t) v.isFunction(t[i]) && e.push(i);
            return e.sort()
        }, v.extend = b(v.allKeys), v.extendOwn = v.assign = b(v.keys), v.findKey = function(t, e, i) {
            e = x(e, i);
            for (var n, r = v.keys(t), s = 0, o = r.length; s < o; s++)
                if (n = r[s], e(t[n], n, t)) return n
        }, v.pick = function(t, e, i) {
            var n, r, s = {},
                o = t;
            if (null == o) return s;
            v.isFunction(e) ? (r = v.allKeys(o), n = y(e, i)) : (r = O(arguments, !1, !1, 1), n = function(t, e, i) {
                return e in i
            }, o = Object(o));
            for (var a = 0, l = r.length; a < l; a++) {
                var u = r[a],
                    h = o[u];
                n(h, u, o) && (s[u] = h)
            }
            return s
        }, v.omit = function(t, e, i) {
            if (v.isFunction(e)) e = v.negate(e);
            else {
                var n = v.map(O(arguments, !1, !1, 1), String);
                e = function(t, e) {
                    return !v.contains(n, e)
                }
            }
            return v.pick(t, e, i)
        }, v.defaults = b(v.allKeys, !0), v.create = function(t, e) {
            var i = w(t);
            return e && v.extendOwn(i, e), i
        }, v.clone = function(t) {
            return v.isObject(t) ? v.isArray(t) ? t.slice() : v.extend({}, t) : t
        }, v.tap = function(t, e) {
            return e(t), t
        }, v.isMatch = function(t, e) {
            var i = v.keys(e),
                n = i.length;
            if (null == t) return !n;
            for (var r = Object(t), s = 0; s < n; s++) {
                var o = i[s];
                if (e[o] !== r[o] || !(o in r)) return !1
            }
            return !0
        };
        var D = function(t, e, i, n) {
            if (t === e) return 0 !== t || 1 / t == 1 / e;
            if (null == t || null == e) return t === e;
            t instanceof v && (t = t._wrapped), e instanceof v && (e = e._wrapped);
            var r = c.call(t);
            if (r !== c.call(e)) return !1;
            switch (r) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + t == "" + e;
                case "[object Number]":
                    return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;
                case "[object Date]":
                case "[object Boolean]":
                    return +t == +e
            }
            var s = "[object Array]" === r;
            if (!s) {
                if ("object" != typeof t || "object" != typeof e) return !1;
                var o = t.constructor,
                    a = e.constructor;
                if (o !== a && !(v.isFunction(o) && o instanceof o && v.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1
            }
            i = i || [], n = n || [];
            for (var l = i.length; l--;)
                if (i[l] === t) return n[l] === e;
            if (i.push(t), n.push(e), s) {
                if ((l = t.length) !== e.length) return !1;
                for (; l--;)
                    if (!D(t[l], e[l], i, n)) return !1
            } else {
                var u, h = v.keys(t);
                if (l = h.length, v.keys(e).length !== l) return !1;
                for (; l--;)
                    if (u = h[l], !v.has(e, u) || !D(t[u], e[u], i, n)) return !1
            }
            return i.pop(), n.pop(), !0
        };
        v.isEqual = function(t, e) {
            return D(t, e)
        }, v.isEmpty = function(t) {
            return null == t || (k(t) && (v.isArray(t) || v.isString(t) || v.isArguments(t)) ? 0 === t.length : 0 === v.keys(t).length)
        }, v.isElement = function(t) {
            return !(!t || 1 !== t.nodeType)
        }, v.isArray = p || function(t) {
            return "[object Array]" === c.call(t)
        }, v.isObject = function(t) {
            var e = typeof t;
            return "function" === e || "object" === e && !!t
        }, v.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
            v["is" + t] = function(e) {
                return c.call(e) === "[object " + t + "]"
            }
        }), v.isArguments(arguments) || (v.isArguments = function(t) {
            return v.has(t, "callee")
        }), "function" != typeof /./ && "object" != typeof Int8Array && (v.isFunction = function(t) {
            return "function" == typeof t || !1
        }), v.isFinite = function(t) {
            return isFinite(t) && !isNaN(parseFloat(t))
        }, v.isNaN = function(t) {
            return v.isNumber(t) && t !== +t
        }, v.isBoolean = function(t) {
            return !0 === t || !1 === t || "[object Boolean]" === c.call(t)
        }, v.isNull = function(t) {
            return null === t
        }, v.isUndefined = function(t) {
            return void 0 === t
        }, v.has = function(t, e) {
            return null != t && f.call(t, e)
        }, v.noConflict = function() {
            return r._ = s, this
        }, v.identity = function(t) {
            return t
        }, v.constant = function(t) {
            return function() {
                return t
            }
        }, v.noop = function() {}, v.property = T, v.propertyOf = function(t) {
            return null == t ? function() {} : function(e) {
                return t[e]
            }
        }, v.matcher = v.matches = function(t) {
            return t = v.extendOwn({}, t),
                function(e) {
                    return v.isMatch(e, t)
                }
        }, v.times = function(t, e, i) {
            var n = Array(Math.max(0, t));
            e = y(e, i, 1);
            for (var r = 0; r < t; r++) n[r] = e(r);
            return n
        }, v.random = function(t, e) {
            return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
        }, v.now = Date.now || function() {
            return (new Date).getTime()
        };
        var N = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            M = v.invert(N),
            j = function(t) {
                var e = function(e) {
                        return t[e]
                    },
                    i = "(?:" + v.keys(t).join("|") + ")",
                    n = RegExp(i),
                    r = RegExp(i, "g");
                return function(t) {
                    return t = null == t ? "" : "" + t, n.test(t) ? t.replace(r, e) : t
                }
            };
        v.escape = j(N), v.unescape = j(M), v.result = function(t, e, i) {
            var n = null == t ? void 0 : t[e];
            return void 0 === n && (n = i), v.isFunction(n) ? n.call(t) : n
        };
        var L = 0;
        v.uniqueId = function(t) {
            var e = ++L + "";
            return t ? t + e : e
        }, v.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var I = /(.)^/,
            F = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            B = /\\|'|\r|\n|\u2028|\u2029/g,
            H = function(t) {
                return "\\" + F[t]
            };
        v.template = function(t, e, i) {
            !e && i && (e = i), e = v.defaults({}, e, v.templateSettings);
            var n = RegExp([(e.escape || I).source, (e.interpolate || I).source, (e.evaluate || I).source].join("|") + "|$", "g"),
                r = 0,
                s = "__p+='";
            t.replace(n, function(e, i, n, o, a) {
                return s += t.slice(r, a).replace(B, H), r = a + e.length, i ? s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : n ? s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), e
            }), s += "';\n", e.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
            try {
                var o = new Function(e.variable || "obj", "_", s)
            } catch (t) {
                throw t.source = s, t
            }
            var a = function(t) {
                return o.call(this, t, v)
            };
            return a.source = "function(" + (e.variable || "obj") + "){\n" + s + "}", a
        }, v.chain = function(t) {
            var e = v(t);
            return e._chain = !0, e
        };
        var z = function(t, e) {
            return t._chain ? v(e).chain() : e
        };
        v.mixin = function(t) {
            v.each(v.functions(t), function(e) {
                var i = v[e] = t[e];
                v.prototype[e] = function() {
                    var t = [this._wrapped];
                    return u.apply(t, arguments), z(this, i.apply(v, t))
                }
            })
        }, v.mixin(v), v.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
            var e = o[t];
            v.prototype[t] = function() {
                var i = this._wrapped;
                return e.apply(i, arguments), "shift" !== t && "splice" !== t || 0 !== i.length || delete i[0], z(this, i)
            }
        }), v.each(["concat", "join", "slice"], function(t) {
            var e = o[t];
            v.prototype[t] = function() {
                return z(this, e.apply(this._wrapped, arguments))
            }
        }), v.prototype.value = function() {
            return this._wrapped
        }, v.prototype.valueOf = v.prototype.toJSON = v.prototype.value, v.prototype.toString = function() {
            return "" + this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return v
        })
    }.call(this),
    function(t, e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(t, e) {
        function i(t) {
            var e = "length" in t && t.length,
                i = J.type(t);
            return "function" !== i && !J.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
        }

        function n(t, e, i) {
            if (J.isFunction(e)) return J.grep(t, function(t, n) {
                return !!e.call(t, n, t) !== i
            });
            if (e.nodeType) return J.grep(t, function(t) {
                return t === e !== i
            });
            if ("string" == typeof e) {
                if (ot.test(e)) return J.filter(e, t, i);
                e = J.filter(e, t)
            }
            return J.grep(t, function(t) {
                return U.call(e, t) >= 0 !== i
            })
        }

        function r(t, e) {
            for (;
                (t = t[e]) && 1 !== t.nodeType;);
            return t
        }

        function s(t) {
            var e = ft[t] = {};
            return J.each(t.match(ct) || [], function(t, i) {
                e[i] = !0
            }), e
        }

        function o() {
            Q.removeEventListener("DOMContentLoaded", o, !1), t.removeEventListener("load", o, !1), J.ready()
        }

        function a() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            }), this.expando = J.expando + a.uid++
        }

        function l(t, e, i) {
            var n;
            if (void 0 === i && 1 === t.nodeType)
                if (n = "data-" + e.replace(vt, "-$1").toLowerCase(), "string" == typeof(i = t.getAttribute(n))) {
                    try {
                        i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : _t.test(i) ? J.parseJSON(i) : i)
                    } catch (t) {}
                    gt.set(t, e, i)
                } else i = void 0;
            return i
        }

        function u() {
            return !0
        }

        function h() {
            return !1
        }

        function c() {
            try {
                return Q.activeElement
            } catch (t) {}
        }

        function f(t, e) {
            return J.nodeName(t, "table") && J.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function p(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function d(t) {
            var e = Nt.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function m(t, e) {
            for (var i = 0, n = t.length; i < n; i++) mt.set(t[i], "globalEval", !e || mt.get(e[i], "globalEval"))
        }

        function g(t, e) {
            var i, n, r, s, o, a, l, u;
            if (1 === e.nodeType) {
                if (mt.hasData(t) && (s = mt.access(t), o = mt.set(e, s), u = s.events)) {
                    delete o.handle, o.events = {};
                    for (r in u)
                        for (i = 0, n = u[r].length; i < n; i++) J.event.add(e, r, u[r][i])
                }
                gt.hasData(t) && (a = gt.access(t), l = J.extend({}, a), gt.set(e, l))
            }
        }

        function _(t, e) {
            var i = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
            return void 0 === e || e && J.nodeName(t, e) ? J.merge([t], i) : i
        }

        function v(t, e) {
            var i = e.nodeName.toLowerCase();
            "input" === i && wt.test(t.type) ? e.checked = t.checked : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
        }

        function y(e, i) {
            var n, r = J(i.createElement(e)).appendTo(i.body),
                s = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(r[0])) ? n.display : J.css(r[0], "display");
            return r.detach(), s
        }

        function x(t) {
            var e = Q,
                i = It[t];
            return i || (i = y(t, e), "none" !== i && i || (Lt = (Lt || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = Lt[0].contentDocument, e.write(), e.close(), i = y(t, e), Lt.detach()), It[t] = i), i
        }

        function b(t, e, i) {
            var n, r, s, o, a = t.style;
            return i = i || Ht(t), i && (o = i.getPropertyValue(e) || i[e]), i && ("" !== o || J.contains(t.ownerDocument, t) || (o = J.style(t, e)), Bt.test(o) && Ft.test(e) && (n = a.width, r = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = o, o = i.width, a.width = n, a.minWidth = r, a.maxWidth = s)), void 0 !== o ? o + "" : o
        }

        function w(t, e) {
            return {
                get: function() {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function T(t, e) {
            if (e in t) return e;
            for (var i = e[0].toUpperCase() + e.slice(1), n = e, r = Ut.length; r--;)
                if ((e = Ut[r] + i) in t) return e;
            return n
        }

        function S(t, e, i) {
            var n = qt.exec(e);
            return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
        }

        function P(t, e, i, n, r) {
            for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; s < 4; s += 2) "margin" === i && (o += J.css(t, i + xt[s], !0, r)), n ? ("content" === i && (o -= J.css(t, "padding" + xt[s], !0, r)), "margin" !== i && (o -= J.css(t, "border" + xt[s] + "Width", !0, r))) : (o += J.css(t, "padding" + xt[s], !0, r), "padding" !== i && (o += J.css(t, "border" + xt[s] + "Width", !0, r)));
            return o
        }

        function k(t, e, i) {
            var n = !0,
                r = "width" === e ? t.offsetWidth : t.offsetHeight,
                s = Ht(t),
                o = "border-box" === J.css(t, "boxSizing", !1, s);
            if (r <= 0 || null == r) {
                if (r = b(t, e, s), (r < 0 || null == r) && (r = t.style[e]), Bt.test(r)) return r;
                n = o && (Z.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
            }
            return r + P(t, e, i || (o ? "border" : "content"), n, s) + "px"
        }

        function C(t, e) {
            for (var i, n, r, s = [], o = 0, a = t.length; o < a; o++) n = t[o], n.style && (s[o] = mt.get(n, "olddisplay"), i = n.style.display, e ? (s[o] || "none" !== i || (n.style.display = ""), "" === n.style.display && bt(n) && (s[o] = mt.access(n, "olddisplay", x(n.nodeName)))) : (r = bt(n), "none" === i && r || mt.set(n, "olddisplay", r ? i : J.css(n, "display"))));
            for (o = 0; o < a; o++) n = t[o], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? s[o] || "" : "none"));
            return t
        }

        function O(t, e, i, n, r) {
            return new O.prototype.init(t, e, i, n, r)
        }

        function A() {
            return setTimeout(function() {
                Yt = void 0
            }), Yt = J.now()
        }

        function E(t, e) {
            var i, n = 0,
                r = {
                    height: t
                };
            for (e = e ? 1 : 0; n < 4; n += 2 - e) i = xt[n], r["margin" + i] = r["padding" + i] = t;
            return e && (r.opacity = r.width = t), r
        }

        function R(t, e, i) {
            for (var n, r = (Kt[e] || []).concat(Kt["*"]), s = 0, o = r.length; s < o; s++)
                if (n = r[s].call(i, e, t)) return n
        }

        function D(t, e, i) {
            var n, r, s, o, a, l, u, h = this,
                c = {},
                f = t.style,
                p = t.nodeType && bt(t),
                d = mt.get(t, "fxshow");
            i.queue || (a = J._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                a.unqueued || l()
            }), a.unqueued++, h.always(function() {
                h.always(function() {
                    a.unqueued--, J.queue(t, "fx").length || a.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [f.overflow, f.overflowX, f.overflowY], u = J.css(t, "display"), "inline" === ("none" === u ? mt.get(t, "olddisplay") || x(t.nodeName) : u) && "none" === J.css(t, "float") && (f.display = "inline-block")), i.overflow && (f.overflow = "hidden", h.always(function() {
                f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
            }));
            for (n in e)
                if (r = e[n], Gt.exec(r)) {
                    if (delete e[n], s = s || "toggle" === r, r === (p ? "hide" : "show")) {
                        if ("show" !== r || !d || void 0 === d[n]) continue;
                        p = !0
                    }
                    c[n] = d && d[n] || J.style(t, n)
                } else u = void 0;
            if (J.isEmptyObject(c)) "inline" === ("none" === u ? x(t.nodeName) : u) && (f.display = u);
            else {
                d ? "hidden" in d && (p = d.hidden) : d = mt.access(t, "fxshow", {}), s && (d.hidden = !p), p ? J(t).show() : h.done(function() {
                    J(t).hide()
                }), h.done(function() {
                    var e;
                    mt.remove(t, "fxshow");
                    for (e in c) J.style(t, e, c[e])
                });
                for (n in c) o = R(p ? d[n] : 0, n, h), n in d || (d[n] = o.start, p && (o.end = o.start, o.start = "width" === n || "height" === n ? 1 : 0))
            }
        }

        function N(t, e) {
            var i, n, r, s, o;
            for (i in t)
                if (n = J.camelCase(i), r = e[n], s = t[i], J.isArray(s) && (r = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), (o = J.cssHooks[n]) && "expand" in o) {
                    s = o.expand(s), delete t[n];
                    for (i in s) i in t || (t[i] = s[i], e[i] = r)
                } else e[n] = r
        }

        function M(t, e, i) {
            var n, r, s = 0,
                o = Jt.length,
                a = J.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (r) return !1;
                    for (var e = Yt || A(), i = Math.max(0, u.startTime + u.duration - e), n = i / u.duration || 0, s = 1 - n, o = 0, l = u.tweens.length; o < l; o++) u.tweens[o].run(s);
                    return a.notifyWith(t, [u, s, i]), s < 1 && l ? i : (a.resolveWith(t, [u]), !1)
                },
                u = a.promise({
                    elem: t,
                    props: J.extend({}, e),
                    opts: J.extend(!0, {
                        specialEasing: {}
                    }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: Yt || A(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(e, i) {
                        var n = J.Tween(t, u.opts, e, i, u.opts.specialEasing[e] || u.opts.easing);
                        return u.tweens.push(n), n
                    },
                    stop: function(e) {
                        var i = 0,
                            n = e ? u.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; i < n; i++) u.tweens[i].run(1);
                        return e ? a.resolveWith(t, [u, e]) : a.rejectWith(t, [u, e]), this
                    }
                }),
                h = u.props;
            for (N(h, u.opts.specialEasing); s < o; s++)
                if (n = Jt[s].call(u, t, h, u.opts)) return n;
            return J.map(h, R, u), J.isFunction(u.opts.start) && u.opts.start.call(t, u), J.fx.timer(J.extend(l, {
                elem: t,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function j(t) {
            return function(e, i) {
                "string" != typeof e && (i = e, e = "*");
                var n, r = 0,
                    s = e.toLowerCase().match(ct) || [];
                if (J.isFunction(i))
                    for (; n = s[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
            }
        }

        function L(t, e, i, n) {
            function r(a) {
                var l;
                return s[a] = !0, J.each(t[a] || [], function(t, a) {
                    var u = a(e, i, n);
                    return "string" != typeof u || o || s[u] ? o ? !(l = u) : void 0 : (e.dataTypes.unshift(u), r(u), !1)
                }), l
            }
            var s = {},
                o = t === me;
            return r(e.dataTypes[0]) || !s["*"] && r("*")
        }

        function I(t, e) {
            var i, n, r = J.ajaxSettings.flatOptions || {};
            for (i in e) void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
            return n && J.extend(!0, t, n), t
        }

        function F(t, e, i) {
            for (var n, r, s, o, a = t.contents, l = t.dataTypes;
                "*" === l[0];) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
            if (n)
                for (r in a)
                    if (a[r] && a[r].test(n)) {
                        l.unshift(r);
                        break
                    }
            if (l[0] in i) s = l[0];
            else {
                for (r in i) {
                    if (!l[0] || t.converters[r + " " + l[0]]) {
                        s = r;
                        break
                    }
                    o || (o = r)
                }
                s = s || o
            }
            if (s) return s !== l[0] && l.unshift(s), i[s]
        }

        function B(t, e, i, n) {
            var r, s, o, a, l, u = {},
                h = t.dataTypes.slice();
            if (h[1])
                for (o in t.converters) u[o.toLowerCase()] = t.converters[o];
            for (s = h.shift(); s;)
                if (t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = s, s = h.shift())
                    if ("*" === s) s = l;
                    else if ("*" !== l && l !== s) {
                if (!(o = u[l + " " + s] || u["* " + s]))
                    for (r in u)
                        if (a = r.split(" "), a[1] === s && (o = u[l + " " + a[0]] || u["* " + a[0]])) {
                            !0 === o ? o = u[r] : !0 !== u[r] && (s = a[0], h.unshift(a[1]));
                            break
                        }
                if (!0 !== o)
                    if (o && t.throws) e = o(e);
                    else try {
                        e = o(e)
                    } catch (t) {
                        return {
                            state: "parsererror",
                            error: o ? t : "No conversion from " + l + " to " + s
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }

        function H(t, e, i, n) {
            var r;
            if (J.isArray(e)) J.each(e, function(e, r) {
                i || xe.test(t) ? n(t, r) : H(t + "[" + ("object" == typeof r ? e : "") + "]", r, i, n)
            });
            else if (i || "object" !== J.type(e)) n(t, e);
            else
                for (r in e) H(t + "[" + r + "]", e[r], i, n)
        }

        function z(t) {
            return J.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
        }
        var q = [],
            X = q.slice,
            W = q.concat,
            $ = q.push,
            U = q.indexOf,
            Y = {},
            V = Y.toString,
            G = Y.hasOwnProperty,
            Z = {},
            Q = t.document,
            J = function(t, e) {
                return new J.fn.init(t, e)
            },
            K = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            tt = /^-ms-/,
            et = /-([\da-z])/gi,
            it = function(t, e) {
                return e.toUpperCase()
            };
        J.fn = J.prototype = {
            jquery: "2.1.4",
            constructor: J,
            selector: "",
            length: 0,
            toArray: function() {
                return X.call(this)
            },
            get: function(t) {
                return null != t ? t < 0 ? this[t + this.length] : this[t] : X.call(this)
            },
            pushStack: function(t) {
                var e = J.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            },
            each: function(t, e) {
                return J.each(this, t, e)
            },
            map: function(t) {
                return this.pushStack(J.map(this, function(e, i) {
                    return t.call(e, i, e)
                }))
            },
            slice: function() {
                return this.pushStack(X.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    i = +t + (t < 0 ? e : 0);
                return this.pushStack(i >= 0 && i < e ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: $,
            sort: q.sort,
            splice: q.splice
        }, J.extend = J.fn.extend = function() {
            var t, e, i, n, r, s, o = arguments[0] || {},
                a = 1,
                l = arguments.length,
                u = !1;
            for ("boolean" == typeof o && (u = o, o = arguments[a] || {}, a++), "object" == typeof o || J.isFunction(o) || (o = {}), a === l && (o = this, a--); a < l; a++)
                if (null != (t = arguments[a]))
                    for (e in t) i = o[e], n = t[e], o !== n && (u && n && (J.isPlainObject(n) || (r = J.isArray(n))) ? (r ? (r = !1, s = i && J.isArray(i) ? i : []) : s = i && J.isPlainObject(i) ? i : {}, o[e] = J.extend(u, s, n)) : void 0 !== n && (o[e] = n));
            return o
        }, J.extend({
            expando: "jQuery" + ("2.1.4" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isFunction: function(t) {
                return "function" === J.type(t)
            },
            isArray: Array.isArray,
            isWindow: function(t) {
                return null != t && t === t.window
            },
            isNumeric: function(t) {
                return !J.isArray(t) && t - parseFloat(t) + 1 >= 0
            },
            isPlainObject: function(t) {
                return "object" === J.type(t) && !t.nodeType && !J.isWindow(t) && !(t.constructor && !G.call(t.constructor.prototype, "isPrototypeOf"))
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Y[V.call(t)] || "object" : typeof t
            },
            globalEval: function(t) {
                var e, i = eval;
                (t = J.trim(t)) && (1 === t.indexOf("use strict") ? (e = Q.createElement("script"), e.text = t, Q.head.appendChild(e).parentNode.removeChild(e)) : i(t))
            },
            camelCase: function(t) {
                return t.replace(tt, "ms-").replace(et, it)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, e, n) {
                var r = 0,
                    s = t.length,
                    o = i(t);
                if (n) {
                    if (o)
                        for (; r < s && !1 !== e.apply(t[r], n); r++);
                    else
                        for (r in t)
                            if (!1 === e.apply(t[r], n)) break
                } else if (o)
                    for (; r < s && !1 !== e.call(t[r], r, t[r]); r++);
                else
                    for (r in t)
                        if (!1 === e.call(t[r], r, t[r])) break; return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(K, "")
            },
            makeArray: function(t, e) {
                var n = e || [];
                return null != t && (i(Object(t)) ? J.merge(n, "string" == typeof t ? [t] : t) : $.call(n, t)), n
            },
            inArray: function(t, e, i) {
                return null == e ? -1 : U.call(e, t, i)
            },
            merge: function(t, e) {
                for (var i = +e.length, n = 0, r = t.length; n < i; n++) t[r++] = e[n];
                return t.length = r, t
            },
            grep: function(t, e, i) {
                for (var n = [], r = 0, s = t.length, o = !i; r < s; r++) !e(t[r], r) !== o && n.push(t[r]);
                return n
            },
            map: function(t, e, n) {
                var r, s = 0,
                    o = t.length,
                    a = i(t),
                    l = [];
                if (a)
                    for (; s < o; s++) null != (r = e(t[s], s, n)) && l.push(r);
                else
                    for (s in t) null != (r = e(t[s], s, n)) && l.push(r);
                return W.apply([], l)
            },
            guid: 1,
            proxy: function(t, e) {
                var i, n, r;
                if ("string" == typeof e && (i = t[e], e = t, t = i), J.isFunction(t)) return n = X.call(arguments, 2), r = function() {
                    return t.apply(e || this, n.concat(X.call(arguments)))
                }, r.guid = t.guid = t.guid || J.guid++, r
            },
            now: Date.now,
            support: Z
        }), J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            Y["[object " + e + "]"] = e.toLowerCase()
        });
        var nt = function(t) {
            function e(t, e, i, n) {
                var r, s, o, a, u, c, f, p, d, m;
                if ((e ? e.ownerDocument || e : F) !== E && A(e), e = e || E, i = i || [], a = e.nodeType, "string" != typeof t || !t || 1 !== a && 9 !== a && 11 !== a) return i;
                if (!n && D) {
                    if (11 !== a && (r = gt.exec(t)))
                        if (o = r[1]) {
                            if (9 === a) {
                                if (!(s = e.getElementById(o)) || !s.parentNode) return i;
                                if (s.id === o) return i.push(s), i
                            } else if (e.ownerDocument && (s = e.ownerDocument.getElementById(o)) && L(e, s) && s.id === o) return i.push(s), i
                        } else {
                            if (r[2]) return Z.apply(i, e.getElementsByTagName(t)), i;
                            if ((o = r[3]) && y.getElementsByClassName) return Z.apply(i, e.getElementsByClassName(o)), i
                        }
                    if (y.qsa && (!N || !N.test(t))) {
                        if (p = f = I, d = e, m = 1 !== a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                            for (c = T(t), (f = e.getAttribute("id")) ? p = f.replace(vt, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", u = c.length; u--;) c[u] = p + h(c[u]);
                            d = _t.test(t) && l(e.parentNode) || e, m = c.join(",")
                        }
                        if (m) try {
                            return Z.apply(i, d.querySelectorAll(m)), i
                        } catch (t) {} finally {
                            f || e.removeAttribute("id")
                        }
                    }
                }
                return P(t.replace(ot, "$1"), e, i, n)
            }

            function i() {
                function t(i, n) {
                    return e.push(i + " ") > x.cacheLength && delete t[e.shift()], t[i + " "] = n
                }
                var e = [];
                return t
            }

            function n(t) {
                return t[I] = !0, t
            }

            function r(t) {
                var e = E.createElement("div");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function s(t, e) {
                for (var i = t.split("|"), n = t.length; n--;) x.attrHandle[i[n]] = e
            }

            function o(t, e) {
                var i = e && t,
                    n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || $) - (~t.sourceIndex || $);
                if (n) return n;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === e) return -1;
                return t ? 1 : -1
            }

            function a(t) {
                return n(function(e) {
                    return e = +e, n(function(i, n) {
                        for (var r, s = t([], i.length, e), o = s.length; o--;) i[r = s[o]] && (i[r] = !(n[r] = i[r]))
                    })
                })
            }

            function l(t) {
                return t && void 0 !== t.getElementsByTagName && t
            }

            function u() {}

            function h(t) {
                for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
                return n
            }

            function c(t, e, i) {
                var n = e.dir,
                    r = i && "parentNode" === n,
                    s = H++;
                return e.first ? function(e, i, s) {
                    for (; e = e[n];)
                        if (1 === e.nodeType || r) return t(e, i, s)
                } : function(e, i, o) {
                    var a, l, u = [B, s];
                    if (o) {
                        for (; e = e[n];)
                            if ((1 === e.nodeType || r) && t(e, i, o)) return !0
                    } else
                        for (; e = e[n];)
                            if (1 === e.nodeType || r) {
                                if (l = e[I] || (e[I] = {}), (a = l[n]) && a[0] === B && a[1] === s) return u[2] = a[2];
                                if (l[n] = u, u[2] = t(e, i, o)) return !0
                            }
                }
            }

            function f(t) {
                return t.length > 1 ? function(e, i, n) {
                    for (var r = t.length; r--;)
                        if (!t[r](e, i, n)) return !1;
                    return !0
                } : t[0]
            }

            function p(t, i, n) {
                for (var r = 0, s = i.length; r < s; r++) e(t, i[r], n);
                return n
            }

            function d(t, e, i, n, r) {
                for (var s, o = [], a = 0, l = t.length, u = null != e; a < l; a++)(s = t[a]) && (i && !i(s, n, r) || (o.push(s), u && e.push(a)));
                return o
            }

            function m(t, e, i, r, s, o) {
                return r && !r[I] && (r = m(r)), s && !s[I] && (s = m(s, o)), n(function(n, o, a, l) {
                    var u, h, c, f = [],
                        m = [],
                        g = o.length,
                        _ = n || p(e || "*", a.nodeType ? [a] : a, []),
                        v = !t || !n && e ? _ : d(_, f, t, a, l),
                        y = i ? s || (n ? t : g || r) ? [] : o : v;
                    if (i && i(v, y, a, l), r)
                        for (u = d(y, m), r(u, [], a, l), h = u.length; h--;)(c = u[h]) && (y[m[h]] = !(v[m[h]] = c));
                    if (n) {
                        if (s || t) {
                            if (s) {
                                for (u = [], h = y.length; h--;)(c = y[h]) && u.push(v[h] = c);
                                s(null, y = [], u, l)
                            }
                            for (h = y.length; h--;)(c = y[h]) && (u = s ? J(n, c) : f[h]) > -1 && (n[u] = !(o[u] = c))
                        }
                    } else y = d(y === o ? y.splice(g, y.length) : y), s ? s(null, o, y, l) : Z.apply(o, y)
                })
            }

            function g(t) {
                for (var e, i, n, r = t.length, s = x.relative[t[0].type], o = s || x.relative[" "], a = s ? 1 : 0, l = c(function(t) {
                        return t === e
                    }, o, !0), u = c(function(t) {
                        return J(e, t) > -1
                    }, o, !0), p = [function(t, i, n) {
                        var r = !s && (n || i !== k) || ((e = i).nodeType ? l(t, i, n) : u(t, i, n));
                        return e = null, r
                    }]; a < r; a++)
                    if (i = x.relative[t[a].type]) p = [c(f(p), i)];
                    else {
                        if (i = x.filter[t[a].type].apply(null, t[a].matches), i[I]) {
                            for (n = ++a; n < r && !x.relative[t[n].type]; n++);
                            return m(a > 1 && f(p), a > 1 && h(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(ot, "$1"), i, a < n && g(t.slice(a, n)), n < r && g(t = t.slice(n)), n < r && h(t))
                        }
                        p.push(i)
                    }
                return f(p)
            }

            function _(t, i) {
                var r = i.length > 0,
                    s = t.length > 0,
                    o = function(n, o, a, l, u) {
                        var h, c, f, p = 0,
                            m = "0",
                            g = n && [],
                            _ = [],
                            v = k,
                            y = n || s && x.find.TAG("*", u),
                            b = B += null == v ? 1 : Math.random() || .1,
                            w = y.length;
                        for (u && (k = o !== E && o); m !== w && null != (h = y[m]); m++) {
                            if (s && h) {
                                for (c = 0; f = t[c++];)
                                    if (f(h, o, a)) {
                                        l.push(h);
                                        break
                                    }
                                u && (B = b)
                            }
                            r && ((h = !f && h) && p--, n && g.push(h))
                        }
                        if (p += m, r && m !== p) {
                            for (c = 0; f = i[c++];) f(g, _, o, a);
                            if (n) {
                                if (p > 0)
                                    for (; m--;) g[m] || _[m] || (_[m] = V.call(l));
                                _ = d(_)
                            }
                            Z.apply(l, _), u && !n && _.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                        }
                        return u && (B = b, k = v), g
                    };
                return r ? n(o) : o
            }
            var v, y, x, b, w, T, S, P, k, C, O, A, E, R, D, N, M, j, L, I = "sizzle" + 1 * new Date,
                F = t.document,
                B = 0,
                H = 0,
                z = i(),
                q = i(),
                X = i(),
                W = function(t, e) {
                    return t === e && (O = !0), 0
                },
                $ = 1 << 31,
                U = {}.hasOwnProperty,
                Y = [],
                V = Y.pop,
                G = Y.push,
                Z = Y.push,
                Q = Y.slice,
                J = function(t, e) {
                    for (var i = 0, n = t.length; i < n; i++)
                        if (t[i] === e) return i;
                    return -1
                },
                K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                tt = "[\\x20\\t\\r\\n\\f]",
                et = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                it = et.replace("w", "w#"),
                nt = "\\[" + tt + "*(" + et + ")(?:" + tt + "*([*^$|!~]?=)" + tt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + tt + "*\\]",
                rt = ":(" + et + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + nt + ")*)|.*)\\)|)",
                st = new RegExp(tt + "+", "g"),
                ot = new RegExp("^" + tt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + tt + "+$", "g"),
                at = new RegExp("^" + tt + "*," + tt + "*"),
                lt = new RegExp("^" + tt + "*([>+~]|" + tt + ")" + tt + "*"),
                ut = new RegExp("=" + tt + "*([^\\]'\"]*?)" + tt + "*\\]", "g"),
                ht = new RegExp(rt),
                ct = new RegExp("^" + it + "$"),
                ft = {
                    ID: new RegExp("^#(" + et + ")"),
                    CLASS: new RegExp("^\\.(" + et + ")"),
                    TAG: new RegExp("^(" + et.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + nt),
                    PSEUDO: new RegExp("^" + rt),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + tt + "*(even|odd|(([+-]|)(\\d*)n|)" + tt + "*(?:([+-]|)" + tt + "*(\\d+)|))" + tt + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + K + ")$", "i"),
                    needsContext: new RegExp("^" + tt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + tt + "*((?:-\\d)?\\d*)" + tt + "*\\)|)(?=[^-]|$)", "i")
                },
                pt = /^(?:input|select|textarea|button)$/i,
                dt = /^h\d$/i,
                mt = /^[^{]+\{\s*\[native \w/,
                gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                _t = /[+~]/,
                vt = /'|\\/g,
                yt = new RegExp("\\\\([\\da-f]{1,6}" + tt + "?|(" + tt + ")|.)", "ig"),
                xt = function(t, e, i) {
                    var n = "0x" + e - 65536;
                    return n !== n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                },
                bt = function() {
                    A()
                };
            try {
                Z.apply(Y = Q.call(F.childNodes), F.childNodes), Y[F.childNodes.length].nodeType
            } catch (t) {
                Z = {
                    apply: Y.length ? function(t, e) {
                        G.apply(t, Q.call(e))
                    } : function(t, e) {
                        for (var i = t.length, n = 0; t[i++] = e[n++];);
                        t.length = i - 1
                    }
                }
            }
            y = e.support = {}, w = e.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, A = e.setDocument = function(t) {
                var e, i, n = t ? t.ownerDocument || t : F;
                return n !== E && 9 === n.nodeType && n.documentElement ? (E = n, R = n.documentElement, i = n.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", bt, !1) : i.attachEvent && i.attachEvent("onunload", bt)), D = !w(n), y.attributes = r(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), y.getElementsByTagName = r(function(t) {
                    return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length
                }), y.getElementsByClassName = mt.test(n.getElementsByClassName), y.getById = r(function(t) {
                    return R.appendChild(t).id = I, !n.getElementsByName || !n.getElementsByName(I).length
                }), y.getById ? (x.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && D) {
                        var i = e.getElementById(t);
                        return i && i.parentNode ? [i] : []
                    }
                }, x.filter.ID = function(t) {
                    var e = t.replace(yt, xt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete x.find.ID, x.filter.ID = function(t) {
                    var e = t.replace(yt, xt);
                    return function(t) {
                        var i = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                        return i && i.value === e
                    }
                }), x.find.TAG = y.getElementsByTagName ? function(t, e) {
                    return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : y.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var i, n = [],
                        r = 0,
                        s = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; i = s[r++];) 1 === i.nodeType && n.push(i);
                        return n
                    }
                    return s
                }, x.find.CLASS = y.getElementsByClassName && function(t, e) {
                    if (D) return e.getElementsByClassName(t)
                }, M = [], N = [], (y.qsa = mt.test(n.querySelectorAll)) && (r(function(t) {
                    R.appendChild(t).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && N.push("[*^$]=" + tt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || N.push("\\[" + tt + "*(?:value|" + K + ")"), t.querySelectorAll("[id~=" + I + "-]").length || N.push("~="), t.querySelectorAll(":checked").length || N.push(":checked"), t.querySelectorAll("a#" + I + "+*").length || N.push(".#.+[+~]")
                }), r(function(t) {
                    var e = n.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && N.push("name" + tt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), N.push(",.*:")
                })), (y.matchesSelector = mt.test(j = R.matches || R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && r(function(t) {
                    y.disconnectedMatch = j.call(t, "div"), j.call(t, "[s!='']:x"), M.push("!=", rt)
                }), N = N.length && new RegExp(N.join("|")), M = M.length && new RegExp(M.join("|")), e = mt.test(R.compareDocumentPosition), L = e || mt.test(R.contains) ? function(t, e) {
                    var i = 9 === t.nodeType ? t.documentElement : t,
                        n = e && e.parentNode;
                    return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, W = e ? function(t, e) {
                    if (t === e) return O = !0, 0;
                    var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return i || (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !y.sortDetached && e.compareDocumentPosition(t) === i ? t === n || t.ownerDocument === F && L(F, t) ? -1 : e === n || e.ownerDocument === F && L(F, e) ? 1 : C ? J(C, t) - J(C, e) : 0 : 4 & i ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return O = !0, 0;
                    var i, r = 0,
                        s = t.parentNode,
                        a = e.parentNode,
                        l = [t],
                        u = [e];
                    if (!s || !a) return t === n ? -1 : e === n ? 1 : s ? -1 : a ? 1 : C ? J(C, t) - J(C, e) : 0;
                    if (s === a) return o(t, e);
                    for (i = t; i = i.parentNode;) l.unshift(i);
                    for (i = e; i = i.parentNode;) u.unshift(i);
                    for (; l[r] === u[r];) r++;
                    return r ? o(l[r], u[r]) : l[r] === F ? -1 : u[r] === F ? 1 : 0
                }, n) : E
            }, e.matches = function(t, i) {
                return e(t, null, null, i)
            }, e.matchesSelector = function(t, i) {
                if ((t.ownerDocument || t) !== E && A(t), i = i.replace(ut, "='$1']"), y.matchesSelector && D && (!M || !M.test(i)) && (!N || !N.test(i))) try {
                    var n = j.call(t, i);
                    if (n || y.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                } catch (t) {}
                return e(i, E, null, [t]).length > 0
            }, e.contains = function(t, e) {
                return (t.ownerDocument || t) !== E && A(t), L(t, e)
            }, e.attr = function(t, e) {
                (t.ownerDocument || t) !== E && A(t);
                var i = x.attrHandle[e.toLowerCase()],
                    n = i && U.call(x.attrHandle, e.toLowerCase()) ? i(t, e, !D) : void 0;
                return void 0 !== n ? n : y.attributes || !D ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }, e.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function(t) {
                var e, i = [],
                    n = 0,
                    r = 0;
                if (O = !y.detectDuplicates, C = !y.sortStable && t.slice(0), t.sort(W), O) {
                    for (; e = t[r++];) e === t[r] && (n = i.push(r));
                    for (; n--;) t.splice(i[n], 1)
                }
                return C = null, t
            }, b = e.getText = function(t) {
                var e, i = "",
                    n = 0,
                    r = t.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) i += b(t)
                    } else if (3 === r || 4 === r) return t.nodeValue
                } else
                    for (; e = t[n++];) i += b(e);
                return i
            }, x = e.selectors = {
                cacheLength: 50,
                createPseudo: n,
                match: ft,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(yt, xt), t[3] = (t[3] || t[4] || t[5] || "").replace(yt, xt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, i = !t[6] && t[2];
                        return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ht.test(i) && (e = T(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(yt, xt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = z[t + " "];
                        return e || (e = new RegExp("(^|" + tt + ")" + t + "(" + tt + "|$)")) && z(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, i, n) {
                        return function(r) {
                            var s = e.attr(r, t);
                            return null == s ? "!=" === i : !i || (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s.replace(st, " ") + " ").indexOf(n) > -1 : "|=" === i && (s === n || s.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(t, e, i, n, r) {
                        var s = "nth" !== t.slice(0, 3),
                            o = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === n && 0 === r ? function(t) {
                            return !!t.parentNode
                        } : function(e, i, l) {
                            var u, h, c, f, p, d, m = s !== o ? "nextSibling" : "previousSibling",
                                g = e.parentNode,
                                _ = a && e.nodeName.toLowerCase(),
                                v = !l && !a;
                            if (g) {
                                if (s) {
                                    for (; m;) {
                                        for (c = e; c = c[m];)
                                            if (a ? c.nodeName.toLowerCase() === _ : 1 === c.nodeType) return !1;
                                        d = m = "only" === t && !d && "nextSibling"
                                    }
                                    return !0
                                }
                                if (d = [o ? g.firstChild : g.lastChild], o && v) {
                                    for (h = g[I] || (g[I] = {}), u = h[t] || [], p = u[0] === B && u[1], f = u[0] === B && u[2], c = p && g.childNodes[p]; c = ++p && c && c[m] || (f = p = 0) || d.pop();)
                                        if (1 === c.nodeType && ++f && c === e) {
                                            h[t] = [B, p, f];
                                            break
                                        }
                                } else if (v && (u = (e[I] || (e[I] = {}))[t]) && u[0] === B) f = u[1];
                                else
                                    for (;
                                        (c = ++p && c && c[m] || (f = p = 0) || d.pop()) && ((a ? c.nodeName.toLowerCase() !== _ : 1 !== c.nodeType) || !++f || (v && ((c[I] || (c[I] = {}))[t] = [B, f]), c !== e)););
                                return (f -= r) === n || f % n == 0 && f / n >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, i) {
                        var r, s = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return s[I] ? s(i) : s.length > 1 ? (r = [t, t, "", i], x.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                            for (var n, r = s(t, i), o = r.length; o--;) n = J(t, r[o]), t[n] = !(e[n] = r[o])
                        }) : function(t) {
                            return s(t, 0, r)
                        }) : s
                    }
                },
                pseudos: {
                    not: n(function(t) {
                        var e = [],
                            i = [],
                            r = S(t.replace(ot, "$1"));
                        return r[I] ? n(function(t, e, i, n) {
                            for (var s, o = r(t, null, n, []), a = t.length; a--;)(s = o[a]) && (t[a] = !(e[a] = s))
                        }) : function(t, n, s) {
                            return e[0] = t, r(e, null, s, i), e[0] = null, !i.pop()
                        }
                    }),
                    has: n(function(t) {
                        return function(i) {
                            return e(t, i).length > 0
                        }
                    }),
                    contains: n(function(t) {
                        return t = t.replace(yt, xt),
                            function(e) {
                                return (e.textContent || e.innerText || b(e)).indexOf(t) > -1
                            }
                    }),
                    lang: n(function(t) {
                        return ct.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(yt, xt).toLowerCase(),
                            function(e) {
                                var i;
                                do {
                                    if (i = D ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var i = t.location && t.location.hash;
                        return i && i.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === R
                    },
                    focus: function(t) {
                        return t === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function(t) {
                        return !1 === t.disabled
                    },
                    disabled: function(t) {
                        return !0 === t.disabled
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !x.pseudos.empty(t)
                    },
                    header: function(t) {
                        return dt.test(t.nodeName)
                    },
                    input: function(t) {
                        return pt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: a(function() {
                        return [0]
                    }),
                    last: a(function(t, e) {
                        return [e - 1]
                    }),
                    eq: a(function(t, e, i) {
                        return [i < 0 ? i + e : i]
                    }),
                    even: a(function(t, e) {
                        for (var i = 0; i < e; i += 2) t.push(i);
                        return t
                    }),
                    odd: a(function(t, e) {
                        for (var i = 1; i < e; i += 2) t.push(i);
                        return t
                    }),
                    lt: a(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; --n >= 0;) t.push(n);
                        return t
                    }),
                    gt: a(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; ++n < e;) t.push(n);
                        return t
                    })
                }
            }, x.pseudos.nth = x.pseudos.eq;
            for (v in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) x.pseudos[v] = function(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }(v);
            for (v in {
                    submit: !0,
                    reset: !0
                }) x.pseudos[v] = function(t) {
                return function(e) {
                    var i = e.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && e.type === t
                }
            }(v);
            return u.prototype = x.filters = x.pseudos, x.setFilters = new u, T = e.tokenize = function(t, i) {
                var n, r, s, o, a, l, u, h = q[t + " "];
                if (h) return i ? 0 : h.slice(0);
                for (a = t, l = [], u = x.preFilter; a;) {
                    n && !(r = at.exec(a)) || (r && (a = a.slice(r[0].length) || a), l.push(s = [])), n = !1, (r = lt.exec(a)) && (n = r.shift(), s.push({
                        value: n,
                        type: r[0].replace(ot, " ")
                    }), a = a.slice(n.length));
                    for (o in x.filter) !(r = ft[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), s.push({
                        value: n,
                        type: o,
                        matches: r
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return i ? a.length : a ? e.error(t) : q(t, l).slice(0)
            }, S = e.compile = function(t, e) {
                var i, n = [],
                    r = [],
                    s = X[t + " "];
                if (!s) {
                    for (e || (e = T(t)), i = e.length; i--;) s = g(e[i]), s[I] ? n.push(s) : r.push(s);
                    s = X(t, _(r, n)), s.selector = t
                }
                return s
            }, P = e.select = function(t, e, i, n) {
                var r, s, o, a, u, c = "function" == typeof t && t,
                    f = !n && T(t = c.selector || t);
                if (i = i || [], 1 === f.length) {
                    if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (o = s[0]).type && y.getById && 9 === e.nodeType && D && x.relative[s[1].type]) {
                        if (!(e = (x.find.ID(o.matches[0].replace(yt, xt), e) || [])[0])) return i;
                        c && (e = e.parentNode), t = t.slice(s.shift().value.length)
                    }
                    for (r = ft.needsContext.test(t) ? 0 : s.length; r-- && (o = s[r], !x.relative[a = o.type]);)
                        if ((u = x.find[a]) && (n = u(o.matches[0].replace(yt, xt), _t.test(s[0].type) && l(e.parentNode) || e))) {
                            if (s.splice(r, 1), !(t = n.length && h(s))) return Z.apply(i, n), i;
                            break
                        }
                }
                return (c || S(t, f))(n, e, !D, i, _t.test(t) && l(e.parentNode) || e), i
            }, y.sortStable = I.split("").sort(W).join("") === I, y.detectDuplicates = !!O, A(), y.sortDetached = r(function(t) {
                return 1 & t.compareDocumentPosition(E.createElement("div"))
            }), r(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || s("type|href|height|width", function(t, e, i) {
                if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), y.attributes && r(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || s("value", function(t, e, i) {
                if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), r(function(t) {
                return null == t.getAttribute("disabled")
            }) || s(K, function(t, e, i) {
                var n;
                if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }), e
        }(t);
        J.find = nt, J.expr = nt.selectors, J.expr[":"] = J.expr.pseudos, J.unique = nt.uniqueSort, J.text = nt.getText, J.isXMLDoc = nt.isXML, J.contains = nt.contains;
        var rt = J.expr.match.needsContext,
            st = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            ot = /^.[^:#\[\.,]*$/;
        J.filter = function(t, e, i) {
            var n = e[0];
            return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? J.find.matchesSelector(n, t) ? [n] : [] : J.find.matches(t, J.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, J.fn.extend({
            find: function(t) {
                var e, i = this.length,
                    n = [],
                    r = this;
                if ("string" != typeof t) return this.pushStack(J(t).filter(function() {
                    for (e = 0; e < i; e++)
                        if (J.contains(r[e], this)) return !0
                }));
                for (e = 0; e < i; e++) J.find(t, r[e], n);
                return n = this.pushStack(i > 1 ? J.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
            },
            filter: function(t) {
                return this.pushStack(n(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(n(this, t || [], !0))
            },
            is: function(t) {
                return !!n(this, "string" == typeof t && rt.test(t) ? J(t) : t || [], !1).length
            }
        });
        var at, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        (J.fn.init = function(t, e) {
            var i, n;
            if (!t) return this;
            if ("string" == typeof t) {
                if (!(i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : lt.exec(t)) || !i[1] && e) return !e || e.jquery ? (e || at).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof J ? e[0] : e, J.merge(this, J.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : Q, !0)), st.test(i[1]) && J.isPlainObject(e))
                        for (i in e) J.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                return n = Q.getElementById(i[2]), n && n.parentNode && (this.length = 1, this[0] = n), this.context = Q, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : J.isFunction(t) ? void 0 !== at.ready ? at.ready(t) : t(J) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), J.makeArray(t, this))
        }).prototype = J.fn, at = J(Q);
        var ut = /^(?:parents|prev(?:Until|All))/,
            ht = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        J.extend({
            dir: function(t, e, i) {
                for (var n = [], r = void 0 !== i;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (r && J(t).is(i)) break;
                        n.push(t)
                    }
                return n
            },
            sibling: function(t, e) {
                for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                return i
            }
        }), J.fn.extend({
            has: function(t) {
                var e = J(t, this),
                    i = e.length;
                return this.filter(function() {
                    for (var t = 0; t < i; t++)
                        if (J.contains(this, e[t])) return !0
                })
            },
            closest: function(t, e) {
                for (var i, n = 0, r = this.length, s = [], o = rt.test(t) || "string" != typeof t ? J(t, e || this.context) : 0; n < r; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && J.find.matchesSelector(i, t))) {
                            s.push(i);
                            break
                        }
                return this.pushStack(s.length > 1 ? J.unique(s) : s)
            },
            index: function(t) {
                return t ? "string" == typeof t ? U.call(J(t), this[0]) : U.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(J.unique(J.merge(this.get(), J(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), J.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return J.dir(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return J.dir(t, "parentNode", i)
            },
            next: function(t) {
                return r(t, "nextSibling")
            },
            prev: function(t) {
                return r(t, "previousSibling")
            },
            nextAll: function(t) {
                return J.dir(t, "nextSibling")
            },
            prevAll: function(t) {
                return J.dir(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return J.dir(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return J.dir(t, "previousSibling", i)
            },
            siblings: function(t) {
                return J.sibling((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return J.sibling(t.firstChild)
            },
            contents: function(t) {
                return t.contentDocument || J.merge([], t.childNodes)
            }
        }, function(t, e) {
            J.fn[t] = function(i, n) {
                var r = J.map(this, e, i);
                return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (r = J.filter(n, r)), this.length > 1 && (ht[t] || J.unique(r), ut.test(t) && r.reverse()), this.pushStack(r)
            }
        });
        var ct = /\S+/g,
            ft = {};
        J.Callbacks = function(t) {
            t = "string" == typeof t ? ft[t] || s(t) : J.extend({}, t);
            var e, i, n, r, o, a, l = [],
                u = !t.once && [],
                h = function(s) {
                    for (e = t.memory && s, i = !0, a = r || 0, r = 0, o = l.length, n = !0; l && a < o; a++)
                        if (!1 === l[a].apply(s[0], s[1]) && t.stopOnFalse) {
                            e = !1;
                            break
                        }
                    n = !1, l && (u ? u.length && h(u.shift()) : e ? l = [] : c.disable())
                },
                c = {
                    add: function() {
                        if (l) {
                            var i = l.length;
                            ! function e(i) {
                                J.each(i, function(i, n) {
                                    var r = J.type(n);
                                    "function" === r ? t.unique && c.has(n) || l.push(n) : n && n.length && "string" !== r && e(n)
                                })
                            }(arguments), n ? o = l.length : e && (r = i, h(e))
                        }
                        return this
                    },
                    remove: function() {
                        return l && J.each(arguments, function(t, e) {
                            for (var i;
                                (i = J.inArray(e, l, i)) > -1;) l.splice(i, 1), n && (i <= o && o--, i <= a && a--)
                        }), this
                    },
                    has: function(t) {
                        return t ? J.inArray(t, l) > -1 : !(!l || !l.length)
                    },
                    empty: function() {
                        return l = [], o = 0, this
                    },
                    disable: function() {
                        return l = u = e = void 0, this
                    },
                    disabled: function() {
                        return !l
                    },
                    lock: function() {
                        return u = void 0, e || c.disable(), this
                    },
                    locked: function() {
                        return !u
                    },
                    fireWith: function(t, e) {
                        return !l || i && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], n ? u.push(e) : h(e)), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!i
                    }
                };
            return c
        }, J.extend({
            Deferred: function(t) {
                var e = [
                        ["resolve", "done", J.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", J.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", J.Callbacks("memory")]
                    ],
                    i = "pending",
                    n = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return r.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var t = arguments;
                            return J.Deferred(function(i) {
                                J.each(e, function(e, s) {
                                    var o = J.isFunction(t[e]) && t[e];
                                    r[s[1]](function() {
                                        var t = o && o.apply(this, arguments);
                                        t && J.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, o ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? J.extend(t, n) : n
                        }
                    },
                    r = {};
                return n.pipe = n.then, J.each(e, function(t, s) {
                    var o = s[2],
                        a = s[3];
                    n[s[1]] = o.add, a && o.add(function() {
                        i = a
                    }, e[1 ^ t][2].disable, e[2][2].lock), r[s[0]] = function() {
                        return r[s[0] + "With"](this === r ? n : this, arguments), this
                    }, r[s[0] + "With"] = o.fireWith
                }), n.promise(r), t && t.call(r, r), r
            },
            when: function(t) {
                var e, i, n, r = 0,
                    s = X.call(arguments),
                    o = s.length,
                    a = 1 !== o || t && J.isFunction(t.promise) ? o : 0,
                    l = 1 === a ? t : J.Deferred(),
                    u = function(t, i, n) {
                        return function(r) {
                            i[t] = this, n[t] = arguments.length > 1 ? X.call(arguments) : r, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                        }
                    };
                if (o > 1)
                    for (e = new Array(o), i = new Array(o), n = new Array(o); r < o; r++) s[r] && J.isFunction(s[r].promise) ? s[r].promise().done(u(r, n, s)).fail(l.reject).progress(u(r, i, e)) : --a;
                return a || l.resolveWith(n, s), l.promise()
            }
        });
        var pt;
        J.fn.ready = function(t) {
            return J.ready.promise().done(t), this
        }, J.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? J.readyWait++ : J.ready(!0)
            },
            ready: function(t) {
                (!0 === t ? --J.readyWait : J.isReady) || (J.isReady = !0, !0 !== t && --J.readyWait > 0 || (pt.resolveWith(Q, [J]), J.fn.triggerHandler && (J(Q).triggerHandler("ready"), J(Q).off("ready"))))
            }
        }), J.ready.promise = function(e) {
            return pt || (pt = J.Deferred(), "complete" === Q.readyState ? setTimeout(J.ready) : (Q.addEventListener("DOMContentLoaded", o, !1), t.addEventListener("load", o, !1))), pt.promise(e)
        }, J.ready.promise();
        var dt = J.access = function(t, e, i, n, r, s, o) {
            var a = 0,
                l = t.length,
                u = null == i;
            if ("object" === J.type(i)) {
                r = !0;
                for (a in i) J.access(t, e, a, i[a], !0, s, o)
            } else if (void 0 !== n && (r = !0, J.isFunction(n) || (o = !0), u && (o ? (e.call(t, n), e = null) : (u = e, e = function(t, e, i) {
                    return u.call(J(t), i)
                })), e))
                for (; a < l; a++) e(t[a], i, o ? n : n.call(t[a], a, e(t[a], i)));
            return r ? t : u ? e.call(t) : l ? e(t[0], i) : s
        };
        J.acceptData = function(t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
        }, a.uid = 1, a.accepts = J.acceptData, a.prototype = {
            key: function(t) {
                if (!a.accepts(t)) return 0;
                var e = {},
                    i = t[this.expando];
                if (!i) {
                    i = a.uid++;
                    try {
                        e[this.expando] = {
                            value: i
                        }, Object.defineProperties(t, e)
                    } catch (n) {
                        e[this.expando] = i, J.extend(t, e)
                    }
                }
                return this.cache[i] || (this.cache[i] = {}), i
            },
            set: function(t, e, i) {
                var n, r = this.key(t),
                    s = this.cache[r];
                if ("string" == typeof e) s[e] = i;
                else if (J.isEmptyObject(s)) J.extend(this.cache[r], e);
                else
                    for (n in e) s[n] = e[n];
                return s
            },
            get: function(t, e) {
                var i = this.cache[this.key(t)];
                return void 0 === e ? i : i[e]
            },
            access: function(t, e, i) {
                var n;
                return void 0 === e || e && "string" == typeof e && void 0 === i ? (n = this.get(t, e), void 0 !== n ? n : this.get(t, J.camelCase(e))) : (this.set(t, e, i), void 0 !== i ? i : e)
            },
            remove: function(t, e) {
                var i, n, r, s = this.key(t),
                    o = this.cache[s];
                if (void 0 === e) this.cache[s] = {};
                else {
                    J.isArray(e) ? n = e.concat(e.map(J.camelCase)) : (r = J.camelCase(e), e in o ? n = [e, r] : (n = r, n = n in o ? [n] : n.match(ct) || [])), i = n.length;
                    for (; i--;) delete o[n[i]]
                }
            },
            hasData: function(t) {
                return !J.isEmptyObject(this.cache[t[this.expando]] || {})
            },
            discard: function(t) {
                t[this.expando] && delete this.cache[t[this.expando]]
            }
        };
        var mt = new a,
            gt = new a,
            _t = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            vt = /([A-Z])/g;
        J.extend({
            hasData: function(t) {
                return gt.hasData(t) || mt.hasData(t)
            },
            data: function(t, e, i) {
                return gt.access(t, e, i)
            },
            removeData: function(t, e) {
                gt.remove(t, e)
            },
            _data: function(t, e, i) {
                return mt.access(t, e, i)
            },
            _removeData: function(t, e) {
                mt.remove(t, e)
            }
        }), J.fn.extend({
            data: function(t, e) {
                var i, n, r, s = this[0],
                    o = s && s.attributes;
                if (void 0 === t) {
                    if (this.length && (r = gt.get(s), 1 === s.nodeType && !mt.get(s, "hasDataAttrs"))) {
                        for (i = o.length; i--;) o[i] && (n = o[i].name, 0 === n.indexOf("data-") && (n = J.camelCase(n.slice(5)), l(s, n, r[n])));
                        mt.set(s, "hasDataAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof t ? this.each(function() {
                    gt.set(this, t)
                }) : dt(this, function(e) {
                    var i, n = J.camelCase(t);
                    if (s && void 0 === e) {
                        if (void 0 !== (i = gt.get(s, t))) return i;
                        if (void 0 !== (i = gt.get(s, n))) return i;
                        if (void 0 !== (i = l(s, n, void 0))) return i
                    } else this.each(function() {
                        var i = gt.get(this, n);
                        gt.set(this, n, e), -1 !== t.indexOf("-") && void 0 !== i && gt.set(this, t, e)
                    })
                }, null, e, arguments.length > 1, null, !0)
            },
            removeData: function(t) {
                return this.each(function() {
                    gt.remove(this, t)
                })
            }
        }), J.extend({
            queue: function(t, e, i) {
                var n;
                if (t) return e = (e || "fx") + "queue", n = mt.get(t, e), i && (!n || J.isArray(i) ? n = mt.access(t, e, J.makeArray(i)) : n.push(i)), n || []
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = J.queue(t, e),
                    n = i.length,
                    r = i.shift(),
                    s = J._queueHooks(t, e),
                    o = function() {
                        J.dequeue(t, e)
                    };
                "inprogress" === r && (r = i.shift(), n--), r && ("fx" === e && i.unshift("inprogress"), delete s.stop, r.call(t, o, s)), !n && s && s.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return mt.get(t, i) || mt.access(t, i, {
                    empty: J.Callbacks("once memory").add(function() {
                        mt.remove(t, [e + "queue", i])
                    })
                })
            }
        }), J.fn.extend({
            queue: function(t, e) {
                var i = 2;
                return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? J.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                    var i = J.queue(this, t, e);
                    J._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && J.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    J.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var i, n = 1,
                    r = J.Deferred(),
                    s = this,
                    o = this.length,
                    a = function() {
                        --n || r.resolveWith(s, [s])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; o--;)(i = mt.get(s[o], t + "queueHooks")) && i.empty && (n++, i.empty.add(a));
                return a(), r.promise(e)
            }
        });
        var yt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            xt = ["Top", "Right", "Bottom", "Left"],
            bt = function(t, e) {
                return t = e || t, "none" === J.css(t, "display") || !J.contains(t.ownerDocument, t)
            },
            wt = /^(?:checkbox|radio)$/i;
        ! function() {
            var t = Q.createDocumentFragment(),
                e = t.appendChild(Q.createElement("div")),
                i = Q.createElement("input");
            i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), e.appendChild(i), Z.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", Z.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
        }();
        Z.focusinBubbles = "onfocusin" in t;
        var Tt = /^key/,
            St = /^(?:mouse|pointer|contextmenu)|click/,
            Pt = /^(?:focusinfocus|focusoutblur)$/,
            kt = /^([^.]*)(?:\.(.+)|)$/;
        J.event = {
            global: {},
            add: function(t, e, i, n, r) {
                var s, o, a, l, u, h, c, f, p, d, m, g = mt.get(t);
                if (g)
                    for (i.handler && (s = i, i = s.handler, r = s.selector), i.guid || (i.guid = J.guid++), (l = g.events) || (l = g.events = {}), (o = g.handle) || (o = g.handle = function(e) {
                            return void 0 !== J && J.event.triggered !== e.type ? J.event.dispatch.apply(t, arguments) : void 0
                        }), e = (e || "").match(ct) || [""], u = e.length; u--;) a = kt.exec(e[u]) || [], p = m = a[1], d = (a[2] || "").split(".").sort(), p && (c = J.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, c = J.event.special[p] || {}, h = J.extend({
                        type: p,
                        origType: m,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: r,
                        needsContext: r && J.expr.match.needsContext.test(r),
                        namespace: d.join(".")
                    }, s), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, c.setup && !1 !== c.setup.call(t, n, d, o) || t.addEventListener && t.addEventListener(p, o, !1)), c.add && (c.add.call(t, h), h.handler.guid || (h.handler.guid = i.guid)), r ? f.splice(f.delegateCount++, 0, h) : f.push(h), J.event.global[p] = !0)
            },
            remove: function(t, e, i, n, r) {
                var s, o, a, l, u, h, c, f, p, d, m, g = mt.hasData(t) && mt.get(t);
                if (g && (l = g.events)) {
                    for (e = (e || "").match(ct) || [""], u = e.length; u--;)
                        if (a = kt.exec(e[u]) || [], p = m = a[1], d = (a[2] || "").split(".").sort(), p) {
                            for (c = J.event.special[p] || {}, p = (n ? c.delegateType : c.bindType) || p, f = l[p] || [], a = a[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = f.length; s--;) h = f[s], !r && m !== h.origType || i && i.guid !== h.guid || a && !a.test(h.namespace) || n && n !== h.selector && ("**" !== n || !h.selector) || (f.splice(s, 1), h.selector && f.delegateCount--, c.remove && c.remove.call(t, h));
                            o && !f.length && (c.teardown && !1 !== c.teardown.call(t, d, g.handle) || J.removeEvent(t, p, g.handle), delete l[p])
                        } else
                            for (p in l) J.event.remove(t, p + e[u], i, n, !0);
                    J.isEmptyObject(l) && (delete g.handle, mt.remove(t, "events"))
                }
            },
            trigger: function(e, i, n, r) {
                var s, o, a, l, u, h, c, f = [n || Q],
                    p = G.call(e, "type") ? e.type : e,
                    d = G.call(e, "namespace") ? e.namespace.split(".") : [];
                if (o = a = n = n || Q, 3 !== n.nodeType && 8 !== n.nodeType && !Pt.test(p + J.event.triggered) && (p.indexOf(".") >= 0 && (d = p.split("."), p = d.shift(), d.sort()), u = p.indexOf(":") < 0 && "on" + p, e = e[J.expando] ? e : new J.Event(p, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = d.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : J.makeArray(i, [e]), c = J.event.special[p] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, i))) {
                    if (!r && !c.noBubble && !J.isWindow(n)) {
                        for (l = c.delegateType || p, Pt.test(l + p) || (o = o.parentNode); o; o = o.parentNode) f.push(o), a = o;
                        a === (n.ownerDocument || Q) && f.push(a.defaultView || a.parentWindow || t)
                    }
                    for (s = 0;
                        (o = f[s++]) && !e.isPropagationStopped();) e.type = s > 1 ? l : c.bindType || p, h = (mt.get(o, "events") || {})[e.type] && mt.get(o, "handle"), h && h.apply(o, i), (h = u && o[u]) && h.apply && J.acceptData(o) && (e.result = h.apply(o, i), !1 === e.result && e.preventDefault());
                    return e.type = p, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(f.pop(), i) || !J.acceptData(n) || u && J.isFunction(n[p]) && !J.isWindow(n) && (a = n[u], a && (n[u] = null), J.event.triggered = p, n[p](), J.event.triggered = void 0, a && (n[u] = a)), e.result
                }
            },
            dispatch: function(t) {
                t = J.event.fix(t);
                var e, i, n, r, s, o = [],
                    a = X.call(arguments),
                    l = (mt.get(this, "events") || {})[t.type] || [],
                    u = J.event.special[t.type] || {};
                if (a[0] = t, t.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, t)) {
                    for (o = J.event.handlers.call(this, t, l), e = 0;
                        (r = o[e++]) && !t.isPropagationStopped();)
                        for (t.currentTarget = r.elem, i = 0;
                            (s = r.handlers[i++]) && !t.isImmediatePropagationStopped();) t.namespace_re && !t.namespace_re.test(s.namespace) || (t.handleObj = s, t.data = s.data, void 0 !== (n = ((J.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, a)) && !1 === (t.result = n) && (t.preventDefault(), t.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, t), t.result
                }
            },
            handlers: function(t, e) {
                var i, n, r, s, o = [],
                    a = e.delegateCount,
                    l = t.target;
                if (a && l.nodeType && (!t.button || "click" !== t.type))
                    for (; l !== this; l = l.parentNode || this)
                        if (!0 !== l.disabled || "click" !== t.type) {
                            for (n = [], i = 0; i < a; i++) s = e[i], r = s.selector + " ", void 0 === n[r] && (n[r] = s.needsContext ? J(r, this).index(l) >= 0 : J.find(r, this, null, [l]).length), n[r] && n.push(s);
                            n.length && o.push({
                                elem: l,
                                handlers: n
                            })
                        }
                return a < e.length && o.push({
                    elem: this,
                    handlers: e.slice(a)
                }), o
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, e) {
                    var i, n, r, s = e.button;
                    return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || Q, n = i.documentElement, r = i.body, t.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), t.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), t.which || void 0 === s || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
                }
            },
            fix: function(t) {
                if (t[J.expando]) return t;
                var e, i, n, r = t.type,
                    s = t,
                    o = this.fixHooks[r];
                for (o || (this.fixHooks[r] = o = St.test(r) ? this.mouseHooks : Tt.test(r) ? this.keyHooks : {}), n = o.props ? this.props.concat(o.props) : this.props, t = new J.Event(s), e = n.length; e--;) i = n[e], t[i] = s[i];
                return t.target || (t.target = Q), 3 === t.target.nodeType && (t.target = t.target.parentNode), o.filter ? o.filter(t, s) : t
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== c() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === c() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && J.nodeName(this, "input")) return this.click(), !1
                    },
                    _default: function(t) {
                        return J.nodeName(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            },
            simulate: function(t, e, i, n) {
                var r = J.extend(new J.Event, i, {
                    type: t,
                    isSimulated: !0,
                    originalEvent: {}
                });
                n ? J.event.trigger(r, null, e) : J.event.dispatch.call(e, r), r.isDefaultPrevented() && i.preventDefault()
            }
        }, J.removeEvent = function(t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i, !1)
        }, J.Event = function(t, e) {
            if (!(this instanceof J.Event)) return new J.Event(t, e);
            t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? u : h) : this.type = t, e && J.extend(this, e), this.timeStamp = t && t.timeStamp || J.now(), this[J.expando] = !0
        }, J.Event.prototype = {
            isDefaultPrevented: h,
            isPropagationStopped: h,
            isImmediatePropagationStopped: h,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = u, t && t.preventDefault && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = u, t && t.stopPropagation && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = u, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, J.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            J.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var i, n = this,
                        r = t.relatedTarget,
                        s = t.handleObj;
                    return r && (r === n || J.contains(n, r)) || (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
                }
            }
        }), Z.focusinBubbles || J.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var i = function(t) {
                J.event.simulate(e, t.target, J.event.fix(t), !0)
            };
            J.event.special[e] = {
                setup: function() {
                    var n = this.ownerDocument || this,
                        r = mt.access(n, e);
                    r || n.addEventListener(t, i, !0), mt.access(n, e, (r || 0) + 1)
                },
                teardown: function() {
                    var n = this.ownerDocument || this,
                        r = mt.access(n, e) - 1;
                    r ? mt.access(n, e, r) : (n.removeEventListener(t, i, !0), mt.remove(n, e))
                }
            }
        }), J.fn.extend({
            on: function(t, e, i, n, r) {
                var s, o;
                if ("object" == typeof t) {
                    "string" != typeof e && (i = i || e, e = void 0);
                    for (o in t) this.on(o, e, i, t[o], r);
                    return this
                }
                if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), !1 === n) n = h;
                else if (!n) return this;
                return 1 === r && (s = n, n = function(t) {
                    return J().off(t), s.apply(this, arguments)
                }, n.guid = s.guid || (s.guid = J.guid++)), this.each(function() {
                    J.event.add(this, t, n, i, e)
                })
            },
            one: function(t, e, i, n) {
                return this.on(t, e, i, n, 1)
            },
            off: function(t, e, i) {
                var n, r;
                if (t && t.preventDefault && t.handleObj) return n = t.handleObj, J(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                if ("object" == typeof t) {
                    for (r in t) this.off(r, e, t[r]);
                    return this
                }
                return !1 !== e && "function" != typeof e || (i = e, e = void 0), !1 === i && (i = h), this.each(function() {
                    J.event.remove(this, t, i, e)
                })
            },
            trigger: function(t, e) {
                return this.each(function() {
                    J.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var i = this[0];
                if (i) return J.event.trigger(t, e, i, !0)
            }
        });
        var Ct = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Ot = /<([\w:]+)/,
            At = /<|&#?\w+;/,
            Et = /<(?:script|style|link)/i,
            Rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Dt = /^$|\/(?:java|ecma)script/i,
            Nt = /^true\/(.*)/,
            Mt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            jt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        jt.optgroup = jt.option, jt.tbody = jt.tfoot = jt.colgroup = jt.caption = jt.thead, jt.th = jt.td, J.extend({
            clone: function(t, e, i) {
                var n, r, s, o, a = t.cloneNode(!0),
                    l = J.contains(t.ownerDocument, t);
                if (!(Z.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || J.isXMLDoc(t)))
                    for (o = _(a), s = _(t), n = 0, r = s.length; n < r; n++) v(s[n], o[n]);
                if (e)
                    if (i)
                        for (s = s || _(t), o = o || _(a), n = 0, r = s.length; n < r; n++) g(s[n], o[n]);
                    else g(t, a);
                return o = _(a, "script"), o.length > 0 && m(o, !l && _(t, "script")), a
            },
            buildFragment: function(t, e, i, n) {
                for (var r, s, o, a, l, u, h = e.createDocumentFragment(), c = [], f = 0, p = t.length; f < p; f++)
                    if ((r = t[f]) || 0 === r)
                        if ("object" === J.type(r)) J.merge(c, r.nodeType ? [r] : r);
                        else if (At.test(r)) {
                    for (s = s || h.appendChild(e.createElement("div")), o = (Ot.exec(r) || ["", ""])[1].toLowerCase(), a = jt[o] || jt._default, s.innerHTML = a[1] + r.replace(Ct, "<$1></$2>") + a[2], u = a[0]; u--;) s = s.lastChild;
                    J.merge(c, s.childNodes), s = h.firstChild, s.textContent = ""
                } else c.push(e.createTextNode(r));
                for (h.textContent = "", f = 0; r = c[f++];)
                    if ((!n || -1 === J.inArray(r, n)) && (l = J.contains(r.ownerDocument, r), s = _(h.appendChild(r), "script"), l && m(s), i))
                        for (u = 0; r = s[u++];) Dt.test(r.type || "") && i.push(r);
                return h
            },
            cleanData: function(t) {
                for (var e, i, n, r, s = J.event.special, o = 0; void 0 !== (i = t[o]); o++) {
                    if (J.acceptData(i) && (r = i[mt.expando]) && (e = mt.cache[r])) {
                        if (e.events)
                            for (n in e.events) s[n] ? J.event.remove(i, n) : J.removeEvent(i, n, e.handle);
                        mt.cache[r] && delete mt.cache[r]
                    }
                    delete gt.cache[i[gt.expando]]
                }
            }
        }), J.fn.extend({
            text: function(t) {
                return dt(this, function(t) {
                    return void 0 === t ? J.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        f(this, t).appendChild(t)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = f(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            remove: function(t, e) {
                for (var i, n = t ? J.filter(t, this) : this, r = 0; null != (i = n[r]); r++) e || 1 !== i.nodeType || J.cleanData(_(i)), i.parentNode && (e && J.contains(i.ownerDocument, i) && m(_(i, "script")), i.parentNode.removeChild(i));
                return this
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (J.cleanData(_(t, !1)), t.textContent = "");
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return J.clone(this, t, e)
                })
            },
            html: function(t) {
                return dt(this, function(t) {
                    var e = this[0] || {},
                        i = 0,
                        n = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !Et.test(t) && !jt[(Ot.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = t.replace(Ct, "<$1></$2>");
                        try {
                            for (; i < n; i++) e = this[i] || {}, 1 === e.nodeType && (J.cleanData(_(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = arguments[0];
                return this.domManip(arguments, function(e) {
                    t = this.parentNode, J.cleanData(_(this)), t && t.replaceChild(e, this)
                }), t && (t.length || t.nodeType) ? this : this.remove()
            },
            detach: function(t) {
                return this.remove(t, !0)
            },
            domManip: function(t, e) {
                t = W.apply([], t);
                var i, n, r, s, o, a, l = 0,
                    u = this.length,
                    h = this,
                    c = u - 1,
                    f = t[0],
                    m = J.isFunction(f);
                if (m || u > 1 && "string" == typeof f && !Z.checkClone && Rt.test(f)) return this.each(function(i) {
                    var n = h.eq(i);
                    m && (t[0] = f.call(this, i, n.html())), n.domManip(t, e)
                });
                if (u && (i = J.buildFragment(t, this[0].ownerDocument, !1, this), n = i.firstChild, 1 === i.childNodes.length && (i = n), n)) {
                    for (r = J.map(_(i, "script"), p), s = r.length; l < u; l++) o = i, l !== c && (o = J.clone(o, !0, !0), s && J.merge(r, _(o, "script"))), e.call(this[l], o, l);
                    if (s)
                        for (a = r[r.length - 1].ownerDocument, J.map(r, d), l = 0; l < s; l++) o = r[l], Dt.test(o.type || "") && !mt.access(o, "globalEval") && J.contains(a, o) && (o.src ? J._evalUrl && J._evalUrl(o.src) : J.globalEval(o.textContent.replace(Mt, "")))
                }
                return this
            }
        }), J.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            J.fn[t] = function(t) {
                for (var i, n = [], r = J(t), s = r.length - 1, o = 0; o <= s; o++) i = o === s ? this : this.clone(!0), J(r[o])[e](i), $.apply(n, i.get());
                return this.pushStack(n)
            }
        });
        var Lt, It = {},
            Ft = /^margin/,
            Bt = new RegExp("^(" + yt + ")(?!px)[a-z%]+$", "i"),
            Ht = function(e) {
                return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null)
            };
        ! function() {
            function e() {
                o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o.innerHTML = "", r.appendChild(s);
                var e = t.getComputedStyle(o, null);
                i = "1%" !== e.top, n = "4px" === e.width, r.removeChild(s)
            }
            var i, n, r = Q.documentElement,
                s = Q.createElement("div"),
                o = Q.createElement("div");
            o.style && (o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", Z.clearCloneStyle = "content-box" === o.style.backgroundClip, s.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", s.appendChild(o), t.getComputedStyle && J.extend(Z, {
                pixelPosition: function() {
                    return e(), i
                },
                boxSizingReliable: function() {
                    return null == n && e(), n
                },
                reliableMarginRight: function() {
                    var e, i = o.appendChild(Q.createElement("div"));
                    return i.style.cssText = o.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", o.style.width = "1px", r.appendChild(s), e = !parseFloat(t.getComputedStyle(i, null).marginRight), r.removeChild(s), o.removeChild(i), e
                }
            }))
        }(), J.swap = function(t, e, i, n) {
            var r, s, o = {};
            for (s in e) o[s] = t.style[s], t.style[s] = e[s];
            r = i.apply(t, n || []);
            for (s in e) t.style[s] = o[s];
            return r
        };
        var zt = /^(none|table(?!-c[ea]).+)/,
            qt = new RegExp("^(" + yt + ")(.*)$", "i"),
            Xt = new RegExp("^([+-])=(" + yt + ")", "i"),
            Wt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            $t = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Ut = ["Webkit", "O", "Moz", "ms"];
        J.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var i = b(t, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(t, e, i, n) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var r, s, o, a = J.camelCase(e),
                        l = t.style;
                    if (e = J.cssProps[a] || (J.cssProps[a] = T(l, a)), o = J.cssHooks[e] || J.cssHooks[a], void 0 === i) return o && "get" in o && void 0 !== (r = o.get(t, !1, n)) ? r : l[e];
                    s = typeof i, "string" === s && (r = Xt.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(J.css(t, e)), s = "number"), null != i && i === i && ("number" !== s || J.cssNumber[a] || (i += "px"), Z.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), o && "set" in o && void 0 === (i = o.set(t, i, n)) || (l[e] = i))
                }
            },
            css: function(t, e, i, n) {
                var r, s, o, a = J.camelCase(e);
                return e = J.cssProps[a] || (J.cssProps[a] = T(t.style, a)), o = J.cssHooks[e] || J.cssHooks[a], o && "get" in o && (r = o.get(t, !0, i)), void 0 === r && (r = b(t, e, n)), "normal" === r && e in $t && (r = $t[e]), "" === i || i ? (s = parseFloat(r), !0 === i || J.isNumeric(s) ? s || 0 : r) : r
            }
        }), J.each(["height", "width"], function(t, e) {
            J.cssHooks[e] = {
                get: function(t, i, n) {
                    if (i) return zt.test(J.css(t, "display")) && 0 === t.offsetWidth ? J.swap(t, Wt, function() {
                        return k(t, e, n)
                    }) : k(t, e, n)
                },
                set: function(t, i, n) {
                    var r = n && Ht(t);
                    return S(t, i, n ? P(t, e, n, "border-box" === J.css(t, "boxSizing", !1, r), r) : 0)
                }
            }
        }), J.cssHooks.marginRight = w(Z.reliableMarginRight, function(t, e) {
            if (e) return J.swap(t, {
                display: "inline-block"
            }, b, [t, "marginRight"])
        }), J.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            J.cssHooks[t + e] = {
                expand: function(i) {
                    for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) r[t + xt[n] + e] = s[n] || s[n - 2] || s[0];
                    return r
                }
            }, Ft.test(t) || (J.cssHooks[t + e].set = S)
        }), J.fn.extend({
            css: function(t, e) {
                return dt(this, function(t, e, i) {
                    var n, r, s = {},
                        o = 0;
                    if (J.isArray(e)) {
                        for (n = Ht(t), r = e.length; o < r; o++) s[e[o]] = J.css(t, e[o], !1, n);
                        return s
                    }
                    return void 0 !== i ? J.style(t, e, i) : J.css(t, e)
                }, t, e, arguments.length > 1)
            },
            show: function() {
                return C(this, !0)
            },
            hide: function() {
                return C(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    bt(this) ? J(this).show() : J(this).hide()
                })
            }
        }), J.Tween = O, O.prototype = {
            constructor: O,
            init: function(t, e, i, n, r, s) {
                this.elem = t, this.prop = i, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (J.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = O.propHooks[this.prop];
                return t && t.get ? t.get(this) : O.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = O.propHooks[this.prop];
                return this.options.duration ? this.pos = e = J.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : O.propHooks._default.set(this), this
            }
        }, O.prototype.init.prototype = O.prototype, O.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = J.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                },
                set: function(t) {
                    J.fx.step[t.prop] ? J.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[J.cssProps[t.prop]] || J.cssHooks[t.prop]) ? J.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, J.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }
        }, J.fx = O.prototype.init, J.fx.step = {};
        var Yt, Vt, Gt = /^(?:toggle|show|hide)$/,
            Zt = new RegExp("^(?:([+-])=|)(" + yt + ")([a-z%]*)$", "i"),
            Qt = /queueHooks$/,
            Jt = [D],
            Kt = {
                "*": [function(t, e) {
                    var i = this.createTween(t, e),
                        n = i.cur(),
                        r = Zt.exec(e),
                        s = r && r[3] || (J.cssNumber[t] ? "" : "px"),
                        o = (J.cssNumber[t] || "px" !== s && +n) && Zt.exec(J.css(i.elem, t)),
                        a = 1,
                        l = 20;
                    if (o && o[3] !== s) {
                        s = s || o[3], r = r || [], o = +n || 1;
                        do {
                            a = a || ".5", o /= a, J.style(i.elem, t, o + s)
                        } while (a !== (a = i.cur() / n) && 1 !== a && --l)
                    }
                    return r && (o = i.start = +o || +n || 0, i.unit = s, i.end = r[1] ? o + (r[1] + 1) * r[2] : +r[2]), i
                }]
            };
        J.Animation = J.extend(M, {
                tweener: function(t, e) {
                    J.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                    for (var i, n = 0, r = t.length; n < r; n++) i = t[n], Kt[i] = Kt[i] || [], Kt[i].unshift(e)
                },
                prefilter: function(t, e) {
                    e ? Jt.unshift(t) : Jt.push(t)
                }
            }), J.speed = function(t, e, i) {
                var n = t && "object" == typeof t ? J.extend({}, t) : {
                    complete: i || !i && e || J.isFunction(t) && t,
                    duration: t,
                    easing: i && e || e && !J.isFunction(e) && e
                };
                return n.duration = J.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in J.fx.speeds ? J.fx.speeds[n.duration] : J.fx.speeds._default, null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    J.isFunction(n.old) && n.old.call(this), n.queue && J.dequeue(this, n.queue)
                }, n
            }, J.fn.extend({
                fadeTo: function(t, e, i, n) {
                    return this.filter(bt).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, i, n)
                },
                animate: function(t, e, i, n) {
                    var r = J.isEmptyObject(t),
                        s = J.speed(e, i, n),
                        o = function() {
                            var e = M(this, J.extend({}, t), s);
                            (r || mt.get(this, "finish")) && e.stop(!0)
                        };
                    return o.finish = o, r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
                },
                stop: function(t, e, i) {
                    var n = function(t) {
                        var e = t.stop;
                        delete t.stop, e(i)
                    };
                    return "string" != typeof t && (i = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                        var e = !0,
                            r = null != t && t + "queueHooks",
                            s = J.timers,
                            o = mt.get(this);
                        if (r) o[r] && o[r].stop && n(o[r]);
                        else
                            for (r in o) o[r] && o[r].stop && Qt.test(r) && n(o[r]);
                        for (r = s.length; r--;) s[r].elem !== this || null != t && s[r].queue !== t || (s[r].anim.stop(i), e = !1, s.splice(r, 1));
                        !e && i || J.dequeue(this, t)
                    })
                },
                finish: function(t) {
                    return !1 !== t && (t = t || "fx"), this.each(function() {
                        var e, i = mt.get(this),
                            n = i[t + "queue"],
                            r = i[t + "queueHooks"],
                            s = J.timers,
                            o = n ? n.length : 0;
                        for (i.finish = !0, J.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                        for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete i.finish
                    })
                }
            }), J.each(["toggle", "show", "hide"], function(t, e) {
                var i = J.fn[e];
                J.fn[e] = function(t, n, r) {
                    return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(E(e, !0), t, n, r)
                }
            }), J.each({
                slideDown: E("show"),
                slideUp: E("hide"),
                slideToggle: E("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                J.fn[t] = function(t, i, n) {
                    return this.animate(e, t, i, n)
                }
            }), J.timers = [], J.fx.tick = function() {
                var t, e = 0,
                    i = J.timers;
                for (Yt = J.now(); e < i.length; e++)(t = i[e])() || i[e] !== t || i.splice(e--, 1);
                i.length || J.fx.stop(), Yt = void 0
            }, J.fx.timer = function(t) {
                J.timers.push(t), t() ? J.fx.start() : J.timers.pop()
            }, J.fx.interval = 13, J.fx.start = function() {
                Vt || (Vt = setInterval(J.fx.tick, J.fx.interval))
            }, J.fx.stop = function() {
                clearInterval(Vt), Vt = null
            }, J.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, J.fn.delay = function(t, e) {
                return t = J.fx ? J.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                    var n = setTimeout(e, t);
                    i.stop = function() {
                        clearTimeout(n)
                    }
                })
            },
            function() {
                var t = Q.createElement("input"),
                    e = Q.createElement("select"),
                    i = e.appendChild(Q.createElement("option"));
                t.type = "checkbox", Z.checkOn = "" !== t.value, Z.optSelected = i.selected, e.disabled = !0, Z.optDisabled = !i.disabled, t = Q.createElement("input"), t.value = "t", t.type = "radio", Z.radioValue = "t" === t.value
            }();
        var te, ee = J.expr.attrHandle;
        J.fn.extend({
            attr: function(t, e) {
                return dt(this, J.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    J.removeAttr(this, t)
                })
            }
        }), J.extend({
            attr: function(t, e, i) {
                var n, r, s = t.nodeType;
                if (t && 3 !== s && 8 !== s && 2 !== s) return void 0 === t.getAttribute ? J.prop(t, e, i) : (1 === s && J.isXMLDoc(t) || (e = e.toLowerCase(), n = J.attrHooks[e] || (J.expr.match.bool.test(e) ? te : void 0)), void 0 === i ? n && "get" in n && null !== (r = n.get(t, e)) ? r : (r = J.find.attr(t, e), null == r ? void 0 : r) : null !== i ? n && "set" in n && void 0 !== (r = n.set(t, i, e)) ? r : (t.setAttribute(e, i + ""), i) : void J.removeAttr(t, e))
            },
            removeAttr: function(t, e) {
                var i, n, r = 0,
                    s = e && e.match(ct);
                if (s && 1 === t.nodeType)
                    for (; i = s[r++];) n = J.propFix[i] || i, J.expr.match.bool.test(i) && (t[n] = !1), t.removeAttribute(i)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!Z.radioValue && "radio" === e && J.nodeName(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e), i && (t.value = i), e
                        }
                    }
                }
            }
        }), te = {
            set: function(t, e, i) {
                return !1 === e ? J.removeAttr(t, i) : t.setAttribute(i, i), i
            }
        }, J.each(J.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var i = ee[e] || J.find.attr;
            ee[e] = function(t, e, n) {
                var r, s;
                return n || (s = ee[e], ee[e] = r, r = null != i(t, e, n) ? e.toLowerCase() : null, ee[e] = s), r
            }
        });
        var ie = /^(?:input|select|textarea|button)$/i;
        J.fn.extend({
            prop: function(t, e) {
                return dt(this, J.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return this.each(function() {
                    delete this[J.propFix[t] || t]
                })
            }
        }), J.extend({
            propFix: {
                for: "htmlFor",
                class: "className"
            },
            prop: function(t, e, i) {
                var n, r, s, o = t.nodeType;
                if (t && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !J.isXMLDoc(t), s && (e = J.propFix[e] || e, r = J.propHooks[e]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : t[e] = i : r && "get" in r && null !== (n = r.get(t, e)) ? n : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        return t.hasAttribute("tabindex") || ie.test(t.nodeName) || t.href ? t.tabIndex : -1
                    }
                }
            }
        }), Z.optSelected || (J.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            }
        }), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            J.propFix[this.toLowerCase()] = this
        });
        var ne = /[\t\r\n\f]/g;
        J.fn.extend({
            addClass: function(t) {
                var e, i, n, r, s, o, a = "string" == typeof t && t,
                    l = 0,
                    u = this.length;
                if (J.isFunction(t)) return this.each(function(e) {
                    J(this).addClass(t.call(this, e, this.className))
                });
                if (a)
                    for (e = (t || "").match(ct) || []; l < u; l++)
                        if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ne, " ") : " ")) {
                            for (s = 0; r = e[s++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                            o = J.trim(n), i.className !== o && (i.className = o)
                        }
                return this
            },
            removeClass: function(t) {
                var e, i, n, r, s, o, a = 0 === arguments.length || "string" == typeof t && t,
                    l = 0,
                    u = this.length;
                if (J.isFunction(t)) return this.each(function(e) {
                    J(this).removeClass(t.call(this, e, this.className))
                });
                if (a)
                    for (e = (t || "").match(ct) || []; l < u; l++)
                        if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ne, " ") : "")) {
                            for (s = 0; r = e[s++];)
                                for (; n.indexOf(" " + r + " ") >= 0;) n = n.replace(" " + r + " ", " ");
                            o = t ? J.trim(n) : "", i.className !== o && (i.className = o)
                        }
                return this
            },
            toggleClass: function(t, e) {
                var i = typeof t;
                return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : J.isFunction(t) ? this.each(function(i) {
                    J(this).toggleClass(t.call(this, i, this.className, e), e)
                }) : this.each(function() {
                    if ("string" === i)
                        for (var e, n = 0, r = J(this), s = t.match(ct) || []; e = s[n++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                    else "undefined" !== i && "boolean" !== i || (this.className && mt.set(this, "__className__", this.className), this.className = this.className || !1 === t ? "" : mt.get(this, "__className__") || "")
                })
            },
            hasClass: function(t) {
                for (var e = " " + t + " ", i = 0, n = this.length; i < n; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(ne, " ").indexOf(e) >= 0) return !0;
                return !1
            }
        });
        var re = /\r/g;
        J.fn.extend({
            val: function(t) {
                var e, i, n, r = this[0]; {
                    if (arguments.length) return n = J.isFunction(t), this.each(function(i) {
                        var r;
                        1 === this.nodeType && (r = n ? t.call(this, i, J(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : J.isArray(r) && (r = J.map(r, function(t) {
                            return null == t ? "" : t + ""
                        })), (e = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                    });
                    if (r) return (e = J.valHooks[r.type] || J.valHooks[r.nodeName.toLowerCase()]) && "get" in e && void 0 !== (i = e.get(r, "value")) ? i : (i = r.value, "string" == typeof i ? i.replace(re, "") : null == i ? "" : i)
                }
            }
        }), J.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = J.find.attr(t, "value");
                        return null != e ? e : J.trim(J.text(t))
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, i, n = t.options, r = t.selectedIndex, s = "select-one" === t.type || r < 0, o = s ? null : [], a = s ? r + 1 : n.length, l = r < 0 ? a : s ? r : 0; l < a; l++)
                            if (i = n[l], (i.selected || l === r) && (Z.optDisabled ? !i.disabled : null === i.getAttribute("disabled")) && (!i.parentNode.disabled || !J.nodeName(i.parentNode, "optgroup"))) {
                                if (e = J(i).val(), s) return e;
                                o.push(e)
                            }
                        return o
                    },
                    set: function(t, e) {
                        for (var i, n, r = t.options, s = J.makeArray(e), o = r.length; o--;) n = r[o], (n.selected = J.inArray(n.value, s) >= 0) && (i = !0);
                        return i || (t.selectedIndex = -1), s
                    }
                }
            }
        }), J.each(["radio", "checkbox"], function() {
            J.valHooks[this] = {
                set: function(t, e) {
                    if (J.isArray(e)) return t.checked = J.inArray(J(t).val(), e) >= 0
                }
            }, Z.checkOn || (J.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            J.fn[e] = function(t, i) {
                return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
            }
        }), J.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            },
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            }
        });
        var se = J.now(),
            oe = /\?/;
        J.parseJSON = function(t) {
            return JSON.parse(t + "")
        }, J.parseXML = function(t) {
            var e, i;
            if (!t || "string" != typeof t) return null;
            try {
                i = new DOMParser, e = i.parseFromString(t, "text/xml")
            } catch (t) {
                e = void 0
            }
            return e && !e.getElementsByTagName("parsererror").length || J.error("Invalid XML: " + t), e
        };
        var ae = /#.*$/,
            le = /([?&])_=[^&]*/,
            ue = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            he = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            ce = /^(?:GET|HEAD)$/,
            fe = /^\/\//,
            pe = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            de = {},
            me = {},
            ge = "*/".concat("*"),
            _e = t.location.href,
            ve = pe.exec(_e.toLowerCase()) || [];
        J.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: _e,
                type: "GET",
                isLocal: he.test(ve[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": ge,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": J.parseJSON,
                    "text xml": J.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? I(I(t, J.ajaxSettings), e) : I(J.ajaxSettings, t)
            },
            ajaxPrefilter: j(de),
            ajaxTransport: j(me),
            ajax: function(t, e) {
                function i(t, e, i, o) {
                    var l, h, _, v, x, w = e;
                    2 !== y && (y = 2, a && clearTimeout(a), n = void 0, s = o || "", b.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, i && (v = F(c, b, i)), v = B(c, v, b, l), l ? (c.ifModified && (x = b.getResponseHeader("Last-Modified"), x && (J.lastModified[r] = x), (x = b.getResponseHeader("etag")) && (J.etag[r] = x)), 204 === t || "HEAD" === c.type ? w = "nocontent" : 304 === t ? w = "notmodified" : (w = v.state, h = v.data, _ = v.error, l = !_)) : (_ = w, !t && w || (w = "error", t < 0 && (t = 0))), b.status = t, b.statusText = (e || w) + "", l ? d.resolveWith(f, [h, w, b]) : d.rejectWith(f, [b, w, _]), b.statusCode(g), g = void 0, u && p.trigger(l ? "ajaxSuccess" : "ajaxError", [b, c, l ? h : _]), m.fireWith(f, [b, w]), u && (p.trigger("ajaxComplete", [b, c]), --J.active || J.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (e = t, t = void 0), e = e || {};
                var n, r, s, o, a, l, u, h, c = J.ajaxSetup({}, e),
                    f = c.context || c,
                    p = c.context && (f.nodeType || f.jquery) ? J(f) : J.event,
                    d = J.Deferred(),
                    m = J.Callbacks("once memory"),
                    g = c.statusCode || {},
                    _ = {},
                    v = {},
                    y = 0,
                    x = "canceled",
                    b = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === y) {
                                if (!o)
                                    for (o = {}; e = ue.exec(s);) o[e[1].toLowerCase()] = e[2];
                                e = o[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return 2 === y ? s : null
                        },
                        setRequestHeader: function(t, e) {
                            var i = t.toLowerCase();
                            return y || (t = v[i] = v[i] || t, _[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return y || (c.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (y < 2)
                                    for (e in t) g[e] = [g[e], t[e]];
                                else b.always(t[b.status]);
                            return this
                        },
                        abort: function(t) {
                            var e = t || x;
                            return n && n.abort(e), i(0, e), this
                        }
                    };
                if (d.promise(b).complete = m.add, b.success = b.done, b.error = b.fail, c.url = ((t || c.url || _e) + "").replace(ae, "").replace(fe, ve[1] + "//"), c.type = e.method || e.type || c.method || c.type, c.dataTypes = J.trim(c.dataType || "*").toLowerCase().match(ct) || [""], null == c.crossDomain && (l = pe.exec(c.url.toLowerCase()), c.crossDomain = !(!l || l[1] === ve[1] && l[2] === ve[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (ve[3] || ("http:" === ve[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = J.param(c.data, c.traditional)), L(de, c, e, b), 2 === y) return b;
                u = J.event && c.global, u && 0 == J.active++ && J.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !ce.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (oe.test(r) ? "&" : "?") + c.data, delete c.data), !1 === c.cache && (c.url = le.test(r) ? r.replace(le, "$1_=" + se++) : r + (oe.test(r) ? "&" : "?") + "_=" + se++)), c.ifModified && (J.lastModified[r] && b.setRequestHeader("If-Modified-Since", J.lastModified[r]), J.etag[r] && b.setRequestHeader("If-None-Match", J.etag[r])), (c.data && c.hasContent && !1 !== c.contentType || e.contentType) && b.setRequestHeader("Content-Type", c.contentType), b.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + ge + "; q=0.01" : "") : c.accepts["*"]);
                for (h in c.headers) b.setRequestHeader(h, c.headers[h]);
                if (c.beforeSend && (!1 === c.beforeSend.call(f, b, c) || 2 === y)) return b.abort();
                x = "abort";
                for (h in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) b[h](c[h]);
                if (n = L(me, c, e, b)) {
                    b.readyState = 1, u && p.trigger("ajaxSend", [b, c]), c.async && c.timeout > 0 && (a = setTimeout(function() {
                        b.abort("timeout")
                    }, c.timeout));
                    try {
                        y = 1, n.send(_, i)
                    } catch (t) {
                        if (!(y < 2)) throw t;
                        i(-1, t)
                    }
                } else i(-1, "No Transport");
                return b
            },
            getJSON: function(t, e, i) {
                return J.get(t, e, i, "json")
            },
            getScript: function(t, e) {
                return J.get(t, void 0, e, "script")
            }
        }), J.each(["get", "post"], function(t, e) {
            J[e] = function(t, i, n, r) {
                return J.isFunction(i) && (r = r || n, n = i, i = void 0), J.ajax({
                    url: t,
                    type: e,
                    dataType: r,
                    data: i,
                    success: n
                })
            }
        }), J._evalUrl = function(t) {
            return J.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        }, J.fn.extend({
            wrapAll: function(t) {
                var e;
                return J.isFunction(t) ? this.each(function(e) {
                    J(this).wrapAll(t.call(this, e))
                }) : (this[0] && (e = J(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this)
            },
            wrapInner: function(t) {
                return J.isFunction(t) ? this.each(function(e) {
                    J(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = J(this),
                        i = e.contents();
                    i.length ? i.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = J.isFunction(t);
                return this.each(function(i) {
                    J(this).wrapAll(e ? t.call(this, i) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
                }).end()
            }
        }), J.expr.filters.hidden = function(t) {
            return t.offsetWidth <= 0 && t.offsetHeight <= 0
        }, J.expr.filters.visible = function(t) {
            return !J.expr.filters.hidden(t)
        };
        var ye = /%20/g,
            xe = /\[\]$/,
            be = /\r?\n/g,
            we = /^(?:submit|button|image|reset|file)$/i,
            Te = /^(?:input|select|textarea|keygen)/i;
        J.param = function(t, e) {
            var i, n = [],
                r = function(t, e) {
                    e = J.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (void 0 === e && (e = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(t) || t.jquery && !J.isPlainObject(t)) J.each(t, function() {
                r(this.name, this.value)
            });
            else
                for (i in t) H(i, t[i], e, r);
            return n.join("&").replace(ye, "+")
        }, J.fn.extend({
            serialize: function() {
                return J.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = J.prop(this, "elements");
                    return t ? J.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !J(this).is(":disabled") && Te.test(this.nodeName) && !we.test(t) && (this.checked || !wt.test(t))
                }).map(function(t, e) {
                    var i = J(this).val();
                    return null == i ? null : J.isArray(i) ? J.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(be, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(be, "\r\n")
                    }
                }).get()
            }
        }), J.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (t) {}
        };
        var Se = 0,
            Pe = {},
            ke = {
                0: 200,
                1223: 204
            },
            Ce = J.ajaxSettings.xhr();
        t.attachEvent && t.attachEvent("onunload", function() {
            for (var t in Pe) Pe[t]()
        }), Z.cors = !!Ce && "withCredentials" in Ce, Z.ajax = Ce = !!Ce, J.ajaxTransport(function(t) {
            var e;
            if (Z.cors || Ce && !t.crossDomain) return {
                send: function(i, n) {
                    var r, s = t.xhr(),
                        o = ++Se;
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (r in t.xhrFields) s[r] = t.xhrFields[r];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (r in i) s.setRequestHeader(r, i[r]);
                    e = function(t) {
                        return function() {
                            e && (delete Pe[o], e = s.onload = s.onerror = null, "abort" === t ? s.abort() : "error" === t ? n(s.status, s.statusText) : n(ke[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                                text: s.responseText
                            } : void 0, s.getAllResponseHeaders()))
                        }
                    }, s.onload = e(), s.onerror = e("error"), e = Pe[o] = e("abort");
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (t) {
                        if (e) throw t
                    }
                },
                abort: function() {
                    e && e()
                }
            }
        }), J.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(t) {
                    return J.globalEval(t), t
                }
            }
        }), J.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), J.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var e, i;
                return {
                    send: function(n, r) {
                        e = J("<script>").prop({
                            async: !0,
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", i = function(t) {
                            e.remove(), i = null, t && r("error" === t.type ? 404 : 200, t.type)
                        }), Q.head.appendChild(e[0])
                    },
                    abort: function() {
                        i && i()
                    }
                }
            }
        });
        var Oe = [],
            Ae = /(=)\?(?=&|$)|\?\?/;
        J.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Oe.pop() || J.expando + "_" + se++;
                return this[t] = !0, t
            }
        }), J.ajaxPrefilter("json jsonp", function(e, i, n) {
            var r, s, o, a = !1 !== e.jsonp && (Ae.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ae.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = J.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ae, "$1" + r) : !1 !== e.jsonp && (e.url += (oe.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                return o || J.error(r + " was not called"), o[0]
            }, e.dataTypes[0] = "json", s = t[r], t[r] = function() {
                o = arguments
            }, n.always(function() {
                t[r] = s, e[r] && (e.jsonpCallback = i.jsonpCallback, Oe.push(r)), o && J.isFunction(s) && s(o[0]), o = s = void 0
            }), "script"
        }), J.parseHTML = function(t, e, i) {
            if (!t || "string" != typeof t) return null;
            "boolean" == typeof e && (i = e, e = !1), e = e || Q;
            var n = st.exec(t),
                r = !i && [];
            return n ? [e.createElement(n[1])] : (n = J.buildFragment([t], e, r), r && r.length && J(r).remove(), J.merge([], n.childNodes))
        };
        var Ee = J.fn.load;
        J.fn.load = function(t, e, i) {
            if ("string" != typeof t && Ee) return Ee.apply(this, arguments);
            var n, r, s, o = this,
                a = t.indexOf(" ");
            return a >= 0 && (n = J.trim(t.slice(a)), t = t.slice(0, a)), J.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (r = "POST"), o.length > 0 && J.ajax({
                url: t,
                type: r,
                dataType: "html",
                data: e
            }).done(function(t) {
                s = arguments, o.html(n ? J("<div>").append(J.parseHTML(t)).find(n) : t)
            }).complete(i && function(t, e) {
                o.each(i, s || [t.responseText, e, t])
            }), this
        }, J.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            J.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), J.expr.filters.animated = function(t) {
            return J.grep(J.timers, function(e) {
                return t === e.elem
            }).length
        };
        var Re = t.document.documentElement;
        J.offset = {
            setOffset: function(t, e, i) {
                var n, r, s, o, a, l, u, h = J.css(t, "position"),
                    c = J(t),
                    f = {};
                "static" === h && (t.style.position = "relative"), a = c.offset(), s = J.css(t, "top"), l = J.css(t, "left"), u = ("absolute" === h || "fixed" === h) && (s + l).indexOf("auto") > -1, u ? (n = c.position(), o = n.top, r = n.left) : (o = parseFloat(s) || 0, r = parseFloat(l) || 0), J.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (f.top = e.top - a.top + o), null != e.left && (f.left = e.left - a.left + r), "using" in e ? e.using.call(t, f) : c.css(f)
            }
        }, J.fn.extend({
            offset: function(t) {
                if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                    J.offset.setOffset(this, t, e)
                });
                var e, i, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    },
                    s = n && n.ownerDocument;
                if (s) return e = s.documentElement, J.contains(e, n) ? (void 0 !== n.getBoundingClientRect && (r = n.getBoundingClientRect()), i = z(s), {
                    top: r.top + i.pageYOffset - e.clientTop,
                    left: r.left + i.pageXOffset - e.clientLeft
                }) : r
            },
            position: function() {
                if (this[0]) {
                    var t, e, i = this[0],
                        n = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === J.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), J.nodeName(t[0], "html") || (n = t.offset()), n.top += J.css(t[0], "borderTopWidth", !0), n.left += J.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - n.top - J.css(i, "marginTop", !0),
                        left: e.left - n.left - J.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || Re; t && !J.nodeName(t, "html") && "static" === J.css(t, "position");) t = t.offsetParent;
                    return t || Re
                })
            }
        }), J.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, i) {
            var n = "pageYOffset" === i;
            J.fn[e] = function(r) {
                return dt(this, function(e, r, s) {
                    var o = z(e);
                    if (void 0 === s) return o ? o[i] : e[r];
                    o ? o.scrollTo(n ? t.pageXOffset : s, n ? s : t.pageYOffset) : e[r] = s
                }, e, r, arguments.length, null)
            }
        }), J.each(["top", "left"], function(t, e) {
            J.cssHooks[e] = w(Z.pixelPosition, function(t, i) {
                if (i) return i = b(t, e), Bt.test(i) ? J(t).position()[e] + "px" : i
            })
        }), J.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            J.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(i, n) {
                J.fn[n] = function(n, r) {
                    var s = arguments.length && (i || "boolean" != typeof n),
                        o = i || (!0 === n || !0 === r ? "margin" : "border");
                    return dt(this, function(e, i, n) {
                        var r;
                        return J.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === n ? J.css(e, i, o) : J.style(e, i, n, o)
                    }, e, s ? n : void 0, s, null)
                }
            })
        }), J.fn.size = function() {
            return this.length
        }, J.fn.andSelf = J.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return J
        });
        var De = t.jQuery,
            Ne = t.$;
        return J.noConflict = function(e) {
            return t.$ === J && (t.$ = Ne), e && t.jQuery === J && (t.jQuery = De), J
        }, void 0 === e && (t.jQuery = t.$ = J), J
    }),
    function(t, e) {
        if ("function" == typeof define && define.amd) define("backbone", ["underscore", "jquery", "exports"], function(i, n, r) {
            t.Backbone = e(t, r, i, n)
        });
        else if ("undefined" != typeof exports) {
            var i, n = require("underscore");
            try {
                i = require("jquery")
            } catch (t) {}
            e(t, exports, n, i)
        } else t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
    }(this, function(t, e, i, n) {
        var r = t.Backbone,
            s = [],
            o = s.slice;
        e.VERSION = "1.1.0", e.$ = n, e.noConflict = function() {
            return t.Backbone = r, this
        }, e.emulateHTTP = !1, e.emulateJSON = !1;
        var a = e.Events = {
                on: function(t, e, i) {
                    return u(this, "on", t, [e, i]) && e ? (this._events || (this._events = {}), (this._events[t] || (this._events[t] = [])).push({
                        callback: e,
                        context: i,
                        ctx: i || this
                    }), this) : this
                },
                once: function(t, e, n) {
                    if (!u(this, "once", t, [e, n]) || !e) return this;
                    var r = this,
                        s = i.once(function() {
                            r.off(t, s), e.apply(this, arguments)
                        });
                    return s._callback = e, this.on(t, s, n)
                },
                off: function(t, e, n) {
                    var r, s, o, a, l, h, c, f;
                    if (!this._events || !u(this, "off", t, [e, n])) return this;
                    if (!t && !e && !n) return this._events = void 0, this;
                    for (a = t ? [t] : i.keys(this._events), l = 0, h = a.length; l < h; l++)
                        if (t = a[l], o = this._events[t]) {
                            if (this._events[t] = r = [], e || n)
                                for (c = 0, f = o.length; c < f; c++) s = o[c], (e && e !== s.callback && e !== s.callback._callback || n && n !== s.context) && r.push(s);
                            r.length || delete this._events[t]
                        }
                    return this
                },
                trigger: function(t) {
                    if (!this._events) return this;
                    var e = o.call(arguments, 1);
                    if (!u(this, "trigger", t, e)) return this;
                    var i = this._events[t],
                        n = this._events.all;
                    return i && h(i, e), n && h(n, arguments), this
                },
                stopListening: function(t, e, n) {
                    var r = this._listeningTo;
                    if (!r) return this;
                    var s = !e && !n;
                    n || "object" != typeof e || (n = this), t && ((r = {})[t._listenId] = t);
                    for (var o in r) t = r[o], t.off(e, n, this), (s || i.isEmpty(t._events)) && delete this._listeningTo[o];
                    return this
                }
            },
            l = /\s+/,
            u = function(t, e, i, n) {
                if (!i) return !0;
                if ("object" == typeof i) {
                    for (var r in i) t[e].apply(t, [r, i[r]].concat(n));
                    return !1
                }
                if (l.test(i)) {
                    for (var s = i.split(l), o = 0, a = s.length; o < a; o++) t[e].apply(t, [s[o]].concat(n));
                    return !1
                }
                return !0
            },
            h = function(t, e) {
                var i, n = -1,
                    r = t.length,
                    s = e[0],
                    o = e[1],
                    a = e[2];
                switch (e.length) {
                    case 0:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx);
                        return;
                    case 1:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s);
                        return;
                    case 2:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s, o);
                        return;
                    case 3:
                        for (; ++n < r;)(i = t[n]).callback.call(i.ctx, s, o, a);
                        return;
                    default:
                        for (; ++n < r;)(i = t[n]).callback.apply(i.ctx, e)
                }
            },
            c = {
                listenTo: "on",
                listenToOnce: "once"
            };
        i.each(c, function(t, e) {
            a[e] = function(e, n, r) {
                return (this._listeningTo || (this._listeningTo = {}))[e._listenId || (e._listenId = i.uniqueId("l"))] = e, r || "object" != typeof n || (r = this), e[t](n, r, this), this
            }
        }), a.bind = a.on, a.unbind = a.off, i.extend(e, a);
        var f = e.Model = function(t, e) {
            var n = t || {};
            e || (e = {}), this.cid = i.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {}), n = i.defaults({}, n, i.result(this, "defaults")), this.set(n, e), this.changed = {}, this.initialize.apply(this, arguments)
        };
        i.extend(f.prototype, a, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function(t) {
                return i.clone(this.attributes)
            },
            sync: function() {
                return e.sync.apply(this, arguments)
            },
            get: function(t) {
                return this.attributes[t]
            },
            escape: function(t) {
                return i.escape(this.get(t))
            },
            has: function(t) {
                return null != this.get(t)
            },
            set: function(t, e, n) {
                var r, s, o, a, l, u, h, c;
                if (null == t) return this;
                if ("object" == typeof t ? (s = t, n = e) : (s = {})[t] = e, n || (n = {}), !this._validate(s, n)) return !1;
                o = n.unset, l = n.silent, a = [], u = this._changing, this._changing = !0, u || (this._previousAttributes = i.clone(this.attributes), this.changed = {}), c = this.attributes, h = this._previousAttributes, this.idAttribute in s && (this.id = s[this.idAttribute]);
                for (r in s) e = s[r], i.isEqual(c[r], e) || a.push(r), i.isEqual(h[r], e) ? delete this.changed[r] : this.changed[r] = e, o ? delete c[r] : c[r] = e;
                if (!l) {
                    a.length && (this._pending = n);
                    for (var f = 0, p = a.length; f < p; f++) this.trigger("change:" + a[f], this, c[a[f]], n)
                }
                if (u) return this;
                if (!l)
                    for (; this._pending;) n = this._pending, this._pending = !1, this.trigger("change", this, n);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function(t, e) {
                return this.set(t, void 0, i.extend({}, e, {
                    unset: !0
                }))
            },
            clear: function(t) {
                var e = {};
                for (var n in this.attributes) e[n] = void 0;
                return this.set(e, i.extend({}, t, {
                    unset: !0
                }))
            },
            hasChanged: function(t) {
                return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
            },
            changedAttributes: function(t) {
                if (!t) return !!this.hasChanged() && i.clone(this.changed);
                var e, n = !1,
                    r = this._changing ? this._previousAttributes : this.attributes;
                for (var s in t) i.isEqual(r[s], e = t[s]) || ((n || (n = {}))[s] = e);
                return n
            },
            previous: function(t) {
                return null != t && this._previousAttributes ? this._previousAttributes[t] : null
            },
            previousAttributes: function() {
                return i.clone(this._previousAttributes)
            },
            fetch: function(t) {
                t = t ? i.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                var e = this,
                    n = t.success;
                return t.success = function(i) {
                    if (!e.set(e.parse(i, t), t)) return !1;
                    n && n(e, i, t), e.trigger("sync", e, i, t)
                }, I(this, t), this.sync("read", this, t)
            },
            save: function(t, e, n) {
                var r, s, o, a = this.attributes;
                if (null == t || "object" == typeof t ? (r = t, n = e) : (r = {})[t] = e, n = i.extend({
                        validate: !0
                    }, n), r && !n.wait) {
                    if (!this.set(r, n)) return !1
                } else if (!this._validate(r, n)) return !1;
                r && n.wait && (this.attributes = i.extend({}, a, r)), void 0 === n.parse && (n.parse = !0);
                var l = this,
                    u = n.success;
                return n.success = function(t) {
                    l.attributes = a;
                    var e = l.parse(t, n);
                    if (n.wait && (e = i.extend(r || {}, e)), i.isObject(e) && !l.set(e, n)) return !1;
                    u && u(l, t, n), l.trigger("sync", l, t, n)
                }, I(this, n), s = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === s && (n.attrs = r), o = this.sync(s, this, n), r && n.wait && (this.attributes = a), o
            },
            destroy: function(t) {
                t = t ? i.clone(t) : {};
                var e = this,
                    n = t.success,
                    r = function() {
                        e.trigger("destroy", e, e.collection, t)
                    };
                if (t.success = function(i) {
                        (t.wait || e.isNew()) && r(), n && n(e, i, t), e.isNew() || e.trigger("sync", e, i, t)
                    }, this.isNew()) return t.success(), !1;
                I(this, t);
                var s = this.sync("delete", this, t);
                return t.wait || r(), s
            },
            url: function() {
                var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || L();
                return this.isNew() ? t : t + ("/" === t.charAt(t.length - 1) ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function(t, e) {
                return t
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return !this.has(this.idAttribute)
            },
            isValid: function(t) {
                return this._validate({}, i.extend(t || {}, {
                    validate: !0
                }))
            },
            _validate: function(t, e) {
                if (!e.validate || !this.validate) return !0;
                t = i.extend({}, this.attributes, t);
                var n = this.validationError = this.validate(t, e) || null;
                return !n || (this.trigger("invalid", this, n, i.extend(e, {
                    validationError: n
                })), !1)
            }
        });
        var p = ["keys", "values", "pairs", "invert", "pick", "omit"];
        i.each(p, function(t) {
            f.prototype[t] = function() {
                var e = o.call(arguments);
                return e.unshift(this.attributes), i[t].apply(i, e)
            }
        });
        var d = e.Collection = function(t, e) {
                e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, i.extend({
                    silent: !0
                }, e))
            },
            m = {
                add: !0,
                remove: !0,
                merge: !0
            },
            g = {
                add: !0,
                remove: !1
            };
        i.extend(d.prototype, a, {
            model: f,
            initialize: function() {},
            toJSON: function(t) {
                return this.map(function(e) {
                    return e.toJSON(t)
                })
            },
            sync: function() {
                return e.sync.apply(this, arguments)
            },
            add: function(t, e) {
                return this.set(t, i.extend({
                    merge: !1
                }, e, g))
            },
            remove: function(t, e) {
                var n = !i.isArray(t);
                t = n ? [t] : i.clone(t), e || (e = {});
                var r, s, o, a;
                for (r = 0, s = t.length; r < s; r++)(a = t[r] = this.get(t[r])) && (o = this.indexOf(a), this.models.splice(o, 1), this.length--, e.silent || (e.index = o, a.trigger("remove", a, this, e)), this._removeReference(a, e));
                return n ? t[0] : t
            },
            set: function(t, e) {
                e = i.defaults({}, e, m), e.parse && (t = this.parse(t, e));
                var n = !i.isArray(t);
                t = n ? t ? [t] : [] : i.clone(t);
                var r, s, o, a, l, u, h, c = e.at,
                    p = this.model,
                    d = this.comparator && null == c && !1 !== e.sort,
                    g = i.isString(this.comparator) ? this.comparator : null,
                    _ = [],
                    v = [],
                    y = {},
                    x = e.add,
                    b = e.merge,
                    w = e.remove,
                    T = !(d || !x || !w) && [];
                for (r = 0, s = t.length; r < s; r++) {
                    if (l = t[r] || {}, o = l instanceof f ? a = l : l[p.prototype.idAttribute || "id"], u = this.get(o)) w && (y[u.cid] = !0), b && (l = l === a ? a.attributes : l, e.parse && (l = u.parse(l, e)), u.set(l, e), d && !h && u.hasChanged(g) && (h = !0)), t[r] = u;
                    else if (x) {
                        if (!(a = t[r] = this._prepareModel(l, e))) continue;
                        _.push(a), this._addReference(a, e)
                    }
                    T && T.push(u || a)
                }
                if (w) {
                    for (r = 0, s = this.length; r < s; ++r) y[(a = this.models[r]).cid] || v.push(a);
                    v.length && this.remove(v, e)
                }
                if (_.length || T && T.length)
                    if (d && (h = !0), this.length += _.length, null != c)
                        for (r = 0, s = _.length; r < s; r++) this.models.splice(c + r, 0, _[r]);
                    else {
                        T && (this.models.length = 0);
                        var S = T || _;
                        for (r = 0, s = S.length; r < s; r++) this.models.push(S[r])
                    }
                if (h && this.sort({
                        silent: !0
                    }), !e.silent) {
                    for (r = 0, s = _.length; r < s; r++)(a = _[r]).trigger("add", a, this, e);
                    (h || T && T.length) && this.trigger("sort", this, e)
                }
                return n ? t[0] : t
            },
            reset: function(t, e) {
                e || (e = {});
                for (var n = 0, r = this.models.length; n < r; n++) this._removeReference(this.models[n], e);
                return e.previousModels = this.models, this._reset(), t = this.add(t, i.extend({
                    silent: !0
                }, e)), e.silent || this.trigger("reset", this, e), t
            },
            push: function(t, e) {
                return this.add(t, i.extend({
                    at: this.length
                }, e))
            },
            pop: function(t) {
                var e = this.at(this.length - 1);
                return this.remove(e, t), e
            },
            unshift: function(t, e) {
                return this.add(t, i.extend({
                    at: 0
                }, e))
            },
            shift: function(t) {
                var e = this.at(0);
                return this.remove(e, t), e
            },
            slice: function() {
                return o.apply(this.models, arguments)
            },
            get: function(t) {
                if (null != t) return this._byId[t] || this._byId[t.id] || this._byId[t.cid]
            },
            at: function(t) {
                return this.models[t]
            },
            where: function(t, e) {
                return i.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) {
                    for (var i in t)
                        if (t[i] !== e.get(i)) return !1;
                    return !0
                })
            },
            findWhere: function(t) {
                return this.where(t, !0)
            },
            sort: function(t) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return t || (t = {}), i.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(i.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
            },
            pluck: function(t) {
                return i.invoke(this.models, "get", t)
            },
            fetch: function(t) {
                t = t ? i.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
                var e = t.success,
                    n = this;
                return t.success = function(i) {
                    var r = t.reset ? "reset" : "set";
                    n[r](i, t), e && e(n, i, t), n.trigger("sync", n, i, t)
                }, I(this, t), this.sync("read", this, t)
            },
            create: function(t, e) {
                if (e = e ? i.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
                e.wait || this.add(t, e);
                var n = this,
                    r = e.success;
                return e.success = function(t, i) {
                    e.wait && n.add(t, e), r && r(t, i, e)
                }, t.save(null, e), t
            },
            parse: function(t, e) {
                return t
            },
            clone: function() {
                return new this.constructor(this.models)
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function(t, e) {
                if (t instanceof f) return t;
                e = e ? i.clone(e) : {}, e.collection = this;
                var n = new this.model(t, e);
                return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
            },
            _addReference: function(t, e) {
                this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this)
            },
            _removeReference: function(t, e) {
                delete this._byId[t.id], delete this._byId[t.cid], this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(t, e, i, n) {
                ("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
            }
        });
        var _ = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
        i.each(_, function(t) {
            d.prototype[t] = function() {
                var e = o.call(arguments);
                return e.unshift(this.models), i[t].apply(i, e)
            }
        });
        var v = ["groupBy", "countBy", "sortBy", "indexBy"];
        i.each(v, function(t) {
            d.prototype[t] = function(e, n) {
                var r = i.isFunction(e) ? e : function(t) {
                    return t.get(e)
                };
                return i[t](this.models, r, n)
            }
        });
        var y = e.View = function(t) {
                this.cid = i.uniqueId("view"), t || (t = {}), i.extend(this, i.pick(t, b)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
            },
            x = /^(\S+)\s*(.*)$/,
            b = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        i.extend(y.prototype, a, {
            tagName: "div",
            $: function(t) {
                return this.$el.find(t)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(), this.stopListening(), this
            },
            setElement: function(t, i) {
                return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], !1 !== i && this.delegateEvents(), this
            },
            delegateEvents: function(t) {
                if (!t && !(t = i.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var e in t) {
                    var n = t[e];
                    if (i.isFunction(n) || (n = this[t[e]]), n) {
                        var r = e.match(x),
                            s = r[1],
                            o = r[2];
                        n = i.bind(n, this), s += ".delegateEvents" + this.cid, "" === o ? this.$el.on(s, n) : this.$el.on(s, o, n)
                    }
                }
                return this
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this
            },
            _ensureElement: function() {
                if (this.el) this.setElement(i.result(this, "el"), !1);
                else {
                    var t = i.extend({}, i.result(this, "attributes"));
                    this.id && (t.id = i.result(this, "id")), this.className && (t.class = i.result(this, "className"));
                    var n = e.$("<" + i.result(this, "tagName") + ">").attr(t);
                    this.setElement(n, !1)
                }
            }
        }), e.sync = function(t, n, r) {
            var s = T[t];
            i.defaults(r || (r = {}), {
                emulateHTTP: e.emulateHTTP,
                emulateJSON: e.emulateJSON
            });
            var o = {
                type: s,
                dataType: "json"
            };
            if (r.url || (o.url = i.result(n, "url") || L()), null != r.data || !n || "create" !== t && "update" !== t && "patch" !== t || (o.contentType = "application/json", o.data = JSON.stringify(r.attrs || n.toJSON(r))), r.emulateJSON && (o.contentType = "application/x-www-form-urlencoded", o.data = o.data ? {
                    model: o.data
                } : {}), r.emulateHTTP && ("PUT" === s || "DELETE" === s || "PATCH" === s)) {
                o.type = "POST", r.emulateJSON && (o.data._method = s);
                var a = r.beforeSend;
                r.beforeSend = function(t) {
                    if (t.setRequestHeader("X-HTTP-Method-Override", s), a) return a.apply(this, arguments)
                }
            }
            "GET" === o.type || r.emulateJSON || (o.processData = !1), "PATCH" === o.type && w && (o.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            });
            var l = r.xhr = e.ajax(i.extend(o, r));
            return n.trigger("request", n, l, r), l
        };
        var w = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
            T = {
                create: "POST",
                update: "PUT",
                patch: "PATCH",
                delete: "DELETE",
                read: "GET"
            };
        e.ajax = function() {
            return e.$.ajax.apply(e.$, arguments)
        };
        var S = e.Router = function(t) {
                t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            P = /\((.*?)\)/g,
            k = /(\(\?)?:\w+/g,
            C = /\*\w+/g,
            O = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        i.extend(S.prototype, a, {
            initialize: function() {},
            route: function(t, n, r) {
                i.isRegExp(t) || (t = this._routeToRegExp(t)), i.isFunction(n) && (r = n, n = ""), r || (r = this[n]);
                var s = this;
                return e.history.route(t, function(i) {
                    var o = s._extractParameters(t, i);
                    r && r.apply(s, o), s.trigger.apply(s, ["route:" + n].concat(o)), s.trigger("route", n, o), e.history.trigger("route", s, n, o)
                }), this
            },
            navigate: function(t, i) {
                return e.history.navigate(t, i), this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = i.result(this, "routes");
                    for (var t, e = i.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
                }
            },
            _routeToRegExp: function(t) {
                return t = t.replace(O, "\\$&").replace(P, "(?:$1)?").replace(k, function(t, e) {
                    return e ? t : "([^/]+)"
                }).replace(C, "(.*?)"), new RegExp("^" + t + "$")
            },
            _extractParameters: function(t, e) {
                var n = t.exec(e).slice(1);
                return i.map(n, function(t) {
                    return t ? decodeURIComponent(t) : null
                })
            }
        });
        var A = e.History = function() {
                this.handlers = [], i.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            },
            E = /^[#\/]|\s+$/g,
            R = /^\/+|\/+$/g,
            D = /msie [\w.]+/,
            N = /\/$/,
            M = /[?#].*$/;
        A.started = !1, i.extend(A.prototype, a, {
            interval: 50,
            getHash: function(t) {
                var e = (t || this).location.href.match(/#(.*)$/);
                return e ? e[1] : ""
            },
            getFragment: function(t, e) {
                if (null == t)
                    if (this._hasPushState || !this._wantsHashChange || e) {
                        t = this.location.pathname;
                        var i = this.root.replace(N, "");
                        t.indexOf(i) || (t = t.slice(i.length))
                    } else t = this.getHash();
                return t.replace(E, "")
            },
            start: function(t) {
                if (A.started) throw new Error("Backbone.history has already been started");
                A.started = !0, this.options = i.extend({
                    root: "/"
                }, this.options, t), this.root = this.options.root, this._wantsHashChange = !1 !== this.options.hashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var n = this.getFragment(),
                    r = document.documentMode,
                    s = D.exec(navigator.userAgent.toLowerCase()) && (!r || r <= 7);
                this.root = ("/" + this.root + "/").replace(R, "/"), s && this._wantsHashChange && (this.iframe = e.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(n)), this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !s ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = n;
                var o = this.location,
                    a = o.pathname.replace(/[^\/]$/, "$&/") === this.root;
                if (this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !a) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
                    this._hasPushState && a && o.hash && (this.fragment = this.getHash().replace(E, ""), this.history.replaceState({}, document.title, this.root + this.fragment + o.search))
                }
                if (!this.options.silent) return this.loadUrl()
            },
            stop: function() {
                e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), A.started = !1
            },
            route: function(t, e) {
                this.handlers.unshift({
                    route: t,
                    callback: e
                })
            },
            checkUrl: function(t) {
                var e = this.getFragment();
                if (e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe))), e === this.fragment) return !1;
                this.iframe && this.navigate(e), this.loadUrl()
            },
            loadUrl: function(t) {
                return t = this.fragment = this.getFragment(t), i.any(this.handlers, function(e) {
                    if (e.route.test(t)) return e.callback(t), !0
                })
            },
            navigate: function(t, e) {
                if (!A.started) return !1;
                e && !0 !== e || (e = {
                    trigger: !!e
                });
                var i = this.root + (t = this.getFragment(t || ""));
                if (t = t.replace(M, ""), this.fragment !== t) {
                    if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i);
                    else {
                        if (!this._wantsHashChange) return this.location.assign(i);
                        this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
                    }
                    return e.trigger ? this.loadUrl(t) : void 0
                }
            },
            _updateHash: function(t, e, i) {
                if (i) {
                    var n = t.href.replace(/(javascript:|#).*$/, "");
                    t.replace(n + "#" + e)
                } else t.hash = "#" + e
            }
        }), e.history = new A;
        var j = function(t, e) {
            var n, r = this;
            n = t && i.has(t, "constructor") ? t.constructor : function() {
                return r.apply(this, arguments)
            }, i.extend(n, r, e);
            var s = function() {
                this.constructor = n
            };
            return s.prototype = r.prototype, n.prototype = new s, t && i.extend(n.prototype, t), n.__super__ = r.prototype, n
        };
        f.extend = d.extend = S.extend = y.extend = A.extend = j;
        var L = function() {
                throw new Error('A "url" property or function must be specified')
            },
            I = function(t, e) {
                var i = e.error;
                e.error = function(n) {
                    i && i(t, n, e), t.trigger("error", t, n, e)
                }
            };
        return e
    });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    r = function(t, e, n) {
                        i.call(this, t, e, n), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
                    },
                    s = 1e-10,
                    o = i._internals,
                    a = o.isSelector,
                    l = o.isArray,
                    u = r.prototype = i.to({}, .1, {}),
                    h = [];
                r.version = "1.17.0", u.constructor = r, u.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, u.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, u.updateTo = function(t, e) {
                    var n, r = this.ratio,
                        s = this.vars.immediateRender || t.immediateRender;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1),
                        this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in t) this.vars[n] = t[n];
                    if (this._initted || s)
                        if (e) this._initted = !1, s && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var o = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
                    } else if (this._time > 0 || s) {
                        this._initted = !1, this._init();
                        for (var a, l = 1 / (1 - r), u = this._firstPT; u;) a = u.s + u.c, u.c *= l, u.s = a - u.c, u = u._next
                    }
                    return this
                }, u.render = function(t, e, i) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var n, r, a, l, u, h, c, f, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        d = this._time,
                        m = this._totalTime,
                        g = this._cycle,
                        _ = this._duration,
                        v = this._rawPrevTime;
                    if (t >= p ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = _, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === _ && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > v || v === s) && v !== t && (i = !0, v > s && (r = "onReverseComplete")), this._rawPrevTime = f = !e || t || v === t ? t : s)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === _ && v > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === _ && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0), this._rawPrevTime = f = !e || t || v === t ? t : s)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = _ + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = _ - this._time), this._time > _ ? this._time = _ : 0 > this._time && (this._time = 0)), this._easeType ? (u = this._time / _, h = this._easeType, c = this._easePower, (1 === h || 3 === h && u >= .5) && (u = 1 - u), 3 === h && (u *= 2), 1 === c ? u *= u : 2 === c ? u *= u * u : 3 === c ? u *= u * u * u : 4 === c && (u *= u * u * u * u), this.ratio = 1 === h ? 1 - u : 2 === h ? u : .5 > this._time / _ ? u / 2 : 1 - u / 2) : this.ratio = this._ease.getRatio(this._time / _)), d === this._time && !i && g === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = m, this._rawPrevTime = v, this._cycle = g, o.lazyTweens.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / _) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== d && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === _) && (e || this._callback("onStart"))), a = this._firstPT; a;) a.f ? a.t[a.p](a.c * this.ratio + a.s) : a.t[a.p] = a.c * this.ratio + a.s, a = a._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || n) && this._callback("onUpdate")), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === _ && this._rawPrevTime === s && f !== s && (this._rawPrevTime = 0))
                }, r.to = function(t, e, i) {
                    return new r(t, e, i)
                }, r.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
                }, r.fromTo = function(t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new r(t, e, n)
                }, r.staggerTo = r.allTo = function(t, e, s, o, u, c, f) {
                    o = o || 0;
                    var p, d, m, g, _ = s.delay || 0,
                        v = [],
                        y = function() {
                            s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), u.apply(f || s.callbackScope || this, c || h)
                        };
                    for (l(t) || ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = n(t))), t = t || [], 0 > o && (t = n(t), t.reverse(), o *= -1), p = t.length - 1, m = 0; p >= m; m++) {
                        d = {};
                        for (g in s) d[g] = s[g];
                        d.delay = _, m === p && u && (d.onComplete = y), v[m] = new r(t[m], e, d), _ += o
                    }
                    return v
                }, r.staggerFrom = r.allFrom = function(t, e, i, n, s, o, a) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, n, s, o, a)
                }, r.staggerFromTo = r.allFromTo = function(t, e, i, n, s, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, n, s, o, a, l)
                }, r.delayedCall = function(t, e, i, n, s) {
                    return new r(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: s,
                        overwrite: 0
                    })
                }, r.set = function(t, e) {
                    return new r(t, 0, e)
                }, r.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var c = function(t, e) {
                        for (var n = [], r = 0, s = t._first; s;) s instanceof i ? n[r++] = s : (e && (n[r++] = s), n = n.concat(c(s, e)), r = n.length), s = s._next;
                        return n
                    },
                    f = r.getAllTweens = function(e) {
                        return c(t._rootTimeline, e).concat(c(t._rootFramesTimeline, e))
                    };
                r.killAll = function(t, i, n, r) {
                    null == i && (i = !0), null == n && (n = !0);
                    var s, o, a, l = f(0 != r),
                        u = l.length,
                        h = i && n && r;
                    for (a = 0; u > a; a++) o = l[a], (h || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
                }, r.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var s, u, h, c, f, p = o.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = n(t)), l(t))
                            for (c = t.length; --c > -1;) r.killChildTweensOf(t[c], e);
                        else {
                            s = [];
                            for (h in p)
                                for (u = p[h].target.parentNode; u;) u === t && (s = s.concat(p[h].tweens)), u = u.parentNode;
                            for (f = s.length, c = 0; f > c; c++) e && s[c].totalTime(s[c].totalDuration()), s[c]._enabled(!1, !1)
                        }
                    }
                };
                var p = function(t, i, n, r) {
                    i = !1 !== i, n = !1 !== n, r = !1 !== r;
                    for (var s, o, a = f(r), l = i && n && r, u = a.length; --u > -1;) o = a[u], (l || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t)
                };
                return r.pauseAll = function(t, e, i) {
                    p(!0, t, e, i)
                }, r.resumeAll = function(t, e, i) {
                    p(!1, t, e, i)
                }, r.globalTimeScale = function(e) {
                    var n = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (e = e || s, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
                }, u.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, u.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, u.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, u.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, u.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, u.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, r
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                        l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    s = i._internals,
                    o = n._internals = {},
                    a = s.isSelector,
                    l = s.isArray,
                    u = s.lazyTweens,
                    h = s.lazyRender,
                    c = [],
                    f = _gsScope._gsDefine.globals,
                    p = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    d = o.pauseCallback = function(t, e, i, n) {
                        var s, o = t._timeline,
                            a = o._totalTime,
                            l = t._startTime,
                            u = 0 > t._rawPrevTime || 0 === t._rawPrevTime && o._reversed,
                            h = u ? 0 : r,
                            f = u ? r : 0;
                        if (e || !this._forcingPlayhead) {
                            for (o.pause(l), s = t._prev; s && s._startTime === l;) s._rawPrevTime = f, s = s._prev;
                            for (s = t._next; s && s._startTime === l;) s._rawPrevTime = h, s = s._next;
                            e && e.apply(n || o.vars.callbackScope || o, i || c), (this._forcingPlayhead || !o._paused) && o.seek(a)
                        }
                    },
                    m = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    g = n.prototype = new e;
                return n.version = "1.17.0", g.constructor = n, g.kill()._gc = g._forcingPlayhead = !1, g.to = function(t, e, n, r) {
                    var s = n.repeat && f.TweenMax || i;
                    return e ? this.add(new s(t, e, n), r) : this.set(t, n, r)
                }, g.from = function(t, e, n, r) {
                    return this.add((n.repeat && f.TweenMax || i).from(t, e, n), r)
                }, g.fromTo = function(t, e, n, r, s) {
                    var o = r.repeat && f.TweenMax || i;
                    return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
                }, g.staggerTo = function(t, e, r, s, o, l, u, h) {
                    var c, f = new n({
                        onComplete: l,
                        onCompleteParams: u,
                        callbackScope: h,
                        smoothChildTiming: this.smoothChildTiming
                    });
                    for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), s = s || 0, 0 > s && (t = m(t), t.reverse(), s *= -1), c = 0; t.length > c; c++) r.startAt && (r.startAt = p(r.startAt)), f.to(t[c], e, p(r), c * s);
                    return this.add(f, o)
                }, g.staggerFrom = function(t, e, i, n, r, s, o, a) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
                }, g.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l)
                }, g.call = function(t, e, n, r) {
                    return this.add(i.delayedCall(0, t, e, n), r)
                }, g.set = function(t, e, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
                }, n.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, s, o = new n(t),
                        a = o._timeline;
                    for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, e && r instanceof i && r.target === r.vars.onComplete || o.add(r, r._startTime - r._delay), r = s;
                    return a.add(o, 0), o
                }, g.add = function(r, s, o, a) {
                    var u, h, c, f, p, d;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && l(r)) {
                            for (o = o || "normal", a = a || 0, u = s, h = r.length, c = 0; h > c; c++) l(f = r[c]) && (f = new n({
                                tweens: f
                            })), this.add(f, u), "string" != typeof f && "function" != typeof f && ("sequence" === o ? u = f._startTime + f.totalDuration() / f._timeScale : "start" === o && (f._startTime -= f.delay())), u += a;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, s);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (p = this, d = p.rawTime() > r._startTime; p._timeline;) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
                    return this
                }, g.remove = function(e) {
                    if (e instanceof t) return this._remove(e, !1);
                    if (e instanceof Array || e && e.push && l(e)) {
                        for (var i = e.length; --i > -1;) this.remove(e[i]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, g._remove = function(t, i) {
                    e.prototype._remove.call(this, t, i);
                    var n = this._last;
                    return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, g.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, g.insert = g.insertMultiple = function(t, e, i, n) {
                    return this.add(t, e || 0, i, n)
                }, g.appendMultiple = function(t, e, i, n) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
                }, g.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, g.addPause = function(t, e, n, r) {
                    var s = i.delayedCall(0, d, ["{self}", e, n, r], this);
                    return s.data = "isPause", this.add(s, t)
                }, g.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, g.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, g._parseTimeOrLabel = function(e, i, n, r) {
                    var s;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && l(r)))
                        for (s = r.length; --s > -1;) r[s] instanceof t && r[s].timeline === this && this.remove(r[s]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (-1 === (s = e.indexOf("="))) return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(s - 1) + "1", 10) * Number(e.substr(s + 1)), e = s > 1 ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, n) : this.duration()
                    }
                    return Number(e) + i
                }, g.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
                }, g.stop = function() {
                    return this.paused(!0)
                }, g.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, g.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, g.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, o, a, l, c = this._dirty ? this.totalDuration() : this._totalDuration,
                        f = this._time,
                        p = this._startTime,
                        d = this._timeScale,
                        m = this._paused;
                    if (t >= c) this._totalTime = this._time = c, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = c + 1e-4;
                    else if (1e-7 > t)
                        if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            t = 0, this._initted || (l = !0)
                        } else this._totalTime = this._time = this._rawPrevTime = t;
                    if (this._time !== f && this._first || i || l) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), this._time >= f)
                            for (n = this._first; n && (o = n._next, !this._paused || m);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                        else
                            for (n = this._last; n && (o = n._prev, !this._paused || m);)(n._active || f >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                        this._onUpdate && (e || (u.length && h(), this._callback("onUpdate"))), a && (this._gc || (p === this._startTime || d !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (s && (u.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                    }
                }, g._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, g.getChildren = function(t, e, n, r) {
                    r = r || -9999999999;
                    for (var s = [], o = this._first, a = 0; o;) r > o._startTime || (o instanceof i ? !1 !== e && (s[a++] = o) : (!1 !== n && (s[a++] = o), !1 !== t && (s = s.concat(o.getChildren(!0, e, n)), a = s.length))), o = o._next;
                    return s
                }, g.getTweensOf = function(t, e) {
                    var n, r, s = this._gc,
                        o = [],
                        a = 0;
                    for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
                    return s && this._enabled(!1, !0), o
                }, g.recent = function() {
                    return this._recent
                }, g._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, g.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (n in s) s[n] >= i && (s[n] += t);
                    return this._uncache(!0)
                }, g._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                    return r
                }, g.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return !1 !== t && (this._labels = {}), this._uncache(!0)
                }, g.invalidate = function() {
                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                    return t.prototype.invalidate.call(this)
                }, g._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                    return e.prototype._enabled.call(this, t, i)
                }, g.totalTime = function() {
                    this._forcingPlayhead = !0;
                    var e = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, e
                }, g.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, g.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, 0 > r._startTime && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                            this._duration = this._totalDuration = n, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                }, g.paused = function(e) {
                    if (!e)
                        for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                    return t.prototype.paused.apply(this, arguments)
                }, g.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, g.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, n
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var n = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
                    },
                    r = 1e-10,
                    s = e._internals,
                    o = s.lazyTweens,
                    a = s.lazyRender,
                    l = new i(null, null, 1, 0),
                    u = n.prototype = new t;
                return u.constructor = n, u.kill()._gc = !1, n.version = "1.17.0", u.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, u.addCallback = function(t, i, n, r) {
                    return this.add(e.delayedCall(0, t, n, r), i)
                }, u.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this
                }, u.removePause = function(e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }, u.tweenTo = function(t, i) {
                    i = i || {};
                    var n, r, s, o = {
                        ease: l,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (r in i) o[r] = i[r];
                    return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new e(this, n, o), o.onStart = function() {
                        s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && s._callback("onStart")
                    }, s
                }, u.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        callbackScope: this
                    }, i.immediateRender = !1 !== i.immediateRender;
                    var n = this.tweenTo(e, i);
                    return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
                }, u.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, l, u, h, c, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._duration,
                        d = this._time,
                        m = this._totalTime,
                        g = this._startTime,
                        _ = this._timeScale,
                        v = this._rawPrevTime,
                        y = this._paused,
                        x = this._cycle;
                    if (t >= f) this._locked || (this._totalTime = f, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, u = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > v || v === r) && v !== t && this._first && (h = !0, v > r && (u = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = p, t = p + 1e-4);
                    else if (1e-7 > t)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== d || 0 === p && v !== r && (v > 0 || 0 > t && v >= 0) && !this._locked) && (u = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = s = !0, u = "onReverseComplete") : v >= 0 && this._first && (h = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = p || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            t = 0, this._initted || (h = !0)
                        } else 0 === p && 0 > v && (h = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (c = p + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 != (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, t = p + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time));
                    if (this._cycle !== x && !this._locked) {
                        var b = this._yoyo && 0 != (1 & x),
                            w = b === (this._yoyo && 0 != (1 & this._cycle)),
                            T = this._totalTime,
                            S = this._cycle,
                            P = this._rawPrevTime,
                            k = this._time;
                        if (this._totalTime = x * p, x > this._cycle ? b = !b : this._totalTime += p, this._time = d, this._rawPrevTime = 0 === p ? v - 1e-4 : v, this._cycle = x, this._locked = !0, d = b ? 0 : p, this.render(d, e, 0 === p), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), w && (d = b ? p + 1e-4 : -1e-4, this.render(d, !0, !1)), this._locked = !1, this._paused && !y) return;
                        this._time = k, this._totalTime = T, this._cycle = S, this._rawPrevTime = P
                    }
                    if (!(this._time !== d && this._first || i || h)) return void(m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== m && t > 0 && (this._active = !0), 0 === m && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), this._time >= d)
                        for (n = this._first; n && (l = n._next, !this._paused || y);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = l;
                    else
                        for (n = this._last; n && (l = n._prev, !this._paused || y);)(n._active || d >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = l;
                    this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))), u && (this._locked || this._gc || (g === this._startTime || _ !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[u] && this._callback(u)))
                }, u.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var n, r, s = [],
                        o = this.getChildren(t, e, i),
                        a = 0,
                        l = o.length;
                    for (n = 0; l > n; n++) r = o[n], r.isActive() && (s[a++] = r);
                    return s
                }, u.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        n = i.length;
                    for (e = 0; n > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, u.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (t > e[i].time) return e[i].name;
                    return null
                }, u.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, u.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, u.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, u.totalDuration = function(e) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, u.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, u.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, u.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, n
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    n = [],
                    r = {},
                    s = _gsScope._gsDefine.globals,
                    o = function(t, e, i, n) {
                        this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
                    },
                    a = function(t, e, i, n) {
                        var r = {
                                a: t
                            },
                            s = {},
                            o = {},
                            a = {
                                c: n
                            },
                            l = (t + e) / 2,
                            u = (e + i) / 2,
                            h = (i + n) / 2,
                            c = (l + u) / 2,
                            f = (u + h) / 2,
                            p = (f - c) / 8;
                        return r.b = l + (t - l) / 4, s.b = c + p, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (c + f) / 2, o.b = f - p, a.b = h + (n - h) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
                    },
                    l = function(t, r, s, o, l) {
                        var u, h, c, f, p, d, m, g, _, v, y, x, b, w = t.length - 1,
                            T = 0,
                            S = t[0].a;
                        for (u = 0; w > u; u++) p = t[T], h = p.a, c = p.d, f = t[T + 1].d, l ? (y = e[u], x = i[u], b = .25 * (x + y) * r / (o ? .5 : n[u] || .5), d = c - (c - h) * (o ? .5 * r : 0 !== y ? b / y : 0), m = c + (f - c) * (o ? .5 * r : 0 !== x ? b / x : 0), g = c - (d + ((m - d) * (3 * y / (y + x) + .5) / 4 || 0))) : (d = c - .5 * (c - h) * r, m = c + .5 * (f - c) * r, g = c - (d + m) / 2), d += g, m += g, p.c = _ = d, p.b = 0 !== u ? S : S = p.a + .6 * (p.c - p.a), p.da = c - h, p.ca = _ - h, p.ba = S - h, s ? (v = a(h, S, _, c), t.splice(T, 1, v[0], v[1], v[2], v[3]), T += 4) : T++, S = m;
                        p = t[T], p.b = S, p.c = S + .4 * (p.d - S), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = S - p.a, s && (v = a(p.a, S, p.c, p.d), t.splice(T, 1, v[0], v[1], v[2], v[3]))
                    },
                    u = function(t, n, r, s) {
                        var a, l, u, h, c, f, p = [];
                        if (s)
                            for (t = [s].concat(t), l = t.length; --l > -1;) "string" == typeof(f = t[l][n]) && "=" === f.charAt(1) && (t[l][n] = s[n] + Number(f.charAt(0) + f.substr(2)));
                        if (0 > (a = t.length - 2)) return p[0] = new o(t[0][n], 0, 0, t[-1 > a ? 0 : 1][n]), p;
                        for (l = 0; a > l; l++) u = t[l][n], h = t[l + 1][n], p[l] = new o(u, 0, 0, h), r && (c = t[l + 2][n], e[l] = (e[l] || 0) + (h - u) * (h - u), i[l] = (i[l] || 0) + (c - h) * (c - h));
                        return p[l] = new o(t[l][n], 0, 0, t[l + 1][n]), p
                    },
                    h = function(t, s, o, a, h, c) {
                        var f, p, d, m, g, _, v, y, x = {},
                            b = [],
                            w = c || t[0];
                        h = "string" == typeof h ? "," + h + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == s && (s = 1);
                        for (p in t[0]) b.push(p);
                        if (t.length > 1) {
                            for (y = t[t.length - 1], v = !0, f = b.length; --f > -1;)
                                if (p = b[f], Math.abs(w[p] - y[p]) > .05) {
                                    v = !1;
                                    break
                                }
                            v && (t = t.concat(), c && t.unshift(c), t.push(t[1]), c = t[t.length - 3])
                        }
                        for (e.length = i.length = n.length = 0, f = b.length; --f > -1;) p = b[f], r[p] = -1 !== h.indexOf("," + p + ","), x[p] = u(t, p, r[p], c);
                        for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
                        if (!a) {
                            for (f = b.length; --f > -1;)
                                if (r[p])
                                    for (d = x[b[f]], _ = d.length - 1, m = 0; _ > m; m++) g = d[m + 1].da / i[m] + d[m].da / e[m], n[m] = (n[m] || 0) + g * g;
                            for (f = n.length; --f > -1;) n[f] = Math.sqrt(n[f])
                        }
                        for (f = b.length, m = o ? 4 : 1; --f > -1;) p = b[f], d = x[p], l(d, s, o, a, r[p]), v && (d.splice(0, m), d.splice(d.length - m, m));
                        return x
                    },
                    c = function(t, e, i) {
                        e = e || "soft";
                        var n, r, s, a, l, u, h, c, f, p, d, m = {},
                            g = "cubic" === e ? 3 : 2,
                            _ = "soft" === e,
                            v = [];
                        if (_ && i && (t = [i].concat(t)), null == t || g + 1 > t.length) throw "invalid Bezier data";
                        for (f in t[0]) v.push(f);
                        for (u = v.length; --u > -1;) {
                            for (f = v[u], m[f] = l = [], p = 0, c = t.length, h = 0; c > h; h++) n = null == i ? t[h][f] : "string" == typeof(d = t[h][f]) && "=" === d.charAt(1) ? i[f] + Number(d.charAt(0) + d.substr(2)) : Number(d), _ && h > 1 && c - 1 > h && (l[p++] = (n + l[p - 2]) / 2), l[p++] = n;
                            for (c = p - g + 1, p = 0, h = 0; c > h; h += g) n = l[h], r = l[h + 1], s = l[h + 2], a = 2 === g ? 0 : l[h + 3], l[p++] = d = 3 === g ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                            l.length = p
                        }
                        return m
                    },
                    f = function(t, e, i) {
                        for (var n, r, s, o, a, l, u, h, c, f, p, d = 1 / i, m = t.length; --m > -1;)
                            for (f = t[m], s = f.a, o = f.d - s, a = f.c - s, l = f.b - s, n = r = 0, h = 1; i >= h; h++) u = d * h, c = 1 - u, n = r - (r = (u * u * o + 3 * c * (u * a + c * l)) * u), p = m * i + h - 1, e[p] = (e[p] || 0) + n * n
                    },
                    p = function(t, e) {
                        e = e >> 0 || 6;
                        var i, n, r, s, o = [],
                            a = [],
                            l = 0,
                            u = 0,
                            h = e - 1,
                            c = [],
                            p = [];
                        for (i in t) f(t[i], o, e);
                        for (r = o.length, n = 0; r > n; n++) l += Math.sqrt(o[n]), s = n % e, p[s] = l, s === h && (u += l, s = n / e >> 0, c[s] = p, a[s] = u, l = 0, p = []);
                        return {
                            length: u,
                            lengths: a,
                            segments: c
                        }
                    },
                    d = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.4",
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var n, r, s, o, a, l = e.values || [],
                                u = {},
                                f = l[0],
                                d = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = d ? d instanceof Array ? d : [
                                ["x", "y", "rotation", !0 === d ? 0 : Number(d) || 0]
                            ] : null;
                            for (n in f) this._props.push(n);
                            for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], u[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || u[n] !== l[0][n] && (a = u);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? h(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : c(l, e.type, u), this._segCount = this._beziers[n].length, this._timeRes) {
                                var m = p(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (d = this._autoRotate)
                                for (this._initialRotations = [], d[0] instanceof Array || (this._autoRotate = d = [d]), s = d.length; --s > -1;) {
                                    for (o = 0; 3 > o; o++) n = d[s][o], this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                                    n = d[s][2], this._initialRotations[s] = this._func[n] ? this._func[n].call(this._target) : this._target[n]
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(e) {
                            var i, n, r, s, o, a, l, u, h, c, f = this._segCount,
                                p = this._func,
                                d = this._target,
                                m = e !== this._startRatio;
                            if (this._timeRes) {
                                if (h = this._lengths, c = this._curSeg, e *= this._length, r = this._li, e > this._l2 && f - 1 > r) {
                                    for (u = f - 1; u > r && e >= (this._l2 = h[++r]););
                                    this._l1 = h[r - 1], this._li = r, this._curSeg = c = this._segments[r], this._s2 = c[this._s1 = this._si = 0]
                                } else if (this._l1 > e && r > 0) {
                                    for (; r > 0 && (this._l1 = h[--r]) >= e;);
                                    0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = h[r], this._li = r, this._curSeg = c = this._segments[r], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                                }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && c.length - 1 > r) {
                                    for (u = c.length - 1; u > r && e >= (this._s2 = c[++r]););
                                    this._s1 = c[r - 1], this._si = r
                                } else if (this._s1 > e && r > 0) {
                                    for (; r > 0 && (this._s1 = c[--r]) >= e;);
                                    0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = c[r], this._si = r
                                }
                                a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else i = 0 > e ? 0 : e >= 1 ? f - 1 : f * e >> 0, a = (e - i * (1 / f)) * f;
                            for (n = 1 - a, r = this._props.length; --r > -1;) s = this._props[r], o = this._beziers[s][i], l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._round[s] && (l = Math.round(l)), p[s] ? d[s](l) : d[s] = l;
                            if (this._autoRotate) {
                                var g, _, v, y, x, b, w, T = this._autoRotate;
                                for (r = T.length; --r > -1;) s = T[r][2], b = T[r][3] || 0, w = !0 === T[r][4] ? 1 : t, o = this._beziers[T[r][0]], g = this._beziers[T[r][1]], o && g && (o = o[i], g = g[i], _ = o.a + (o.b - o.a) * a, y = o.b + (o.c - o.b) * a, _ += (y - _) * a, y += (o.c + (o.d - o.c) * a - y) * a, v = g.a + (g.b - g.a) * a, x = g.b + (g.c - g.b) * a, v += (x - v) * a, x += (g.c + (g.d - g.c) * a - x) * a, l = m ? Math.atan2(x - v, y - _) * w + b : this._initialRotations[r], p[s] ? d[s](l) : d[s] = l)
                            }
                        }
                    }),
                    m = d.prototype;
                d.bezierThrough = h, d.cubicToQuadratic = a, d._autoCSS = !0, d.quadraticToCubic = function(t, e, i) {
                    return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, d._cssRegister = function() {
                    var t = s.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            n = e._setPluginRatio,
                            r = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, s, o, a, l) {
                                e instanceof Array && (e = {
                                    values: e
                                }), l = new d;
                                var u, h, c, f = e.values,
                                    p = f.length - 1,
                                    m = [],
                                    g = {};
                                if (0 > p) return a;
                                for (u = 0; p >= u; u++) c = i(t, f[u], o, a, l, p !== u), m[u] = c.end;
                                for (h in e) g[h] = e[h];
                                return g.values = m, a = new r(t, "bezier", 0, 0, c.pt, 2), a.data = c, a.plugin = l, a.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (u = !0 === g.autoRotate ? 0 : Number(g.autoRotate), g.autoRotate = null != c.end.left ? [
                                    ["left", "top", "rotation", u, !1]
                                ] : null != c.end.x && [
                                    ["x", "y", "rotation", u, !1]
                                ]), g.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform), l._onInitTween(c.proxy, g, o._tween), a
                            }
                        })
                    }
                }, m._roundProps = function(t, e) {
                    for (var i = this._overwriteProps, n = i.length; --n > -1;)(t[i[n]] || t.bezier || t.bezierThrough) && (this._round[i[n]] = e)
                }, m._kill = function(t) {
                    var e, i, n = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, n, r, s, o = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                    },
                    a = _gsScope._gsDefine.globals,
                    l = {},
                    u = o.prototype = new t("css");
                u.constructor = o, o.version = "1.17.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, u = "px", o.suffixMap = {
                    top: u,
                    right: u,
                    bottom: u,
                    left: u,
                    width: u,
                    height: u,
                    fontSize: u,
                    padding: u,
                    margin: u,
                    perspective: u,
                    lineHeight: ""
                };
                var h, c, f, p, d, m, g = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    _ = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    x = /(?:\d|\-|\+|=|#|\.)*/g,
                    b = /opacity *= *([^)]*)/i,
                    w = /opacity:([^;]*)/i,
                    T = /alpha\(opacity *=.+?\)/i,
                    S = /^(rgb|hsl)/,
                    P = /([A-Z])/g,
                    k = /-([a-z])/gi,
                    C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    O = function(t, e) {
                        return e.toUpperCase()
                    },
                    A = /(?:Left|Right|Width)/i,
                    E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    R = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    D = /,(?=[^\)]*(?:\(|$))/gi,
                    N = Math.PI / 180,
                    M = 180 / Math.PI,
                    j = {},
                    L = document,
                    I = function(t) {
                        return L.createElementNS ? L.createElementNS("http://www.w3.org/1999/xhtml", t) : L.createElement(t)
                    },
                    F = I("div"),
                    B = I("img"),
                    H = o._internals = {
                        _specialProps: l
                    },
                    z = navigator.userAgent,
                    q = function() {
                        var t = z.indexOf("Android"),
                            e = I("a");
                        return f = -1 !== z.indexOf("Safari") && -1 === z.indexOf("Chrome") && (-1 === t || Number(z.substr(t + 8, 1)) > 3), d = f && 6 > Number(z.substr(z.indexOf("Version/") + 8, 1)), p = -1 !== z.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(z) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(z)) && (m = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                    }(),
                    X = function(t) {
                        return b.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    W = function(t) {
                        window.console && console.log(t)
                    },
                    $ = "",
                    U = "",
                    Y = function(t, e) {
                        e = e || F;
                        var i, n, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                        return n >= 0 ? (U = 3 === n ? "ms" : i[n], $ = "-" + U.toLowerCase() + "-", U + t) : null
                    },
                    V = L.defaultView ? L.defaultView.getComputedStyle : function() {},
                    G = o.getStyle = function(t, e, i, n, r) {
                        var s;
                        return q || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || V(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(P, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : X(t)
                    },
                    Z = H.convertToPixels = function(t, i, n, r, s) {
                        if ("px" === r || !r) return n;
                        if ("auto" === r || !n) return 0;
                        var a, l, u, h = A.test(i),
                            c = t,
                            f = F.style,
                            p = 0 > n;
                        if (p && (n = -n), "%" === r && -1 !== i.indexOf("border")) a = n / 100 * (h ? t.clientWidth : t.clientHeight);
                        else {
                            if (f.cssText = "border:0 solid red;position:" + G(t, "position") + ";line-height:0;", "%" !== r && c.appendChild) f[h ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                            else {
                                if (c = t.parentNode || L.body, l = c._gsCache, u = e.ticker.frame, l && h && l.time === u) return l.width * n / 100;
                                f[h ? "width" : "height"] = n + r
                            }
                            c.appendChild(F), a = parseFloat(F[h ? "offsetWidth" : "offsetHeight"]), c.removeChild(F), h && "%" === r && !1 !== o.cacheWidths && (l = c._gsCache = c._gsCache || {}, l.time = u, l.width = a / n * 100), 0 !== a || s || (a = Z(t, i, n, r, !0))
                        }
                        return p ? -a : a
                    },
                    Q = H.calculateOffset = function(t, e, i) {
                        if ("absolute" !== G(t, "position", i)) return 0;
                        var n = "left" === e ? "Left" : "Top",
                            r = G(t, "margin" + n, i);
                        return t["offset" + n] - (Z(t, e, parseFloat(r), r.replace(x, "")) || 0)
                    },
                    J = function(t, e) {
                        var i, n, r, s = {};
                        if (e = e || V(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r = e[i], (-1 === r.indexOf("-transform") || Tt === r) && (s[r.replace(k, O)] = e.getPropertyValue(r));
                            else
                                for (i in e)(-1 === i.indexOf("Transform") || wt === i) && (s[i] = e[i]);
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(k, O)] = e[i]);
                        return q || (s.opacity = X(t)), n = jt(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Pt && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                    },
                    K = function(t, e, i, n, r) {
                        var s, o, a, l = {},
                            u = t.style;
                        for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(y, "") ? s : 0 : Q(t, o), void 0 !== u[o] && (a = new pt(u, o, u[o], a)));
                        if (n)
                            for (o in n) "className" !== o && (l[o] = n[o]);
                        return {
                            difs: l,
                            firstMPT: a
                        }
                    },
                    tt = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    et = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    it = function(t, e, i) {
                        var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = tt[e],
                            s = r.length;
                        for (i = i || V(t, null); --s > -1;) n -= parseFloat(G(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(G(t, "border" + r[s] + "Width", i, !0)) || 0;
                        return n
                    },
                    nt = function(t, e) {
                        (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                        var i = t.split(" "),
                            n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                        return null == r ? r = "center" === n ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), t = n + " " + r + (i.length > 2 ? " " + i[2] : ""), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(y, "")), e.oy = parseFloat(r.replace(y, "")), e.v = t), e || t
                    },
                    rt = function(t, e) {
                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                    },
                    st = function(t, e) {
                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                    },
                    ot = function(t, e, i, n) {
                        var r, s, o, a, l;
                        return null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), l = "=" === t.charAt(1), o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : M) - (l ? 0 : e), s.length && (n && (n[i] = e + o), -1 !== t.indexOf("short") && (o %= r) !== o % (r / 2) && (o = 0 > o ? o + r : o - r), -1 !== t.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (0 | o / r) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (0 | o / r) * r)), a = e + o), 1e-6 > a && a > -1e-6 && (a = 0), a
                    },
                    at = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    lt = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
                    },
                    ut = o.parseColor = function(t) {
                        var e, i, n, r, s, o;
                        return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), at[t] ? at[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), n = t.charAt(3), t = "#" + e + e + i + i + n + n), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(g), r = Number(t[0]) % 360 / 360, s = Number(t[1]) / 100, o = Number(t[2]) / 100, i = .5 >= o ? o * (s + 1) : o + s - o * s, e = 2 * o - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = lt(r + 1 / 3, e, i), t[1] = lt(r, e, i), t[2] = lt(r - 1 / 3, e, i), t) : (t = t.match(g) || at.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : at.black
                    },
                    ht = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (u in at) ht += "|" + u + "\\b";
                ht = RegExp(ht + ")", "gi");
                var ct = function(t, e, i, n) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var r, s = e ? (t.match(ht) || [""])[0] : "",
                            o = t.split(s).join("").match(v) || [],
                            a = t.substr(0, t.indexOf(o[0])),
                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                            u = -1 !== t.indexOf(" ") ? " " : ",",
                            h = o.length,
                            c = h > 0 ? o[0].replace(g, "") : "";
                        return h ? r = e ? function(t) {
                            var e, f, p, d;
                            if ("number" == typeof t) t += c;
                            else if (n && D.test(t)) {
                                for (d = t.replace(D, "|").split("|"), p = 0; d.length > p; p++) d[p] = r(d[p]);
                                return d.join(",")
                            }
                            if (e = (t.match(ht) || [s])[0], f = t.split(e).join("").match(v) || [], p = f.length, h > p--)
                                for (; h > ++p;) f[p] = i ? f[0 | (p - 1) / 2] : o[p];
                            return a + f.join(u) + u + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, s, f;
                            if ("number" == typeof t) t += c;
                            else if (n && D.test(t)) {
                                for (s = t.replace(D, "|").split("|"), f = 0; s.length > f; f++) s[f] = r(s[f]);
                                return s.join(",")
                            }
                            if (e = t.match(v) || [], f = e.length, h > f--)
                                for (; h > ++f;) e[f] = i ? e[0 | (f - 1) / 2] : o[f];
                            return a + e.join(u) + l
                        } : function(t) {
                            return t
                        }
                    },
                    ft = function(t) {
                        return t = t.split(","),
                            function(e, i, n, r, s, o, a) {
                                var l, u = (i + "").split(" ");
                                for (a = {}, l = 0; 4 > l; l++) a[t[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                                return r.parse(e, a, s, o)
                            }
                    },
                    pt = (H._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, n, r, s = this.data, o = s.proxy, a = s.firstMPT; a;) e = o[a.v], a.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), a.t[a.p] = e, a = a._next;
                        if (s.autoRotate && (s.autoRotate.rotation = o.rotation), 1 === t)
                            for (a = s.firstMPT; a;) {
                                if (i = a.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, n = 1; i.l > n; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                        i.e = r
                                    }
                                } else i.e = i.s + i.xs0;
                                a = a._next
                            }
                    }, function(t, e, i, n, r) {
                        this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                    }),
                    dt = (H._parseToProxy = function(t, e, i, n, r, s) {
                        var o, a, l, u, h, c = n,
                            f = {},
                            p = {},
                            d = i._transform,
                            m = j;
                        for (i._transform = null, j = e, n = h = i.parse(t, e, n, r), j = m, s && (i._transform = d, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
                            if (1 >= n.type && (a = n.p, p[a] = n.s + n.c, f[a] = n.s, s || (u = new pt(n, "s", a, u, n.r), n.c = 0), 1 === n.type))
                                for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, p[a] = n.data[l], f[a] = n[l], s || (u = new pt(n, l, a, u, n.rxp[l]));
                            n = n._next
                        }
                        return {
                            proxy: f,
                            end: p,
                            firstMPT: u,
                            pt: h
                        }
                    }, H.CSSPropTween = function(t, e, n, r, o, a, l, u, h, c, f) {
                        this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof dt || s.push(this.n), this.r = u, this.type = a || 0, h && (this.pr = h, i = !0), this.b = void 0 === c ? n : c, this.e = void 0 === f ? n + r : f, o && (this._next = o, o._prev = this)
                    }),
                    mt = function(t, e, i, n, r, s) {
                        var o = new dt(t, e, i, n - i, r, -1, s);
                        return o.b = i, o.e = o.xs0 = n, o
                    },
                    gt = o.parseComplex = function(t, e, i, n, r, s, o, a, l, u) {
                        i = i || s || "", o = new dt(t, e, 0, 0, o, u ? 2 : 1, null, !1, a, i, n), n += "";
                        var c, f, p, d, m, v, y, x, b, w, T, P, k = i.split(", ").join(",").split(" "),
                            C = n.split(", ").join(",").split(" "),
                            O = k.length,
                            A = !1 !== h;
                        for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(D, ", ").split(" "), C = C.join(" ").replace(D, ", ").split(" "), O = k.length), O !== C.length && (k = (s || "").split(" "), O = k.length), o.plugin = l, o.setRatio = u, c = 0; O > c; c++)
                            if (d = k[c], m = C[c], (x = parseFloat(d)) || 0 === x) o.appendXtra("", x, rt(m, x), m.replace(_, ""), A && -1 !== m.indexOf("px"), !0);
                            else if (r && ("#" === d.charAt(0) || at[d] || S.test(d))) P = "," === m.charAt(m.length - 1) ? ")," : ")", d = ut(d), m = ut(m), b = d.length + m.length > 6, b && !q && 0 === m[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(C[c]).join("transparent")) : (q || (b = !1), o.appendXtra(b ? "rgba(" : "rgb(", d[0], m[0] - d[0], ",", !0, !0).appendXtra("", d[1], m[1] - d[1], ",", !0).appendXtra("", d[2], m[2] - d[2], b ? "," : P, !0), b && (d = 4 > d.length ? 1 : d[3], o.appendXtra("", d, (4 > m.length ? 1 : m[3]) - d, P, !1)));
                        else if (v = d.match(g)) {
                            if (!(y = m.match(_)) || y.length !== v.length) return o;
                            for (p = 0, f = 0; v.length > f; f++) T = v[f], w = d.indexOf(T, p), o.appendXtra(d.substr(p, w - p), Number(T), rt(y[f], T), "", A && "px" === d.substr(w + T.length, 2), 0 === f), p = w + T.length;
                            o["xs" + o.l] += d.substr(p)
                        } else o["xs" + o.l] += o.l ? " " + d : d;
                        if (-1 !== n.indexOf("=") && o.data) {
                            for (P = o.xs0 + o.data.s, c = 1; o.l > c; c++) P += o["xs" + c] + o.data["xn" + c];
                            o.e = P + o["xs" + c]
                        }
                        return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
                    },
                    _t = 9;
                for (u = dt.prototype, u.l = u.pr = 0; --_t > 0;) u["xn" + _t] = 0, u["xs" + _t] = "";
                u.xs0 = "", u._next = u._prev = u.xfirst = u.data = u.plugin = u.setRatio = u.rxp = null, u.appendXtra = function(t, e, i, n, r, s) {
                    var o = this,
                        a = o.l;
                    return o["xs" + a] += s && a ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new dt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                        s: e + i
                    }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o)
                };
                var vt = function(t, e) {
                        e = e || {}, this.p = e.prefix ? Y(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || ct(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    yt = H._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var n, r = t.split(","),
                            s = e.defaultValue;
                        for (i = i || [s], n = 0; r.length > n; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || s, new vt(r[n], e)
                    };
                u = vt.prototype, u.parseComplex = function(t, e, i, n, r, s) {
                    var o, a, l, u, h, c, f = this.keyword;
                    if (this.multi && (D.test(i) || D.test(e) ? (a = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : f && (a = [e], l = [i])), l) {
                        for (u = l.length > a.length ? l.length : a.length, o = 0; u > o; o++) e = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, f && (h = e.indexOf(f), c = i.indexOf(f), h !== c && (-1 === c ? a[o] = a[o].split(f).join("") : -1 === h && (a[o] += " " + f)));
                        e = a.join(", "), i = l.join(", ")
                    }
                    return gt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
                }, u.parse = function(t, e, i, n, s, o) {
                    return this.parseComplex(t.style, this.format(G(t, this.p, r, !1, this.dflt)), this.format(e), s, o)
                }, o.registerSpecialProp = function(t, e, i) {
                    yt(t, {
                        parser: function(t, n, r, s, o, a) {
                            var l = new dt(t, r, 0, 0, o, 2, r, !1, i);
                            return l.plugin = a, l.setRatio = e(t, n, s._tween, r), l
                        },
                        priority: i
                    })
                }, o.useSVGTransformAttr = f || p;
                var xt, bt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    wt = Y("transform"),
                    Tt = $ + "transform",
                    St = Y("transformOrigin"),
                    Pt = null !== Y("perspective"),
                    kt = H.Transform = function() {
                        this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(!1 === o.defaultForce3D || !Pt) && (o.defaultForce3D || "auto")
                    },
                    Ct = window.SVGElement,
                    Ot = function(t, e, i) {
                        var n, r = L.createElementNS("http://www.w3.org/2000/svg", t),
                            s = /([a-z])([A-Z])/g;
                        for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                        return e.appendChild(r), r
                    },
                    At = L.documentElement,
                    Et = function() {
                        var t, e, i, n = m || /Android/i.test(z) && !window.chrome;
                        return L.createElementNS && !n && (t = Ot("svg", At), e = Ot("rect", t, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), i = e.getBoundingClientRect().width, e.style[St] = "50% 50%", e.style[wt] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(p && Pt), At.removeChild(t)), n
                    }(),
                    Rt = function(t, e, i, n, r) {
                        var s, a, l, u, h, c, f, p, d, m, g, _, v, y, x = t._gsTransform,
                            b = Mt(t, !0);
                        x && (v = x.xOrigin, y = x.yOrigin), (!n || 2 > (s = n.split(" ")).length) && (f = t.getBBox(), e = nt(e).split(" "), s = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]), i.xOrigin = u = parseFloat(s[0]), i.yOrigin = h = parseFloat(s[1]), n && b !== Nt && (c = b[0], f = b[1], p = b[2], d = b[3], m = b[4], g = b[5], _ = c * d - f * p, a = u * (d / _) + h * (-p / _) + (p * g - d * m) / _, l = u * (-f / _) + h * (c / _) - (c * g - f * m) / _, u = i.xOrigin = s[0] = a, h = i.yOrigin = s[1] = l), x && (r || !1 !== r && !1 !== o.defaultSmoothOrigin ? (a = u - v, l = h - y, x.xOffset += a * b[0] + l * b[2] - a, x.yOffset += a * b[1] + l * b[3] - l) : x.xOffset = x.yOffset = 0), t.setAttribute("data-svg-origin", s.join(" "))
                    },
                    Dt = function(t) {
                        return !!(Ct && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
                    },
                    Nt = [1, 0, 0, 1, 0, 0],
                    Mt = function(t, e) {
                        var i, n, r, s, o, a = t._gsTransform || new kt;
                        if (wt ? n = G(t, Tt, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(E), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), a.x || 0, a.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, (a.svg || t.getBBox && Dt(t)) && (i && -1 !== (t.style[wt] + "").indexOf("matrix") && (n = t.style[wt], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Nt;
                        for (r = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], _t = r.length; --_t > -1;) s = Number(r[_t]), r[_t] = (o = s - (s |= 0)) ? (0 | 1e5 * o + (0 > o ? -.5 : .5)) / 1e5 + s : s;
                        return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                    },
                    jt = H.getTransform = function(t, i, n, s) {
                        if (t._gsTransform && n && !s) return t._gsTransform;
                        var a, l, u, h, c, f, p = n ? t._gsTransform || new kt : new kt,
                            d = 0 > p.scaleX,
                            m = 1e5,
                            g = Pt ? parseFloat(G(t, St, i, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0,
                            _ = parseFloat(o.defaultTransformPerspective) || 0;
                        if (p.svg = !(!t.getBBox || !Dt(t)), p.svg && (Rt(t, G(t, St, r, !1, "50% 50%") + "", p, t.getAttribute("data-svg-origin")), xt = o.useSVGTransformAttr || Et), (a = Mt(t)) !== Nt) {
                            if (16 === a.length) {
                                var v, y, x, b, w, T = a[0],
                                    S = a[1],
                                    P = a[2],
                                    k = a[3],
                                    C = a[4],
                                    O = a[5],
                                    A = a[6],
                                    E = a[7],
                                    R = a[8],
                                    D = a[9],
                                    N = a[10],
                                    j = a[12],
                                    L = a[13],
                                    I = a[14],
                                    F = a[11],
                                    B = Math.atan2(A, N);
                                p.zOrigin && (I = -p.zOrigin, j = R * I - a[12], L = D * I - a[13], I = N * I + p.zOrigin - a[14]), p.rotationX = B * M, B && (b = Math.cos(-B), w = Math.sin(-B), v = C * b + R * w, y = O * b + D * w, x = A * b + N * w, R = C * -w + R * b, D = O * -w + D * b, N = A * -w + N * b, F = E * -w + F * b, C = v, O = y, A = x), B = Math.atan2(R, N), p.rotationY = B * M, B && (b = Math.cos(-B), w = Math.sin(-B), v = T * b - R * w, y = S * b - D * w, x = P * b - N * w, D = S * w + D * b, N = P * w + N * b, F = k * w + F * b, T = v, S = y, P = x), B = Math.atan2(S, T), p.rotation = B * M, B && (b = Math.cos(-B), w = Math.sin(-B), T = T * b + C * w, y = S * b + O * w, O = S * -w + O * b, A = P * -w + A * b, S = y), p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0, p.rotationY += 180), p.scaleX = (0 | Math.sqrt(T * T + S * S) * m + .5) / m, p.scaleY = (0 | Math.sqrt(O * O + D * D) * m + .5) / m, p.scaleZ = (0 | Math.sqrt(A * A + N * N) * m + .5) / m, p.skewX = 0, p.perspective = F ? 1 / (0 > F ? -F : F) : 0, p.x = j, p.y = L, p.z = I, p.svg && (p.x -= p.xOrigin - (p.xOrigin * T - p.yOrigin * C), p.y -= p.yOrigin - (p.yOrigin * S - p.xOrigin * O))
                            } else if (!(Pt && !s && a.length && p.x === a[4] && p.y === a[5] && (p.rotationX || p.rotationY) || void 0 !== p.x && "none" === G(t, "display", i))) {
                                var H = a.length >= 6,
                                    z = H ? a[0] : 1,
                                    q = a[1] || 0,
                                    X = a[2] || 0,
                                    W = H ? a[3] : 1;
                                p.x = a[4] || 0, p.y = a[5] || 0, u = Math.sqrt(z * z + q * q), h = Math.sqrt(W * W + X * X), c = z || q ? Math.atan2(q, z) * M : p.rotation || 0, f = X || W ? Math.atan2(X, W) * M + c : p.skewX || 0, Math.abs(f) > 90 && 270 > Math.abs(f) && (d ? (u *= -1, f += 0 >= c ? 180 : -180, c += 0 >= c ? 180 : -180) : (h *= -1, f += 0 >= f ? 180 : -180)), p.scaleX = u, p.scaleY = h, p.rotation = c, p.skewX = f, Pt && (p.rotationX = p.rotationY = p.z = 0, p.perspective = _, p.scaleZ = 1), p.svg && (p.x -= p.xOrigin - (p.xOrigin * z + p.yOrigin * X), p.y -= p.yOrigin - (p.xOrigin * q + p.yOrigin * W))
                            }
                            p.zOrigin = g;
                            for (l in p) 2e-5 > p[l] && p[l] > -2e-5 && (p[l] = 0)
                        }
                        return n && (t._gsTransform = p, p.svg && (xt && t.style[wt] ? e.delayedCall(.001, function() {
                            Bt(t.style, wt)
                        }) : !xt && t.getAttribute("transform") && e.delayedCall(.001, function() {
                            t.removeAttribute("transform")
                        }))), p
                    },
                    Lt = function(t) {
                        var e, i, n = this.data,
                            r = -n.rotation * N,
                            s = r + n.skewX * N,
                            o = 1e5,
                            a = (0 | Math.cos(r) * n.scaleX * o) / o,
                            l = (0 | Math.sin(r) * n.scaleX * o) / o,
                            u = (0 | Math.sin(s) * -n.scaleY * o) / o,
                            h = (0 | Math.cos(s) * n.scaleY * o) / o,
                            c = this.t.style,
                            f = this.t.currentStyle;
                        if (f) {
                            i = l, l = -u, u = -i, e = f.filter, c.filter = "";
                            var p, d, g = this.t.offsetWidth,
                                _ = this.t.offsetHeight,
                                v = "absolute" !== f.position,
                                y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + u + ", M22=" + h,
                                w = n.x + g * n.xPercent / 100,
                                T = n.y + _ * n.yPercent / 100;
                            if (null != n.ox && (p = (n.oxp ? .01 * g * n.ox : n.ox) - g / 2, d = (n.oyp ? .01 * _ * n.oy : n.oy) - _ / 2, w += p - (p * a + d * l), T += d - (p * u + d * h)), v ? (p = g / 2, d = _ / 2, y += ", Dx=" + (p - (p * a + d * l) + w) + ", Dy=" + (d - (p * u + d * h) + T) + ")") : y += ", sizingMethod='auto expand')", c.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(R, y) : y + " " + e, (0 === t || 1 === t) && 1 === a && 0 === l && 0 === u && 1 === h && (v && -1 === y.indexOf("Dx=0, Dy=0") || b.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), !v) {
                                var S, P, k, C = 8 > m ? 1 : -1;
                                for (p = n.ieOffsetX || 0, d = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * _)) / 2 + w), n.ieOffsetY = Math.round((_ - ((0 > h ? -h : h) * _ + (0 > u ? -u : u) * g)) / 2 + T), _t = 0; 4 > _t; _t++) P = et[_t], S = f[P], i = -1 !== S.indexOf("px") ? parseFloat(S) : Z(this.t, P, parseFloat(S), S.replace(x, "")) || 0, k = i !== n[P] ? 2 > _t ? -n.ieOffsetX : -n.ieOffsetY : 2 > _t ? p - n.ieOffsetX : d - n.ieOffsetY, c[P] = (n[P] = Math.round(i - k * (0 === _t || 2 === _t ? 1 : C))) + "px"
                            }
                        }
                    },
                    It = H.set3DTransformRatio = H.setTransformRatio = function(t) {
                        var e, i, n, r, s, o, a, l, u, h, c, f, d, m, g, _, v, y, x, b, w, T, S, P = this.data,
                            k = this.t.style,
                            C = P.rotation,
                            O = P.rotationX,
                            A = P.rotationY,
                            E = P.scaleX,
                            R = P.scaleY,
                            D = P.scaleZ,
                            M = P.x,
                            j = P.y,
                            L = P.z,
                            I = P.svg,
                            F = P.perspective,
                            B = P.force3D;
                        if (!((1 !== t && 0 !== t || "auto" !== B || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && B || L || F || A || O) || xt && I || !Pt) return void(C || P.skewX || I ? (C *= N, T = P.skewX * N, S = 1e5, e = Math.cos(C) * E, r = Math.sin(C) * E, i = Math.sin(C - T) * -R, s = Math.cos(C - T) * R, T && "simple" === P.skewType && (v = Math.tan(T), v = Math.sqrt(1 + v * v), i *= v, s *= v, P.skewY && (e *= v, r *= v)), I && (M += P.xOrigin - (P.xOrigin * e + P.yOrigin * i) + P.xOffset, j += P.yOrigin - (P.xOrigin * r + P.yOrigin * s) + P.yOffset, xt && (P.xPercent || P.yPercent) && (m = this.t.getBBox(), M += .01 * P.xPercent * m.width, j += .01 * P.yPercent * m.height), m = 1e-6, m > M && M > -m && (M = 0), m > j && j > -m && (j = 0)), x = (0 | e * S) / S + "," + (0 | r * S) / S + "," + (0 | i * S) / S + "," + (0 | s * S) / S + "," + M + "," + j + ")", I && xt ? this.t.setAttribute("transform", "matrix(" + x) : k[wt] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + x) : k[wt] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + R + "," + M + "," + j + ")");
                        if (p && (m = 1e-4, m > E && E > -m && (E = D = 2e-5), m > R && R > -m && (R = D = 2e-5), !F || P.z || P.rotationX || P.rotationY || (F = 0)), C || P.skewX) C *= N, g = e = Math.cos(C), _ = r = Math.sin(C), P.skewX && (C -= P.skewX * N, g = Math.cos(C), _ = Math.sin(C), "simple" === P.skewType && (v = Math.tan(P.skewX * N), v = Math.sqrt(1 + v * v), g *= v, _ *= v, P.skewY && (e *= v, r *= v))), i = -_, s = g;
                        else {
                            if (!(A || O || 1 !== D || F || I)) return void(k[wt] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) translate3d(" : "translate3d(") + M + "px," + j + "px," + L + "px)" + (1 !== E || 1 !== R ? " scale(" + E + "," + R + ")" : ""));
                            e = s = 1, i = r = 0
                        }
                        u = 1, n = o = a = l = h = c = 0, f = F ? -1 / F : 0, d = P.zOrigin, m = 1e-6, b = ",", w = "0", C = A * N, C && (g = Math.cos(C), _ = Math.sin(C), a = -_, h = f * -_, n = e * _, o = r * _, u = g, f *= g, e *= g, r *= g), C = O * N, C && (g = Math.cos(C), _ = Math.sin(C), v = i * g + n * _, y = s * g + o * _, l = u * _, c = f * _, n = i * -_ + n * g, o = s * -_ + o * g, u *= g, f *= g, i = v, s = y), 1 !== D && (n *= D, o *= D, u *= D, f *= D), 1 !== R && (i *= R, s *= R, l *= R, c *= R), 1 !== E && (e *= E, r *= E, a *= E, h *= E), (d || I) && (d && (M += n * -d, j += o * -d, L += u * -d + d), I && (M += P.xOrigin - (P.xOrigin * e + P.yOrigin * i) + P.xOffset, j += P.yOrigin - (P.xOrigin * r + P.yOrigin * s) + P.yOffset), m > M && M > -m && (M = w), m > j && j > -m && (j = w), m > L && L > -m && (L = 0)), x = P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix3d(" : "matrix3d(", x += (m > e && e > -m ? w : e) + b + (m > r && r > -m ? w : r) + b + (m > a && a > -m ? w : a), x += b + (m > h && h > -m ? w : h) + b + (m > i && i > -m ? w : i) + b + (m > s && s > -m ? w : s), O || A ? (x += b + (m > l && l > -m ? w : l) + b + (m > c && c > -m ? w : c) + b + (m > n && n > -m ? w : n), x += b + (m > o && o > -m ? w : o) + b + (m > u && u > -m ? w : u) + b + (m > f && f > -m ? w : f) + b) : x += ",0,0,0,0,1,0,", x += M + b + j + b + L + b + (F ? 1 + -L / F : 1) + ")", k[wt] = x
                    };
                u = kt.prototype, u.x = u.y = u.z = u.skewX = u.skewY = u.rotation = u.rotationX = u.rotationY = u.zOrigin = u.xPercent = u.yPercent = u.xOffset = u.yOffset = 0, u.scaleX = u.scaleY = u.scaleZ = 1, yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(t, e, i, n, s, a, l) {
                        if (n._lastParsedTransform === l) return s;
                        n._lastParsedTransform = l;
                        var u, h, c, f, p, d, m, g, _, v = t._gsTransform,
                            y = n._transform = jt(t, r, !0, l.parseTransform),
                            x = t.style,
                            b = bt.length,
                            w = l,
                            T = {},
                            S = "transformOrigin";
                        if ("string" == typeof w.transform && wt) c = F.style, c[wt] = w.transform, c.display = "block", c.position = "absolute", L.body.appendChild(F), u = jt(F, null, !1), L.body.removeChild(F), null != w.xPercent && (u.xPercent = st(w.xPercent, y.xPercent)), null != w.yPercent && (u.yPercent = st(w.yPercent, y.yPercent));
                        else if ("object" == typeof w) {
                            if (u = {
                                    scaleX: st(null != w.scaleX ? w.scaleX : w.scale, y.scaleX),
                                    scaleY: st(null != w.scaleY ? w.scaleY : w.scale, y.scaleY),
                                    scaleZ: st(w.scaleZ, y.scaleZ),
                                    x: st(w.x, y.x),
                                    y: st(w.y, y.y),
                                    z: st(w.z, y.z),
                                    xPercent: st(w.xPercent, y.xPercent),
                                    yPercent: st(w.yPercent, y.yPercent),
                                    perspective: st(w.transformPerspective, y.perspective)
                                }, null != (m = w.directionalRotation))
                                if ("object" == typeof m)
                                    for (c in m) w[c] = m[c];
                                else w.rotation = m;
                                "string" == typeof w.x && -1 !== w.x.indexOf("%") && (u.x = 0, u.xPercent = st(w.x, y.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (u.y = 0, u.yPercent = st(w.y, y.yPercent)), u.rotation = ot("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : y.rotation, y.rotation, "rotation", T), Pt && (u.rotationX = ot("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : y.rotationX || 0, y.rotationX, "rotationX", T), u.rotationY = ot("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : y.rotationY || 0, y.rotationY, "rotationY", T)), u.skewX = null == w.skewX ? y.skewX : ot(w.skewX, y.skewX), u.skewY = null == w.skewY ? y.skewY : ot(w.skewY, y.skewY), (h = u.skewY - y.skewY) && (u.skewX += h, u.rotation += h)
                        }
                        for (Pt && null != w.force3D && (y.force3D = w.force3D, d = !0), y.skewType = w.skewType || y.skewType || o.defaultSkewType, (p = y.force3D || y.z || y.rotationX || y.rotationY || u.z || u.rotationX || u.rotationY || u.perspective) || null == w.scale || (u.scaleZ = 1); --b > -1;) i = bt[b], ((f = u[i] - y[i]) > 1e-6 || -1e-6 > f || null != w[i] || null != j[i]) && (d = !0, s = new dt(y, i, y[i], f, s), i in T && (s.e = T[i]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                        return f = w.transformOrigin, y.svg && (f || w.svgOrigin) && (g = y.xOffset, _ = y.yOffset, Rt(t, nt(f), u, w.svgOrigin, w.smoothOrigin), s = mt(y, "xOrigin", (v ? y : u).xOrigin, u.xOrigin, s, S), s = mt(y, "yOrigin", (v ? y : u).yOrigin, u.yOrigin, s, S), (g !== y.xOffset || _ !== y.yOffset) && (s = mt(y, "xOffset", v ? g : y.xOffset, y.xOffset, s, S), s = mt(y, "yOffset", v ? _ : y.yOffset, y.yOffset, s, S)), f = xt ? null : "0px 0px"), (f || Pt && p && y.zOrigin) && (wt ? (d = !0, i = St, f = (f || G(t, i, r, !1, "50% 50%")) + "", s = new dt(x, i, 0, 0, s, -1, S), s.b = x[i], s.plugin = a, Pt ? (c = y.zOrigin, f = f.split(" "), y.zOrigin = (f.length > 2 && (0 === c || "0px" !== f[2]) ? parseFloat(f[2]) : c) || 0, s.xs0 = s.e = f[0] + " " + (f[1] || "50%") + " 0px", s = new dt(y, "zOrigin", 0, 0, s, -1, s.n), s.b = c, s.xs0 = s.e = y.zOrigin) : s.xs0 = s.e = f) : nt(f + "", y)), d && (n._transformType = y.svg && xt || !p && 3 !== this._transformType ? 2 : 3), s
                    },
                    prefix: !0
                }), yt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), yt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, s, o) {
                        e = this.format(e);
                        var a, l, u, h, c, f, p, d, m, g, _, v, y, x, b, w, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            S = t.style;
                        for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), a = e.split(" "), l = 0; T.length > l; l++) this.p.indexOf("border") && (T[l] = Y(T[l])), c = h = G(t, T[l], r, !1, "0px"), -1 !== c.indexOf(" ") && (h = c.split(" "), c = h[0], h = h[1]), f = u = a[l], p = parseFloat(c), v = c.substr((p + "").length), y = "=" === f.charAt(1), y ? (d = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), d *= parseFloat(f), _ = f.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(f), _ = f.substr((d + "").length)), "" === _ && (_ = n[i] || v), _ !== v && (x = Z(t, "borderLeft", p, v), b = Z(t, "borderTop", p, v), "%" === _ ? (c = x / m * 100 + "%", h = b / g * 100 + "%") : "em" === _ ? (w = Z(t, "borderLeft", 1, "em"), c = x / w + "em", h = b / w + "em") : (c = x + "px", h = b + "px"), y && (f = parseFloat(c) + d + _, u = parseFloat(h) + d + _)), o = gt(S, T[l], c + " " + h, f + " " + u, !1, "0px", o);
                        return o
                    },
                    prefix: !0,
                    formatter: ct("0px 0px 0px 0px", !1, !0)
                }), yt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, n, s, o) {
                        var a, l, u, h, c, f, p = "background-position",
                            d = r || V(t, null),
                            g = this.format((d ? m ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            _ = this.format(e);
                        if (-1 !== g.indexOf("%") != (-1 !== _.indexOf("%")) && (f = G(t, "backgroundImage").replace(C, "")) && "none" !== f) {
                            for (a = g.split(" "), l = _.split(" "), B.setAttribute("src", f), u = 2; --u > -1;) g = a[u], (h = -1 !== g.indexOf("%")) !== (-1 !== l[u].indexOf("%")) && (c = 0 === u ? t.offsetWidth - B.width : t.offsetHeight - B.height, a[u] = h ? parseFloat(g) / 100 * c + "px" : parseFloat(g) / c * 100 + "%");
                            g = a.join(" ")
                        }
                        return this.parseComplex(t.style, g, _, s, o)
                    },
                    formatter: nt
                }), yt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: nt
                }), yt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), yt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), yt("transformStyle", {
                    prefix: !0
                }), yt("backfaceVisibility", {
                    prefix: !0
                }), yt("userSelect", {
                    prefix: !0
                }), yt("margin", {
                    parser: ft("marginTop,marginRight,marginBottom,marginLeft")
                }), yt("padding", {
                    parser: ft("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), yt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, n, s, o) {
                        var a, l, u;
                        return 9 > m ? (l = t.currentStyle, u = 8 > m ? " " : ",", a = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", e = this.format(e).split(",").join(u)) : (a = this.format(G(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, s, o)
                    }
                }), yt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), yt("autoRound,strictUnits", {
                    parser: function(t, e, i, n, r) {
                        return r
                    }
                }), yt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, n, s, o) {
                        return this.parseComplex(t.style, this.format(G(t, "borderTopWidth", r, !1, "0px") + " " + G(t, "borderTopStyle", r, !1, "solid") + " " + G(t, "borderTopColor", r, !1, "#000")), this.format(e), s, o)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(ht) || ["#000"])[0]
                    }
                }), yt("borderWidth", {
                    parser: ft("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), yt("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, n, r) {
                        var s = t.style,
                            o = "cssFloat" in s ? "cssFloat" : "styleFloat";
                        return new dt(s, o, 0, 0, r, -1, i, !1, 0, s[o], e)
                    }
                });
                var Ft = function(t) {
                    var e, i = this.t,
                        n = i.filter || G(this.data, "filter") || "",
                        r = 0 | this.s + this.c * t;
                    100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !G(this.data, "filter")) : (i.filter = n.replace(T, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(b, "opacity=" + r))
                };
                yt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, n, s, o) {
                        var a = parseFloat(G(t, "opacity", r, !1, "1")),
                            l = t.style,
                            u = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), u && 1 === a && "hidden" === G(t, "visibility", r) && 0 !== e && (a = 0), q ? s = new dt(l, "opacity", a, e - a, s) : (s = new dt(l, "opacity", 100 * a, 100 * (e - a), s), s.xn1 = u ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = o, s.setRatio = Ft), u && (s = new dt(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                    }
                });
                var Bt = function(t, e) {
                        e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(P, "-$1").toLowerCase())) : t.removeAttribute(e))
                    },
                    Ht = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Bt(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                yt("className", {
                    parser: function(t, e, n, s, o, a, l) {
                        var u, h, c, f, p, d = t.getAttribute("class") || "",
                            m = t.style.cssText;
                        if (o = s._classNamePT = new dt(t, n, 0, 0, o, 2), o.setRatio = Ht, o.pr = -11, i = !0, o.b = d, h = J(t, r), c = t._gsClassPT) {
                            for (f = {}, p = c.data; p;) f[p.p] = 1, p = p._next;
                            c.setRatio(1)
                        }
                        return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : d.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", o.e), u = K(t, h, J(t), l, f), t.setAttribute("class", d), o.data = u.firstMPT, t.style.cssText = m, o = o.xfirst = s.parse(t, u.difs, o, a)
                    }
                });
                var zt = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, n, r, s, o = this.t.style,
                            a = l.transform.parse;
                        if ("all" === this.e) o.cssText = "", r = !0;
                        else
                            for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? St : l[i].p), Bt(o, i);
                        r && (Bt(o, wt), (s = this.t._gsTransform) && (s.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
                    }
                };
                for (yt("clearProps", {
                        parser: function(t, e, n, r, s) {
                            return s = new dt(t, n, 0, 0, s, 2), s.setRatio = zt, s.e = e, s.pr = -10, s.data = r._tween, i = !0, s
                        }
                    }), u = "bezier,throwProps,physicsProps,physics2D".split(","), _t = u.length; _t--;) ! function(t) {
                    if (!l[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        yt(t, {
                            parser: function(t, i, n, r, s, o, u) {
                                var h = a.com.greensock.plugins[e];
                                return h ? (h._cssRegister(), l[n].parse(t, i, n, r, s, o, u)) : (W("Error: " + e + " js file not loaded."), s)
                            }
                        })
                    }
                }(u[_t]);
                u = o.prototype, u._firstPT = u._lastParsedTransform = u._transform = null, u._onInitTween = function(t, e, a) {
                    if (!t.nodeType) return !1;
                    this._target = t, this._tween = a, this._vars = e, h = e.autoRound, i = !1, n = e.suffixMap || o.suffixMap, r = V(t, ""), s = this._overwriteProps;
                    var u, p, m, g, _, v, y, x, b, T = t.style;
                    if (c && "" === T.zIndex && ("auto" === (u = G(t, "zIndex", r)) || "" === u) && this._addLazySet(T, "zIndex", 0), "string" == typeof e && (g = T.cssText, u = J(t, r), T.cssText = g + ";" + e, u = K(t, u, J(t)).difs, !q && w.test(e) && (u.opacity = parseFloat(RegExp.$1)), e = u, T.cssText = g), this._firstPT = p = e.className ? l.className.parse(t, e.className, "className", this, null, null, e) : this.parse(t, e, null), this._transformType) {
                        for (b = 3 === this._transformType, wt ? f && (c = !0, "" === T.zIndex && ("auto" === (y = G(t, "zIndex", r)) || "" === y) && this._addLazySet(T, "zIndex", 0), d && this._addLazySet(T, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : T.zoom = 1, m = p; m && m._next;) m = m._next;
                        x = new dt(t, "transform", 0, 0, null, 2), this._linkCSSP(x, null, m), x.setRatio = wt ? It : Lt, x.data = this._transform || jt(t, r, !0), x.tween = a, x.pr = -1, s.pop()
                    }
                    if (i) {
                        for (; p;) {
                            for (v = p._next, m = g; m && m.pr > p.pr;) m = m._next;
                            (p._prev = m ? m._prev : _) ? p._prev._next = p: g = p, (p._next = m) ? m._prev = p : _ = p, p = v
                        }
                        this._firstPT = g
                    }
                    return !0
                }, u.parse = function(t, e, i, s) {
                    var o, a, u, c, f, p, d, m, g, _, v = t.style;
                    for (o in e) p = e[o], a = l[o], a ? i = a.parse(t, p, o, this, i, s, e) : (f = G(t, o, r) + "", g = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || g && S.test(p) ? (g || (p = ut(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = gt(v, o, f, p, !0, "transparent", i, 0, s)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (u = parseFloat(f), d = u || 0 === u ? f.substr((u + "").length) : "", ("" === f || "auto" === f) && ("width" === o || "height" === o ? (u = it(t, o, r), d = "px") : "left" === o || "top" === o ? (u = Q(t, o, r), d = "px") : (u = "opacity" !== o ? 0 : 1, d = "")), _ = g && "=" === p.charAt(1), _ ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), m = p.replace(x, "")) : (c = parseFloat(p), m = g ? p.replace(x, "") : ""), "" === m && (m = o in n ? n[o] : d), p = c || 0 === c ? (_ ? c + u : c) + m : e[o], d !== m && "" !== m && (c || 0 === c) && u && (u = Z(t, o, u, d), "%" === m ? (u /= Z(t, o, 100, "%") / 100, !0 !== e.strictUnits && (f = u + "%")) : "em" === m ? u /= Z(t, o, 1, "em") : "px" !== m && (c = Z(t, o, c, m), m = "px"), _ && (c || 0 === c) && (p = c + u + m)), _ && (c += u), !u && 0 !== u || !c && 0 !== c ? void 0 !== v[o] && (p || "NaN" != p + "" && null != p) ? (i = new dt(v, o, c || u || 0, 0, i, -1, o, !1, 0, f, p), i.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : f) : W("invalid " + o + " tween value: " + e[o]) : (i = new dt(v, o, u, c - u, i, 0, o, !1 !== h && ("px" === m || "zIndex" === o), 0, f, p), i.xs0 = m)) : i = gt(v, o, f, p, !0, null, i, 0, s)), s && i && !i.plugin && (i.plugin = s);
                    return i
                }, u.setRatio = function(t) {
                    var e, i, n, r = this._firstPT;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (2 === (n = r.l)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, n = 1; r.l > n; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) {
                                if (2 !== r.type)
                                    if (r.r && -1 !== r.type)
                                        if (e = Math.round(r.s + r.c), r.type) {
                                            if (1 === r.type) {
                                                for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; r.l > n; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                                r.t[r.p] = i
                                            }
                                        } else r.t[r.p] = e + r.xs0;
                                else r.t[r.p] = r.e;
                                else r.setRatio(t);
                                r = r._next
                            }
                }, u._enableTransforms = function(t) {
                    this._transform = this._transform || jt(this._target, r, !0), this._transformType = this._transform.svg && xt || !t && 3 !== this._transformType ? 2 : 3
                };
                var qt = function() {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                u._addLazySet = function(t, e, i) {
                    var n = this._firstPT = new dt(t, e, 0, 0, this._firstPT, 2);
                    n.e = i, n.setRatio = qt, n.data = this
                }, u._linkCSSP = function(t, e, i, n) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, u._kill = function(e) {
                    var i, n, r, s = e;
                    if (e.autoAlpha || e.alpha) {
                        s = {};
                        for (n in e) s[n] = e[n];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, s)
                };
                var Xt = function(t, e, i) {
                    var n, r, s, o;
                    if (t.slice)
                        for (r = t.length; --r > -1;) Xt(t[r], e, i);
                    else
                        for (n = t.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (e.push(J(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Xt(s, e, i)
                };
                return o.cascadeTo = function(t, i, n) {
                    var r, s, o, a, l = e.to(t, i, n),
                        u = [l],
                        h = [],
                        c = [],
                        f = [],
                        p = e._internals.reservedProps;
                    for (t = l._targets || l.target, Xt(t, h, f), l.render(i, !0, !0), Xt(t, c), l.render(0, !0, !0), l._enabled(!0), r = f.length; --r > -1;)
                        if (s = K(f[r], h[r], c[r]), s.firstMPT) {
                            s = s.difs;
                            for (o in n) p[o] && (s[o] = n[o]);
                            a = {};
                            for (o in s) a[o] = h[r][o];
                            u.push(e.fromTo(f[r], i, a, s))
                        }
                    return u
                }, t.activate([o]), o
            }, !0),
            function() {
                var t = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = t.prototype;
                e._onInitAllProps = function() {
                    for (var t, e, i, n = this._tween, r = n.vars.roundProps instanceof Array ? n.vars.roundProps : n.vars.roundProps.split(","), s = r.length, o = {}, a = n._propLookup.roundProps; --s > -1;) o[r[s]] = 1;
                    for (s = r.length; --s > -1;)
                        for (t = r[s], e = n._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(o, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : n._firstPT === e && (n._firstPT = i), e._next = e._prev = null, n._propLookup[t] = a), e = i;
                    return !1
                }, e._add = function(t, e, i, n) {
                    this._addTween(t, e, i, i + n, e, !0), this._overwriteProps.push(e)
                }
            }(),
            function() {
                var t = /(?:\d|\-|\+|=|#|\.)*/g,
                    e = /[A-Za-z%]/g;
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.4.0",
                    init: function(i, n) {
                        var r, s, o, a, l;
                        if ("function" != typeof i.setAttribute) return !1;
                        this._target = i, this._proxy = {}, this._start = {}, this._end = {}, this._suffix = {};
                        for (r in n) this._start[r] = this._proxy[r] = s = i.getAttribute(r) + "", this._end[r] = o = n[r] + "", this._suffix[r] = a = e.test(o) ? o.replace(t, "") : e.test(s) ? s.replace(t, "") : "", a && -1 !== (l = o.indexOf(a)) && (o = o.substr(0, l)), this._addTween(this._proxy, r, parseFloat(s), o, r) || (this._suffix[r] = ""), "=" === o.charAt(1) && (this._end[r] = this._firstPT.s + this._firstPT.c + a), this._overwriteProps.push(r);
                        return !0
                    },
                    set: function(t) {
                        this._super.setRatio.call(this, t);
                        for (var e, i = this._overwriteProps, n = i.length, r = 1 === t ? this._end : t ? this._proxy : this._start, s = r === this._proxy; --n > -1;) e = i[n], this._target.setAttribute(e, r[e] + (s ? this._suffix[e] : ""))
                    }
                })
            }(), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.2.1",
                API: 2,
                init: function(t, e) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var i, n, r, s, o, a, l = !0 === e.useRadians ? 2 * Math.PI : 360;
                    for (i in e) "useRadians" !== i && (a = (e[i] + "").split("_"), n = a[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), s = this.finals[i] = "string" == typeof n && "=" === n.charAt(1) ? r + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0, o = s - r, a.length && (n = a.join("_"), -1 !== n.indexOf("short") && (o %= l) !== o % (l / 2) && (o = 0 > o ? o + l : o - l), -1 !== n.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * l) % l - (0 | o / l) * l : -1 !== n.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * l) % l - (0 | o / l) * l)), (o > 1e-6 || -1e-6 > o) && (this._addTween(t, i, r, r + o, i), this._overwriteProps.push(i)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                    s = r.com.greensock,
                    o = 2 * Math.PI,
                    a = Math.PI / 2,
                    l = s._class,
                    u = function(e, i) {
                        var n = l("easing." + e, function() {}, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, n
                    },
                    h = t.register || function() {},
                    c = function(t, e, i, n) {
                        var r = l("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new n
                        }, !0);
                        return h(r, t), r
                    },
                    f = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    p = function(e, i) {
                        var n = l("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, r.config = function(t) {
                            return new n(t)
                        }, n
                    },
                    d = c("Back", p("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), p("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), p("BackInOut", function(t) {
                        return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    m = l("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
                    }, !0),
                    g = m.prototype = new t;
                return g.constructor = m, g.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, i) {
                    return new m(t, e, i)
                }, e = l("easing.SteppedEase", function(t) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                }, g.config = e.config = function(t) {
                    return new e(t)
                }, i = l("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, n, r, s, o, a, l = e.taper || "none", u = [], h = 0, c = 0 | (e.points || 20), p = c, d = !1 !== e.randomize, m = !0 === e.clamp, g = e.template instanceof t ? e.template : null, _ = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;) i = d ? Math.random() : 1 / c * p, n = g ? g.getRatio(i) : i, "none" === l ? r = _ : "out" === l ? (s = 1 - i, r = s * s * _) : "in" === l ? r = i * i * _ : .5 > i ? (s = 2 * i, r = .5 * s * s * _) : (s = 2 * (1 - i), r = .5 * s * s * _), d ? n += Math.random() * r - .5 * r : p % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), u[h++] = {
                        x: i,
                        y: n
                    };
                    for (u.sort(function(t, e) {
                            return t.x - e.x
                        }), a = new f(1, 1, null), p = c; --p > -1;) o = u[p], a = new f(o.x, o.y, a);
                    this._prev = new f(0, 0, 0 !== a.t ? a : a.next)
                }, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && e.t >= t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, g.config = function(t) {
                    return new i(t)
                }, i.ease = new i, c("Bounce", u("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), u("BounceIn", function(t) {
                    return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), u("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), c("Circ", u("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), u("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), u("CircInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), n = function(e, i, n) {
                    var r = l("easing." + e, function(t, e) {
                            this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (1 > t ? t : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                        }, !0),
                        s = r.prototype = new t;
                    return s.constructor = r, s.getRatio = i, s.config = function(t, e) {
                        return new r(t, e)
                    }, r
                }, c("Elastic", n("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                }, .3), n("ElasticIn", function(t) {
                    return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
                }, .3), n("ElasticInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) + 1
                }, .45)), c("Expo", u("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), u("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), u("ExpoInOut", function(t) {
                    return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), c("Sine", u("SineOut", function(t) {
                    return Math.sin(t * a)
                }), u("SineIn", function(t) {
                    return 1 - Math.cos(t * a)
                }), u("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), l("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), h(r.SlowMo, "SlowMo", "ease,"), h(i, "RoughEase", "ease,"), h(e, "SteppedEase", "ease,"), d
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t, e) {
        "use strict";
        var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!i.TweenLite) {
            var n, r, s, o, a, l = function(t) {
                    var e, n = t.split("."),
                        r = i;
                    for (e = 0; n.length > e; e++) r[n[e]] = r = r[n[e]] || {};
                    return r
                },
                u = l("com.greensock"),
                h = 1e-10,
                c = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                f = function() {},
                p = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                d = {},
                m = function(e, n, r, s) {
                    this.sc = d[e] ? d[e].sc : [], d[e] = this, this.gsClass = null, this.func = r;
                    var o = [];
                    this.check = function(a) {
                        for (var u, h, c, f, p = n.length, g = p; --p > -1;)(u = d[n[p]] || new m(n[p], [])).gsClass ? (o[p] = u.gsClass, g--) : a && u.sc.push(this);
                        if (0 === g && r)
                            for (h = ("com.greensock." + e).split("."), c = h.pop(), f = l(h.join("."))[c] = this.gsClass = r.apply(r, o), s && (i[c] = f, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + e.split(".").pop(), [], function() {
                                    return f
                                }) : "TweenMax" === e && "undefined" != typeof module && module.exports && (module.exports = f)), p = 0; this.sc.length > p; p++) this.sc[p].check()
                    }, this.check(!0)
                },
                g = t._gsDefine = function(t, e, i, n) {
                    return new m(t, e, i, n)
                },
                _ = u._class = function(t, e, i) {
                    return e = e || function() {}, g(t, [], function() {
                        return e
                    }, i), e
                };
            g.globals = i;
            var v = [0, 0, 1, 1],
                y = [],
                x = _("easing.Ease", function(t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? v.concat(e) : v
                }, !0),
                b = x.map = {},
                w = x.register = function(t, e, i, n) {
                    for (var r, s, o, a, l = e.split(","), h = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                        for (s = l[h], r = n ? _("easing." + s, null, !0) : u.easing[s] || {}, o = c.length; --o > -1;) a = c[o], b[s + "." + a] = b[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                };
            for (s = x.prototype, s._calcEnd = !1, s.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
                }, n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = n.length; --r > -1;) s = n[r] + ",Power" + r, w(new x(null, null, 1, r), s, "easeOut", !0), w(new x(null, null, 2, r), s, "easeIn" + (0 === r ? ",easeNone" : "")), w(new x(null, null, 3, r), s, "easeInOut");
            b.linear = u.easing.Linear.easeIn, b.swing = u.easing.Quad.easeInOut;
            var T = _("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            s = T.prototype, s.addEventListener = function(t, e, i, n, r) {
                r = r || 0;
                var s, l, u = this._listeners[t],
                    h = 0;
                for (null == u && (this._listeners[t] = u = []), l = u.length; --l > -1;) s = u[l], s.c === e && s.s === i ? u.splice(l, 1) : 0 === h && r > s.pr && (h = l + 1);
                u.splice(h, 0, {
                    c: e,
                    s: i,
                    up: n,
                    pr: r
                }), this !== o || a || o.wake()
            }, s.removeEventListener = function(t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1)
            }, s.dispatchEvent = function(t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, i = this._eventTarget; --e > -1;)(n = r[e]) && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var S = t.requestAnimationFrame,
                P = t.cancelAnimationFrame,
                k = Date.now || function() {
                    return (new Date).getTime()
                },
                C = k();
            for (n = ["ms", "moz", "webkit", "o"], r = n.length; --r > -1 && !S;) S = t[n[r] + "RequestAnimationFrame"], P = t[n[r] + "CancelAnimationFrame"] || t[n[r] + "CancelRequestAnimationFrame"];
            _("Ticker", function(t, e) {
                var i, n, r, s, l, u = this,
                    c = k(),
                    p = !1 !== e && S,
                    d = 500,
                    m = 33,
                    g = function(t) {
                        var e, o, a = k() - C;
                        a > d && (c += a - m), C += a, u.time = (C - c) / 1e3, e = u.time - l, (!i || e > 0 || !0 === t) && (u.frame++, l += e + (e >= s ? .004 : s - e), o = !0), !0 !== t && (r = n(g)), o && u.dispatchEvent("tick")
                    };
                T.call(u), u.time = u.frame = 0, u.tick = function() {
                    g(!0)
                }, u.lagSmoothing = function(t, e) {
                    d = t || 1 / h, m = Math.min(e, d, 0)
                }, u.sleep = function() {
                    null != r && (p && P ? P(r) : clearTimeout(r), n = f, r = null, u === o && (a = !1))
                }, u.wake = function() {
                    null !== r ? u.sleep() : u.frame > 10 && (C = k() - d + 5), n = 0 === i ? f : p && S ? S : function(t) {
                        return setTimeout(t, 0 | 1e3 * (l - u.time) + 1)
                    }, u === o && (a = !0), g(2)
                }, u.fps = function(t) {
                    return arguments.length ? (i = t, s = 1 / (i || 60), l = this.time + s, void u.wake()) : i
                }, u.useRAF = function(t) {
                    return arguments.length ? (u.sleep(), p = t, void u.fps(i)) : p
                }, u.fps(t), setTimeout(function() {
                    p && 5 > u.frame && u.useRAF(!1)
                }, 1500)
            }), s = u.Ticker.prototype = new u.events.EventDispatcher, s.constructor = u.Ticker;
            var O = _("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, X) {
                    a || o.wake();
                    var i = this.vars.useFrames ? q : X;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            o = O.ticker = new u.Ticker, s = O.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
            var A = function() {
                a && k() - C > 2e3 && o.wake(), setTimeout(A, 2e3)
            };
            A(), s.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, s.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, s.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, s.seek = function(t, e) {
                return this.totalTime(Number(t), !1 !== e)
            }, s.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
            }, s.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, s.render = function() {}, s.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, s.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
            }, s._enabled = function(t, e) {
                return a || o.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, s._kill = function() {
                return this._enabled(!1, !1)
            }, s.kill = function(t, e) {
                return this._kill(t, e), this
            }, s._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, s._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, s._callback = function(t) {
                var e = this.vars;
                e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || y)
            }, s.eventCallback = function(t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, s.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, s.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, s.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, s.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, s.totalTime = function(t, e, i) {
                if (a || o.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), M.length && $())
                }
                return this
            }, s.progress = s.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
            }, s.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, s.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, s.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || h, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, s.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, s.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e, i, n = this._timeline;
                return t != this._paused && n && (a || t || o.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && this.render(n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, !0, !0)), this._gc && !t && this._enabled(!0, !1), this
            };
            var E = _("core.SimpleTimeline", function(t) {
                O.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            s = E.prototype = new O, s.constructor = E, s.kill()._gc = !1, s._first = s._last = s._recent = null, s._sortChildren = !1, s.add = s.insert = function(t, e) {
                var i, n;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                    for (n = t._startTime; i && i._startTime > n;) i = i._prev;
                return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
            }, s._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, s.render = function(t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
            }, s.rawTime = function() {
                return a || o.wake(), this._totalTime
            };
            var R = _("TweenLite", function(e, i, n) {
                    if (O.call(this, i, n), this.render = R.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : R.selector(e) || e;
                    var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? z[R.defaultOverwrite] : "number" == typeof l ? l >> 0 : z[l], (a || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                        for (this._targets = o = c(e), this._propLookup = [], this._siblings = [], r = 0; o.length > r; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(c(s))) : (this._siblings[r] = U(s, this, !1), 1 === l && this._siblings[r].length > 1 && V(s, this, null, 1, this._siblings[r])) : "string" == typeof(s = o[r--] = R.selector(s)) && o.splice(r + 1, 1) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = U(e, this, !1), 1 === l && this._siblings.length > 1 && V(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -h, this.render(-this._delay))
                }, !0),
                D = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                N = function(t, e) {
                    var i, n = {};
                    for (i in t) H[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!I[i] || I[i] && I[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                    t.css = n
                };
            s = R.prototype = new O, s.constructor = R, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, R.version = "1.17.0", R.defaultEase = s._ease = new x(null, null, 1, 1), R.defaultOverwrite = "auto", R.ticker = o, R.autoSleep = 120, R.lagSmoothing = function(t, e) {
                o.lagSmoothing(t, e)
            }, R.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (R.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var M = [],
                j = {},
                L = R._internals = {
                    isArray: p,
                    isSelector: D,
                    lazyTweens: M
                },
                I = R._plugins = {},
                F = L.tweenLookup = {},
                B = 0,
                H = L.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1
                },
                z = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                q = O._rootFramesTimeline = new E,
                X = O._rootTimeline = new E,
                W = 30,
                $ = L.lazyRender = function() {
                    var t, e = M.length;
                    for (j = {}; --e > -1;)(t = M[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    M.length = 0
                };
            X._startTime = o.time, q._startTime = o.frame, X._active = q._active = !0, setTimeout($, 1), O._updateRoot = R.render = function() {
                var t, e, i;
                if (M.length && $(), X.render((o.time - X._startTime) * X._timeScale, !1, !1), q.render((o.frame - q._startTime) * q._timeScale, !1, !1), M.length && $(), o.frame >= W) {
                    W = o.frame + (parseInt(R.autoSleep, 10) || 120);
                    for (i in F) {
                        for (e = F[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete F[i]
                    }
                    if ((!(i = X._first) || i._paused) && R.autoSleep && !q._first && 1 === o._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || o.sleep()
                    }
                }
            }, o.addEventListener("tick", O._updateRoot);
            var U = function(t, e, i) {
                    var n, r, s = t._gsTweenID;
                    if (F[s || (t._gsTweenID = s = "t" + B++)] || (F[s] = {
                            target: t,
                            tweens: []
                        }), e && (n = F[s].tweens, n[r = n.length] = e, i))
                        for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return F[s].tweens
                },
                Y = function(t, e, i, n) {
                    var r, s, o = t.vars.onOverwrite;
                    return o && (r = o(t, e, i, n)), o = R.onOverwrite, o && (s = o(t, e, i, n)), !1 !== r && !1 !== s
                },
                V = function(t, e, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; l > s; s++)
                            if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var u, c = e._startTime + h,
                        f = [],
                        p = 0,
                        d = 0 === e._duration;
                    for (s = r.length; --s > -1;)(a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (u = u || G(e, 0, d), 0 === G(a, u, d) && (f[p++] = a)) : c >= a._startTime && a._startTime + a.totalDuration() / a._timeScale > c && ((d || !a._initted) && 2e-10 >= c - a._startTime || (f[p++] = a)));
                    for (s = p; --s > -1;)
                        if (a = f[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !Y(a, e)) continue;
                            a._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                G = function(t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > e ? s - e : i && s === e || !t._initted && 2 * h > s - e ? h : (s += t.totalDuration() / t._timeScale / r) > e + h ? 0 : s - e - h
                };
            s._init = function() {
                var t, e, i, n, r, s = this.vars,
                    o = this._overwrittenProps,
                    a = this._duration,
                    l = !!s.immediateRender,
                    u = s.ease;
                if (s.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in s.startAt) r[n] = s.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = l && !1 !== s.lazy, r.startAt = r.delay = null, this._startAt = R.to(this.target, 0, r), l)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== a) return
                } else if (s.runBackwards && 0 !== a)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (l = !1), i = {};
                        for (n in s) H[n] && "autoCSS" !== n || (i[n] = s[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && !1 !== s.lazy, i.immediateRender = l, this._startAt = R.to(this.target, 0, i), l) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = u = u ? u instanceof x ? u : "function" == typeof u ? new x(u, s.easeParams) : b[u] || R.defaultEase : R.defaultEase, s.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, o);
                if (e && R._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = s.onUpdate, this._initted = !0
            }, s._initProps = function(e, i, n, r) {
                var s, o, a, l, u, h;
                if (null == e) return !1;
                j[e._gsTweenID] && $(), this.vars.css || e.style && e !== t && e.nodeType && I.css && !1 !== this.vars.autoCSS && N(this.vars, e);
                for (s in this.vars) {
                    if (h = this.vars[s], H[s]) h && (h instanceof Array || h.push && p(h)) && -1 !== h.join("").indexOf("{self}") && (this.vars[s] = h = this._swapSelfInParams(h, this));
                    else if (I[s] && (l = new I[s])._onInitTween(e, this.vars[s], this)) {
                        for (this._firstPT = u = {
                                _next: this._firstPT,
                                t: l,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: !0,
                                n: s,
                                pg: !0,
                                pr: l._priority
                            }, o = l._overwriteProps.length; --o > -1;) i[l._overwriteProps[o]] = this._firstPT;
                        (l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = i[s] = u = {
                        _next: this._firstPT,
                        t: e,
                        p: s,
                        f: "function" == typeof e[s],
                        n: s,
                        pg: !1,
                        pr: 0
                    }, u.s = u.f ? e[s.indexOf("set") || "function" != typeof e["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(e[s]), u.c = "string" == typeof h && "=" === h.charAt(1) ? parseInt(h.charAt(0) + "1", 10) * Number(h.substr(2)) : Number(h) - u.s || 0;
                    u && u._next && (u._next._prev = u)
                }
                return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && V(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (j[e._gsTweenID] = !0), a)
            }, s.render = function(t, e, i) {
                var n, r, s, o, a = this._time,
                    l = this._duration,
                    u = this._rawPrevTime;
                if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > u || u === h && "isPause" !== this.data) && u !== t && (i = !0, u > h && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || u === t ? t : h);
                else if (1e-7 > t) this._totalTime = this._time = 0,
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && u > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (u >= 0 && (u !== h || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || u === t ? t : h)), this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var c = t / l,
                        f = this._easeType,
                        p = this._easePower;
                    (1 === f || 3 === f && c >= .5) && (c = 1 - c), 3 === f && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), this.ratio = 1 === f ? 1 - c : 2 === f ? c : .5 > t / l ? c / 2 : 1 - c / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = u, M.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, e, i), e || (this._time !== a || n) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === h && o !== h && (this._rawPrevTime = 0))
                }
            }, s._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : R.selector(e) || e;
                var n, r, s, o, a, l, u, h, c, f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((p(e) || D(e)) && "number" != typeof e[0])
                    for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (u = t || a, h = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (R.onOverwrite || this.vars.onOverwrite)) {
                            for (s in u) a[s] && (c || (c = []), c.push(s));
                            if ((c || !t) && !Y(this, i, e, c)) return !1
                        }
                        for (s in u)(o = a[s]) && (f && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(u) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), h && (r[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, s.invalidate = function() {
                return this._notifyPluginsOfEnabled && R._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], O.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -h, this.render(-this._delay)), this
            }, s._enabled = function(t, e) {
                if (a || o.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = U(n[i], this, !0);
                    else this._siblings = U(this.target, this, !0)
                }
                return O.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && R._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, R.to = function(t, e, i) {
                return new R(t, e, i)
            }, R.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new R(t, e, i)
            }, R.fromTo = function(t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new R(t, e, n)
            }, R.delayedCall = function(t, e, i, n, r) {
                return new R(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, R.set = function(t, e) {
                return new R(t, 0, e)
            }, R.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : R.selector(t) || t;
                var i, n, r, s;
                if ((p(t) || D(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(R.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else
                    for (n = U(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n
            }, R.killTweensOf = R.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var n = R.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
            };
            var Z = _("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = Z.prototype
            }, !0);
            if (s = Z.prototype, Z.version = "1.10.1", Z.API = 2, s._firstPT = null, s._addTween = function(t, e, i, n, r, s) {
                    var o, a;
                    return null != n && (o = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - Number(i) : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) ? (this._firstPT = a = {
                        _next: this._firstPT,
                        t: t,
                        p: e,
                        s: i,
                        c: o,
                        f: "function" == typeof t[e],
                        n: r || e,
                        r: s
                    }, a._next && (a._next._prev = a), a) : void 0
                }, s.setRatio = function(t) {
                    for (var e, i = this._firstPT; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
                }, s._kill = function(t) {
                    var e, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, s._roundProps = function(t, e) {
                    for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
                }, R._onPluginEvent = function(t, e) {
                    var i, n, r, s, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, Z.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === Z.API && (I[(new t[e])._propName] = t[e]);
                    return !0
                }, g.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        n = t.priority || 0,
                        r = t.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        o = _("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            Z.call(this, i, n), this._overwriteProps = r || []
                        }, !0 === t.global),
                        a = o.prototype = new Z(i);
                    a.constructor = o, o.API = t.API;
                    for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                    return o.version = t.version, Z.activate([o]), o
                }, n = t._gsQueue) {
                for (r = 0; n.length > r; r++) n[r]();
                for (s in d) d[s].func || t.console.log("GSAP encountered missing dependency: com.greensock." + s)
            }
            a = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window), define("TweenMax", function() {}), define("util/class", [], function() {
        return function() {
            var t = !1,
                e = /xyz/.test(function() {
                    xyz
                }) ? /\b_super\b/ : /.*/,
                i = function() {};
            return i.extend = function(i) {
                function n() {
                    !t && this.initialize && this.initialize.apply(this, arguments)
                }
                var r = this.prototype;
                t = !0;
                var s = new this;
                t = !1;
                for (var o in i) s[o] = "function" == typeof i[o] && "function" == typeof r[o] && e.test(i[o]) ? function(t, e) {
                    return function() {
                        var i = this._super;
                        this._super = r[t];
                        var n = e.apply(this, arguments);
                        return this._super = i, n
                    }
                }(o, i[o]) : i[o];
                return n.prototype = s, n.prototype.constructor = n, n.extend = arguments.callee, n
            }, i
        }()
    }), define("util/anim_frame", ["config", "underscore", "backbone"], function(t, e, i) {
        "use strict";
        ! function() {
            for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
                var n = (new Date).getTime(),
                    r = Math.max(0, 16 - (n - t)),
                    s = window.setTimeout(function() {
                        e(n + r)
                    }, r);
                return t = n + r, s
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            })
        }();
        var n = {};
        n.onAnimRequestFrame = function() {
            this.trigger("anim_frame"), window.requestAnimationFrame(r)
        };
        var r = e.bind(n.onAnimRequestFrame, n);
        return e.extend(n, i.Events), n.on = function(t, e, n) {
            var r = 0;
            this._events && this._events.anim_frame && this._events.anim_frame.forEach(function(t) {
                t.context && n && n.cid === t.context.cid && r++
            }), i.Events.on.apply(this, arguments)
        }, n.onAnimRequestFrame(), n
    }), define("preloader", ["events/app_events", "backbone", "TweenMax", "config", "util/class", "util/anim_frame"], function(t, e, i, n, r, s) {
        "use strict";
        return r.extend({
            w: 0,
            h: 0,
            cnvW: 0,
            cnvH: 0,
            pixelRatio: 1,
            cnv: null,
            ctx: null,
            STARTING_PROGRESS: n.MOBILE ? .2 : .3,
            fauxPr: 0,
            fauxClipped: !1,
            init: function(t) {
                this.el = document.getElementById("preloader"), this.inner = document.getElementsByClassName("js-loader-inner")[0], this.barWrapper = document.getElementsByClassName("js-bar-wrapper")[0], this.barProgress = document.getElementsByClassName("js-bar-progress")[0], this.drop = document.getElementsByClassName("js-drop")[0], this.cnv = document.createElement("canvas"), this.ctx = this.cnv.getContext("2d"), this.cnvDrop = document.createElement("canvas"), this.ctxDrop = this.cnvDrop.getContext("2d"), this.dropImg = new Image, this.dropImg.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNi4yIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMzYuMiA1MCI+PHRpdGxlPlVudGl0bGVkLTE8L3RpdGxlPjxwYXRoIGQ9Ik0zMy42NSAyMi42NkMzMCAxNS44OCAxOC4zNCA5LjQ3IDE4LjEuM3YuMUMxNy43NCA5LjUzIDYuMjIgMTUuOTEgMi41NCAyMi42NWExOC4xMSAxOC4xMSAwIDEgMCAzMS4xMSAwIi8+PC9zdmc+", this.el.appendChild(this.cnv), this.onResize = this.onResize.bind(this), this.onResize(), this.addEvents(), this.setDefault(), this.start()
            },
            addEvents: function() {
                window.addEventListener("resize", this.onResize)
            },
            removeEvents: function() {
                window.removeEventListener("resize", this.onResize)
            },
            setDefault: function() {
                this.isComplete = !1, this.tgPr = 0, this.pr = 0, this.renderBar = !1, this.tweenObj = {
                    bgMaskScaleXPr: 0,
                    bgMaskScaleYPr: 0,
                    alphaDropPr: 0,
                    alphaBgPr: 0
                }, i.set([this.barWrapper, this.barProgress], {
                    scaleX: 0
                }), i.to(this, 7, {
                    fauxPr: this.STARTING_PROGRESS,
                    ease: "Power1.easeInOut"
                })
            },
            start: function() {
                s.on("anim_frame", this.update, this), i.to(this.tweenObj, .64, {
                    alphaBgPr: 1,
                    delay: .23,
                    ease: "Cubic.easeInOut"
                }), i.delayedCall(.6, this.animateBgIn.bind(this))
            },
            complete: function() {
                this.isComplete || (this.animateBarOut(), this.isComplete = !0)
            },
            kill: function() {
                this.removeEvents(), document.getElementById("rootNode").removeChild(this.el), s.off("anim_frame", this.loop, this), e.trigger("LOADER:COMPLETE")
            },
            animateBgIn: function() {
                this.inner.style.opacity = 1, i.to(this.tweenObj, 1, {
                    alphaDropPr: 1,
                    ease: "Cubic.easeInOut"
                }), i.to(this.tweenObj, .7, {
                    bgMaskScaleYPr: 1,
                    ease: "Power2.easeIn",
                    delay: 1
                }), i.to(this.tweenObj, 1.1, {
                    bgMaskScaleXPr: 1,
                    ease: "Expo.easeInOut",
                    delay: 1.75,
                    onComplete: this.onAnimBgComplete.bind(this)
                }), i.delayedCall(1.75, this.animateBarIn.bind(this))
            },
            animateBarIn: function() {
                i.to(this.barWrapper, 1.15, {
                    scaleX: 1,
                    force3D: !0,
                    ease: "Expo.easeInOut"
                })
            },
            animateBarOut: function() {
                e.trigger(t.Loader.PreHidden), i.to(this.drop, .62, {
                    y: this.innerH,
                    force3D: !0,
                    ease: "Expo.easeIn"
                });
                var n = this;
                i.to(this.barWrapper, .79, {
                    scaleX: 0,
                    force3D: !0,
                    ease: "Expo.easeInOut",
                    delay: .144
                }), i.delayedCall(.79, function() {
                    e.trigger("LOADER:HIDDEN"), n.kill()
                })
            },
            drawBg: function() {
                var t = this.tweenObj.bgMaskScaleXPr,
                    e = this.tweenObj.bgMaskScaleYPr,
                    i = .5 * this.w * t;
                this.ctx.clearRect(0, 0, this.w, this.h), this.ctx.save();
                var n = Math.round(35 * this.tweenObj.alphaBgPr).toString();
                this.ctx.fillStyle = "rgb(" + n + "," + n + "," + n + ")", this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height), this.drawDrop(), this.ctx.restore(), this.ctx.save(), this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillStyle = "rgb(255, 255, 255)", this.ctx.fillRect(.5 * (this.w - 1) - i, 0, 2 + this.w * t, this.h * e), this.ctx.restore()
            },
            drawDrop: function() {
                var t = this.tweenObj.alphaDropPr;
                this.ctxDrop.clearRect(0, 0, this.cnvDrop.width, this.cnvDrop.height), this.ctxDrop.save(), this.ctxDrop.globalAlpha = t, this.ctxDrop.drawImage(this.dropImg, 0, 0, this.dropW, this.dropH), this.ctxDrop.restore(), this.ctx.drawImage(this.cnvDrop, Math.ceil(.5 * (this.w - this.dropW)), .5 * (this.h - this.innerH), this.dropW, this.dropH)
            },
            drawBar: function() {
                i.set(this.barProgress, {
                    scaleX: this.pr,
                    force3D: !0
                })
            },
            update: function() {
                this.updateProgress(), this.renderBar && (this.pr += .06 * (this.tgPr - this.pr)), this.drawBg(), this.drawBar();
                var t = this;
                1 === this.tgPr && this.pr > .99 && t.complete()
            },
            updateProgress: function() {
                window.loadProgress >= .95 && !this.fauxClipped && (this.fauxClipped = !0, i.killTweensOf(this, {
                    fauxPr: !0
                }), i.to(this, .3, {
                    fauxPr: this.STARTING_PROGRESS,
                    ease: "Power1.easeInOut"
                })), window.loadProgress <= this.tgPr || (this.tgPr = this.fauxPr + (window.loadProgress || 0) * (1 - this.STARTING_PROGRESS))
            },
            onFileLoaded: function(t) {},
            onAnimBgComplete: function() {
                this.renderBar = !0
            },
            onResize: function() {
                var t = this.pixelRatio = window.devicePixelRatio;
                this.w = window.innerWidth, this.h = window.innerHeight, this.cnv.width = t * this.w, this.cnv.height = t * this.h, this.cnv.style.width = this.w + "px", this.cnv.style.height = this.h + "px", this.ctx.scale(t, t), this.innerW = Math.min(.6 * this.w, 500), this.innerH = .1 * this.h, this.inner.style.left = Math.round(.5 * (this.w - this.innerW)) + "px", this.inner.style.top = Math.round(.5 * (this.h - this.innerH)) + "px", this.inner.style.width = this.innerW + "px", this.inner.style.height = this.innerH + "px";
                var e = n.MOBILE ? .46 : .6;
                this.dropW = 36 * e, this.dropH = 50 * e, this.cnvDrop.width = Math.ceil(t * this.dropW), this.cnvDrop.height = Math.ceil(t * this.dropH), this.ctxDrop.scale(t, t)
            }
        })
    }), require.config({
        config: {
            text: {
                useXhr: function(t, e, i, n) {
                    return !0
                }
            }
        },
        paths: {
            jquery: "libs/jquery-2.1.4",
            underscore: "libs/underscore",
            backbone: "libs/backbone",
            swfobject: "libs/swfobject",
            handlebars: "libs/handlebars-v4.0.5",
            text: "libs/text",
            videojs: "libs/videojs/video",
            TweenMax: "libs/greensock/TweenMax.min",
            TweenLite: "libs/greensock/TweenLite.min",
            TimelineLite: "libs/greensock/TimelineLite.min",
            TimelineMax: "libs/greensock/TimelineMax.min",
            ScrollTo: "libs/greensock/plugins/ScrollToPlugin.min",
            sylvester: "libs/sylvester-min",
            console: "util/debugger",
            visibly: "libs/visibly",
            howler: "libs/howler",
            howler2: "libs/howler.2.min",
            tap: "libs/tap",
            stats: "libs/stats.min",
            createjs: "shims/shim_createjs",
            "libs/createjs/preloadjs": "libs/createjs/preloadjs-0.6.2.combined",
            "libs/createjs/tweenjs": "libs/createjs/tweenjs-0.6.2.min",
            "libs/createjs/easeljs": "libs/createjs/easeljs-0.8.2.combined",
            "libs/createjs/soundjs": "libs/createjs/soundjs-0.6.0.min",
            cannon: "libs/cannon.min",
            three: "libs/three/three",
            "three/controls/OrbitControls": "libs/three/controls/OrbitControls",
            "three/postprocessing/EffectComposer": "libs/three/postprocessing/EffectComposer",
            "three/postprocessing/RenderPass": "libs/three/postprocessing/RenderPass",
            "three/postprocessing/MaskPass": "libs/three/postprocessing/MaskPass",
            "three/postprocessing/ShaderPass": "libs/three/postprocessing/ShaderPass",
            "three/postprocessing/ClearPass": "libs/three/postprocessing/ClearPass",
            "three/shaders/FXAAShader": "libs/three/shaders/FXAAShader",
            "three/shaders/BrightnessContrastShader": "libs/three/shaders/BrightnessContrastShader",
            "three/shaders/ColorCorrectionShader": "libs/three/shaders/ColorCorrectionShader",
            "three/shaders/CopyShader": "libs/three/shaders/CopyShader",
            "three/shaders/ConvolutionShader": "libs/three/shaders/ConvolutionShader",
            "three/shaders/BurnShader": "libs/three/shaders/BurnShader",
            "three/shaders/AdditiveBlendShader": "libs/three/shaders/AdditiveBlendShader",
            objLoader: "libs/three/loaders/OBJLoader",
            "shaders/BlendPass": "shaders/BlendPass",
            "shaders/ColourOffsetShader": "shaders/ColourOffsetShader",
            "shaders/BasicBlurShader": "shaders/BasicBlurShader",
            "shaders/NoiseShader": "shaders/NoiseShader",
            "shaders/PremultiplierShader": "shaders/PremultiplierShader",
            sea3d: "libs/SEA3D",
            sea3dLZMA: "libs/SEA3DLZMA",
            sea3dLoader: "libs/SEA3DLoader",
            svgmorph: "libs/SVGMorph.min",
            SVGPoints: "libs/svg-points"
        },
        shim: {
            svgmorph: {
                exports: "MORPH"
            },
            "libs/console-shim": {
                exports: "console"
            },
            jquery: {
                exports: "jQuery"
            },
            sylvester: {
                exports: "$M"
            },
            "libs/createjs/movieclip": {
                deps: ["libs/createjs/easeljs", "libs/createjs/tweenjs"]
            },
            "libs/createjs/tweenjs": {
                exports: "createjs.Tween",
                deps: ["libs/createjs/easeljs"]
            },
            "libs/device": {
                exports: "device"
            },
            underscore: {
                exports: "_"
            },
            backbone: {
                deps: ["underscore", "jquery"],
                exports: "Backbone"
            },
            handlebars: {
                exports: "handlebars"
            },
            console: {
                exports: "console"
            },
            "libs/mocha": {
                exports: "mocha"
            },
            "libs/expect": {
                exports: "expect"
            },
            "libs/swfobject": {
                deps: ["jquery"],
                exports: "swfobject"
            },
            "libs/swffit": ["libs/swfobject"],
            "libs/swfmacmousewheel": ["libs/swfobject"],
            "libs/jquery-swfobject": ["jquery"],
            sea3d: {
                exports: "SEA3D",
                deps: ["three"]
            },
            sea3dLZMA: {
                exports: "SEA3DLZMA",
                deps: ["sea3d"]
            },
            sea3dLoader: {
                exports: "SEA3DLoader",
                deps: ["sea3d"]
            },
            cannon: {
                exports: "CANNON"
            },
            stats: {
                exports: "Stats"
            },
            three: {
                exports: "THREE"
            },
            "three/controls/OrbitControls": {
                exports: "OrbitControls",
                deps: ["three"]
            },
            "three/postprocessing/EffectComposer": {
                exports: "EffectComposer",
                deps: ["three", "three/postprocessing/MaskPass", "three/shaders/CopyShader", "three/postprocessing/ShaderPass"]
            },
            "shaders/ClearPass": {
                exports: "THREE.ClearPass",
                deps: ["three", "three/postprocessing/Pass"]
            },
            "shaders/ColourOffsetShader": {
                exports: "ColourOffsetShader",
                deps: ["three"]
            },
            "shaders/NoiseShader": {
                exports: "NoiseShader",
                deps: ["three"]
            },
            "shaders/BlendPass": {
                exports: "BlendPass",
                deps: ["three", "shaders/BlendShader"]
            },
            "shaders/BlendShader": {
                exports: "BlendShader",
                deps: ["three"]
            },
            "shaders/BasicBlurShader": {
                exports: "BasicBlurShader",
                deps: ["three"]
            },
            "shaders/PremultiplierShader": {
                exports: "PremultiplierShader",
                deps: ["three"]
            },
            "shaders/ChokeShader": {
                exports: "ChokeShader",
                deps: ["three"]
            },
            "three/postprocessing/ShaderPass": {
                exports: "ShaderPass",
                deps: ["three"]
            },
            "three/postprocessing/MaskPass": {
                exports: "MaskPass",
                deps: ["three"]
            },
            "three/postprocessing/RenderPass": {
                exports: "RenderPass",
                deps: ["three"]
            },
            "three/shaders/CopyShader": {
                exports: "CopyShader",
                deps: ["three"]
            },
            "three/shaders/BurnShader": {
                exports: "BurnShader",
                deps: ["three"]
            },
            "three/shaders/AdditiveBlendShader": {
                exports: "AdditiveBlendShader",
                deps: ["three"]
            },
            "three/shaders/ColorCorrectionShader": {
                exports: "ColorCorrectionShader",
                deps: ["three"]
            },
            "three/shaders/BrightnessContrastShader": {
                exports: "BrightnessContrastShader",
                deps: ["three"]
            },
            "three/shaders/FXAAShader": {
                exports: "FXAAShader",
                deps: ["three"]
            },
            objLoader: {
                deps: ["three"],
                exports: "OBJLoader"
            },
            ScrollTo: {
                deps: ["TweenMax"]
            }
        },
        waitSeconds: 0
    }), define("modernizr", [], function() {
        return window.Modernizr
    }), require(["config", "preloader"], function(t, e) {
        function i(t) {
            var e = new XMLHttpRequest;
            e.open("GET", t, !0), e.send(), e.onload = function(t) {
                var i = document.createElement("div");
                i.innerHTML = e.responseText, document.body.insertBefore(i, document.body.childNodes[0])
            }
        }
        var n = [],
            r = [],
            s = null;
        t.MOBILE ? (t.FLOW = t.FLOWS.MOBILE, r.push(t.CDN + "/css/all_mobile.css"), n.push("main_mobile", "text!/Resn/index_mobile.html!strip")) : t.OLD_DESKTOP ? (t.FLOW = t.FLOWS.BASIC, r.push(t.CDN + "/css/all.css"), n.push("main_desktop_extended", "text!/Resn/index_desktop.html!strip")) : t.TABLET ? (t.FLOW = t.FLOWS.TABLET, r.push(t.CDN + "/css/all.css"), n.push("main_desktop_extended", "text!/Resn/index_desktop.html!strip")) : (t.FLOW = t.FLOWS.EXTENDED, r.push(t.CDN + "/css/all.css"), n.push("main_desktop_extended", "text!/Resn/index_desktop.html!strip")),
            function(t) {
                for (var e = document.getElementsByTagName("head")[0], i = 0; i < t.length; i++) {
                    var n = document.createElement("link");
                    n.setAttribute("rel", "stylesheet"), n.setAttribute("type", "text/css"), n.setAttribute("href", t[i]), e.appendChild(n)
                }
            }(r);
        var o = window.location.toString();
        if (o.indexOf("?testing") > -1) {
            var a = o.match(/\?testing=([\w\/,-]+)/i);
            s = a ? a[1].split(",") : []
        }
        require([n.pop()], function(r) {
            document.body.innerHTML = r, i(t.CDN + "/svg/spritemap.svg"), (new e).init(), require(n, function(t) {
                s ? require(["tests/mocha"], function(e) {
                    t.start(), e.run(s)
                }) : t.start()
            })
        })
    }), define("loader", function() {});