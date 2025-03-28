/*!
 * ==========================================================
 * Package Name: MinistryPlatform CustomWidgets
 * Version: 2024.10.10.1
 * ==========================================================
 *
 */ (() => {
  "use strict";
  class e {
    static async getData(e, t) {
      var i = {};
      t && (i.Authorization = t);
      const s = { method: "GET", headers: i };
      try {
        const t = await fetch(`${e}`, s);
        if (!t.ok) {
          const e = await t.json();
          return void console.error(e.error, e.details);
        }
        return await t.json();
      } catch (e) {
        console.error("Network or CORS error:", e.message);
      }
    }
  }
  class t {
    constructor(e, t, i, s, r) {
      (this.kind = e),
        (this.input = t),
        (this.begin = i),
        (this.end = s),
        (this.file = r);
    }
    getText() {
      return this.input.slice(this.begin, this.end);
    }
    getPosition() {
      let [e, t] = [1, 1];
      for (let i = 0; i < this.begin; i++)
        "\n" === this.input[i] ? (e++, (t = 1)) : t++;
      return [e, t];
    }
    size() {
      return this.end - this.begin;
    }
  }
  class i {
    liquidMethodMissing(e) {}
  }
  const s = Object.prototype.toString,
    r = String.prototype.toLowerCase,
    n = Object.hasOwnProperty;
  function o(e) {
    return "string" == typeof e;
  }
  function a(e) {
    return "function" == typeof e;
  }
  function l(e) {
    return e && a(e.then);
  }
  function h(e) {
    return e && a(e.next) && a(e.throw) && a(e.return);
  }
  function c(e) {
    return o((e = p(e)))
      ? e
      : y(e)
      ? ""
      : w(e)
      ? e.map((e) => c(e)).join("")
      : String(e);
  }
  function u(e) {
    return w((e = p(e)))
      ? e
      : o(e) && e.length > 0
      ? [e]
      : T((t = e)) && Symbol.iterator in t
      ? Array.from(e)
      : T(e)
      ? Object.keys(e).map((t) => [t, e[t]])
      : [];
    var t;
  }
  function d(e) {
    return y((e = p(e))) ? [] : w(e) ? e : [e];
  }
  function p(e) {
    return e instanceof i && a(e.valueOf) ? e.valueOf() : e;
  }
  function f(e) {
    return (e = Number(e)), isNaN(e) ? 0 : e;
  }
  function g(e) {
    return "number" == typeof e;
  }
  function m(e) {
    return e && a(e.toLiquid) ? m(e.toLiquid()) : e;
  }
  function y(e) {
    return null == e;
  }
  function w(e) {
    return "[object Array]" === s.call(e);
  }
  function k(e, t) {
    e = e || {};
    for (const i in e) if (n.call(e, i) && !1 === t(e[i], i, e)) break;
    return e;
  }
  function v(e) {
    return e[e.length - 1];
  }
  function T(e) {
    const t = typeof e;
    return null !== e && ("object" === t || "function" === t);
  }
  function b(e, t, i = 1) {
    const s = [];
    for (let r = e; r < t; r += i) s.push(r);
    return s;
  }
  function x(e, t, i = " ") {
    return L(e, t, i, (e, t) => t + e);
  }
  function L(e, t, i, s) {
    let r = t - (e = String(e)).length;
    for (; r-- > 0; ) e = s(e, i);
    return e;
  }
  function F(e) {
    return e;
  }
  function O(e, t) {
    return null == e && null == t
      ? 0
      : null == e
      ? 1
      : null == t || (e = r.call(e)) < (t = r.call(t))
      ? -1
      : e > t
      ? 1
      : 0;
  }
  function S(e) {
    return function (...t) {
      return e.call(this, ...t.map(p));
    };
  }
  function R(e) {
    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  const _ = "__liquidClass__";
  class z extends Error {
    constructor(e, t) {
      super("string" == typeof e ? e : e.message),
        (this.context = ""),
        "string" != typeof e &&
          Object.defineProperty(this, "originalError", {
            value: e,
            enumerable: !1,
          }),
        Object.defineProperty(this, "token", { value: t, enumerable: !1 }),
        Object.defineProperty(this, _, {
          value: "LiquidError",
          enumerable: !1,
        });
    }
    update() {
      Object.defineProperty(this, "context", {
        value: I(this.token),
        enumerable: !1,
      }),
        (this.message = (function (e, t) {
          t.file && (e += `, file:${t.file}`);
          const [i, s] = t.getPosition();
          return (e += `, line:${i}, col:${s}`);
        })(this.message, this.token)),
        (this.stack = this.message + "\n" + this.context + "\n" + this.stack),
        this.originalError &&
          (this.stack += "\nFrom " + this.originalError.stack);
    }
    static is(e) {
      return "LiquidError" === (null == e ? void 0 : e[_]);
    }
  }
  class D extends z {
    constructor(e, t) {
      super(e, t), (this.name = "TokenizationError"), super.update();
    }
  }
  class E extends z {
    constructor(e, t) {
      super(e, t),
        (this.name = "ParseError"),
        (this.message = e.message),
        super.update();
    }
  }
  class $ extends z {
    constructor(e, t) {
      super(e, t.token),
        (this.name = "RenderError"),
        (this.message = e.message),
        super.update();
    }
    static is(e) {
      return "RenderError" === e.name;
    }
  }
  class N extends z {
    constructor(e) {
      super(e[0], e[0].token), (this.errors = e), (this.name = "LiquidErrors");
      const t = e.length > 1 ? "s" : "";
      (this.message = `${e.length} error${t} found`), super.update();
    }
    static is(e) {
      return "LiquidErrors" === e.name;
    }
  }
  class q extends z {
    constructor(e, t) {
      super(e, t),
        (this.name = "UndefinedVariableError"),
        (this.message = e.message),
        super.update();
    }
  }
  class A extends Error {
    constructor(e) {
      super(`undefined variable: ${e}`),
        (this.name = "InternalUndefinedVariableError"),
        (this.variableName = e);
    }
  }
  class j extends Error {
    constructor(e) {
      super(e), (this.name = "AssertionError"), (this.message = e + "");
    }
  }
  function I(e) {
    const [t, i] = e.getPosition(),
      s = e.input.split("\n"),
      r = Math.max(t - 2, 1),
      n = Math.min(t + 3, s.length);
    return b(r, n + 1)
      .map((e) => {
        let r = `${e === t ? ">> " : "   "}${x(String(e), String(n).length)}| `;
        const o = e === t ? "\n" + x("^", i + r.length) : "";
        return (r += s[e - 1]), (r += o), r;
      })
      .join("\n");
  }
  const M = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 4, 4, 4, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 20, 2, 8, 0, 0, 0, 0, 8, 0, 0, 0, 64, 0, 65, 0, 0, 33,
    33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0,
  ];
  function C(e) {
    const t = e.charCodeAt(0);
    return t >= 128 ? !M[t] : !!(1 & M[t]);
  }
  function P(e, t) {
    if (!e) {
      const i = "function" == typeof t ? t() : t || `expect ${e} to be true`;
      throw new j(i);
    }
  }
  function V(e, t = `unexpected ${JSON.stringify(e)}`) {
    P(!e, t);
  }
  (M[160] =
    M[5760] =
    M[6158] =
    M[8192] =
    M[8193] =
    M[8194] =
    M[8195] =
    M[8196] =
    M[8197] =
    M[8198] =
    M[8199] =
    M[8200] =
    M[8201] =
    M[8202] =
    M[8232] =
    M[8233] =
    M[8239] =
    M[8287] =
    M[12288] =
      4),
    (M[8220] = M[8221] = 128);
  class B extends i {
    equals(e) {
      return (
        !(e instanceof B) &&
        (o((e = p(e))) || w(e)
          ? 0 === e.length
          : !!T(e) && 0 === Object.keys(e).length)
      );
    }
    gt() {
      return !1;
    }
    geq() {
      return !1;
    }
    lt() {
      return !1;
    }
    leq() {
      return !1;
    }
    valueOf() {
      return "";
    }
  }
  class U extends i {
    constructor(e, t, i) {
      super(), (this.i = 0), (this.length = e), (this.name = `${i}-${t}`);
    }
    next() {
      this.i++;
    }
    index0() {
      return this.i;
    }
    index() {
      return this.i + 1;
    }
    first() {
      return 0 === this.i;
    }
    last() {
      return this.i === this.length - 1;
    }
    rindex() {
      return this.length - this.i;
    }
    rindex0() {
      return this.length - this.i - 1;
    }
    valueOf() {
      return JSON.stringify(this);
    }
  }
  class H extends i {
    constructor(e = () => "") {
      super(), (this.superBlockRender = e);
    }
    super() {
      return this.superBlockRender();
    }
  }
  function W(e) {
    return e && a(e.equals) && a(e.gt) && a(e.geq) && a(e.lt) && a(e.leq);
  }
  const Y = new (class extends i {
      equals(e) {
        return y(p(e));
      }
      gt() {
        return !1;
      }
      geq() {
        return !1;
      }
      lt() {
        return !1;
      }
      leq() {
        return !1;
      }
      valueOf() {
        return null;
      }
    })(),
    G = {
      true: !0,
      false: !1,
      nil: Y,
      null: Y,
      empty: new B(),
      blank: new (class extends B {
        equals(e) {
          return (
            !1 === e || !!y(p(e)) || (o(e) ? /^\s*$/.test(e) : super.equals(e))
          );
        }
      })(),
    };
  function Z(e) {
    const t = {};
    for (const [i, s] of Object.entries(e)) {
      let e = t;
      for (let t = 0; t < i.length; t++) {
        const s = i[t];
        (e[s] = e[s] || {}),
          t === i.length - 1 && C(i[t]) && (e[s].needBoundary = !0),
          (e = e[s]);
      }
      (e.data = s), (e.end = !0);
    }
    return t;
  }
  var J = function () {
    return (
      (J =
        Object.assign ||
        function (e) {
          for (var t, i = 1, s = arguments.length; i < s; i++)
            for (var r in (t = arguments[i]))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        }),
      J.apply(this, arguments)
    );
  };
  function Q(e, t, i, s) {
    return new (i || (i = Promise))(function (r, n) {
      function o(e) {
        try {
          l(s.next(e));
        } catch (e) {
          n(e);
        }
      }
      function a(e) {
        try {
          l(s.throw(e));
        } catch (e) {
          n(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof i
              ? t
              : new i(function (e) {
                  e(t);
                })).then(o, a);
      }
      l((s = s.apply(e, t || [])).next());
    });
  }
  function X(e) {
    return Q(this, void 0, void 0, function* () {
      if (!h(e)) return e;
      let t,
        i = !1,
        s = "next";
      do {
        const r = e[s](t);
        (i = r.done), (t = r.value), (s = "next");
        try {
          h(t) && (t = X(t)), l(t) && (t = yield t);
        } catch (e) {
          (s = "throw"), (t = e);
        }
      } while (!i);
      return t;
    });
  }
  function K(e) {
    if (!h(e)) return e;
    let t,
      i = !1,
      s = "next";
    do {
      const r = e[s](t);
      if (((i = r.done), (t = r.value), (s = "next"), h(t)))
        try {
          t = K(t);
        } catch (e) {
          (s = "throw"), (t = e);
        }
    } while (!i);
    return t;
  }
  const ee = /%([-_0^#:]+)?(\d+)?([EO])?(.)/;
  function te(e) {
    const t = (function (e) {
      const t = e.getFullYear();
      return !(3 & t || !(t % 100 || (t % 400 == 0 && t)));
    })(e)
      ? 29
      : 28;
    return [31, t, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  function ie(e) {
    let t = 0;
    for (let i = 0; i < e.getMonth(); ++i) t += te(e)[i];
    return t + e.getDate();
  }
  function se(e, t) {
    const i = ie(e) + (t - e.getDay()),
      s = 7 - new Date(e.getFullYear(), 0, 1).getDay() + t;
    return String(Math.floor((i - s) / 7) + 1);
  }
  const re = {
      d: 2,
      e: 2,
      H: 2,
      I: 2,
      j: 3,
      k: 2,
      l: 2,
      L: 3,
      m: 2,
      M: 2,
      S: 2,
      U: 2,
      W: 2,
    },
    ne = new Set("aAbBceklpP");
  function oe(e, t) {
    const i = Math.abs(e.getTimezoneOffset()),
      s = Math.floor(i / 60),
      r = i % 60;
    return (
      (e.getTimezoneOffset() > 0 ? "-" : "+") +
      x(s, 2, "0") +
      (t.flags[":"] ? ":" : "") +
      x(r, 2, "0")
    );
  }
  const ae = {
    a: (e) => e.getShortWeekdayName(),
    A: (e) => e.getLongWeekdayName(),
    b: (e) => e.getShortMonthName(),
    B: (e) => e.getLongMonthName(),
    c: (e) => e.toLocaleString(),
    C: (e) =>
      (function (e) {
        return parseInt(e.getFullYear().toString().substring(0, 2), 10);
      })(e),
    d: (e) => e.getDate(),
    e: (e) => e.getDate(),
    H: (e) => e.getHours(),
    I: (e) => String(e.getHours() % 12 || 12),
    j: (e) => ie(e),
    k: (e) => e.getHours(),
    l: (e) => String(e.getHours() % 12 || 12),
    L: (e) => e.getMilliseconds(),
    m: (e) => e.getMonth() + 1,
    M: (e) => e.getMinutes(),
    N: (e, t) => {
      const i = Number(t.width) || 9;
      return (function (e, t, i = " ") {
        return L(e, t, i, (e, t) => e + t);
      })(String(e.getMilliseconds()).slice(0, i), i, "0");
    },
    p: (e) => (e.getHours() < 12 ? "AM" : "PM"),
    P: (e) => (e.getHours() < 12 ? "am" : "pm"),
    q: (e) =>
      (function (e) {
        const t = e.getDate();
        if ([11, 12, 13].includes(t)) return "th";
        switch (t % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      })(e),
    s: (e) => Math.round(e.getTime() / 1e3),
    S: (e) => e.getSeconds(),
    u: (e) => e.getDay() || 7,
    U: (e) => se(e, 0),
    w: (e) => e.getDay(),
    W: (e) => se(e, 1),
    x: (e) => e.toLocaleDateString(),
    X: (e) => e.toLocaleTimeString(),
    y: (e) => e.getFullYear().toString().slice(2, 4),
    Y: (e) => e.getFullYear(),
    z: oe,
    Z: (e, t) => e.getTimeZoneName() || oe(e, t),
    t: () => "\t",
    n: () => "\n",
    "%": () => "%",
  };
  function le(e, t) {
    let i,
      s = "",
      r = t;
    for (; (i = ee.exec(r)); )
      (s += r.slice(0, i.index)),
        (r = r.slice(i.index + i[0].length)),
        (s += he(e, i));
    return s + r;
  }
  function he(e, t) {
    const [i, s = "", r, n, o] = t,
      a = ae[o];
    if (!a) return i;
    const l = {};
    for (const e of s) l[e] = !0;
    let h = String(a(e, { flags: l, width: r, modifier: n })),
      c = ne.has(o) ? " " : "0",
      u = r || re[o] || 0;
    var d;
    return (
      l["^"]
        ? (h = h.toUpperCase())
        : l["#"] &&
          ((d = h),
          (h = [...d].some((e) => e >= "a" && e <= "z")
            ? d.toUpperCase()
            : d.toLowerCase())),
      l._ ? (c = " ") : l[0] && (c = "0"),
      l["-"] && (u = 0),
      x(h, u, c)
    );
  }
  function ce() {
    return "undefined" != typeof Intl ? Intl.DateTimeFormat : void 0;
  }
  ae.h = ae.b;
  const ue = /([zZ]|([+-])(\d{2}):(\d{2}))$/,
    de = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    pe = de.map((e) => e.slice(0, 3)),
    fe = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    ge = fe.map((e) => e.slice(0, 3));
  class me {
    constructor(e, t, i) {
      (this.locale = t),
        (this.DateTimeFormat = ce()),
        (this.date = new Date(e)),
        (this.timezoneFixed = void 0 !== i),
        void 0 === i && (i = this.date.getTimezoneOffset()),
        (this.timezoneOffset = o(i) ? me.getTimezoneOffset(i, this.date) : i),
        (this.timezoneName = o(i) ? i : "");
      const s = 6e4 * (this.date.getTimezoneOffset() - this.timezoneOffset),
        r = this.date.getTime() + s;
      this.displayDate = new Date(r);
    }
    getTime() {
      return this.displayDate.getTime();
    }
    getMilliseconds() {
      return this.displayDate.getMilliseconds();
    }
    getSeconds() {
      return this.displayDate.getSeconds();
    }
    getMinutes() {
      return this.displayDate.getMinutes();
    }
    getHours() {
      return this.displayDate.getHours();
    }
    getDay() {
      return this.displayDate.getDay();
    }
    getDate() {
      return this.displayDate.getDate();
    }
    getMonth() {
      return this.displayDate.getMonth();
    }
    getFullYear() {
      return this.displayDate.getFullYear();
    }
    toLocaleString(e, t) {
      return (null == t ? void 0 : t.timeZone)
        ? this.date.toLocaleString(e, t)
        : this.displayDate.toLocaleString(e, t);
    }
    toLocaleTimeString(e) {
      return this.displayDate.toLocaleTimeString(e);
    }
    toLocaleDateString(e) {
      return this.displayDate.toLocaleDateString(e);
    }
    getTimezoneOffset() {
      return this.timezoneOffset;
    }
    getTimeZoneName() {
      return this.timezoneFixed
        ? this.timezoneName
        : this.DateTimeFormat
        ? this.DateTimeFormat().resolvedOptions().timeZone
        : void 0;
    }
    getLongMonthName() {
      var e;
      return null !== (e = this.format({ month: "long" })) && void 0 !== e
        ? e
        : de[this.getMonth()];
    }
    getShortMonthName() {
      var e;
      return null !== (e = this.format({ month: "short" })) && void 0 !== e
        ? e
        : pe[this.getMonth()];
    }
    getLongWeekdayName() {
      var e;
      return null !== (e = this.format({ weekday: "long" })) && void 0 !== e
        ? e
        : fe[this.displayDate.getDay()];
    }
    getShortWeekdayName() {
      var e;
      return null !== (e = this.format({ weekday: "short" })) && void 0 !== e
        ? e
        : ge[this.displayDate.getDay()];
    }
    valid() {
      return !isNaN(this.getTime());
    }
    format(e) {
      return (
        this.DateTimeFormat &&
        this.DateTimeFormat(this.locale, e).format(this.displayDate)
      );
    }
    static createDateFixedToTimezone(e, t) {
      const i = e.match(ue);
      if (i && "Z" === i[1]) return new me(+new Date(e), t, 0);
      if (i && i[2] && i[3] && i[4]) {
        const [, , s, r, n] = i,
          o = ("+" === s ? -1 : 1) * (60 * parseInt(r, 10) + parseInt(n, 10));
        return new me(+new Date(e), t, o);
      }
      return new me(e, t);
    }
    static getTimezoneOffset(e, t) {
      const i = t.toLocaleString("en-US", { timeZone: e }),
        s = t.toLocaleString("en-US", { timeZone: "UTC" }),
        r = new Date(i);
      return (+new Date(s) - +r) / 6e4;
    }
  }
  class ye {
    constructor(e, t) {
      (this.base = 0), (this.message = `${e} limit exceeded`), (this.limit = t);
    }
    use(e) {
      (e = f(e)),
        P(this.base + e <= this.limit, this.message),
        (this.base += e);
    }
    check(e) {
      P((e = f(e)) <= this.limit, this.message);
    }
  }
  class we extends t {
    constructor(e, [t, i], s, r, n, o, a, l) {
      super(e, s, r, n, l), (this.trimLeft = !1), (this.trimRight = !1);
      const h = "-" === s[t],
        c = "-" === s[i - 1];
      let u = h ? t + 1 : t,
        d = c ? i - 1 : i;
      for (; u < d && 4 & M[s.charCodeAt(u)]; ) u++;
      for (; d > u && 4 & M[s.charCodeAt(d - 1)]; ) d--;
      (this.contentRange = [u, d]),
        (this.trimLeft = h || o),
        (this.trimRight = c || a);
    }
    get content() {
      return this.input.slice(this.contentRange[0], this.contentRange[1]);
    }
  }
  class ke extends we {
    constructor(e, t, i, s, r) {
      const {
          trimTagLeft: n,
          trimTagRight: o,
          tagDelimiterLeft: a,
          tagDelimiterRight: l,
        } = s,
        [h, c] = [t + a.length, i - l.length];
      super(Ot.Tag, [h, c], e, t, i, n, o, r),
        (this.tokenizer = new mt(e, s.operators, r, this.contentRange)),
        (this.name = this.tokenizer.readTagName()),
        this.tokenizer.assert(
          this.name,
          "illegal tag syntax, tag name expected"
        ),
        this.tokenizer.skipBlank();
    }
    get args() {
      return this.tokenizer.input.slice(this.tokenizer.p, this.contentRange[1]);
    }
  }
  class ve extends we {
    constructor(e, t, i, s, r) {
      const {
          trimOutputLeft: n,
          trimOutputRight: o,
          outputDelimiterLeft: a,
          outputDelimiterRight: l,
        } = s,
        h = [t + a.length, i - l.length];
      super(Ot.Output, h, e, t, i, n, o, r);
    }
  }
  class Te extends t {
    constructor(e, t, i, s) {
      super(Ot.HTML, e, t, i, s),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.file = s),
        (this.trimLeft = 0),
        (this.trimRight = 0);
    }
    getContent() {
      return this.input.slice(
        this.begin + this.trimLeft,
        this.end - this.trimRight
      );
    }
  }
  class be extends t {
    constructor(e, t, i, s) {
      super(Ot.Number, e, t, i, s),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.file = s),
        (this.content = Number(this.getText()));
    }
  }
  class xe extends t {
    constructor(e, t, i, s) {
      super(Ot.Word, e, t, i, s),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.file = s),
        (this.content = this.getText());
    }
  }
  class Le extends t {
    constructor(e, t, i, s) {
      super(Ot.Literal, e, t, i, s),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.file = s),
        (this.literal = this.getText()),
        (this.content = G[this.literal]);
    }
  }
  const Fe = {
      "==": 2,
      "!=": 2,
      ">": 2,
      "<": 2,
      ">=": 2,
      "<=": 2,
      contains: 2,
      not: 1,
      and: 0,
      or: 0,
    },
    Oe = {
      "==": 0,
      "!=": 0,
      ">": 0,
      "<": 0,
      ">=": 0,
      "<=": 0,
      contains: 0,
      not: 1,
      and: 0,
      or: 0,
    };
  class Se extends t {
    constructor(e, t, i, s) {
      super(Ot.Operator, e, t, i, s),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.file = s),
        (this.operator = this.getText());
    }
    getPrecedence() {
      const e = this.getText();
      return e in Fe ? Fe[e] : 1;
    }
  }
  class Re extends t {
    constructor(e, t, i, s, r, n) {
      super(Ot.PropertyAccess, i, s, r, n),
        (this.variable = e),
        (this.props = t);
    }
  }
  class _e extends t {
    constructor(e, t, i, s, r, n) {
      super(Ot.Filter, i, s, r, n), (this.name = e), (this.args = t);
    }
  }
  class ze extends t {
    constructor(e, t, i, s, r, n) {
      super(Ot.Hash, e, t, i, n),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.name = s),
        (this.value = r),
        (this.file = n);
    }
  }
  const De = /[\da-fA-F]/,
    Ee = /[0-7]/,
    $e = { b: "\b", f: "\f", n: "\n", r: "\r", t: "\t", v: "\v" };
  function Ne(e) {
    const t = e.charCodeAt(0);
    return t >= 97 ? t - 87 : t >= 65 ? t - 55 : t - 48;
  }
  class qe extends t {
    constructor(e, t, i, s) {
      super(Ot.Quoted, e, t, i, s),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.file = s),
        (this.content = (function (e) {
          let t = "";
          for (let i = 1; i < e.length - 1; i++)
            if ("\\" === e[i])
              if (void 0 !== $e[e[i + 1]]) t += $e[e[++i]];
              else if ("u" === e[i + 1]) {
                let s = 0,
                  r = i + 2;
                for (; r <= i + 5 && De.test(e[r]); ) s = 16 * s + Ne(e[r++]);
                (i = r - 1), (t += String.fromCharCode(s));
              } else if (Ee.test(e[i + 1])) {
                let s = i + 1,
                  r = 0;
                for (; s <= i + 3 && Ee.test(e[s]); ) r = 8 * r + Ne(e[s++]);
                (i = s - 1), (t += String.fromCharCode(r));
              } else t += e[++i];
            else t += e[i];
          return t;
        })(this.getText()));
    }
  }
  class Ae extends t {
    constructor(e, t, i, s, r, n) {
      super(Ot.Range, e, t, i, n),
        (this.input = e),
        (this.begin = t),
        (this.end = i),
        (this.lhs = s),
        (this.rhs = r),
        (this.file = n);
    }
  }
  class je extends we {
    constructor(e, t, i, s, r) {
      super(Ot.Tag, [t, i], e, t, i, !1, !1, r),
        (this.tokenizer = new mt(e, s.operators, r, this.contentRange)),
        (this.name = this.tokenizer.readTagName()),
        this.tokenizer.assert(this.name, "illegal liquid tag syntax"),
        this.tokenizer.skipBlank(),
        (this.args = this.tokenizer.remaining());
    }
  }
  class Ie extends t {
    constructor(e, t, i, s, r, n) {
      super(Ot.FilteredValue, i, s, r, n),
        (this.initial = e),
        (this.filters = t),
        (this.input = i),
        (this.begin = s),
        (this.end = r),
        (this.file = n);
    }
  }
  const Me = { now: () => Date.now() };
  function Ce() {
    return (
      ("object" == typeof global && global.performance) ||
      ("object" == typeof window && window.performance) ||
      Me
    );
  }
  class Pe {
    constructor() {
      this.buffer = "";
    }
    write(e) {
      this.buffer += c(e);
    }
  }
  class Ve {
    constructor() {
      throw (
        ((this.buffer = ""),
        (this.stream = null),
        new Error("streaming not supported in browser"))
      );
    }
  }
  class Be {
    constructor() {
      this.buffer = "";
    }
    write(e) {
      "string" != typeof (e = p(e)) && "" === this.buffer
        ? (this.buffer = e)
        : (this.buffer = c(this.buffer) + c(e));
    }
  }
  class Ue {
    renderTemplatesToNodeStream(e, t) {
      const i = new Ve();
      return (
        Promise.resolve()
          .then(() => X(this.renderTemplates(e, t, i)))
          .then(
            () => i.end(),
            (e) => i.error(e)
          ),
        i.stream
      );
    }
    *renderTemplates(e, t, i) {
      i || (i = t.opts.keepOutputType ? new Be() : new Pe());
      const s = [];
      for (const r of e) {
        t.renderLimit.check(Ce().now());
        try {
          const e = yield r.render(t, i);
          if ((e && i.write(e), i.break || i.continue)) break;
        } catch (e) {
          const i = z.is(e) ? e : new $(e, r);
          if (!t.opts.catchAllErrors) throw i;
          s.push(i);
        }
      }
      if (s.length) throw new N(s);
      return i.buffer;
    }
  }
  class He {
    constructor(e) {
      this.postfix = [...Ge(e)];
    }
    *evaluate(e, t) {
      P(e, "unable to evaluate: context not defined");
      const i = [];
      for (const s of this.postfix)
        if (zt(s)) {
          const t = i.pop();
          let r;
          if (1 === Oe[s.operator])
            r = yield e.opts.operators[s.operator](t, e);
          else {
            const n = i.pop();
            r = yield e.opts.operators[s.operator](n, t, e);
          }
          i.push(r);
        } else i.push(yield We(s, e, t));
      return i[0];
    }
    valid() {
      return !!this.postfix.length;
    }
  }
  function* We(e, t, i = !1) {
    if (e)
      return "content" in e
        ? e.content
        : qt(e)
        ? yield (function* (e, t, i) {
            const s = [];
            for (const i of e.props) s.push(yield We(i, t, !1));
            try {
              if (e.variable) {
                const r = yield We(e.variable, t, i);
                return yield t._getFromScope(r, s);
              }
              return yield t._get(s);
            } catch (t) {
              if (i && "InternalUndefinedVariableError" === t.name) return null;
              throw new q(t, e);
            }
          })(e, t, i)
        : At(e)
        ? yield (function* (e, t) {
            const i = yield We(e.lhs, t),
              s = yield We(e.rhs, t);
            return b(+i, +s + 1);
          })(e, t)
        : void 0;
  }
  function Ye(e) {
    return e.content;
  }
  function* Ge(e) {
    const t = [];
    for (const i of e)
      if (zt(i)) {
        for (
          ;
          t.length && t[t.length - 1].getPrecedence() > i.getPrecedence();

        )
          yield t.pop();
        t.push(i);
      } else yield i;
    for (; t.length; ) yield t.pop();
  }
  function Ze(e, t) {
    return !Je(e, t);
  }
  function Je(e, t) {
    return (e = p(e)), t.opts.jsTruthy ? !e : !1 === e || null == e;
  }
  const Qe = {
    "==": Xe,
    "!=": (e, t) => !Xe(e, t),
    ">": (e, t) => (W(e) ? e.gt(t) : W(t) ? t.lt(e) : p(e) > p(t)),
    "<": (e, t) => (W(e) ? e.lt(t) : W(t) ? t.gt(e) : p(e) < p(t)),
    ">=": (e, t) => (W(e) ? e.geq(t) : W(t) ? t.leq(e) : p(e) >= p(t)),
    "<=": (e, t) => (W(e) ? e.leq(t) : W(t) ? t.geq(e) : p(e) <= p(t)),
    contains: (e, t) =>
      w((e = p(e)))
        ? e.some((e) => Xe(e, t))
        : !!a(null == e ? void 0 : e.indexOf) && e.indexOf(p(t)) > -1,
    not: (e, t) => Je(p(e), t),
    and: (e, t, i) => Ze(p(e), i) && Ze(p(t), i),
    or: (e, t, i) => Ze(p(e), i) || Ze(p(t), i),
  };
  function Xe(e, t) {
    return W(e)
      ? e.equals(t)
      : W(t)
      ? t.equals(e)
      : ((e = p(e)),
        (t = p(t)),
        w(e)
          ? w(t) &&
            (function (e, t) {
              return e.length === t.length && !e.some((e, i) => !Xe(e, t[i]));
            })(e, t)
          : e === t);
  }
  class Ke {
    constructor(e, t, i, s) {
      (this.key = e), (this.value = t), (this.next = i), (this.prev = s);
    }
  }
  class et {
    constructor(e, t = 0) {
      (this.limit = e),
        (this.size = t),
        (this.cache = {}),
        (this.head = new Ke("HEAD", null, null, null)),
        (this.tail = new Ke("TAIL", null, null, null)),
        (this.head.next = this.tail),
        (this.tail.prev = this.head);
    }
    write(e, t) {
      if (this.cache[e]) this.cache[e].value = t;
      else {
        const i = new Ke(e, t, this.head.next, this.head);
        (this.head.next.prev = i),
          (this.head.next = i),
          (this.cache[e] = i),
          this.size++,
          this.ensureLimit();
      }
    }
    read(e) {
      if (!this.cache[e]) return;
      const { value: t } = this.cache[e];
      return this.remove(e), this.write(e, t), t;
    }
    remove(e) {
      const t = this.cache[e];
      (t.prev.next = t.next),
        (t.next.prev = t.prev),
        delete this.cache[e],
        this.size--;
    }
    clear() {
      (this.head.next = this.tail),
        (this.tail.prev = this.head),
        (this.size = 0),
        (this.cache = {});
    }
    ensureLimit() {
      this.size > this.limit && this.remove(this.tail.prev.key);
    }
  }
  function tt(e, t) {
    const i = document.createElement("base");
    i.href = e;
    const s = document.getElementsByTagName("head")[0];
    s.insertBefore(i, s.firstChild);
    const r = document.createElement("a");
    r.href = t;
    const n = r.href;
    return s.removeChild(i), n;
  }
  var it = Object.freeze({
    __proto__: null,
    resolve: function (e, t, i) {
      return (
        e.length && "/" !== v(e) && (e += "/"),
        tt(e, t).replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/, (e, t, s) => {
          const r = s.split("/").pop();
          return /\.\w+$/.test(r) ? e : t + s + i;
        })
      );
    },
    readFile: function (e) {
      return Q(this, void 0, void 0, function* () {
        return new Promise((t, i) => {
          const s = new XMLHttpRequest();
          (s.onload = () => {
            s.status >= 200 && s.status < 300
              ? t(s.responseText)
              : i(new Error(s.statusText));
          }),
            (s.onerror = () => {
              i(new Error("An error occurred whilst receiving the response."));
            }),
            s.open("GET", e),
            s.send();
        });
      });
    },
    readFileSync: function (e) {
      const t = new XMLHttpRequest();
      if ((t.open("GET", e, !1), t.send(), t.status < 200 || t.status >= 300))
        throw new Error(t.statusText);
      return t.responseText;
    },
    exists: function (e) {
      return Q(this, void 0, void 0, function* () {
        return !0;
      });
    },
    existsSync: function (e) {
      return !0;
    },
    dirname: function (e) {
      return tt(e, ".");
    },
    sep: "/",
  });
  function st(e, t = 0) {
    return JSON.stringify(e, null, t);
  }
  var rt = {
    default: function (e, t, ...i) {
      return w((e = p(e))) || o(e)
        ? e.length
          ? e
          : t
        : (!1 !== e || !new Map(i).get("allow_false")) &&
            (Je(e, this.context) ? t : e);
    },
    raw: { raw: !0, handler: F },
    jsonify: st,
    to_integer: function (e) {
      return Number(e);
    },
    json: st,
    inspect: function (e, t = 0) {
      const i = [];
      return JSON.stringify(
        e,
        function (e, t) {
          if ("object" != typeof t || null === t) return t;
          for (; i.length > 0 && i[i.length - 1] !== this; ) i.pop();
          return i.includes(t) ? "[Circular]" : (i.push(t), t);
        },
        t
      );
    },
  };
  const nt = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;",
    },
    ot = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#34;": '"', "&#39;": "'" };
  function at(e) {
    return (
      (e = c(e)),
      this.context.memoryLimit.use(e.length),
      e.replace(/&|<|>|"|'/g, (e) => nt[e])
    );
  }
  function lt(e) {
    return (
      (e = c(e)),
      this.context.memoryLimit.use(e.length),
      e.replace(/&(amp|lt|gt|#34|#39);/g, (e) => ot[e])
    );
  }
  var ht = Object.freeze({
    __proto__: null,
    escape: at,
    xml_escape: function (e) {
      return at.call(this, e);
    },
    escape_once: function (e) {
      return at.call(this, lt.call(this, e));
    },
    newline_to_br: function (e) {
      const t = c(e);
      return (
        this.context.memoryLimit.use(t.length), t.replace(/\r?\n/gm, "<br />\n")
      );
    },
    strip_html: function (e) {
      const t = c(e);
      return (
        this.context.memoryLimit.use(t.length),
        t.replace(
          /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<.*?>|<!--[\s\S]*?-->/g,
          ""
        )
      );
    },
  });
  class ct {
    constructor(e) {
      (this.mapping = e), (this.sep = "/");
    }
    exists(e) {
      return Q(this, void 0, void 0, function* () {
        return this.existsSync(e);
      });
    }
    existsSync(e) {
      return !y(this.mapping[e]);
    }
    readFile(e) {
      return Q(this, void 0, void 0, function* () {
        return this.readFileSync(e);
      });
    }
    readFileSync(e) {
      const t = this.mapping[e];
      if (y(t)) throw new Error(`ENOENT: ${e}`);
      return t;
    }
    dirname(e) {
      const t = e.split(this.sep);
      return t.pop(), t.join(this.sep);
    }
    resolve(e, t, i) {
      if (((t += i), "." === e)) return t;
      const s = e.split(/\/+/);
      for (const e of t.split(this.sep))
        "." !== e &&
          "" !== e &&
          (".." === e ? (s.length > 1 || "" !== s[0]) && s.pop() : s.push(e));
      return s.join(this.sep);
    }
  }
  const ut = {
    root: ["."],
    layouts: ["."],
    partials: ["."],
    relativeReference: !0,
    jekyllInclude: !1,
    keyValueSeparator: ":",
    cache: void 0,
    extname: "",
    fs: it,
    dynamicPartials: !0,
    jsTruthy: !1,
    dateFormat: "%A, %B %-e, %Y at %-l:%M %P %z",
    locale: "",
    trimTagRight: !1,
    trimTagLeft: !1,
    trimOutputRight: !1,
    trimOutputLeft: !1,
    greedy: !0,
    tagDelimiterLeft: "{%",
    tagDelimiterRight: "%}",
    outputDelimiterLeft: "{{",
    outputDelimiterRight: "}}",
    preserveTimezones: !1,
    strictFilters: !1,
    strictVariables: !1,
    ownPropertyOnly: !0,
    lenientIf: !1,
    globals: {},
    keepOutputType: !1,
    operators: Qe,
    memoryLimit: 1 / 0,
    parseLimit: 1 / 0,
    renderLimit: 1 / 0,
  };
  function dt(e) {
    var t, i, s;
    if (
      (e.hasOwnProperty("root") &&
        (e.hasOwnProperty("partials") || (e.partials = e.root),
        e.hasOwnProperty("layouts") || (e.layouts = e.root)),
      e.hasOwnProperty("cache"))
    ) {
      let t;
      (t =
        "number" == typeof e.cache
          ? e.cache > 0
            ? new et(e.cache)
            : void 0
          : "object" == typeof e.cache
          ? e.cache
          : e.cache
          ? new et(1024)
          : void 0),
        (e.cache = t);
    }
    return (
      ((e = Object.assign(
        Object.assign(
          Object.assign({}, ut),
          e.jekyllInclude ? { dynamicPartials: !1 } : {}
        ),
        e
      )).fs.dirname &&
        e.fs.sep) ||
        !e.relativeReference ||
        (console.warn(
          "[LiquidJS] `fs.dirname` and `fs.sep` are required for relativeReference, set relativeReference to `false` to suppress this warning"
        ),
        (e.relativeReference = !1)),
      (e.root = pt(e.root)),
      (e.partials = pt(e.partials)),
      (e.layouts = pt(e.layouts)),
      (e.outputEscape =
        e.outputEscape &&
        ("escape" === (s = e.outputEscape)
          ? at
          : "json" === s
          ? rt.json
          : (P(a(s), "`outputEscape` need to be of type string or function"),
            s))),
      e.locale ||
        (e.locale =
          null !==
            (i =
              null === (t = ce()) || void 0 === t
                ? void 0
                : t().resolvedOptions().locale) && void 0 !== i
            ? i
            : "en-US"),
      e.templates &&
        ((e.fs = new ct(e.templates)),
        (e.relativeReference = !0),
        (e.root = e.partials = e.layouts = ".")),
      e
    );
  }
  function pt(e) {
    let t = [];
    return w(e) && (t = e), o(e) && (t = [e]), t;
  }
  function ft(e, t) {
    if (!e || !Dt(e)) return;
    const i = t ? 4 : 16;
    for (; M[e.input.charCodeAt(e.end - 1 - e.trimRight)] & i; ) e.trimRight++;
  }
  function gt(e, t) {
    if (!e || !Dt(e)) return;
    const i = t ? 4 : 16;
    for (; M[e.input.charCodeAt(e.begin + e.trimLeft)] & i; ) e.trimLeft++;
    "\n" === e.input.charAt(e.begin + e.trimLeft) && e.trimLeft++;
  }
  class mt {
    constructor(e, t = ut.operators, i, s) {
      (this.input = e),
        (this.file = i),
        (this.rawBeginAt = -1),
        (this.p = s ? s[0] : 0),
        (this.N = s ? s[1] : e.length),
        (this.opTrie = Z(t)),
        (this.literalTrie = Z(G));
    }
    readExpression() {
      return new He(this.readExpressionTokens());
    }
    *readExpressionTokens() {
      for (; this.p < this.N; ) {
        const e = this.readOperator();
        if (e) {
          yield e;
          continue;
        }
        const t = this.readValue();
        if (!t) return;
        yield t;
      }
    }
    readOperator() {
      this.skipBlank();
      const e = this.matchTrie(this.opTrie);
      if (-1 !== e) return new Se(this.input, this.p, (this.p = e), this.file);
    }
    matchTrie(e) {
      let t,
        i = e,
        s = this.p;
      for (; i[this.input[s]] && s < this.N; )
        (i = i[this.input[s++]]), i.end && (t = i);
      return t ? (t.needBoundary && C(this.peek(s - this.p)) ? -1 : s) : -1;
    }
    readFilteredValue() {
      const e = this.p,
        t = this.readExpression();
      this.assert(t.valid(), `invalid value expression: ${this.snapshot()}`);
      const i = this.readFilters();
      return new Ie(t, i, this.input, e, this.p, this.file);
    }
    readFilters() {
      const e = [];
      for (;;) {
        const t = this.readFilter();
        if (!t) return e;
        e.push(t);
      }
    }
    readFilter() {
      if ((this.skipBlank(), this.end())) return null;
      this.assert("|" === this.peek(), 'expected "|" before filter'), this.p++;
      const e = this.p,
        t = this.readIdentifier();
      if (!t.size())
        return this.assert(this.end(), "expected filter name"), null;
      const i = [];
      if ((this.skipBlank(), ":" === this.peek()))
        do {
          ++this.p;
          const e = this.readFilterArg();
          e && i.push(e),
            this.skipBlank(),
            this.assert(
              this.end() || "," === this.peek() || "|" === this.peek(),
              () => `unexpected character ${this.snapshot()}`
            );
        } while ("," === this.peek());
      else if ("|" !== this.peek() && !this.end())
        throw this.error('expected ":" after filter name');
      return new _e(t.getText(), i, this.input, e, this.p, this.file);
    }
    readFilterArg() {
      const e = this.readValue();
      if (!e) return;
      if ((this.skipBlank(), ":" !== this.peek())) return e;
      ++this.p;
      const t = this.readValue();
      return [e.getText(), t];
    }
    readTopLevelTokens(e = ut) {
      const t = [];
      for (; this.p < this.N; ) {
        const i = this.readTopLevelToken(e);
        t.push(i);
      }
      return (
        (function (e, t) {
          let i = !1;
          for (let s = 0; s < e.length; s++) {
            const r = e[s];
            _t(r) &&
              (!i && r.trimLeft && ft(e[s - 1], t.greedy),
              $t(r) &&
                ("raw" === r.name ? (i = !0) : "endraw" === r.name && (i = !1)),
              !i && r.trimRight && gt(e[s + 1], t.greedy));
          }
        })(t, e),
        t
      );
    }
    readTopLevelToken(e) {
      const { tagDelimiterLeft: t, outputDelimiterLeft: i } = e;
      return this.rawBeginAt > -1
        ? this.readEndrawOrRawContent(e)
        : this.match(t)
        ? this.readTagToken(e)
        : this.match(i)
        ? this.readOutputToken(e)
        : this.readHTMLToken([t, i]);
    }
    readHTMLToken(e) {
      const t = this.p;
      for (; this.p < this.N && !e.some((e) => this.match(e)); ) ++this.p;
      return new Te(this.input, t, this.p, this.file);
    }
    readTagToken(e) {
      const { file: t, input: i } = this,
        s = this.p;
      if (-1 === this.readToDelimiter(e.tagDelimiterRight))
        throw this.error(`tag ${this.snapshot(s)} not closed`, s);
      const r = new ke(i, s, this.p, e, t);
      return "raw" === r.name && (this.rawBeginAt = s), r;
    }
    readToDelimiter(e, t = !1) {
      for (this.skipBlank(); this.p < this.N; )
        if (t && 8 & this.peekType()) this.readQuoted();
        else if ((++this.p, this.rmatch(e))) return this.p;
      return -1;
    }
    readOutputToken(e = ut) {
      const { file: t, input: i } = this,
        { outputDelimiterRight: s } = e,
        r = this.p;
      if (-1 === this.readToDelimiter(s, !0))
        throw this.error(`output ${this.snapshot(r)} not closed`, r);
      return new ve(i, r, this.p, e, t);
    }
    readEndrawOrRawContent(e) {
      const { tagDelimiterLeft: t, tagDelimiterRight: i } = e,
        s = this.p;
      let r = this.readTo(t) - t.length;
      for (; this.p < this.N; )
        if ("endraw" === this.readIdentifier().getText())
          for (; this.p <= this.N; ) {
            if (this.rmatch(i)) {
              const t = this.p;
              return s === r
                ? ((this.rawBeginAt = -1),
                  new ke(this.input, s, t, e, this.file))
                : ((this.p = r), new Te(this.input, s, r, this.file));
            }
            if (this.rmatch(t)) break;
            this.p++;
          }
        else r = this.readTo(t) - t.length;
      throw this.error(`raw ${this.snapshot(this.rawBeginAt)} not closed`, s);
    }
    readLiquidTagTokens(e = ut) {
      const t = [];
      for (; this.p < this.N; ) {
        const i = this.readLiquidTagToken(e);
        i && t.push(i);
      }
      return t;
    }
    readLiquidTagToken(e) {
      if ((this.skipBlank(), this.end())) return;
      const t = this.p;
      this.readToDelimiter("\n");
      const i = this.p;
      return new je(this.input, t, i, e, this.file);
    }
    error(e, t = this.p) {
      return new D(e, new xe(this.input, t, this.N, this.file));
    }
    assert(e, t, i) {
      if (!e) throw this.error("function" == typeof t ? t() : t, i);
    }
    snapshot(e = this.p) {
      return JSON.stringify(
        ((t = this.input.slice(e, this.N)),
        (i = 32),
        t.length > i ? t.slice(0, i - 3) + "..." : t)
      );
      var t, i;
    }
    readWord() {
      return this.readIdentifier();
    }
    readIdentifier() {
      this.skipBlank();
      const e = this.p;
      for (; !this.end() && C(this.peek()); ) ++this.p;
      return new xe(this.input, e, this.p, this.file);
    }
    readNonEmptyIdentifier() {
      const e = this.readIdentifier();
      return e.size() ? e : void 0;
    }
    readTagName() {
      return (
        this.skipBlank(),
        "#" === this.input[this.p]
          ? this.input.slice(this.p, ++this.p)
          : this.readIdentifier().getText()
      );
    }
    readHashes(e) {
      const t = [];
      for (;;) {
        const i = this.readHash(e);
        if (!i) return t;
        t.push(i);
      }
    }
    readHash(e) {
      this.skipBlank(), "," === this.peek() && ++this.p;
      const t = this.p,
        i = this.readNonEmptyIdentifier();
      if (!i) return;
      let s;
      this.skipBlank();
      const r = o(e) ? e : e ? "=" : ":";
      return (
        this.peek() === r && (++this.p, (s = this.readValue())),
        new ze(this.input, t, this.p, i, s, this.file)
      );
    }
    remaining() {
      return this.input.slice(this.p, this.N);
    }
    advance(e = 1) {
      this.p += e;
    }
    end() {
      return this.p >= this.N;
    }
    readTo(e) {
      for (; this.p < this.N; ) if ((++this.p, this.rmatch(e))) return this.p;
      return -1;
    }
    readValue() {
      this.skipBlank();
      const e = this.p,
        t =
          this.readLiteral() ||
          this.readQuoted() ||
          this.readRange() ||
          this.readNumber(),
        i = this.readProperties(!t);
      return i.length ? new Re(t, i, this.input, e, this.p) : t;
    }
    readScopeValue() {
      this.skipBlank();
      const e = this.p,
        t = this.readProperties();
      if (t.length) return new Re(void 0, t, this.input, e, this.p);
    }
    readProperties(e = !0) {
      const t = [];
      for (;;)
        if ("[" !== this.peek()) {
          if (e && !t.length) {
            const e = this.readNonEmptyIdentifier();
            if (e) {
              t.push(e);
              continue;
            }
          }
          if ("." !== this.peek() || "." === this.peek(1)) break;
          {
            this.p++;
            const e = this.readNonEmptyIdentifier();
            if (!e) break;
            t.push(e);
          }
        } else {
          this.p++;
          const e =
            this.readValue() || new xe(this.input, this.p, this.p, this.file);
          this.assert(-1 !== this.readTo("]"), "[ not closed"), t.push(e);
        }
      return t;
    }
    readNumber() {
      this.skipBlank();
      let e = !1,
        t = !1,
        i = 0;
      for (64 & this.peekType() && i++; this.p + i <= this.N; )
        if (32 & this.peekType(i)) (t = !0), i++;
        else {
          if ("." !== this.peek(i) || "." === this.peek(i + 1)) break;
          if (e || !t) return;
          (e = !0), i++;
        }
      if (t && !C(this.peek(i))) {
        const e = new be(this.input, this.p, this.p + i, this.file);
        return this.advance(i), e;
      }
    }
    readLiteral() {
      this.skipBlank();
      const e = this.matchTrie(this.literalTrie);
      if (-1 === e) return;
      const t = new Le(this.input, this.p, e, this.file);
      return (this.p = e), t;
    }
    readRange() {
      this.skipBlank();
      const e = this.p;
      if ("(" !== this.peek()) return;
      ++this.p;
      const t = this.readValueOrThrow();
      this.p += 2;
      const i = this.readValueOrThrow();
      return ++this.p, new Ae(this.input, e, this.p, t, i, this.file);
    }
    readValueOrThrow() {
      const e = this.readValue();
      return (
        this.assert(
          e,
          () => `unexpected token ${this.snapshot()}, value expected`
        ),
        e
      );
    }
    readQuoted() {
      this.skipBlank();
      const e = this.p;
      if (!(8 & this.peekType())) return;
      ++this.p;
      let t = !1;
      for (
        ;
        this.p < this.N &&
        (++this.p, this.input[this.p - 1] !== this.input[e] || t);

      )
        t ? (t = !1) : "\\" === this.input[this.p - 1] && (t = !0);
      return new qe(this.input, e, this.p, this.file);
    }
    *readFileNameTemplate(e) {
      const { outputDelimiterLeft: t } = e,
        i = [",", " ", t],
        s = new Set(i);
      for (; this.p < this.N && !s.has(this.peek()); )
        yield this.match(t) ? this.readOutputToken(e) : this.readHTMLToken(i);
    }
    match(e) {
      for (let t = 0; t < e.length; t++)
        if (e[t] !== this.input[this.p + t]) return !1;
      return !0;
    }
    rmatch(e) {
      for (let t = 0; t < e.length; t++)
        if (e[e.length - 1 - t] !== this.input[this.p - 1 - t]) return !1;
      return !0;
    }
    peekType(e = 0) {
      return this.p + e >= this.N ? 0 : M[this.input.charCodeAt(this.p + e)];
    }
    peek(e = 0) {
      return this.p + e >= this.N ? "" : this.input[this.p + e];
    }
    skipBlank() {
      for (; 4 & this.peekType(); ) ++this.p;
    }
  }
  class yt {
    constructor(e, t) {
      (this.handlers = {}),
        (this.stopRequested = !1),
        (this.tokens = e),
        (this.parseToken = t);
    }
    on(e, t) {
      return (this.handlers[e] = t), this;
    }
    trigger(e, t) {
      const i = this.handlers[e];
      return !!i && (i.call(this, t), !0);
    }
    start() {
      let e;
      for (
        this.trigger("start");
        !this.stopRequested && (e = this.tokens.shift());

      ) {
        if (this.trigger("token", e)) continue;
        if ($t(e) && this.trigger(`tag:${e.name}`, e)) continue;
        const t = this.parseToken(e, this.tokens);
        this.trigger("template", t);
      }
      return this.stopRequested || this.trigger("end"), this;
    }
    stop() {
      return (this.stopRequested = !0), this;
    }
  }
  class wt {
    constructor(e) {
      this.token = e;
    }
  }
  class kt extends wt {
    constructor(e, t, i) {
      super(e),
        (this.name = e.name),
        (this.liquid = i),
        (this.tokenizer = e.tokenizer);
    }
  }
  class vt {
    constructor(e, t) {
      this.hash = {};
      const i = new mt(e, {});
      for (const e of i.readHashes(t)) this.hash[e.name.content] = e.value;
    }
    *render(e) {
      const t = {};
      for (const i of Object.keys(this.hash))
        t[i] = void 0 === this.hash[i] || (yield We(this.hash[i], e));
      return t;
    }
  }
  class Tt {
    constructor(e, t, i, s) {
      (this.name = e),
        (this.handler = a(t)
          ? t
          : a(null == t ? void 0 : t.handler)
          ? t.handler
          : F),
        (this.raw = !a(t) && !!(null == t ? void 0 : t.raw)),
        (this.args = i),
        (this.liquid = s);
    }
    *render(e, t) {
      const i = [];
      for (const e of this.args)
        w(e) ? i.push([e[0], yield We(e[1], t)]) : i.push(yield We(e, t));
      return yield this.handler.apply({ context: t, liquid: this.liquid }, [
        e,
        ...i,
      ]);
    }
  }
  class bt {
    constructor(e, t) {
      this.filters = [];
      const i =
        "string" == typeof e
          ? new mt(e, t.options.operators).readFilteredValue()
          : e;
      (this.initial = i.initial),
        (this.filters = i.filters.map(
          ({ name: e, args: i }) => new Tt(e, this.getFilter(t, e), i, t)
        ));
    }
    *value(e, t) {
      t =
        t ||
        (e.opts.lenientIf &&
          this.filters.length > 0 &&
          "default" === this.filters[0].name);
      let i = yield this.initial.evaluate(e, t);
      for (const t of this.filters) i = yield t.render(i, e);
      return i;
    }
    getFilter(e, t) {
      const i = e.filters[t];
      return (
        P(i || !e.options.strictFilters, () => `undefined filter: ${t}`), i
      );
    }
  }
  class xt extends wt {
    constructor(e, t) {
      var i;
      super(e);
      const s = new mt(e.input, t.options.operators, e.file, e.contentRange);
      this.value = new bt(s.readFilteredValue(), t);
      const r = this.value.filters,
        n = t.options.outputEscape;
      !(null === (i = r[r.length - 1]) || void 0 === i ? void 0 : i.raw) &&
        n &&
        r.push(new Tt(toString.call(n), n, [], t));
    }
    *render(e, t) {
      const i = yield this.value.value(e, !1);
      t.write(i);
    }
  }
  class Lt extends wt {
    constructor(e) {
      super(e), (this.str = e.getContent());
    }
    *render(e, t) {
      t.write(this.str);
    }
  }
  var Ft, Ot;
  !(function (e) {
    (e.Partials = "partials"), (e.Layouts = "layouts"), (e.Root = "root");
  })(Ft || (Ft = {}));
  class St {
    constructor(e) {
      if (((this.options = e), e.relativeReference)) {
        const t = e.fs.sep;
        P(t, "`fs.sep` is required for relative reference");
        const i = new RegExp(
          ["." + t, ".." + t, "./", "../"]
            .map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
            .join("|")
        );
        this.shouldLoadRelative = (e) => i.test(e);
      } else this.shouldLoadRelative = (e) => !1;
      this.contains = this.options.fs.contains || (() => !0);
    }
    *lookup(e, t, i, s) {
      const { fs: r } = this.options,
        n = this.options[t];
      for (const o of this.candidates(e, n, s, t !== Ft.Root))
        if (i ? r.existsSync(o) : yield r.exists(o)) return o;
      throw this.lookupError(e, n);
    }
    *candidates(e, t, i, s) {
      const { fs: r, extname: n } = this.options;
      if (this.shouldLoadRelative(e) && i) {
        const o = r.resolve(this.dirname(i), e, n);
        for (const e of t)
          if (!s || this.contains(e, o)) {
            yield o;
            break;
          }
      }
      for (const i of t) {
        const t = r.resolve(i, e, n);
        (s && !this.contains(i, t)) || (yield t);
      }
      if (void 0 !== r.fallback) {
        const t = r.fallback(e);
        void 0 !== t && (yield t);
      }
    }
    dirname(e) {
      const t = this.options.fs;
      return (
        P(t.dirname, "`fs.dirname` is required for relative reference"),
        t.dirname(e)
      );
    }
    lookupError(e, t) {
      const i = new Error("ENOENT");
      return (
        (i.message = `ENOENT: Failed to lookup "${e}" in "${t}"`),
        (i.code = "ENOENT"),
        i
      );
    }
  }
  class Rt {
    constructor(e) {
      (this.liquid = e),
        (this.cache = this.liquid.options.cache),
        (this.fs = this.liquid.options.fs),
        (this.parseFile = this.cache ? this._parseFileCached : this._parseFile),
        (this.loader = new St(this.liquid.options)),
        (this.parseLimit = new ye("parse length", e.options.parseLimit));
    }
    parse(e, t) {
      (e = String(e)), this.parseLimit.use(e.length);
      const i = new mt(e, this.liquid.options.operators, t).readTopLevelTokens(
        this.liquid.options
      );
      return this.parseTokens(i);
    }
    parseTokens(e) {
      let t;
      const i = [],
        s = [];
      for (; (t = e.shift()); )
        try {
          i.push(this.parseToken(t, e));
        } catch (e) {
          if (!this.liquid.options.catchAllErrors) throw e;
          s.push(e);
        }
      if (s.length) throw new N(s);
      return i;
    }
    parseToken(e, t) {
      try {
        if ($t(e)) {
          const i = this.liquid.tags[e.name];
          return (
            P(i, `tag "${e.name}" not found`), new i(e, t, this.liquid, this)
          );
        }
        return Et(e) ? new xt(e, this.liquid) : new Lt(e);
      } catch (t) {
        if (z.is(t)) throw t;
        throw new E(t, e);
      }
    }
    parseStream(e) {
      return new yt(e, (e, t) => this.parseToken(e, t));
    }
    *_parseFileCached(e, t, i = Ft.Root, s) {
      const r = this.cache,
        n = this.loader.shouldLoadRelative(e) ? s + "," + e : i + ":" + e,
        o = yield r.read(n);
      if (o) return o;
      const a = this._parseFile(e, t, i, s),
        l = t ? yield a : X(a);
      r.write(n, l);
      try {
        return yield l;
      } catch (e) {
        throw (r.remove(n), e);
      }
    }
    *_parseFile(e, t, i = Ft.Root, s) {
      const r = yield this.loader.lookup(e, i, t, s);
      return this.parse(
        t ? this.fs.readFileSync(r) : yield this.fs.readFile(r),
        r
      );
    }
  }
  function _t(e) {
    return !!(jt(e) & Ot.Delimited);
  }
  function zt(e) {
    return jt(e) === Ot.Operator;
  }
  function Dt(e) {
    return jt(e) === Ot.HTML;
  }
  function Et(e) {
    return jt(e) === Ot.Output;
  }
  function $t(e) {
    return jt(e) === Ot.Tag;
  }
  function Nt(e) {
    return jt(e) === Ot.Quoted;
  }
  function qt(e) {
    return jt(e) === Ot.PropertyAccess;
  }
  function At(e) {
    return jt(e) === Ot.Range;
  }
  function jt(e) {
    return e ? e.kind : -1;
  }
  !(function (e) {
    (e[(e.Number = 1)] = "Number"),
      (e[(e.Literal = 2)] = "Literal"),
      (e[(e.Tag = 4)] = "Tag"),
      (e[(e.Output = 8)] = "Output"),
      (e[(e.HTML = 16)] = "HTML"),
      (e[(e.Filter = 32)] = "Filter"),
      (e[(e.Hash = 64)] = "Hash"),
      (e[(e.PropertyAccess = 128)] = "PropertyAccess"),
      (e[(e.Word = 256)] = "Word"),
      (e[(e.Range = 512)] = "Range"),
      (e[(e.Quoted = 1024)] = "Quoted"),
      (e[(e.Operator = 2048)] = "Operator"),
      (e[(e.FilteredValue = 4096)] = "FilteredValue"),
      (e[(e.Delimited = 12)] = "Delimited");
  })(Ot || (Ot = {}));
  var It;
  class Mt {
    constructor(
      e = {},
      t = ut,
      i = {},
      { memoryLimit: s, renderLimit: r } = {}
    ) {
      var n, o, a, l, h;
      (this.scopes = [{}]),
        (this.registers = {}),
        (this.sync = !!i.sync),
        (this.opts = t),
        (this.globals =
          null !== (n = i.globals) && void 0 !== n ? n : t.globals),
        (this.environments = T(e) ? e : Object(e)),
        (this.strictVariables =
          null !== (o = i.strictVariables) && void 0 !== o
            ? o
            : this.opts.strictVariables),
        (this.ownPropertyOnly =
          null !== (a = i.ownPropertyOnly) && void 0 !== a
            ? a
            : t.ownPropertyOnly),
        (this.memoryLimit =
          null != s
            ? s
            : new ye(
                "memory alloc",
                null !== (l = i.memoryLimit) && void 0 !== l ? l : t.memoryLimit
              )),
        (this.renderLimit =
          null != r
            ? r
            : new ye(
                "template render",
                Ce().now() +
                  (null !== (h = i.renderLimit) && void 0 !== h
                    ? h
                    : t.renderLimit)
              ));
    }
    getRegister(e) {
      return (this.registers[e] = this.registers[e] || {});
    }
    setRegister(e, t) {
      return (this.registers[e] = t);
    }
    saveRegister(...e) {
      return e.map((e) => [e, this.getRegister(e)]);
    }
    restoreRegister(e) {
      return e.forEach(([e, t]) => this.setRegister(e, t));
    }
    getAll() {
      return [this.globals, this.environments, ...this.scopes].reduce(
        (e, t) => J(e, t),
        {}
      );
    }
    get(e) {
      return this.getSync(e);
    }
    getSync(e) {
      return K(this._get(e));
    }
    *_get(e) {
      const t = this.findScope(e[0]);
      return yield this._getFromScope(t, e);
    }
    getFromScope(e, t) {
      return K(this._getFromScope(e, t));
    }
    *_getFromScope(e, t, i = this.strictVariables) {
      o(t) && (t = t.split("."));
      for (let s = 0; s < t.length; s++)
        if (((e = yield Ct(e, t[s], this.ownPropertyOnly)), i && void 0 === e))
          throw new A(t.slice(0, s + 1).join("."));
      return e;
    }
    push(e) {
      return this.scopes.push(e);
    }
    pop() {
      return this.scopes.pop();
    }
    bottom() {
      return this.scopes[0];
    }
    spawn(e = {}) {
      return new Mt(
        e,
        this.opts,
        {
          sync: this.sync,
          globals: this.globals,
          strictVariables: this.strictVariables,
        },
        { renderLimit: this.renderLimit, memoryLimit: this.memoryLimit }
      );
    }
    findScope(e) {
      for (let t = this.scopes.length - 1; t >= 0; t--) {
        const i = this.scopes[t];
        if (e in i) return i;
      }
      return e in this.environments ? this.environments : this.globals;
    }
  }
  function Ct(e, t, s) {
    if (y((e = m(e)))) return e;
    if (w(e) && t < 0) return e[e.length + +t];
    const r = (function (e, t, s) {
      return !s || n.call(e, t) || e instanceof i ? e[t] : void 0;
    })(e, t, s);
    return void 0 === r && e instanceof i
      ? e.liquidMethodMissing(t)
      : a(r)
      ? r.call(e)
      : "size" === t
      ? (function (e) {
          if (n.call(e, "size") || void 0 !== e.size) return e.size;
          if (w(e) || o(e)) return e.length;
          if ("object" == typeof e) return Object.keys(e).length;
        })(e)
      : "first" === t
      ? (function (e) {
          return w(e) ? e[0] : e.first;
        })(e)
      : "last" === t
      ? (function (e) {
          return w(e) ? e[e.length - 1] : e.last;
        })(e)
      : r;
  }
  !(function (e) {
    (e[(e.OUTPUT = 0)] = "OUTPUT"), (e[(e.STORE = 1)] = "STORE");
  })(It || (It = {}));
  const Pt = S(Math.abs),
    Vt = S(Math.max),
    Bt = S(Math.min),
    Ut = S(Math.ceil),
    Ht = S((e, t, i = !1) => (i ? Math.floor(e / t) : e / t)),
    Wt = S(Math.floor),
    Yt = S((e, t) => e - t),
    Gt = S((e, t) => e % t),
    Zt = S((e, t) => e * t);
  var Jt = Object.freeze({
    __proto__: null,
    abs: Pt,
    at_least: Vt,
    at_most: Bt,
    ceil: Ut,
    divided_by: Ht,
    floor: Wt,
    minus: Yt,
    modulo: Gt,
    times: Zt,
    round: function (e, t = 0) {
      (e = p(e)), (t = p(t));
      const i = Math.pow(10, t);
      return Math.round(e * i) / i;
    },
    plus: function (e, t) {
      return (e = p(e)), (t = p(t)), Number(e) + Number(t);
    },
  });
  const Qt = /[^\p{M}\p{L}\p{Nd}]+/gu,
    Xt = {
      raw: /\s+/g,
      default: Qt,
      pretty: /[^\p{M}\p{L}\p{Nd}._~!$&'()+,;=@]+/gu,
      ascii: /[^A-Za-z0-9]+/g,
      latin: Qt,
      none: null,
    };
  var Kt = Object.freeze({
    __proto__: null,
    url_decode: (e) => decodeURIComponent(c(e)).replace(/\+/g, " "),
    url_encode: (e) => encodeURIComponent(c(e)).replace(/%20/g, "+"),
    cgi_escape: (e) =>
      encodeURIComponent(c(e))
        .replace(/%20/g, "+")
        .replace(
          /[!'()*]/g,
          (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase()
        ),
    uri_escape: (e) =>
      encodeURI(c(e)).replace(/%5B/g, "[").replace(/%5D/g, "]"),
    slugify: function (e, t = "default", i = !1) {
      e = c(e);
      const s = Xt[t];
      return (
        s &&
          ("latin" === t &&
            (e = (function (e) {
              return e
                .replace(/[Ã Ã¡Ã¢Ã£Ã¤Ã¥]/g, "a")
                .replace(/[Ã¦]/g, "ae")
                .replace(/[Ã§]/g, "c")
                .replace(/[Ã¨Ã©ÃªÃ«]/g, "e")
                .replace(/[Ã¬Ã­Ã®Ã¯]/g, "i")
                .replace(/[Ã°]/g, "d")
                .replace(/[Ã±]/g, "n")
                .replace(/[Ã²Ã³Ã´ÃµÃ¶Ã¸]/g, "o")
                .replace(/[Ã¹ÃºÃ»Ã¼]/g, "u")
                .replace(/[Ã½Ã¿]/g, "y")
                .replace(/[ÃŸ]/g, "ss")
                .replace(/[Å“]/g, "oe")
                .replace(/[Ã¾]/g, "th")
                .replace(/[áºž]/g, "SS")
                .replace(/[Å’]/g, "OE")
                .replace(/[Ãž]/g, "TH");
            })(e)),
          (e = e.replace(s, "-").replace(/^-|-$/g, ""))),
        i ? e : e.toLowerCase()
      );
    },
  });
  const ei = S(function (e, t) {
      const i = d(e),
        s = y(t) ? " " : c(t),
        r = i.length * (1 + s.length);
      return this.context.memoryLimit.use(r), i.join(s);
    }),
    ti = S((e) => (w(e) ? v(e) : "")),
    ii = S((e) => (w(e) ? e[0] : "")),
    si = S(function (e) {
      const t = d(e);
      return this.context.memoryLimit.use(t.length), [...t].reverse();
    });
  function ri(e, t = []) {
    const i = d(e),
      s = d(t);
    return this.context.memoryLimit.use(i.length + s.length), i.concat(s);
  }
  var ni = Object.freeze({
    __proto__: null,
    join: ei,
    last: ti,
    first: ii,
    reverse: si,
    sort: function* (e, t) {
      const i = [],
        s = d(e);
      this.context.memoryLimit.use(s.length);
      for (const e of s)
        i.push([
          e,
          t ? yield this.context._getFromScope(e, c(t).split("."), !1) : e,
        ]);
      return i
        .sort((e, t) => {
          const i = e[1],
            s = t[1];
          return i < s ? -1 : i > s ? 1 : 0;
        })
        .map((e) => e[0]);
    },
    sort_natural: function (e, t) {
      const i = c(t),
        s = void 0 === t ? O : (e, t) => O(e[i], t[i]),
        r = d(e);
      return this.context.memoryLimit.use(r.length), [...r].sort(s);
    },
    size: (e) => (e && e.length) || 0,
    map: function* (e, t) {
      const i = [],
        s = d(e);
      this.context.memoryLimit.use(s.length);
      for (const e of s) i.push(yield this.context._getFromScope(e, c(t), !1));
      return i;
    },
    sum: function* (e, t) {
      let i = 0;
      const s = d(e);
      for (const e of s) {
        const s = Number(t ? yield this.context._getFromScope(e, c(t), !1) : e);
        i += Number.isNaN(s) ? 0 : s;
      }
      return i;
    },
    compact: function (e) {
      const t = d(e);
      return this.context.memoryLimit.use(t.length), t.filter((e) => !y(p(e)));
    },
    concat: ri,
    push: function (e, t) {
      return ri.call(this, e, [t]);
    },
    unshift: function (e, t) {
      const i = d(e);
      this.context.memoryLimit.use(i.length);
      const s = [...i];
      return s.unshift(t), s;
    },
    pop: function (e) {
      const t = [...d(e)];
      return t.pop(), t;
    },
    shift: function (e) {
      const t = d(e);
      this.context.memoryLimit.use(t.length);
      const i = [...t];
      return i.shift(), i;
    },
    slice: function (e, t, i = 1) {
      return y((e = p(e)))
        ? []
        : (w(e) || (e = c(e)),
          (t = t < 0 ? e.length + t : t),
          this.context.memoryLimit.use(i),
          e.slice(t, t + i));
    },
    where: function* (e, t, i) {
      const s = [];
      (e = d(e)), this.context.memoryLimit.use(e.length);
      const r = new mt(c(t)).readScopeValue();
      for (const t of e) s.push(yield We(r, this.context.spawn(t)));
      return e.filter((e, t) =>
        void 0 === i ? Ze(s[t], this.context) : Xe(s[t], i)
      );
    },
    where_exp: function* (e, t, i) {
      const s = [],
        r = new bt(c(i), this.liquid),
        n = d(e);
      this.context.memoryLimit.use(n.length);
      for (const e of n) {
        (yield r.value(this.context.spawn({ [t]: e }))) && s.push(e);
      }
      return s;
    },
    group_by: function* (e, t) {
      const i = new Map();
      e = d(e);
      const s = new mt(c(t)).readScopeValue();
      this.context.memoryLimit.use(e.length);
      for (const t of e) {
        const e = yield We(s, this.context.spawn(t));
        i.has(e) || i.set(e, []), i.get(e).push(t);
      }
      return [...i.entries()].map(([e, t]) => ({ name: e, items: t }));
    },
    group_by_exp: function* (e, t, i) {
      const s = new Map(),
        r = new bt(c(i), this.liquid);
      (e = d(e)), this.context.memoryLimit.use(e.length);
      for (const i of e) {
        const e = yield r.value(this.context.spawn({ [t]: i }));
        s.has(e) || s.set(e, []), s.get(e).push(i);
      }
      return [...s.entries()].map(([e, t]) => ({ name: e, items: t }));
    },
    find: function* (e, t, i) {
      const s = new mt(c(t)).readScopeValue(),
        r = d(e);
      for (const e of r) {
        if (Xe(yield We(s, this.context.spawn(e)), i)) return e;
      }
    },
    find_exp: function* (e, t, i) {
      const s = new bt(c(i), this.liquid),
        r = d(e);
      for (const e of r) {
        if (yield s.value(this.context.spawn({ [t]: e }))) return e;
      }
    },
    uniq: function (e) {
      return (
        (e = d(e)), this.context.memoryLimit.use(e.length), [...new Set(e)]
      );
    },
    sample: function (e, t = 1) {
      if (y((e = p(e)))) return [];
      w(e) || (e = c(e)), this.context.memoryLimit.use(t);
      const i = [...e].sort(() => Math.random() - 0.5);
      return 1 === t ? i[0] : i.slice(0, t);
    },
  });
  function oi(e, t, i) {
    var s, r, n;
    const o =
      (null !== (s = null == e ? void 0 : e.length) && void 0 !== s ? s : 0) +
      (null !== (r = null == t ? void 0 : t.length) && void 0 !== r ? r : 0) +
      (null !== (n = null == i ? void 0 : i.length) && void 0 !== n ? n : 0);
    this.context.memoryLimit.use(o);
    const a = li(e, this.context.opts, i);
    return a
      ? le(a, (t = y((t = p(t))) ? this.context.opts.dateFormat : c(t)))
      : e;
  }
  function ai(e, t, i, s) {
    const r = li(e, this.context.opts);
    if (!r) return e;
    if ("ordinal" === i) {
      const e = r.getDate();
      return le(r, "US" === s ? `${t} ${e}%q, %Y` : `${e}%q ${t} %Y`);
    }
    return le(r, `%d ${t} %Y`);
  }
  function li(e, t, i) {
    let s;
    const r = null != i ? i : t.timezoneOffset,
      n = t.locale;
    return (
      (s =
        "now" === (e = p(e)) || "today" === e
          ? new me(Date.now(), n, r)
          : g(e)
          ? new me(1e3 * e, n, r)
          : o(e)
          ? /^\d+$/.test(e)
            ? new me(1e3 * +e, n, r)
            : t.preserveTimezones && void 0 === i
            ? me.createDateFixedToTimezone(e, n)
            : new me(e, n, r)
          : new me(e, n, r)),
      s.valid() ? s : void 0
    );
  }
  var hi = Object.freeze({
    __proto__: null,
    date: oi,
    date_to_xmlschema: function (e) {
      return oi.call(this, e, "%Y-%m-%dT%H:%M:%S%:z");
    },
    date_to_rfc822: function (e) {
      return oi.call(this, e, "%a, %d %b %Y %H:%M:%S %z");
    },
    date_to_string: function (e, t, i) {
      return ai.call(this, e, "%b", t, i);
    },
    date_to_long_string: function (e, t, i) {
      return ai.call(this, e, "%B", t, i);
    },
  });
  const ci =
      /[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/gu,
    ui =
      /[^\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\s]+/gu;
  var di = Object.freeze({
    __proto__: null,
    append: function (e, t) {
      P(2 === arguments.length, "append expect 2 arguments");
      const i = c(e),
        s = c(t);
      return this.context.memoryLimit.use(i.length + s.length), i + s;
    },
    prepend: function (e, t) {
      P(2 === arguments.length, "prepend expect 2 arguments");
      const i = c(e),
        s = c(t);
      return this.context.memoryLimit.use(i.length + s.length), s + i;
    },
    lstrip: function (e, t) {
      const i = c(e);
      return (
        this.context.memoryLimit.use(i.length),
        t
          ? ((t = R(c(t))), i.replace(new RegExp(`^[${t}]+`, "g"), ""))
          : i.replace(/^\s+/, "")
      );
    },
    downcase: function (e) {
      const t = c(e);
      return this.context.memoryLimit.use(t.length), t.toLowerCase();
    },
    upcase: function (e) {
      const t = c(e);
      return this.context.memoryLimit.use(t.length), c(t).toUpperCase();
    },
    remove: function (e, t) {
      const i = c(e);
      return this.context.memoryLimit.use(i.length), i.split(c(t)).join("");
    },
    remove_first: function (e, t) {
      const i = c(e);
      return this.context.memoryLimit.use(i.length), i.replace(c(t), "");
    },
    remove_last: function (e, t) {
      const i = c(e);
      this.context.memoryLimit.use(i.length);
      const s = c(t),
        r = i.lastIndexOf(s);
      return -1 === r ? i : i.substring(0, r) + i.substring(r + s.length);
    },
    rstrip: function (e, t) {
      return (
        (e = c(e)),
        this.context.memoryLimit.use(e.length),
        t
          ? ((t = R(c(t))), e.replace(new RegExp(`[${t}]+$`, "g"), ""))
          : e.replace(/\s+$/, "")
      );
    },
    split: function (e, t) {
      const i = c(e);
      this.context.memoryLimit.use(i.length);
      const s = i.split(c(t));
      for (; s.length && "" === s[s.length - 1]; ) s.pop();
      return s;
    },
    strip: function (e, t) {
      const i = c(e);
      return (
        this.context.memoryLimit.use(i.length),
        t
          ? ((t = R(c(t))),
            i
              .replace(new RegExp(`^[${t}]+`, "g"), "")
              .replace(new RegExp(`[${t}]+$`, "g"), ""))
          : i.trim()
      );
    },
    strip_newlines: function (e) {
      const t = c(e);
      return this.context.memoryLimit.use(t.length), t.replace(/\r?\n/gm, "");
    },
    capitalize: function (e) {
      return (
        (e = c(e)),
        this.context.memoryLimit.use(e.length),
        e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
      );
    },
    replace: function (e, t, i) {
      const s = c(e);
      return this.context.memoryLimit.use(s.length), s.split(c(t)).join(i);
    },
    replace_first: function (e, t, i) {
      const s = c(e);
      return this.context.memoryLimit.use(s.length), s.replace(c(t), i);
    },
    replace_last: function (e, t, i) {
      const s = c(e);
      this.context.memoryLimit.use(s.length);
      const r = c(t),
        n = s.lastIndexOf(r);
      if (-1 === n) return s;
      const o = c(i);
      return s.substring(0, n) + o + s.substring(n + r.length);
    },
    truncate: function (e, t = 50, i = "...") {
      const s = c(e);
      return (
        this.context.memoryLimit.use(s.length),
        s.length <= t ? e : s.substring(0, t - i.length) + i
      );
    },
    truncatewords: function (e, t = 15, i = "...") {
      const s = c(e);
      this.context.memoryLimit.use(s.length);
      const r = s.split(/\s+/);
      t <= 0 && (t = 1);
      let n = r.slice(0, t).join(" ");
      return r.length >= t && (n += i), n;
    },
    normalize_whitespace: function (e) {
      const t = c(e);
      return this.context.memoryLimit.use(t.length), t.replace(/\s+/g, " ");
    },
    number_of_words: function (e, t) {
      const i = c(e);
      if ((this.context.memoryLimit.use(i.length), !(e = i.trim()))) return 0;
      switch (t) {
        case "cjk":
          return (e.match(ci) || []).length + (e.match(ui) || []).length;
        case "auto":
          return ci.test(e)
            ? e.match(ci).length + (e.match(ui) || []).length
            : e.split(/\s+/).length;
        default:
          return e.split(/\s+/).length;
      }
    },
    array_to_sentence_string: function (e, t = "and") {
      switch ((this.context.memoryLimit.use(e.length), e.length)) {
        case 0:
          return "";
        case 1:
          return e[0];
        case 2:
          return `${e[0]} ${t} ${e[1]}`;
        default:
          return `${e.slice(0, -1).join(", ")}, ${t} ${e[e.length - 1]}`;
      }
    },
  });
  const pi = Object.assign(
    Object.assign(
      Object.assign(
        Object.assign(
          Object.assign(Object.assign(Object.assign({}, ht), Jt), Kt),
          ni
        ),
        hi
      ),
      di
    ),
    rt
  );
  const fi = ["offset", "limit", "reversed"];
  function gi(e, t, i) {
    if (t.options.dynamicPartials) {
      const t = e.readValue();
      if ((e.assert(t, "illegal file path"), "none" === t.getText())) return;
      if (Nt(t)) {
        return mi(i.parse(Ye(t)));
      }
      return t;
    }
    const s = [...e.readFileNameTemplate(t.options)],
      r = mi(i.parseTokens(s));
    return "none" === r ? void 0 : r;
  }
  function mi(e) {
    return 1 === e.length && Dt(e[0].token) ? e[0].token.getContent() : e;
  }
  function* yi(e, t, i) {
    return "string" == typeof e
      ? e
      : Array.isArray(e)
      ? i.renderer.renderTemplates(e, t)
      : yield We(e, t);
  }
  class wi extends U {
    constructor(e, t, i, s) {
      super(e, i, s), (this.length = e), (this.cols = t);
    }
    row() {
      return Math.floor(this.i / this.cols) + 1;
    }
    col0() {
      return this.i % this.cols;
    }
    col() {
      return this.col0() + 1;
    }
    col_first() {
      return 0 === this.col0();
    }
    col_last() {
      return this.col() === this.cols;
    }
  }
  const ki = {
    assign: class extends kt {
      constructor(e, t, i) {
        super(e, t, i),
          (this.key = this.tokenizer.readIdentifier().content),
          this.tokenizer.assert(this.key, "expected variable name"),
          this.tokenizer.skipBlank(),
          this.tokenizer.assert("=" === this.tokenizer.peek(), 'expected "="'),
          this.tokenizer.advance(),
          (this.value = new bt(
            this.tokenizer.readFilteredValue(),
            this.liquid
          ));
      }
      *render(e) {
        e.bottom()[this.key] = yield this.value.value(
          e,
          this.liquid.options.lenientIf
        );
      }
    },
    for: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i);
        const r = this.tokenizer.readIdentifier(),
          n = this.tokenizer.readIdentifier(),
          o = this.tokenizer.readValue();
        if (!r.size() || "in" !== n.content || !o)
          throw new Error(`illegal tag: ${e.getText()}`);
        let a;
        (this.variable = r.content),
          (this.collection = o),
          (this.hash = new vt(
            this.tokenizer.remaining(),
            i.options.keyValueSeparator
          )),
          (this.templates = []),
          (this.elseTemplates = []);
        const l = s
          .parseStream(t)
          .on("start", () => (a = this.templates))
          .on("tag:else", (e) => {
            V(e.args), (a = this.elseTemplates);
          })
          .on("tag:endfor", (e) => {
            V(e.args), l.stop();
          })
          .on("template", (e) => a.push(e))
          .on("end", () => {
            throw new Error(`tag ${e.getText()} not closed`);
          });
        l.start();
      }
      *render(e, t) {
        const i = this.liquid.renderer;
        let s = u(yield We(this.collection, e));
        if (!s.length)
          return void (yield i.renderTemplates(this.elseTemplates, e, t));
        const r = "continue-" + this.variable + "-" + this.collection.getText();
        e.push({ continue: e.getRegister(r) });
        const n = yield this.hash.render(e);
        e.pop();
        (s = (
          this.liquid.options.orderedFilterParameters
            ? Object.keys(n).filter((e) => fi.includes(e))
            : fi.filter((e) => void 0 !== n[e])
        ).reduce((e, t) => {
          return "offset" === t
            ? ((i = e), (s = n.offset), i.slice(s))
            : "limit" === t
            ? (function (e, t) {
                return e.slice(0, t);
              })(e, n.limit)
            : (function (e) {
                return [...e].reverse();
              })(e);
          var i, s;
        }, s)),
          e.setRegister(r, (n.offset || 0) + s.length);
        const o = {
          forloop: new U(s.length, this.collection.getText(), this.variable),
        };
        e.push(o);
        for (const r of s) {
          if (
            ((o[this.variable] = r),
            yield i.renderTemplates(this.templates, e, t),
            t.break)
          ) {
            t.break = !1;
            break;
          }
          (t.continue = !1), o.forloop.next();
        }
        e.pop();
      }
    },
    capture: class extends kt {
      constructor(e, t, i, s) {
        for (
          super(e, t, i),
            this.templates = [],
            this.variable = this.readVariableName();
          t.length;

        ) {
          const e = t.shift();
          if ($t(e) && "endcapture" === e.name) return;
          this.templates.push(s.parseToken(e, t));
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      *render(e) {
        const t = this.liquid.renderer,
          i = yield t.renderTemplates(this.templates, e);
        e.bottom()[this.variable] = i;
      }
      readVariableName() {
        const e = this.tokenizer.readIdentifier().content;
        if (e) return e;
        const t = this.tokenizer.readQuoted();
        if (t) return Ye(t);
        throw this.tokenizer.error("invalid capture name");
      }
    },
    case: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i),
          (this.branches = []),
          (this.elseTemplates = []),
          (this.value = new bt(
            this.tokenizer.readFilteredValue(),
            this.liquid
          )),
          (this.elseTemplates = []);
        let r = [],
          n = 0;
        const o = s
          .parseStream(t)
          .on("tag:when", (e) => {
            if (n > 0) return;
            r = [];
            const t = [];
            for (; !e.tokenizer.end(); )
              t.push(e.tokenizer.readValueOrThrow()),
                e.tokenizer.skipBlank(),
                "," === e.tokenizer.peek()
                  ? e.tokenizer.readTo(",")
                  : e.tokenizer.readTo("or");
            this.branches.push({ values: t, templates: r });
          })
          .on("tag:else", () => {
            n++, (r = this.elseTemplates);
          })
          .on("tag:endcase", () => o.stop())
          .on("template", (e) => {
            (r === this.elseTemplates && 1 !== n) || r.push(e);
          })
          .on("end", () => {
            throw new Error(`tag ${e.getText()} not closed`);
          });
        o.start();
      }
      *render(e, t) {
        const i = this.liquid.renderer,
          s = p(yield this.value.value(e, e.opts.lenientIf));
        let r = !1;
        for (const n of this.branches)
          for (const o of n.values) {
            if (Xe(s, yield We(o, e, e.opts.lenientIf))) {
              yield i.renderTemplates(n.templates, e, t), (r = !0);
              break;
            }
          }
        r || (yield i.renderTemplates(this.elseTemplates, e, t));
      }
    },
    comment: class extends kt {
      constructor(e, t, i) {
        for (super(e, t, i); t.length; ) {
          const e = t.shift();
          if ($t(e) && "endcomment" === e.name) return;
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      render() {}
    },
    include: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i);
        const { tokenizer: r } = e;
        (this.file = gi(r, this.liquid, s)), (this.currentFile = e.file);
        const n = r.p;
        "with" === r.readIdentifier().content
          ? (r.skipBlank(),
            ":" !== r.peek() ? (this.withVar = r.readValue()) : (r.p = n))
          : (r.p = n),
          (this.hash = new vt(
            r.remaining(),
            i.options.jekyllInclude || i.options.keyValueSeparator
          ));
      }
      *render(e, t) {
        const { liquid: i, hash: s, withVar: r } = this,
          { renderer: n } = i,
          o = yield yi(this.file, e, i);
        P(o, () => `illegal file path "${o}"`);
        const a = e.saveRegister("blocks", "blockMode");
        e.setRegister("blocks", {}), e.setRegister("blockMode", It.OUTPUT);
        const l = yield s.render(e);
        r && (l[o] = yield We(r, e));
        const h = yield i._parsePartialFile(o, e.sync, this.currentFile);
        e.push(e.opts.jekyllInclude ? { include: l } : l),
          yield n.renderTemplates(h, e, t),
          e.pop(),
          e.restoreRegister(a);
      }
    },
    render: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i);
        const r = this.tokenizer;
        for (
          this.file = gi(r, this.liquid, s), this.currentFile = e.file;
          !r.end();

        ) {
          r.skipBlank();
          const e = r.p,
            t = r.readIdentifier();
          if (
            ("with" === t.content || "for" === t.content) &&
            (r.skipBlank(), ":" !== r.peek())
          ) {
            const e = r.readValue();
            if (e) {
              const i = r.p;
              let s;
              "as" === r.readIdentifier().content
                ? (s = r.readIdentifier())
                : (r.p = i),
                (this[t.content] = { value: e, alias: s && s.content }),
                r.skipBlank(),
                "," === r.peek() && r.advance();
              continue;
            }
          }
          r.p = e;
          break;
        }
        this.hash = new vt(r.remaining(), i.options.keyValueSeparator);
      }
      *render(e, t) {
        const { liquid: i, hash: s } = this,
          r = yield yi(this.file, e, i);
        P(r, () => `illegal file path "${r}"`);
        const n = e.spawn(),
          o = n.bottom();
        if ((J(o, yield s.render(e)), this.with)) {
          const { value: t, alias: i } = this.with;
          o[i || r] = yield We(t, e);
        }
        if (this.for) {
          const { value: s, alias: a } = this.for,
            l = u(yield We(s, e));
          o.forloop = new U(l.length, s.getText(), a);
          for (const e of l) {
            o[a] = e;
            const s = yield i._parsePartialFile(r, n.sync, this.currentFile);
            yield i.renderer.renderTemplates(s, n, t), o.forloop.next();
          }
        } else {
          const e = yield i._parsePartialFile(r, n.sync, this.currentFile);
          yield i.renderer.renderTemplates(e, n, t);
        }
      }
    },
    decrement: class extends kt {
      constructor(e, t, i) {
        super(e, t, i),
          (this.variable = this.tokenizer.readIdentifier().content);
      }
      render(e, t) {
        const i = e.environments;
        g(i[this.variable]) || (i[this.variable] = 0),
          t.write(c(--i[this.variable]));
      }
    },
    increment: class extends kt {
      constructor(e, t, i) {
        super(e, t, i),
          (this.variable = this.tokenizer.readIdentifier().content);
      }
      render(e, t) {
        const i = e.environments;
        g(i[this.variable]) || (i[this.variable] = 0);
        const s = i[this.variable];
        i[this.variable]++, t.write(c(s));
      }
    },
    cycle: class extends kt {
      constructor(e, t, i) {
        super(e, t, i), (this.candidates = []);
        const s = this.tokenizer.readValue();
        for (
          this.tokenizer.skipBlank(),
            s &&
              (":" === this.tokenizer.peek()
                ? ((this.group = s), this.tokenizer.advance())
                : this.candidates.push(s));
          !this.tokenizer.end();

        ) {
          const e = this.tokenizer.readValue();
          e && this.candidates.push(e), this.tokenizer.readTo(",");
        }
        this.tokenizer.assert(
          this.candidates.length,
          () => `empty candidates: "${e.getText()}"`
        );
      }
      *render(e, t) {
        const i =
            `cycle:${yield We(this.group, e)}:` + this.candidates.join(","),
          s = e.getRegister("cycle");
        let r = s[i];
        void 0 === r && (r = s[i] = 0);
        const n = this.candidates[r];
        return (
          (r = (r + 1) % this.candidates.length), (s[i] = r), yield We(n, e)
        );
      }
    },
    if: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i), (this.branches = []);
        let r = [];
        s.parseStream(t)
          .on("start", () =>
            this.branches.push({
              value: new bt(e.args, this.liquid),
              templates: (r = []),
            })
          )
          .on("tag:elsif", (e) => {
            P(!this.elseTemplates, "unexpected elsif after else"),
              this.branches.push({
                value: new bt(e.args, this.liquid),
                templates: (r = []),
              });
          })
          .on("tag:else", (e) => {
            V(e.args),
              P(!this.elseTemplates, "duplicated else"),
              (r = this.elseTemplates = []);
          })
          .on("tag:endif", function (e) {
            V(e.args), this.stop();
          })
          .on("template", (e) => r.push(e))
          .on("end", () => {
            throw new Error(`tag ${e.getText()} not closed`);
          })
          .start();
      }
      *render(e, t) {
        const i = this.liquid.renderer;
        for (const { value: s, templates: r } of this.branches) {
          if (Ze(yield s.value(e, e.opts.lenientIf), e))
            return void (yield i.renderTemplates(r, e, t));
        }
        yield i.renderTemplates(this.elseTemplates || [], e, t);
      }
    },
    layout: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i),
          (this.file = gi(this.tokenizer, this.liquid, s)),
          (this.currentFile = e.file),
          (this.args = new vt(
            this.tokenizer.remaining(),
            i.options.keyValueSeparator
          )),
          (this.templates = s.parseTokens(t));
      }
      *render(e, t) {
        const { liquid: i, args: s, file: r } = this,
          { renderer: n } = i;
        if (void 0 === r)
          return (
            e.setRegister("blockMode", It.OUTPUT),
            void (yield n.renderTemplates(this.templates, e, t))
          );
        const o = yield yi(this.file, e, i);
        P(o, () => `illegal file path "${o}"`);
        const a = yield i._parseLayoutFile(o, e.sync, this.currentFile);
        e.setRegister("blockMode", It.STORE);
        const l = yield n.renderTemplates(this.templates, e),
          h = e.getRegister("blocks");
        void 0 === h[""] && (h[""] = (e, t) => t.write(l)),
          e.setRegister("blockMode", It.OUTPUT),
          e.push(yield s.render(e)),
          yield n.renderTemplates(a, e, t),
          e.pop();
      }
    },
    block: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i), (this.templates = []);
        const r = /\w+/.exec(e.args);
        for (this.block = r ? r[0] : ""; t.length; ) {
          const e = t.shift();
          if ($t(e) && "endblock" === e.name) return;
          const i = s.parseToken(e, t);
          this.templates.push(i);
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      *render(e, t) {
        const i = this.getBlockRender(e);
        e.getRegister("blockMode") === It.STORE
          ? (e.getRegister("blocks")[this.block] = i)
          : yield i(new H(), t);
      }
      getBlockRender(e) {
        const { liquid: t, templates: i } = this,
          s = e.getRegister("blocks")[this.block],
          r = function* (s, r) {
            e.push({ block: s }),
              yield t.renderer.renderTemplates(i, e, r),
              e.pop();
          };
        return s ? (e, t) => s(new H(() => r(e, t)), t) : r;
      }
    },
    raw: class extends kt {
      constructor(e, t, i) {
        for (super(e, t, i), this.tokens = []; t.length; ) {
          const e = t.shift();
          if ($t(e) && "endraw" === e.name) return;
          this.tokens.push(e);
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      render() {
        return this.tokens.map((e) => e.getText()).join("");
      }
    },
    tablerow: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i);
        const r = this.tokenizer.readIdentifier();
        this.tokenizer.skipBlank();
        const n = this.tokenizer.readIdentifier(),
          o = this.tokenizer.readValue();
        if ("in" !== n.content || !o)
          throw new Error(`illegal tag: ${e.getText()}`);
        let a;
        (this.variable = r.content),
          (this.collection = o),
          (this.args = new vt(
            this.tokenizer.remaining(),
            i.options.keyValueSeparator
          )),
          (this.templates = []);
        const l = s
          .parseStream(t)
          .on("start", () => (a = this.templates))
          .on("tag:endtablerow", () => l.stop())
          .on("template", (e) => a.push(e))
          .on("end", () => {
            throw new Error(`tag ${e.getText()} not closed`);
          });
        l.start();
      }
      *render(e, t) {
        let i = u(yield We(this.collection, e));
        const s = yield this.args.render(e),
          r = s.offset || 0,
          n = void 0 === s.limit ? i.length : s.limit;
        i = i.slice(r, r + n);
        const o = s.cols || i.length,
          a = this.liquid.renderer,
          l = new wi(i.length, o, this.collection.getText(), this.variable),
          h = { tablerowloop: l };
        e.push(h);
        for (let s = 0; s < i.length; s++, l.next())
          (h[this.variable] = i[s]),
            0 === l.col0() &&
              (1 !== l.row() && t.write("</tr>"),
              t.write(`<tr class="row${l.row()}">`)),
            t.write(`<td class="col${l.col()}">`),
            yield a.renderTemplates(this.templates, e, t),
            t.write("</td>");
        i.length && t.write("</tr>"), e.pop();
      }
    },
    unless: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i), (this.branches = []), (this.elseTemplates = []);
        let r = [],
          n = 0;
        s.parseStream(t)
          .on("start", () =>
            this.branches.push({
              value: new bt(e.args, this.liquid),
              test: Je,
              templates: (r = []),
            })
          )
          .on("tag:elsif", (e) => {
            n > 0
              ? (r = [])
              : this.branches.push({
                  value: new bt(e.args, this.liquid),
                  test: Ze,
                  templates: (r = []),
                });
          })
          .on("tag:else", () => {
            n++, (r = this.elseTemplates);
          })
          .on("tag:endunless", function () {
            this.stop();
          })
          .on("template", (e) => {
            (r === this.elseTemplates && 1 !== n) || r.push(e);
          })
          .on("end", () => {
            throw new Error(`tag ${e.getText()} not closed`);
          })
          .start();
      }
      *render(e, t) {
        const i = this.liquid.renderer;
        for (const { value: s, test: r, templates: n } of this.branches) {
          if (r(yield s.value(e, e.opts.lenientIf), e))
            return void (yield i.renderTemplates(n, e, t));
        }
        yield i.renderTemplates(this.elseTemplates, e, t);
      }
    },
    break: class extends kt {
      render(e, t) {
        t.break = !0;
      }
    },
    continue: class extends kt {
      render(e, t) {
        t.continue = !0;
      }
    },
    echo: class extends kt {
      constructor(e, t, i) {
        super(e, t, i),
          this.tokenizer.skipBlank(),
          this.tokenizer.end() ||
            (this.value = new bt(
              this.tokenizer.readFilteredValue(),
              this.liquid
            ));
      }
      *render(e, t) {
        if (!this.value) return;
        const i = yield this.value.value(e, !1);
        t.write(i);
      }
    },
    liquid: class extends kt {
      constructor(e, t, i, s) {
        super(e, t, i);
        const r = this.tokenizer.readLiquidTagTokens(this.liquid.options);
        this.templates = s.parseTokens(r);
      }
      *render(e, t) {
        yield this.liquid.renderer.renderTemplates(this.templates, e, t);
      }
    },
    "#": class extends kt {
      constructor(e, t, i) {
        if ((super(e, t, i), -1 !== e.args.search(/\n\s*[^#\s]/g)))
          throw new Error(
            "every line of an inline comment must start with a '#' character"
          );
      }
      render() {}
    },
  };
  class vi {
    constructor(e = {}) {
      (this.renderer = new Ue()),
        (this.filters = {}),
        (this.tags = {}),
        (this.options = dt(e)),
        (this.parser = new Rt(this)),
        k(ki, (e, t) => this.registerTag(t, e)),
        k(pi, (e, t) => this.registerFilter(t, e));
    }
    parse(e, t) {
      return new Rt(this).parse(e, t);
    }
    _render(e, t, i) {
      const s = t instanceof Mt ? t : new Mt(t, this.options, i);
      return this.renderer.renderTemplates(e, s);
    }
    render(e, t, i) {
      return Q(this, void 0, void 0, function* () {
        return X(
          this._render(e, t, Object.assign(Object.assign({}, i), { sync: !1 }))
        );
      });
    }
    renderSync(e, t, i) {
      return K(
        this._render(e, t, Object.assign(Object.assign({}, i), { sync: !0 }))
      );
    }
    renderToNodeStream(e, t, i = {}) {
      const s = new Mt(t, this.options, i);
      return this.renderer.renderTemplatesToNodeStream(e, s);
    }
    _parseAndRender(e, t, i) {
      const s = this.parse(e);
      return this._render(s, t, i);
    }
    parseAndRender(e, t, i) {
      return Q(this, void 0, void 0, function* () {
        return X(
          this._parseAndRender(
            e,
            t,
            Object.assign(Object.assign({}, i), { sync: !1 })
          )
        );
      });
    }
    parseAndRenderSync(e, t, i) {
      return K(
        this._parseAndRender(
          e,
          t,
          Object.assign(Object.assign({}, i), { sync: !0 })
        )
      );
    }
    _parsePartialFile(e, t, i) {
      return new Rt(this).parseFile(e, t, Ft.Partials, i);
    }
    _parseLayoutFile(e, t, i) {
      return new Rt(this).parseFile(e, t, Ft.Layouts, i);
    }
    _parseFile(e, t, i, s) {
      return new Rt(this).parseFile(e, t, i, s);
    }
    parseFile(e, t) {
      return Q(this, void 0, void 0, function* () {
        return X(new Rt(this).parseFile(e, !1, t));
      });
    }
    parseFileSync(e, t) {
      return K(new Rt(this).parseFile(e, !0, t));
    }
    *_renderFile(e, t, i) {
      const s = yield this._parseFile(e, i.sync, i.lookupType);
      return yield this._render(s, t, i);
    }
    renderFile(e, t, i) {
      return Q(this, void 0, void 0, function* () {
        return X(
          this._renderFile(
            e,
            t,
            Object.assign(Object.assign({}, i), { sync: !1 })
          )
        );
      });
    }
    renderFileSync(e, t, i) {
      return K(
        this._renderFile(
          e,
          t,
          Object.assign(Object.assign({}, i), { sync: !0 })
        )
      );
    }
    renderFileToNodeStream(e, t, i) {
      return Q(this, void 0, void 0, function* () {
        const s = yield this.parseFile(e);
        return this.renderToNodeStream(s, t, i);
      });
    }
    _evalValue(e, t) {
      const i = new bt(e, this),
        s = t instanceof Mt ? t : new Mt(t, this.options);
      return i.value(s);
    }
    evalValue(e, t) {
      return Q(this, void 0, void 0, function* () {
        return X(this._evalValue(e, t));
      });
    }
    evalValueSync(e, t) {
      return K(this._evalValue(e, t));
    }
    registerFilter(e, t) {
      this.filters[e] = t;
    }
    registerTag(e, t) {
      var i;
      this.tags[e] = a(t)
        ? t
        : ((i = t),
          class extends kt {
            constructor(e, t, s) {
              super(e, t, s), a(i.parse) && i.parse.call(this, e, t);
            }
            *render(e, t) {
              const s = yield new vt(
                this.token.args,
                e.opts.keyValueSeparator
              ).render(e);
              return yield i.render.call(this, e, t, s);
            }
          });
    }
    plugin(e) {
      return e.call(this, vi);
    }
    express() {
      const e = this;
      let t = !0;
      return function (i, s, r) {
        if (t) {
          t = !1;
          const i = pt(this.root);
          e.options.root.unshift(...i),
            e.options.layouts.unshift(...i),
            e.options.partials.unshift(...i);
        }
        e.renderFile(i, s).then((e) => r(null, e), r);
      };
    }
  }
  class Ti {
    static Init() {
      this.engine = this.GetEngine();
    }
    static GetEngine() {
      return (
        (this.engine = new vi({ root: "/", extname: ".html" })),
        this.engine.registerFilter(
          "mp_currency",
          (e) =>
            "$" +
            parseFloat(e)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        ),
        this.engine
      );
    }
    static async GetRenderedTemplate(e, t) {
      return this.engine || this.Init(), await this.engine.renderFile(e, t);
    }
    static async GetRenderedTemplateString(e, t) {
      return this.engine || this.Init(), await this.engine.parseAndRender(e, t);
    }
  }
  class bi {
    static async Init() {
      console.log("===> Widget Module Init..."),
        console.info("===> Custom Widget Version: process.env.BUILD_VERSION"),
        document
          .querySelectorAll('[data-component="CustomWidget"]')
          .forEach((e) => {
            this.InitWidget(e);
          });
    }
    static async ReinitWidget(e) {
      var t = document.getElementById(e);
      this.InitWidget(t);
    }
    static async ReinitAllWidgets() {
      this.Init();
    }
    static checkForUser() {
      var e = this.getUserData();
      return (
        !("null" == e || !e || e.length < 10) &&
        !(this.getAuthExpiration() < new Date())
      );
    }
    static getUserData() {
      return localStorage.getItem("mpp-widgets_AuthToken");
    }
    static getAuthExpiration() {
      var e = localStorage.getItem("mpp-widgets_ExpiresAfter");
      if (e) {
        console.log(e);
        var t = Date.parse(e);
        return console.log(t), t;
      }
      return null;
    }
    static async InitWidget(e) {
      var t = e.getAttribute("data-sp"),
        i = e.getAttribute("data-template"),
        s = e.getAttribute("data-templateId"),
        r = !1,
        n = e.getAttribute("data-cache"),
        o = e.getAttribute("data-host"),
        a = e.getAttribute("data-params"),
        l = !1,
        h = !1,
        c = !1;
      e.getAttribute("data-requireUser") &&
        "true" === e.getAttribute("data-requireUser").toLowerCase() &&
        (r = !0),
        e.getAttribute("data-debug") && (h = !0),
        e.getAttribute("data-useCalendar") && (l = !0),
        e.getAttribute("data-authOverride") &&
          "true" === e.getAttribute("data-authOverride").toLowerCase() &&
          (c = !0),
        o
          ? o.indexOf(".") > -1 || o.indexOf("http") > -1
            ? console.error(
                "Host must refer to the church prefix ONLY and cannot contain http, https, or other characters"
              )
            : (l ||
                (a &&
                  a.indexOf("@") < 0 &&
                  console.warn(
                    "params must include the '@' character to correctly pass parameters to the data stored procedure"
                  )),
              t &&
                l &&
                console.warn(
                  "Stored Procedure and Use Calendar are configured.  In this case, only UseCalendar will be processed.  Please reivew your custom widget configuration and correct to avoid this warning."
                ),
              console.info(
                "**************************************************"
              ),
              console.info(`Element ID:       ${e.id}`),
              console.info(`Host:             ${o}`),
              console.info(`Stored Procedure: ${t}`),
              console.info(`Params:           ${a}`),
              console.info(`Template:         ${i}`),
              console.info(`Template ID:      ${s}`),
              console.info(`Require User:     ${r}`),
              console.info(`Cache Data:       ${n}`),
              console.info(`Use Calendar:     ${l}`),
              console.info(`Params:           ${a}`),
              console.info(`Debug Enabled:    ${h}`),
              console.info(`Auth Override:    ${c}`),
              console.info(
                "**************************************************"
              ),
              this.LoadWidget(e.id, t, a, i, s, r, n, o, l, h, c))
          : console.error(
              "Host must refer to the church prefix ONLY and cannot contain http, https, or other characters"
            );
    }
    static async setupAuthRecheck() {
      if (
        (null == this.authCheckCount && (this.authCheckCount = 0),
        null == this.authCheckTimer && this.authCheckCount < 4)
      ) {
        console.info("|||===> Auth Check Scheduled");
        let e = this;
        (e.authCheckTimer = window.setTimeout(function () {
          (e.authCheckTimer = null), e.recheckAuth();
        }, 500)),
          e.authCheckCount++;
      }
    }
    static async recheckAuth() {
      console.info("|||===> Checking Auth"),
        this.checkForUser() ? this.ReinitAllWidgets() : this.setupAuthRecheck();
    }
    static async LoadWidget(e, t, i, s, r, n, o, a, l, h, c) {
      var u = document.getElementById(e),
        d = {};
      if (n && !this.checkForUser())
        return (
          (d.userAuthenticated = !1),
          console.info("|||===> No user is logged in."),
          c
            ? (h && (console.log("|||===> Data"), console.log(d)),
              await this.RenderTemplateWithData(r, s, d, u))
            : (u.innerHTML =
                '<div class="alert alert-danger alert-nologin">You must be logged in to see the details of this widget.</div>'),
          void this.setupAuthRecheck()
        );
      (d = l
        ? await this.LoadCalendarData(i, o, a)
        : await this.LoadWidgetData(this.getUserData(), n, t, i, o, a)),
        h && (console.log("|||===> Data"), console.log(d)),
        console.info("***====> Checking for Authentication <====***"),
        this.checkForUser()
          ? (console.info("===> User Authenticated"),
            (d.userAuthenticated = !0))
          : (console.warn("===> User NOT Authenticated"),
            (d.userAuthenticated = !1)),
        await this.RenderTemplateWithData(r, s, d, u);
      var p = new CustomEvent("widgetLoaded", { detail: `${u.id}` });
      window.dispatchEvent(p);
    }
    static async RenderTemplateWithData(e, t, i, s) {
      try {
        if (e) {
          var r = document.getElementById(e),
            n = await Ti.GetRenderedTemplateString(r.innerText, i);
          s.innerHTML = n;
        } else if (t) {
          n = await Ti.GetRenderedTemplate(t, i);
          s.innerHTML = n;
        } else
          console.error("Error while rendering template."),
            console.error(err),
            (s.innerHTML =
              '<div class="alert alert-danger error">An error occurred while rendering the widget template</div>');
      } catch (e) {
        console.error("Error while rendering template."),
          console.error(e),
          (s.innerHTML =
            '<div class="alert alert-danger error">An error occurred while rendering the widget template</div>');
      }
    }
    static async LoadWidgetData(t, i, s, r, n, o) {
      var a = `https://${o}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${s}`;
      return (
        r &&
          (a += `&spParams=${encodeURIComponent(this.replaceParameters(r))}`),
        t && (a += `&userData=${t}`),
        n && (a += `&cacheData=${n}`),
        i && ((a += "&requireUser=true"), !t)
          ? (console.error("Not logged in..."),
            void (element.innerHTML =
              '<div class="alert alert-danger error">Please login to see this widget.</div>'))
          : await e.getData(a)
      );
    }
    static async LoadCalendarData(t, i, s) {
      var r = `https://${s}.cloudapps.ministryplatform.cloud/sky/api/Events/GetEvents`;
      if (t.indexOf("?") > -1) {
        var n = t.replace("?", "");
        t = n;
      }
      return (
        t && (r += `?${t}`),
        t.indexOf("&DataFormat=json") < -1 &&
          (r += "&DataFormat=json").replace("&DataFormat=ical", ""),
        { Events: await e.getData(r) }
      );
    }
    static replaceParameters(e) {
      for (var t, i = e, s = /\[.*?]/gi; null != (t = s.exec(e)); )
        i = i.replace(t[0], this.getParameterByName(t[0]));
      return i;
    }
    static getParameterByName(e, t = window.location.href) {
      var i = e.replace("[", "");
      (i = i.replace("]", "")),
        console.log("|||===> Getting Querystring Parameter:" + i),
        (i = i.replace(/[\[\]]/g, "\\$&"));
      var s = new RegExp("[?&]" + i + "(=([^&#]*)|&|#|$)").exec(t);
      return s
        ? s[2]
          ? (console.log(
              "|||===> Param Value:" +
                decodeURIComponent(s[2].replace(/\+/g, " "))
            ),
            decodeURIComponent(s[2].replace(/\+/g, " ")))
          : ""
        : null;
    }
  }
  window.addEventListener("load", function () {
    bi.Init();
  }),
    (window.ReInitWidget = bi.ReinitWidget),
    (window.ReinitAllWidgets = bi.ReinitAllWidgets);
})();
//# sourceMappingURL=customWidget.js.map
