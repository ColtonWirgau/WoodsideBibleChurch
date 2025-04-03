/*!
 * ==========================================================
 * Package Name: MinistryPlatform CustomWidgets
 * Version: 2025.01.07.1
 * ==========================================================
 *
 */ (() => {
  "use strict";
  class e {
    static async getData(e, t) {
      var s = {};
      t && (s.Authorization = t);
      const i = { method: "GET", headers: s };
      try {
        const t = await fetch(`${e}`, i);
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
    constructor(e, t, s, i, r) {
      (this.kind = e),
        (this.input = t),
        (this.begin = s),
        (this.end = i),
        (this.file = r);
    }
    getText() {
      return this.input.slice(this.begin, this.end);
    }
    getPosition() {
      let [e, t] = [1, 1];
      for (let s = 0; s < this.begin; s++)
        "\n" === this.input[s] ? (e++, (t = 1)) : t++;
      return [e, t];
    }
    size() {
      return this.end - this.begin;
    }
  }
  class s {
    liquidMethodMissing(e) {}
  }
  const i = Object.prototype.toString,
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
    return e instanceof s && a(e.valueOf) ? e.valueOf() : e;
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
    return "[object Array]" === i.call(e);
  }
  function v(e) {
    return e && g(e.length);
  }
  function k(e, t) {
    e = e || {};
    for (const s in e) if (n.call(e, s) && !1 === t(e[s], s, e)) break;
    return e;
  }
  function b(e) {
    return e[e.length - 1];
  }
  function T(e) {
    const t = typeof e;
    return null !== e && ("object" === t || "function" === t);
  }
  function x(e, t, s = 1) {
    const i = [];
    for (let r = e; r < t; r += s) i.push(r);
    return i;
  }
  function S(e, t, s = " ") {
    return L(e, t, s, (e, t) => t + e);
  }
  function L(e, t, s, i) {
    let r = t - (e = String(e)).length;
    for (; r-- > 0; ) e = i(e, s);
    return e;
  }
  function O(e) {
    return e;
  }
  function F(e, t) {
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
  function R(e) {
    return function (...t) {
      return e.call(this, ...t.map(p));
    };
  }
  function _(e) {
    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  function* A(e) {
    const t = new Set();
    for (const s of e) {
      const e = JSON.stringify(s);
      t.has(e) || (t.add(e), yield s);
    }
  }
  const z = "__liquidClass__";
  class j extends Error {
    constructor(e, t) {
      super("string" == typeof e ? e : e.message),
        (this.context = ""),
        "string" != typeof e &&
          Object.defineProperty(this, "originalError", {
            value: e,
            enumerable: !1
          }),
        Object.defineProperty(this, "token", { value: t, enumerable: !1 }),
        Object.defineProperty(this, z, {
          value: "LiquidError",
          enumerable: !1
        });
    }
    update() {
      Object.defineProperty(this, "context", {
        value: I(this.token),
        enumerable: !1
      }),
        (this.message = (function (e, t) {
          t.file && (e += `, file:${t.file}`);
          const [s, i] = t.getPosition();
          return (e += `, line:${s}, col:${i}`);
        })(this.message, this.token)),
        (this.stack = this.message + "\n" + this.context + "\n" + this.stack),
        this.originalError &&
          (this.stack += "\nFrom " + this.originalError.stack);
    }
    static is(e) {
      return "LiquidError" === (null == e ? void 0 : e[z]);
    }
  }
  class D extends j {
    constructor(e, t) {
      super(e, t), (this.name = "TokenizationError"), super.update();
    }
  }
  class E extends j {
    constructor(e, t) {
      super(e, t),
        (this.name = "ParseError"),
        (this.message = e.message),
        super.update();
    }
  }
  class $ extends j {
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
  class q extends j {
    constructor(e) {
      super(e[0], e[0].token), (this.errors = e), (this.name = "LiquidErrors");
      const t = e.length > 1 ? "s" : "";
      (this.message = `${e.length} error${t} found`), super.update();
    }
    static is(e) {
      return "LiquidErrors" === e.name;
    }
  }
  class N extends j {
    constructor(e, t) {
      super(e, t),
        (this.name = "UndefinedVariableError"),
        (this.message = e.message),
        super.update();
    }
  }
  class M extends Error {
    constructor(e) {
      super(`undefined variable: ${e}`),
        (this.name = "InternalUndefinedVariableError"),
        (this.variableName = e);
    }
  }
  class C extends Error {
    constructor(e) {
      super(e), (this.name = "AssertionError"), (this.message = e + "");
    }
  }
  function I(e) {
    const [t, s] = e.getPosition(),
      i = e.input.split("\n"),
      r = Math.max(t - 2, 1),
      n = Math.min(t + 3, i.length);
    return x(r, n + 1)
      .map((e) => {
        let r = `${e === t ? ">> " : "   "}${S(String(e), String(n).length)}| `;
        const o = e === t ? "\n" + S("^", s + r.length) : "";
        return (r += i[e - 1]), (r += o), r;
      })
      .join("\n");
  }
  const V = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 4, 4, 4, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 20, 2, 8, 0, 0, 0, 0, 8, 0, 0, 0, 64, 0, 65, 0, 0, 33,
    33, 33, 33, 33, 33, 33, 33, 33, 33, 0, 0, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0
  ];
  function P(e) {
    const t = e.charCodeAt(0);
    return t >= 128 ? !V[t] : !!(1 & V[t]);
  }
  function B(e, t) {
    if (!e) {
      const s = "function" == typeof t ? t() : t || `expect ${e} to be true`;
      throw new C(s);
    }
  }
  function U(e, t = `unexpected ${JSON.stringify(e)}`) {
    B(!e, t);
  }
  (V[160] =
    V[5760] =
    V[6158] =
    V[8192] =
    V[8193] =
    V[8194] =
    V[8195] =
    V[8196] =
    V[8197] =
    V[8198] =
    V[8199] =
    V[8200] =
    V[8201] =
    V[8202] =
    V[8232] =
    V[8233] =
    V[8239] =
    V[8287] =
    V[12288] =
      4),
    (V[8220] = V[8221] = 128);
  class H extends s {
    equals(e) {
      return (
        !(e instanceof H) &&
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
    static is(e) {
      return e instanceof H;
    }
  }
  class W extends H {
    equals(e) {
      return (
        !1 === e || !!y(p(e)) || (o(e) ? /^\s*$/.test(e) : super.equals(e))
      );
    }
    static is(e) {
      return e instanceof W;
    }
  }
  class Y extends s {
    constructor(e, t, s) {
      super(), (this.i = 0), (this.length = e), (this.name = `${s}-${t}`);
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
  class Z extends s {
    constructor(e = () => "") {
      super(), (this.superBlockRender = e);
    }
    super() {
      return this.superBlockRender();
    }
  }
  function G(e) {
    return e && a(e.equals) && a(e.gt) && a(e.geq) && a(e.lt) && a(e.leq);
  }
  const J = new (class extends s {
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
    Q = {
      true: !0,
      false: !1,
      nil: J,
      null: J,
      empty: new H(),
      blank: new W()
    };
  function X(e) {
    const t = {};
    for (const [s, i] of Object.entries(e)) {
      let e = t;
      for (let t = 0; t < s.length; t++) {
        const i = s[t];
        (e[i] = e[i] || {}),
          t === s.length - 1 && P(s[t]) && (e[i].needBoundary = !0),
          (e = e[i]);
      }
      (e.data = i), (e.end = !0);
    }
    return t;
  }
  var K = function () {
    return (
      (K =
        Object.assign ||
        function (e) {
          for (var t, s = 1, i = arguments.length; s < i; s++)
            for (var r in (t = arguments[s]))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        }),
      K.apply(this, arguments)
    );
  };
  function ee(e, t, s, i) {
    return new (s || (s = Promise))(function (r, n) {
      function o(e) {
        try {
          l(i.next(e));
        } catch (e) {
          n(e);
        }
      }
      function a(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          n(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof s
              ? t
              : new s(function (e) {
                  e(t);
                })).then(o, a);
      }
      l((i = i.apply(e, t || [])).next());
    });
  }
  function te(e) {
    return ee(this, void 0, void 0, function* () {
      if (!h(e)) return e;
      let t,
        s = !1,
        i = "next";
      do {
        const r = e[i](t);
        (s = r.done), (t = r.value), (i = "next");
        try {
          h(t) && (t = te(t)), l(t) && (t = yield t);
        } catch (e) {
          (i = "throw"), (t = e);
        }
      } while (!s);
      return t;
    });
  }
  function se(e) {
    if (!h(e)) return e;
    let t,
      s = !1,
      i = "next";
    do {
      const r = e[i](t);
      if (((s = r.done), (t = r.value), (i = "next"), h(t)))
        try {
          t = se(t);
        } catch (e) {
          (i = "throw"), (t = e);
        }
    } while (!s);
    return t;
  }
  const ie = /%([-_0^#:]+)?(\d+)?([EO])?(.)/;
  function re(e) {
    const t = (function (e) {
      const t = e.getFullYear();
      return !(3 & t || !(t % 100 || (t % 400 == 0 && t)));
    })(e)
      ? 29
      : 28;
    return [31, t, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  function ne(e) {
    let t = 0;
    for (let s = 0; s < e.getMonth(); ++s) t += re(e)[s];
    return t + e.getDate();
  }
  function oe(e, t) {
    const s = ne(e) + (t - e.getDay()),
      i = 7 - new Date(e.getFullYear(), 0, 1).getDay() + t;
    return String(Math.floor((s - i) / 7) + 1);
  }
  const ae = {
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
      W: 2
    },
    le = new Set("aAbBceklpP");
  function he(e, t) {
    const s = Math.abs(e.getTimezoneOffset()),
      i = Math.floor(s / 60),
      r = s % 60;
    return (
      (e.getTimezoneOffset() > 0 ? "-" : "+") +
      S(i, 2, "0") +
      (t.flags[":"] ? ":" : "") +
      S(r, 2, "0")
    );
  }
  const ce = {
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
    j: (e) => ne(e),
    k: (e) => e.getHours(),
    l: (e) => String(e.getHours() % 12 || 12),
    L: (e) => e.getMilliseconds(),
    m: (e) => e.getMonth() + 1,
    M: (e) => e.getMinutes(),
    N: (e, t) => {
      const s = Number(t.width) || 9;
      return (function (e, t, s = " ") {
        return L(e, t, s, (e, t) => e + t);
      })(String(e.getMilliseconds()).slice(0, s), s, "0");
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
    U: (e) => oe(e, 0),
    w: (e) => e.getDay(),
    W: (e) => oe(e, 1),
    x: (e) => e.toLocaleDateString(),
    X: (e) => e.toLocaleTimeString(),
    y: (e) => e.getFullYear().toString().slice(2, 4),
    Y: (e) => e.getFullYear(),
    z: he,
    Z: (e, t) => e.getTimeZoneName() || he(e, t),
    t: () => "\t",
    n: () => "\n",
    "%": () => "%"
  };
  function ue(e, t) {
    let s,
      i = "",
      r = t;
    for (; (s = ie.exec(r)); )
      (i += r.slice(0, s.index)),
        (r = r.slice(s.index + s[0].length)),
        (i += de(e, s));
    return i + r;
  }
  function de(e, t) {
    const [s, i = "", r, n, o] = t,
      a = ce[o];
    if (!a) return s;
    const l = {};
    for (const e of i) l[e] = !0;
    let h = String(a(e, { flags: l, width: r, modifier: n })),
      c = le.has(o) ? " " : "0",
      u = r || ae[o] || 0;
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
      S(h, u, c)
    );
  }
  function pe() {
    return "undefined" != typeof Intl ? Intl.DateTimeFormat : void 0;
  }
  ce.h = ce.b;
  const fe = /([zZ]|([+-])(\d{2}):?(\d{2}))$/,
    ge = [
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
      "December"
    ],
    me = ge.map((e) => e.slice(0, 3)),
    ye = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    we = ye.map((e) => e.slice(0, 3));
  class ve {
    constructor(e, t, s) {
      (this.locale = t),
        (this.DateTimeFormat = pe()),
        (this.date = new Date(e)),
        (this.timezoneFixed = void 0 !== s),
        void 0 === s && (s = this.date.getTimezoneOffset()),
        (this.timezoneOffset = o(s) ? ve.getTimezoneOffset(s, this.date) : s),
        (this.timezoneName = o(s) ? s : "");
      const i = 6e4 * (this.date.getTimezoneOffset() - this.timezoneOffset),
        r = this.date.getTime() + i;
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
        : ge[this.getMonth()];
    }
    getShortMonthName() {
      var e;
      return null !== (e = this.format({ month: "short" })) && void 0 !== e
        ? e
        : me[this.getMonth()];
    }
    getLongWeekdayName() {
      var e;
      return null !== (e = this.format({ weekday: "long" })) && void 0 !== e
        ? e
        : ye[this.displayDate.getDay()];
    }
    getShortWeekdayName() {
      var e;
      return null !== (e = this.format({ weekday: "short" })) && void 0 !== e
        ? e
        : we[this.displayDate.getDay()];
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
      const s = e.match(fe);
      if (s && "Z" === s[1]) return new ve(+new Date(e), t, 0);
      if (s && s[2] && s[3] && s[4]) {
        const [, , i, r, n] = s,
          o = ("+" === i ? -1 : 1) * (60 * parseInt(r, 10) + parseInt(n, 10));
        return new ve(+new Date(e), t, o);
      }
      return new ve(e, t);
    }
    static getTimezoneOffset(e, t) {
      const s = t.toLocaleString("en-US", { timeZone: e }),
        i = t.toLocaleString("en-US", { timeZone: "UTC" }),
        r = new Date(s);
      return (+new Date(i) - +r) / 6e4;
    }
  }
  class ke {
    constructor(e, t) {
      (this.base = 0), (this.message = `${e} limit exceeded`), (this.limit = t);
    }
    use(e) {
      (e = f(e)),
        B(this.base + e <= this.limit, this.message),
        (this.base += e);
    }
    check(e) {
      B((e = f(e)) <= this.limit, this.message);
    }
  }
  class be extends t {
    constructor(e, [t, s], i, r, n, o, a, l) {
      super(e, i, r, n, l), (this.trimLeft = !1), (this.trimRight = !1);
      const h = "-" === i[t],
        c = "-" === i[s - 1];
      let u = h ? t + 1 : t,
        d = c ? s - 1 : s;
      for (; u < d && 4 & V[i.charCodeAt(u)]; ) u++;
      for (; d > u && 4 & V[i.charCodeAt(d - 1)]; ) d--;
      (this.contentRange = [u, d]),
        (this.trimLeft = h || o),
        (this.trimRight = c || a);
    }
    get content() {
      return this.input.slice(this.contentRange[0], this.contentRange[1]);
    }
  }
  class Te extends be {
    constructor(e, t, s, i, r) {
      const {
          trimTagLeft: n,
          trimTagRight: o,
          tagDelimiterLeft: a,
          tagDelimiterRight: l
        } = i,
        [h, c] = [t + a.length, s - l.length];
      super(Vt.Tag, [h, c], e, t, s, n, o, r),
        (this.tokenizer = new wt(e, i.operators, r, this.contentRange)),
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
  class xe extends be {
    constructor(e, t, s, i, r) {
      const {
          trimOutputLeft: n,
          trimOutputRight: o,
          outputDelimiterLeft: a,
          outputDelimiterRight: l
        } = i,
        h = [t + a.length, s - l.length];
      super(Vt.Output, h, e, t, s, n, o, r);
    }
  }
  class Se extends t {
    constructor(e, t, s, i) {
      super(Vt.HTML, e, t, s, i),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.file = i),
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
  class Le extends t {
    constructor(e, t, s, i) {
      super(Vt.Number, e, t, s, i),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.file = i),
        (this.content = Number(this.getText()));
    }
  }
  class Oe extends t {
    constructor(e, t, s, i) {
      super(Vt.Word, e, t, s, i),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.file = i),
        (this.content = this.getText());
    }
  }
  class Fe extends t {
    constructor(e, t, s, i) {
      super(Vt.Literal, e, t, s, i),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.file = i),
        (this.literal = this.getText()),
        (this.content = Q[this.literal]);
    }
  }
  const Re = {
      "==": 2,
      "!=": 2,
      ">": 2,
      "<": 2,
      ">=": 2,
      "<=": 2,
      contains: 2,
      not: 1,
      and: 0,
      or: 0
    },
    _e = {
      "==": 0,
      "!=": 0,
      ">": 0,
      "<": 0,
      ">=": 0,
      "<=": 0,
      contains: 0,
      not: 1,
      and: 0,
      or: 0
    };
  class Ae extends t {
    constructor(e, t, s, i) {
      super(Vt.Operator, e, t, s, i),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.file = i),
        (this.operator = this.getText());
    }
    getPrecedence() {
      const e = this.getText();
      return e in Re ? Re[e] : 1;
    }
  }
  class ze extends t {
    constructor(e, t, s, i, r, n) {
      super(Vt.PropertyAccess, s, i, r, n),
        (this.variable = e),
        (this.props = t);
    }
  }
  class je extends t {
    constructor(e, t, s, i, r, n) {
      super(Vt.Filter, s, i, r, n), (this.name = e), (this.args = t);
    }
  }
  class De extends t {
    constructor(e, t, s, i, r, n) {
      super(Vt.Hash, e, t, s, n),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.name = i),
        (this.value = r),
        (this.file = n);
    }
  }
  const Ee = /[\da-fA-F]/,
    $e = /[0-7]/,
    qe = { b: "\b", f: "\f", n: "\n", r: "\r", t: "\t", v: "\v" };
  function Ne(e) {
    const t = e.charCodeAt(0);
    return t >= 97 ? t - 87 : t >= 65 ? t - 55 : t - 48;
  }
  class Me extends t {
    constructor(e, t, s, i) {
      super(Vt.Quoted, e, t, s, i),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.file = i),
        (this.content = (function (e) {
          let t = "";
          for (let s = 1; s < e.length - 1; s++)
            if ("\\" === e[s])
              if (void 0 !== qe[e[s + 1]]) t += qe[e[++s]];
              else if ("u" === e[s + 1]) {
                let i = 0,
                  r = s + 2;
                for (; r <= s + 5 && Ee.test(e[r]); ) i = 16 * i + Ne(e[r++]);
                (s = r - 1), (t += String.fromCharCode(i));
              } else if ($e.test(e[s + 1])) {
                let i = s + 1,
                  r = 0;
                for (; i <= s + 3 && $e.test(e[i]); ) r = 8 * r + Ne(e[i++]);
                (s = i - 1), (t += String.fromCharCode(r));
              } else t += e[++s];
            else t += e[s];
          return t;
        })(this.getText()));
    }
  }
  class Ce extends t {
    constructor(e, t, s, i, r, n) {
      super(Vt.Range, e, t, s, n),
        (this.input = e),
        (this.begin = t),
        (this.end = s),
        (this.lhs = i),
        (this.rhs = r),
        (this.file = n);
    }
  }
  class Ie extends be {
    constructor(e, t, s, i, r) {
      super(Vt.Tag, [t, s], e, t, s, !1, !1, r),
        (this.tokenizer = new wt(e, i.operators, r, this.contentRange)),
        (this.name = this.tokenizer.readTagName()),
        this.tokenizer.assert(this.name, "illegal liquid tag syntax"),
        this.tokenizer.skipBlank();
    }
    get args() {
      return this.tokenizer.input.slice(this.tokenizer.p, this.contentRange[1]);
    }
  }
  class Ve extends t {
    constructor(e, t, s, i, r, n) {
      super(Vt.FilteredValue, s, i, r, n),
        (this.initial = e),
        (this.filters = t),
        (this.input = s),
        (this.begin = i),
        (this.end = r),
        (this.file = n);
    }
  }
  const Pe = { now: () => Date.now() };
  function Be() {
    return (
      ("object" == typeof global && global.performance) ||
      ("object" == typeof window && window.performance) ||
      Pe
    );
  }
  class Ue {
    constructor() {
      this.buffer = "";
    }
    write(e) {
      this.buffer += c(e);
    }
  }
  class He {
    constructor() {
      throw (
        ((this.buffer = ""),
        (this.stream = null),
        new Error("streaming not supported in browser"))
      );
    }
  }
  class We {
    constructor() {
      this.buffer = "";
    }
    write(e) {
      "string" != typeof (e = p(e)) && "" === this.buffer
        ? (this.buffer = e)
        : (this.buffer = c(this.buffer) + c(e));
    }
  }
  class Ye {
    renderTemplatesToNodeStream(e, t) {
      const s = new He();
      return (
        Promise.resolve()
          .then(() => te(this.renderTemplates(e, t, s)))
          .then(
            () => s.end(),
            (e) => s.error(e)
          ),
        s.stream
      );
    }
    *renderTemplates(e, t, s) {
      s || (s = t.opts.keepOutputType ? new We() : new Ue());
      const i = [];
      for (const r of e) {
        t.renderLimit.check(Be().now());
        try {
          const e = yield r.render(t, s);
          if ((e && s.write(e), t.breakCalled || t.continueCalled)) break;
        } catch (e) {
          const s = j.is(e) ? e : new $(e, r);
          if (!t.opts.catchAllErrors) throw s;
          i.push(s);
        }
      }
      if (i.length) throw new q(i);
      return s.buffer;
    }
  }
  class Ze {
    constructor(e) {
      this.postfix = [...Je(e)];
    }
    *evaluate(e, t) {
      B(e, "unable to evaluate: context not defined");
      const s = [];
      for (const i of this.postfix)
        if (Ht(i)) {
          const t = s.pop();
          let r;
          if (1 === _e[i.operator])
            r = yield e.opts.operators[i.operator](t, e);
          else {
            const n = s.pop();
            r = yield e.opts.operators[i.operator](n, t, e);
          }
          s.push(r);
        } else s.push(yield Ge(i, e, t));
      return s[0];
    }
    valid() {
      return !!this.postfix.length;
    }
  }
  function* Ge(e, t, s = !1) {
    if (e)
      return "content" in e
        ? e.content
        : Qt(e)
        ? yield (function* (e, t, s) {
            const i = [];
            for (const s of e.props) i.push(yield Ge(s, t, !1));
            try {
              if (e.variable) {
                const r = yield Ge(e.variable, t, s);
                return yield t._getFromScope(r, i);
              }
              return yield t._get(i);
            } catch (t) {
              if (s && "InternalUndefinedVariableError" === t.name) return null;
              throw new N(t, e);
            }
          })(e, t, s)
        : Kt(e)
        ? yield (function* (e, t) {
            const s = yield Ge(e.lhs, t),
              i = yield Ge(e.rhs, t);
            return t.memoryLimit.use(i - s + 1), x(+s, +i + 1);
          })(e, t)
        : void 0;
  }
  function* Je(e) {
    const t = [];
    for (const s of e)
      if (Ht(s)) {
        for (
          ;
          t.length && t[t.length - 1].getPrecedence() > s.getPrecedence();

        )
          yield t.pop();
        t.push(s);
      } else yield s;
    for (; t.length; ) yield t.pop();
  }
  function Qe(e, t) {
    return !Xe(e, t);
  }
  function Xe(e, t) {
    return (e = p(e)), t.opts.jsTruthy ? !e : !1 === e || null == e;
  }
  const Ke = {
    "==": et,
    "!=": (e, t) => !et(e, t),
    ">": (e, t) => (G(e) ? e.gt(t) : G(t) ? t.lt(e) : p(e) > p(t)),
    "<": (e, t) => (G(e) ? e.lt(t) : G(t) ? t.gt(e) : p(e) < p(t)),
    ">=": (e, t) => (G(e) ? e.geq(t) : G(t) ? t.leq(e) : p(e) >= p(t)),
    "<=": (e, t) => (G(e) ? e.leq(t) : G(t) ? t.geq(e) : p(e) <= p(t)),
    contains: (e, t) =>
      w((e = p(e)))
        ? e.some((e) => et(e, t))
        : !!a(null == e ? void 0 : e.indexOf) && e.indexOf(p(t)) > -1,
    not: (e, t) => Xe(p(e), t),
    and: (e, t, s) => Qe(p(e), s) && Qe(p(t), s),
    or: (e, t, s) => Qe(p(e), s) || Qe(p(t), s)
  };
  function et(e, t) {
    return G(e)
      ? e.equals(t)
      : G(t)
      ? t.equals(e)
      : ((e = p(e)),
        (t = p(t)),
        w(e)
          ? w(t) &&
            (function (e, t) {
              return e.length === t.length && !e.some((e, s) => !et(e, t[s]));
            })(e, t)
          : e === t);
  }
  class tt {
    constructor(e, t, s, i) {
      (this.key = e), (this.value = t), (this.next = s), (this.prev = i);
    }
  }
  class st {
    constructor(e, t = 0) {
      (this.limit = e),
        (this.size = t),
        (this.cache = {}),
        (this.head = new tt("HEAD", null, null, null)),
        (this.tail = new tt("TAIL", null, null, null)),
        (this.head.next = this.tail),
        (this.tail.prev = this.head);
    }
    write(e, t) {
      if (this.cache[e]) this.cache[e].value = t;
      else {
        const s = new tt(e, t, this.head.next, this.head);
        (this.head.next.prev = s),
          (this.head.next = s),
          (this.cache[e] = s),
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
  function it(e, t) {
    const s = document.createElement("base");
    s.href = e;
    const i = document.getElementsByTagName("head")[0];
    i.insertBefore(s, i.firstChild);
    const r = document.createElement("a");
    r.href = t;
    const n = r.href;
    return i.removeChild(s), n;
  }
  var rt = Object.freeze({
    __proto__: null,
    resolve: function (e, t, s) {
      return (
        e.length && "/" !== b(e) && (e += "/"),
        it(e, t).replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/, (e, t, i) => {
          const r = i.split("/").pop();
          return /\.\w+$/.test(r) ? e : t + i + s;
        })
      );
    },
    readFile: function (e) {
      return ee(this, void 0, void 0, function* () {
        return new Promise((t, s) => {
          const i = new XMLHttpRequest();
          (i.onload = () => {
            i.status >= 200 && i.status < 300
              ? t(i.responseText)
              : s(new Error(i.statusText));
          }),
            (i.onerror = () => {
              s(new Error("An error occurred whilst receiving the response."));
            }),
            i.open("GET", e),
            i.send();
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
      return ee(this, void 0, void 0, function* () {
        return !0;
      });
    },
    existsSync: function (e) {
      return !0;
    },
    dirname: function (e) {
      return it(e, ".");
    },
    sep: "/"
  });
  function nt(e, t = 0) {
    return JSON.stringify(e, null, t);
  }
  var ot = {
    default: function (e, t, ...s) {
      return w((e = p(e))) || o(e)
        ? e.length
          ? e
          : t
        : (!1 !== e || !new Map(s).get("allow_false")) &&
            (Xe(e, this.context) ? t : e);
    },
    raw: { raw: !0, handler: O },
    jsonify: nt,
    to_integer: function (e) {
      return Number(e);
    },
    json: nt,
    inspect: function (e, t = 0) {
      const s = [];
      return JSON.stringify(
        e,
        function (e, t) {
          if ("object" != typeof t || null === t) return t;
          for (; s.length > 0 && s[s.length - 1] !== this; ) s.pop();
          return s.includes(t) ? "[Circular]" : (s.push(t), t);
        },
        t
      );
    }
  };
  const at = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;"
    },
    lt = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#34;": '"', "&#39;": "'" };
  function ht(e) {
    return (
      (e = c(e)),
      this.context.memoryLimit.use(e.length),
      e.replace(/&|<|>|"|'/g, (e) => at[e])
    );
  }
  function ct(e) {
    return (
      (e = c(e)),
      this.context.memoryLimit.use(e.length),
      e.replace(/&(amp|lt|gt|#34|#39);/g, (e) => lt[e])
    );
  }
  var ut = Object.freeze({
    __proto__: null,
    escape: ht,
    xml_escape: function (e) {
      return ht.call(this, e);
    },
    escape_once: function (e) {
      return ht.call(this, ct.call(this, e));
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
    }
  });
  class dt {
    constructor(e) {
      (this.mapping = e), (this.sep = "/");
    }
    exists(e) {
      return ee(this, void 0, void 0, function* () {
        return this.existsSync(e);
      });
    }
    existsSync(e) {
      return !y(this.mapping[e]);
    }
    readFile(e) {
      return ee(this, void 0, void 0, function* () {
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
    resolve(e, t, s) {
      if (((t += s), "." === e)) return t;
      const i = e.split(/\/+/);
      for (const e of t.split(this.sep))
        "." !== e &&
          "" !== e &&
          (".." === e ? (i.length > 1 || "" !== i[0]) && i.pop() : i.push(e));
      return i.join(this.sep);
    }
  }
  const pt = {
    root: ["."],
    layouts: ["."],
    partials: ["."],
    relativeReference: !0,
    jekyllInclude: !1,
    keyValueSeparator: ":",
    cache: void 0,
    extname: "",
    fs: rt,
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
    operators: Ke,
    memoryLimit: 1 / 0,
    parseLimit: 1 / 0,
    renderLimit: 1 / 0
  };
  function ft(e) {
    var t, s, i;
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
            ? new st(e.cache)
            : void 0
          : "object" == typeof e.cache
          ? e.cache
          : e.cache
          ? new st(1024)
          : void 0),
        (e.cache = t);
    }
    return (
      ((e = Object.assign(
        Object.assign(
          Object.assign({}, pt),
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
      (e.root = gt(e.root)),
      (e.partials = gt(e.partials)),
      (e.layouts = gt(e.layouts)),
      (e.outputEscape =
        e.outputEscape &&
        ("escape" === (i = e.outputEscape)
          ? ht
          : "json" === i
          ? ot.json
          : (B(a(i), "`outputEscape` need to be of type string or function"),
            i))),
      e.locale ||
        (e.locale =
          null !==
            (s =
              null === (t = pe()) || void 0 === t
                ? void 0
                : t().resolvedOptions().locale) && void 0 !== s
            ? s
            : "en-US"),
      e.templates &&
        ((e.fs = new dt(e.templates)),
        (e.relativeReference = !0),
        (e.root = e.partials = e.layouts = ".")),
      e
    );
  }
  function gt(e) {
    let t = [];
    return w(e) && (t = e), o(e) && (t = [e]), t;
  }
  function mt(e, t) {
    if (!e || !Wt(e)) return;
    const s = t ? 4 : 16;
    for (; V[e.input.charCodeAt(e.end - 1 - e.trimRight)] & s; ) e.trimRight++;
  }
  function yt(e, t) {
    if (!e || !Wt(e)) return;
    const s = t ? 4 : 16;
    for (; V[e.input.charCodeAt(e.begin + e.trimLeft)] & s; ) e.trimLeft++;
    "\n" === e.input.charAt(e.begin + e.trimLeft) && e.trimLeft++;
  }
  class wt {
    constructor(e, t = pt.operators, s, i) {
      (this.input = e),
        (this.file = s),
        (this.rawBeginAt = -1),
        (this.p = i ? i[0] : 0),
        (this.N = i ? i[1] : e.length),
        (this.opTrie = X(t)),
        (this.literalTrie = X(Q));
    }
    readExpression() {
      return new Ze(this.readExpressionTokens());
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
      if (-1 !== e) return new Ae(this.input, this.p, (this.p = e), this.file);
    }
    matchTrie(e) {
      let t,
        s = e,
        i = this.p;
      for (; s[this.input[i]] && i < this.N; )
        (s = s[this.input[i++]]), s.end && (t = s);
      return t ? (t.needBoundary && P(this.peek(i - this.p)) ? -1 : i) : -1;
    }
    readFilteredValue() {
      const e = this.p,
        t = this.readExpression();
      this.assert(t.valid(), `invalid value expression: ${this.snapshot()}`);
      const s = this.readFilters();
      return new Ve(t, s, this.input, e, this.p, this.file);
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
      this.assert("|" === this.read(), 'expected "|" before filter');
      const e = this.readIdentifier();
      if (!e.size())
        return this.assert(this.end(), "expected filter name"), null;
      const t = [];
      if ((this.skipBlank(), ":" === this.peek()))
        do {
          ++this.p;
          const e = this.readFilterArg();
          e && t.push(e),
            this.skipBlank(),
            this.assert(
              this.end() || "," === this.peek() || "|" === this.peek(),
              () => `unexpected character ${this.snapshot()}`
            );
        } while ("," === this.peek());
      else if ("|" !== this.peek() && !this.end())
        throw this.error('expected ":" after filter name');
      return new je(e.getText(), t, this.input, e.begin, this.p, this.file);
    }
    readFilterArg() {
      const e = this.readValue();
      if (!e) return;
      if ((this.skipBlank(), ":" !== this.peek())) return e;
      ++this.p;
      const t = this.readValue();
      return [e.getText(), t];
    }
    readTopLevelTokens(e = pt) {
      const t = [];
      for (; this.p < this.N; ) {
        const s = this.readTopLevelToken(e);
        t.push(s);
      }
      return (
        (function (e, t) {
          let s = !1;
          for (let i = 0; i < e.length; i++) {
            const r = e[i];
            Ut(r) &&
              (!s && r.trimLeft && mt(e[i - 1], t.greedy),
              Zt(r) &&
                ("raw" === r.name ? (s = !0) : "endraw" === r.name && (s = !1)),
              !s && r.trimRight && yt(e[i + 1], t.greedy));
          }
        })(t, e),
        t
      );
    }
    readTopLevelToken(e) {
      const { tagDelimiterLeft: t, outputDelimiterLeft: s } = e;
      return this.rawBeginAt > -1
        ? this.readEndrawOrRawContent(e)
        : this.match(t)
        ? this.readTagToken(e)
        : this.match(s)
        ? this.readOutputToken(e)
        : this.readHTMLToken([t, s]);
    }
    readHTMLToken(e) {
      const t = this.p;
      for (; this.p < this.N && !e.some((e) => this.match(e)); ) ++this.p;
      return new Se(this.input, t, this.p, this.file);
    }
    readTagToken(e) {
      const { file: t, input: s } = this,
        i = this.p;
      if (-1 === this.readToDelimiter(e.tagDelimiterRight))
        throw this.error(`tag ${this.snapshot(i)} not closed`, i);
      const r = new Te(s, i, this.p, e, t);
      return "raw" === r.name && (this.rawBeginAt = i), r;
    }
    readToDelimiter(e, t = !1) {
      for (this.skipBlank(); this.p < this.N; )
        if (t && 8 & this.peekType()) this.readQuoted();
        else if ((++this.p, this.rmatch(e))) return this.p;
      return -1;
    }
    readOutputToken(e = pt) {
      const { file: t, input: s } = this,
        { outputDelimiterRight: i } = e,
        r = this.p;
      if (-1 === this.readToDelimiter(i, !0))
        throw this.error(`output ${this.snapshot(r)} not closed`, r);
      return new xe(s, r, this.p, e, t);
    }
    readEndrawOrRawContent(e) {
      const { tagDelimiterLeft: t, tagDelimiterRight: s } = e,
        i = this.p;
      let r = this.readTo(t) - t.length;
      for (; this.p < this.N; )
        if ("endraw" === this.readIdentifier().getText())
          for (; this.p <= this.N; ) {
            if (this.rmatch(s)) {
              const t = this.p;
              return i === r
                ? ((this.rawBeginAt = -1),
                  new Te(this.input, i, t, e, this.file))
                : ((this.p = r), new Se(this.input, i, r, this.file));
            }
            if (this.rmatch(t)) break;
            this.p++;
          }
        else r = this.readTo(t) - t.length;
      throw this.error(`raw ${this.snapshot(this.rawBeginAt)} not closed`, i);
    }
    readLiquidTagTokens(e = pt) {
      const t = [];
      for (; this.p < this.N; ) {
        const s = this.readLiquidTagToken(e);
        s && t.push(s);
      }
      return t;
    }
    readLiquidTagToken(e) {
      if ((this.skipBlank(), this.end())) return;
      const t = this.p;
      this.readToDelimiter("\n");
      const s = this.p;
      return new Ie(this.input, t, s, e, this.file);
    }
    error(e, t = this.p) {
      return new D(e, new Oe(this.input, t, this.N, this.file));
    }
    assert(e, t, s) {
      if (!e) throw this.error("function" == typeof t ? t() : t, s);
    }
    snapshot(e = this.p) {
      return JSON.stringify(
        ((t = this.input.slice(e, this.N)),
        (s = 32),
        t.length > s ? t.slice(0, s - 3) + "..." : t)
      );
      var t, s;
    }
    readWord() {
      return this.readIdentifier();
    }
    readIdentifier() {
      this.skipBlank();
      const e = this.p;
      for (; !this.end() && P(this.peek()); ) ++this.p;
      return new Oe(this.input, e, this.p, this.file);
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
        const s = this.readHash(e);
        if (!s) return t;
        t.push(s);
      }
    }
    readHash(e) {
      this.skipBlank(), "," === this.peek() && ++this.p;
      const t = this.p,
        s = this.readNonEmptyIdentifier();
      if (!s) return;
      let i;
      this.skipBlank();
      const r = o(e) ? e : e ? "=" : ":";
      return (
        this.peek() === r && (++this.p, (i = this.readValue())),
        new De(this.input, t, this.p, s, i, this.file)
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
    read() {
      return this.input[this.p++];
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
        s = this.readProperties(!t);
      return s.length ? new ze(t, s, this.input, e, this.p) : t;
    }
    readScopeValue() {
      this.skipBlank();
      const e = this.p,
        t = this.readProperties();
      if (t.length) return new ze(void 0, t, this.input, e, this.p);
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
            this.readValue() || new Oe(this.input, this.p, this.p, this.file);
          this.assert(-1 !== this.readTo("]"), "[ not closed"), t.push(e);
        }
      return t;
    }
    readNumber() {
      this.skipBlank();
      let e = !1,
        t = !1,
        s = 0;
      for (64 & this.peekType() && s++; this.p + s <= this.N; )
        if (32 & this.peekType(s)) (t = !0), s++;
        else {
          if ("." !== this.peek(s) || "." === this.peek(s + 1)) break;
          if (e || !t) return;
          (e = !0), s++;
        }
      if (t && !P(this.peek(s))) {
        const e = new Le(this.input, this.p, this.p + s, this.file);
        return this.advance(s), e;
      }
    }
    readLiteral() {
      this.skipBlank();
      const e = this.matchTrie(this.literalTrie);
      if (-1 === e) return;
      const t = new Fe(this.input, this.p, e, this.file);
      return (this.p = e), t;
    }
    readRange() {
      this.skipBlank();
      const e = this.p;
      if ("(" !== this.peek()) return;
      ++this.p;
      const t = this.readValueOrThrow();
      this.p += 2;
      const s = this.readValueOrThrow();
      return ++this.p, new Ce(this.input, e, this.p, t, s, this.file);
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
      return new Me(this.input, e, this.p, this.file);
    }
    *readFileNameTemplate(e) {
      const { outputDelimiterLeft: t } = e,
        s = [",", " ", t],
        i = new Set(s);
      for (; this.p < this.N && !i.has(this.peek()); )
        yield this.match(t) ? this.readOutputToken(e) : this.readHTMLToken(s);
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
      return this.p + e >= this.N ? 0 : V[this.input.charCodeAt(this.p + e)];
    }
    peek(e = 0) {
      return this.p + e >= this.N ? "" : this.input[this.p + e];
    }
    skipBlank() {
      for (; 4 & this.peekType(); ) ++this.p;
    }
  }
  class vt {
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
      const s = this.handlers[e];
      return !!s && (s.call(this, t), !0);
    }
    start() {
      let e;
      for (
        this.trigger("start");
        !this.stopRequested && (e = this.tokens.shift());

      ) {
        if (this.trigger("token", e)) continue;
        if (Zt(e) && this.trigger(`tag:${e.name}`, e)) continue;
        const t = this.parseToken(e, this.tokens);
        this.trigger("template", t);
      }
      return this.stopRequested || this.trigger("end"), this;
    }
    stop() {
      return (this.stopRequested = !0), this;
    }
  }
  class kt {
    constructor(e) {
      this.token = e;
    }
  }
  class bt extends kt {
    constructor(e, t, s) {
      super(e),
        (this.name = e.name),
        (this.liquid = s),
        (this.tokenizer = e.tokenizer);
    }
  }
  class Tt {
    constructor(e, t) {
      this.hash = {};
      const s = e instanceof wt ? e : new wt(e, {});
      for (const e of s.readHashes(t)) this.hash[e.name.content] = e.value;
    }
    *render(e) {
      const t = {};
      for (const s of Object.keys(this.hash))
        t[s] = void 0 === this.hash[s] || (yield Ge(this.hash[s], e));
      return t;
    }
  }
  function xt(e) {
    return w(e);
  }
  class St {
    constructor(e, t, s) {
      (this.token = e),
        (this.name = e.name),
        (this.handler = a(t)
          ? t
          : a(null == t ? void 0 : t.handler)
          ? t.handler
          : O),
        (this.raw = !a(t) && !!(null == t ? void 0 : t.raw)),
        (this.args = e.args),
        (this.liquid = s);
    }
    *render(e, t) {
      const s = [];
      for (const e of this.args)
        xt(e) ? s.push([e[0], yield Ge(e[1], t)]) : s.push(yield Ge(e, t));
      return yield this.handler.apply(
        { context: t, token: this.token, liquid: this.liquid },
        [e, ...s]
      );
    }
  }
  class Lt {
    constructor(e, t) {
      this.filters = [];
      const s =
        "string" == typeof e
          ? new wt(e, t.options.operators).readFilteredValue()
          : e;
      (this.initial = s.initial),
        (this.filters = s.filters.map(
          (e) => new St(e, this.getFilter(t, e.name), t)
        ));
    }
    *value(e, t) {
      t =
        t ||
        (e.opts.lenientIf &&
          this.filters.length > 0 &&
          "default" === this.filters[0].name);
      let s = yield this.initial.evaluate(e, t);
      for (const t of this.filters) s = yield t.render(s, e);
      return s;
    }
    getFilter(e, t) {
      const s = e.filters[t];
      return (
        B(s || !e.options.strictFilters, () => `undefined filter: ${t}`), s
      );
    }
  }
  class Ot extends kt {
    constructor(e, t) {
      var s;
      super(e);
      const i = new wt(e.input, t.options.operators, e.file, e.contentRange);
      this.value = new Lt(i.readFilteredValue(), t);
      const r = this.value.filters,
        n = t.options.outputEscape;
      if (
        !(null === (s = r[r.length - 1]) || void 0 === s ? void 0 : s.raw) &&
        n
      ) {
        const e = new je(toString.call(n), [], "", 0, 0);
        r.push(new St(e, n, t));
      }
    }
    *render(e, t) {
      const s = yield this.value.value(e, !1);
      t.write(s);
    }
    *arguments() {
      yield this.value;
    }
  }
  class Ft extends kt {
    constructor(e) {
      super(e), (this.str = e.getContent());
    }
    *render(e, t) {
      t.write(this.str);
    }
  }
  class Rt {
    constructor(e, t) {
      (this.segments = e), (this.location = t);
    }
    toString() {
      return Ct(this.segments, !0);
    }
    toArray() {
      return Array.from(
        (function* e(...t) {
          for (const s of t)
            s instanceof Rt ? yield Array.from(e(...s.segments)) : yield s;
        })(...this.segments)
      );
    }
  }
  class _t {
    constructor() {
      this.map = new Map();
    }
    get(e) {
      const t = Ct([e.segments[0]]);
      return this.map.has(t) || this.map.set(t, []), this.map.get(t);
    }
    has(e) {
      return this.map.has(Ct([e.segments[0]]));
    }
    push(e) {
      this.get(e).push(e);
    }
    asObject() {
      return Object.fromEntries(this.map);
    }
  }
  const At = { partials: !0 };
  function* zt(e, t, s) {
    const i = new _t(),
      r = new _t(),
      n = new _t(),
      a = new Et(new Set()),
      l = new Set();
    function h(e, t) {
      i.push(e);
      const s = t.alias(e);
      if (void 0 !== s) {
        const e = s.segments[0];
        o(e) && !a.has(e) && r.push(s);
      } else {
        const s = e.segments[0];
        o(s) && !t.has(s) && r.push(e);
      }
      for (const s of e.segments) s instanceof Rt && h(s, t);
    }
    function* c(e, i) {
      if (e.arguments)
        for (const t of e.arguments()) for (const e of $t(t)) h(e, i);
      if (e.localScope)
        for (const t of e.localScope()) {
          i.add(t.content), i.deleteAlias(t.content);
          const [e, s] = t.getPosition();
          n.push(new Rt([t.content], { row: e, col: s, file: t.file }));
        }
      if (e.children)
        if (e.partialScope) {
          const r = e.partialScope();
          if (void 0 === r) {
            for (const r of yield e.children(t, s)) yield c(r, i);
            return;
          }
          if (l.has(r.name)) return;
          const n = new Set(),
            a = r.isolated ? new Et(n) : i.push(n);
          for (const e of r.scope)
            if (o(e)) n.add(e);
            else {
              const [t, s] = e;
              n.add(t);
              const i = Array.from($t(s));
              i.length && a.setAlias(t, i[0].segments);
            }
          for (const i of yield e.children(t, s)) yield c(i, a), l.add(r.name);
          a.pop();
        } else {
          e.blockScope && i.push(new Set(e.blockScope()));
          for (const r of yield e.children(t, s)) yield c(r, i);
          e.blockScope && i.pop();
        }
    }
    for (const t of e) yield c(t, a);
    return {
      variables: i.asObject(),
      globals: r.asObject(),
      locals: n.asObject()
    };
  }
  function jt(e, t = {}) {
    return te(zt(e, Object.assign(Object.assign({}, At), t).partials, !1));
  }
  function Dt(e, t = {}) {
    return se(zt(e, Object.assign(Object.assign({}, At), t).partials, !0));
  }
  class Et {
    constructor(e) {
      this.stack = [{ names: e, aliases: new Map() }];
    }
    has(e) {
      for (const t of this.stack) if (t.names.has(e)) return !0;
      return !1;
    }
    push(e) {
      return this.stack.push({ names: e, aliases: new Map() }), this;
    }
    pop() {
      var e;
      return null === (e = this.stack.pop()) || void 0 === e ? void 0 : e.names;
    }
    add(e) {
      this.stack[0].names.add(e);
    }
    alias(e) {
      const t = e.segments[0];
      if (!o(t)) return;
      const s = this.getAlias(t);
      return void 0 !== s
        ? new Rt([...s, ...e.segments.slice(1)], e.location)
        : void 0;
    }
    setAlias(e, t) {
      this.stack[this.stack.length - 1].aliases.set(e, t);
    }
    deleteAlias(e) {
      this.stack[this.stack.length - 1].aliases.delete(e);
    }
    getAlias(e) {
      for (const t of this.stack) {
        if (t.aliases.has(e)) return t.aliases.get(e);
        if (t.names.has(e)) return;
      }
    }
  }
  function* $t(e) {
    es(e)
      ? yield* qt(e)
      : e instanceof Lt &&
        (yield* (function* (e) {
          for (const t of e.initial.postfix) es(t) && (yield* qt(t));
          for (const t of e.filters)
            for (const e of t.args)
              xt(e) && e[1] ? yield* qt(e[1]) : es(e) && (yield* qt(e));
        })(e));
  }
  function* qt(e) {
    Kt(e) ? (yield* qt(e.lhs), yield* qt(e.rhs)) : Qt(e) && (yield Nt(e));
  }
  function Nt(e) {
    const t = [];
    let s = e.file;
    const i = e.props[0];
    (s = s || i.file),
      Gt(i) || Jt(i) || Xt(i)
        ? t.push(i.content)
        : Qt(i) && t.push(...Nt(i).segments);
    for (const i of e.props.slice(1))
      (s = s || i.file),
        Gt(i) || Jt(i) || Xt(i) ? t.push(i.content) : Qt(i) && t.push(Nt(i));
    const [r, n] = e.getPosition();
    return new Rt(t, { row: r, col: n, file: s });
  }
  const Mt = /^[\u0080-\uFFFFa-zA-Z_][\u0080-\uFFFFa-zA-Z0-9_-]*$/;
  function Ct(e, t = !1) {
    const s = [],
      i = e[0];
    o(i) && (!t || i.match(Mt) ? s.push(`${i}`) : s.push(`['${i}']`));
    for (const t of e.slice(1))
      t instanceof Rt
        ? s.push(`[${Ct(t.segments)}]`)
        : o(t)
        ? t.match(Mt)
          ? s.push(`.${t}`)
          : s.push(`['${t}']`)
        : s.push(`[${t}]`);
    return s.join("");
  }
  var It, Vt;
  !(function (e) {
    (e.Partials = "partials"), (e.Layouts = "layouts"), (e.Root = "root");
  })(It || (It = {}));
  class Pt {
    constructor(e) {
      if (((this.options = e), e.relativeReference)) {
        const t = e.fs.sep;
        B(t, "`fs.sep` is required for relative reference");
        const s = new RegExp(
          ["." + t, ".." + t, "./", "../"]
            .map((e) => e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"))
            .join("|")
        );
        this.shouldLoadRelative = (e) => s.test(e);
      } else this.shouldLoadRelative = (e) => !1;
      this.contains = this.options.fs.contains || (() => !0);
    }
    *lookup(e, t, s, i) {
      const { fs: r } = this.options,
        n = this.options[t];
      for (const o of this.candidates(e, n, i, t !== It.Root))
        if (s ? r.existsSync(o) : yield r.exists(o)) return o;
      throw this.lookupError(e, n);
    }
    *candidates(e, t, s, i) {
      const { fs: r, extname: n } = this.options;
      if (this.shouldLoadRelative(e) && s) {
        const o = r.resolve(this.dirname(s), e, n);
        for (const e of t)
          if (!i || this.contains(e, o)) {
            yield o;
            break;
          }
      }
      for (const s of t) {
        const t = r.resolve(s, e, n);
        (i && !this.contains(s, t)) || (yield t);
      }
      if (void 0 !== r.fallback) {
        const t = r.fallback(e);
        void 0 !== t && (yield t);
      }
    }
    dirname(e) {
      const t = this.options.fs;
      return (
        B(t.dirname, "`fs.dirname` is required for relative reference"),
        t.dirname(e)
      );
    }
    lookupError(e, t) {
      const s = new Error("ENOENT");
      return (
        (s.message = `ENOENT: Failed to lookup "${e}" in "${t}"`),
        (s.code = "ENOENT"),
        s
      );
    }
  }
  class Bt {
    constructor(e) {
      (this.liquid = e),
        (this.cache = this.liquid.options.cache),
        (this.fs = this.liquid.options.fs),
        (this.parseFile = this.cache ? this._parseFileCached : this._parseFile),
        (this.loader = new Pt(this.liquid.options)),
        (this.parseLimit = new ke("parse length", e.options.parseLimit));
    }
    parse(e, t) {
      (e = String(e)), this.parseLimit.use(e.length);
      const s = new wt(e, this.liquid.options.operators, t).readTopLevelTokens(
        this.liquid.options
      );
      return this.parseTokens(s);
    }
    parseTokens(e) {
      let t;
      const s = [],
        i = [];
      for (; (t = e.shift()); )
        try {
          s.push(this.parseToken(t, e));
        } catch (e) {
          if (!this.liquid.options.catchAllErrors) throw e;
          i.push(e);
        }
      if (i.length) throw new q(i);
      return s;
    }
    parseToken(e, t) {
      try {
        if (Zt(e)) {
          const s = this.liquid.tags[e.name];
          return (
            B(s, `tag "${e.name}" not found`), new s(e, t, this.liquid, this)
          );
        }
        return Yt(e) ? new Ot(e, this.liquid) : new Ft(e);
      } catch (t) {
        if (j.is(t)) throw t;
        throw new E(t, e);
      }
    }
    parseStream(e) {
      return new vt(e, (e, t) => this.parseToken(e, t));
    }
    *_parseFileCached(e, t, s = It.Root, i) {
      const r = this.cache,
        n = this.loader.shouldLoadRelative(e) ? i + "," + e : s + ":" + e,
        o = yield r.read(n);
      if (o) return o;
      const a = this._parseFile(e, t, s, i),
        l = t ? yield a : te(a);
      r.write(n, l);
      try {
        return yield l;
      } catch (e) {
        throw (r.remove(n), e);
      }
    }
    *_parseFile(e, t, s = It.Root, i) {
      const r = yield this.loader.lookup(e, s, t, i);
      return this.parse(
        t ? this.fs.readFileSync(r) : yield this.fs.readFile(r),
        r
      );
    }
  }
  function Ut(e) {
    return !!(ts(e) & Vt.Delimited);
  }
  function Ht(e) {
    return ts(e) === Vt.Operator;
  }
  function Wt(e) {
    return ts(e) === Vt.HTML;
  }
  function Yt(e) {
    return ts(e) === Vt.Output;
  }
  function Zt(e) {
    return ts(e) === Vt.Tag;
  }
  function Gt(e) {
    return ts(e) === Vt.Quoted;
  }
  function Jt(e) {
    return ts(e) === Vt.Number;
  }
  function Qt(e) {
    return ts(e) === Vt.PropertyAccess;
  }
  function Xt(e) {
    return ts(e) === Vt.Word;
  }
  function Kt(e) {
    return ts(e) === Vt.Range;
  }
  function es(e) {
    return (1667 & ts(e)) > 0;
  }
  function ts(e) {
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
  })(Vt || (Vt = {}));
  var ss;
  class is {
    constructor(
      e = {},
      t = pt,
      s = {},
      { memoryLimit: i, renderLimit: r } = {}
    ) {
      var n, o, a, l, h;
      (this.scopes = [{}]),
        (this.registers = {}),
        (this.breakCalled = !1),
        (this.continueCalled = !1),
        (this.sync = !!s.sync),
        (this.opts = t),
        (this.globals =
          null !== (n = s.globals) && void 0 !== n ? n : t.globals),
        (this.environments = T(e) ? e : Object(e)),
        (this.strictVariables =
          null !== (o = s.strictVariables) && void 0 !== o
            ? o
            : this.opts.strictVariables),
        (this.ownPropertyOnly =
          null !== (a = s.ownPropertyOnly) && void 0 !== a
            ? a
            : t.ownPropertyOnly),
        (this.memoryLimit =
          null != i
            ? i
            : new ke(
                "memory alloc",
                null !== (l = s.memoryLimit) && void 0 !== l ? l : t.memoryLimit
              )),
        (this.renderLimit =
          null != r
            ? r
            : new ke(
                "template render",
                Be().now() +
                  (null !== (h = s.renderLimit) && void 0 !== h
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
        (e, t) => K(e, t),
        {}
      );
    }
    get(e) {
      return this.getSync(e);
    }
    getSync(e) {
      return se(this._get(e));
    }
    *_get(e) {
      const t = this.findScope(e[0]);
      return yield this._getFromScope(t, e);
    }
    getFromScope(e, t) {
      return se(this._getFromScope(e, t));
    }
    *_getFromScope(e, t, s = this.strictVariables) {
      o(t) && (t = t.split("."));
      for (let i = 0; i < t.length; i++)
        if (((e = yield rs(e, t[i], this.ownPropertyOnly)), s && void 0 === e))
          throw new M(t.slice(0, i + 1).join("."));
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
      return new is(
        e,
        this.opts,
        {
          sync: this.sync,
          globals: this.globals,
          strictVariables: this.strictVariables
        },
        { renderLimit: this.renderLimit, memoryLimit: this.memoryLimit }
      );
    }
    findScope(e) {
      for (let t = this.scopes.length - 1; t >= 0; t--) {
        const s = this.scopes[t];
        if (e in s) return s;
      }
      return e in this.environments ? this.environments : this.globals;
    }
  }
  function rs(e, t, i) {
    if (((e = m(e)), (t = p(t)), y(e))) return e;
    if (w(e) && t < 0) return e[e.length + +t];
    const r = (function (e, t, i) {
      return !i || n.call(e, t) || e instanceof s ? e[t] : void 0;
    })(e, t, i);
    return void 0 === r && e instanceof s
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
  })(ss || (ss = {}));
  const ns = R(Math.abs),
    os = R(Math.max),
    as = R(Math.min),
    ls = R(Math.ceil),
    hs = R((e, t, s = !1) => (s ? Math.floor(e / t) : e / t)),
    cs = R(Math.floor),
    us = R((e, t) => e - t),
    ds = R((e, t) => e % t),
    ps = R((e, t) => e * t);
  var fs = Object.freeze({
    __proto__: null,
    abs: ns,
    at_least: os,
    at_most: as,
    ceil: ls,
    divided_by: hs,
    floor: cs,
    minus: us,
    modulo: ds,
    times: ps,
    round: function (e, t = 0) {
      (e = p(e)), (t = p(t));
      const s = Math.pow(10, t);
      return Math.round(e * s) / s;
    },
    plus: function (e, t) {
      return (e = p(e)), (t = p(t)), Number(e) + Number(t);
    }
  });
  const gs = /[^\p{M}\p{L}\p{Nd}]+/gu,
    ms = {
      raw: /\s+/g,
      default: gs,
      pretty: /[^\p{M}\p{L}\p{Nd}._~!$&'()+,;=@]+/gu,
      ascii: /[^A-Za-z0-9]+/g,
      latin: gs,
      none: null
    };
  var ys = Object.freeze({
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
    slugify: function (e, t = "default", s = !1) {
      e = c(e);
      const i = ms[t];
      return (
        i &&
          ("latin" === t &&
            (e = (function (e) {
              return e
                .replace(/[àáâãäå]/g, "a")
                .replace(/[æ]/g, "ae")
                .replace(/[ç]/g, "c")
                .replace(/[èéêë]/g, "e")
                .replace(/[ìíîï]/g, "i")
                .replace(/[ð]/g, "d")
                .replace(/[ñ]/g, "n")
                .replace(/[òóôõöø]/g, "o")
                .replace(/[ùúûü]/g, "u")
                .replace(/[ýÿ]/g, "y")
                .replace(/[ß]/g, "ss")
                .replace(/[œ]/g, "oe")
                .replace(/[þ]/g, "th")
                .replace(/[ẞ]/g, "SS")
                .replace(/[Œ]/g, "OE")
                .replace(/[Þ]/g, "TH");
            })(e)),
          (e = e.replace(i, "-").replace(/^-|-$/g, ""))),
        s ? e : e.toLowerCase()
      );
    }
  });
  const ws = R(function (e, t) {
      const s = d(e),
        i = y(t) ? " " : c(t),
        r = s.length * (1 + i.length);
      return this.context.memoryLimit.use(r), s.join(i);
    }),
    vs = R((e) => (v(e) ? b(e) : "")),
    ks = R((e) => (v(e) ? e[0] : "")),
    bs = R(function (e) {
      const t = d(e);
      return this.context.memoryLimit.use(t.length), [...t].reverse();
    });
  function Ts(e, t = []) {
    const s = d(e),
      i = d(t);
    return this.context.memoryLimit.use(s.length + i.length), s.concat(i);
  }
  var xs = Object.freeze({
    __proto__: null,
    join: ws,
    last: vs,
    first: ks,
    reverse: bs,
    sort: function* (e, t) {
      const s = [],
        i = d(e);
      this.context.memoryLimit.use(i.length);
      for (const e of i)
        s.push([
          e,
          t ? yield this.context._getFromScope(e, c(t).split("."), !1) : e
        ]);
      return s
        .sort((e, t) => {
          const s = e[1],
            i = t[1];
          return s < i ? -1 : s > i ? 1 : 0;
        })
        .map((e) => e[0]);
    },
    sort_natural: function (e, t) {
      const s = c(t),
        i = void 0 === t ? F : (e, t) => F(e[s], t[s]),
        r = d(e);
      return this.context.memoryLimit.use(r.length), [...r].sort(i);
    },
    size: (e) => (e && e.length) || 0,
    map: function* (e, t) {
      const s = [],
        i = d(e);
      this.context.memoryLimit.use(i.length);
      for (const e of i) s.push(yield this.context._getFromScope(e, c(t), !1));
      return s;
    },
    sum: function* (e, t) {
      let s = 0;
      const i = d(e);
      for (const e of i) {
        const i = Number(t ? yield this.context._getFromScope(e, c(t), !1) : e);
        s += Number.isNaN(i) ? 0 : i;
      }
      return s;
    },
    compact: function (e) {
      const t = d(e);
      return this.context.memoryLimit.use(t.length), t.filter((e) => !y(p(e)));
    },
    concat: Ts,
    push: function (e, t) {
      return Ts.call(this, e, [t]);
    },
    unshift: function (e, t) {
      const s = d(e);
      this.context.memoryLimit.use(s.length);
      const i = [...s];
      return i.unshift(t), i;
    },
    pop: function (e) {
      const t = [...d(e)];
      return t.pop(), t;
    },
    shift: function (e) {
      const t = d(e);
      this.context.memoryLimit.use(t.length);
      const s = [...t];
      return s.shift(), s;
    },
    slice: function (e, t, s = 1) {
      return y((e = p(e)))
        ? []
        : (w(e) || (e = c(e)),
          (t = t < 0 ? e.length + t : t),
          this.context.memoryLimit.use(s),
          e.slice(t, t + s));
    },
    where: function* (e, t, s) {
      const i = [];
      (e = d(e)), this.context.memoryLimit.use(e.length);
      const r = new wt(c(t)).readScopeValue();
      for (const t of e) i.push(yield Ge(r, this.context.spawn(t)));
      const n = this.context.opts.jekyllWhere
        ? (e) =>
            H.is(s)
              ? et(e, s)
              : w(e)
              ? (function (e, t) {
                  return e.some((e) => et(e, t));
                })(e, s)
              : et(e, s)
        : (e) => et(e, s);
      return e.filter((e, t) =>
        void 0 === s ? Qe(i[t], this.context) : n(i[t])
      );
    },
    where_exp: function* (e, t, s) {
      const i = [],
        r = new Lt(c(s), this.liquid),
        n = d(e);
      this.context.memoryLimit.use(n.length);
      for (const e of n) {
        (yield r.value(this.context.spawn({ [t]: e }))) && i.push(e);
      }
      return i;
    },
    group_by: function* (e, t) {
      const s = new Map();
      e = u(e);
      const i = new wt(c(t)).readScopeValue();
      this.context.memoryLimit.use(e.length);
      for (const t of e) {
        const e = yield Ge(i, this.context.spawn(t));
        s.has(e) || s.set(e, []), s.get(e).push(t);
      }
      return [...s.entries()].map(([e, t]) => ({ name: e, items: t }));
    },
    group_by_exp: function* (e, t, s) {
      const i = new Map(),
        r = new Lt(c(s), this.liquid);
      (e = u(e)), this.context.memoryLimit.use(e.length);
      for (const s of e) {
        const e = yield r.value(this.context.spawn({ [t]: s }));
        i.has(e) || i.set(e, []), i.get(e).push(s);
      }
      return [...i.entries()].map(([e, t]) => ({ name: e, items: t }));
    },
    find: function* (e, t, s) {
      const i = new wt(c(t)).readScopeValue(),
        r = d(e);
      for (const e of r) {
        if (et(yield Ge(i, this.context.spawn(e)), s)) return e;
      }
    },
    find_exp: function* (e, t, s) {
      const i = new Lt(c(s), this.liquid),
        r = d(e);
      for (const e of r) {
        if (yield i.value(this.context.spawn({ [t]: e }))) return e;
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
      const s = [...e].sort(() => Math.random() - 0.5);
      return 1 === t ? s[0] : s.slice(0, t);
    }
  });
  function Ss(e, t, s) {
    var i, r, n;
    const o =
      (null !== (i = null == e ? void 0 : e.length) && void 0 !== i ? i : 0) +
      (null !== (r = null == t ? void 0 : t.length) && void 0 !== r ? r : 0) +
      (null !== (n = null == s ? void 0 : s.length) && void 0 !== n ? n : 0);
    this.context.memoryLimit.use(o);
    const a = Os(e, this.context.opts, s);
    return a
      ? ue(a, (t = y((t = p(t))) ? this.context.opts.dateFormat : c(t)))
      : e;
  }
  function Ls(e, t, s, i) {
    const r = Os(e, this.context.opts);
    if (!r) return e;
    if ("ordinal" === s) {
      const e = r.getDate();
      return ue(r, "US" === i ? `${t} ${e}%q, %Y` : `${e}%q ${t} %Y`);
    }
    return ue(r, `%d ${t} %Y`);
  }
  function Os(e, t, s) {
    let i;
    const r = null != s ? s : t.timezoneOffset,
      n = t.locale;
    return (
      (i =
        "now" === (e = p(e)) || "today" === e
          ? new ve(Date.now(), n, r)
          : g(e)
          ? new ve(1e3 * e, n, r)
          : o(e)
          ? /^\d+$/.test(e)
            ? new ve(1e3 * +e, n, r)
            : t.preserveTimezones && void 0 === s
            ? ve.createDateFixedToTimezone(e, n)
            : new ve(e, n, r)
          : new ve(e, n, r)),
      i.valid() ? i : void 0
    );
  }
  var Fs = Object.freeze({
    __proto__: null,
    date: Ss,
    date_to_xmlschema: function (e) {
      return Ss.call(this, e, "%Y-%m-%dT%H:%M:%S%:z");
    },
    date_to_rfc822: function (e) {
      return Ss.call(this, e, "%a, %d %b %Y %H:%M:%S %z");
    },
    date_to_string: function (e, t, s) {
      return Ls.call(this, e, "%b", t, s);
    },
    date_to_long_string: function (e, t, s) {
      return Ls.call(this, e, "%B", t, s);
    }
  });
  const Rs =
      /[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/gu,
    _s =
      /[^\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\s]+/gu;
  var As = Object.freeze({
    __proto__: null,
    append: function (e, t) {
      B(2 === arguments.length, "append expect 2 arguments");
      const s = c(e),
        i = c(t);
      return this.context.memoryLimit.use(s.length + i.length), s + i;
    },
    prepend: function (e, t) {
      B(2 === arguments.length, "prepend expect 2 arguments");
      const s = c(e),
        i = c(t);
      return this.context.memoryLimit.use(s.length + i.length), i + s;
    },
    lstrip: function (e, t) {
      const s = c(e);
      return (
        this.context.memoryLimit.use(s.length),
        t
          ? ((t = _(c(t))), s.replace(new RegExp(`^[${t}]+`, "g"), ""))
          : s.replace(/^\s+/, "")
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
      const s = c(e);
      return this.context.memoryLimit.use(s.length), s.split(c(t)).join("");
    },
    remove_first: function (e, t) {
      const s = c(e);
      return this.context.memoryLimit.use(s.length), s.replace(c(t), "");
    },
    remove_last: function (e, t) {
      const s = c(e);
      this.context.memoryLimit.use(s.length);
      const i = c(t),
        r = s.lastIndexOf(i);
      return -1 === r ? s : s.substring(0, r) + s.substring(r + i.length);
    },
    rstrip: function (e, t) {
      return (
        (e = c(e)),
        this.context.memoryLimit.use(e.length),
        t
          ? ((t = _(c(t))), e.replace(new RegExp(`[${t}]+$`, "g"), ""))
          : e.replace(/\s+$/, "")
      );
    },
    split: function (e, t) {
      const s = c(e);
      this.context.memoryLimit.use(s.length);
      const i = s.split(c(t));
      for (; i.length && "" === i[i.length - 1]; ) i.pop();
      return i;
    },
    strip: function (e, t) {
      const s = c(e);
      return (
        this.context.memoryLimit.use(s.length),
        t
          ? ((t = _(c(t))),
            s
              .replace(new RegExp(`^[${t}]+`, "g"), "")
              .replace(new RegExp(`[${t}]+$`, "g"), ""))
          : s.trim()
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
    replace: function (e, t, s) {
      const i = c(e);
      return this.context.memoryLimit.use(i.length), i.split(c(t)).join(s);
    },
    replace_first: function (e, t, s) {
      const i = c(e);
      return this.context.memoryLimit.use(i.length), i.replace(c(t), s);
    },
    replace_last: function (e, t, s) {
      const i = c(e);
      this.context.memoryLimit.use(i.length);
      const r = c(t),
        n = i.lastIndexOf(r);
      if (-1 === n) return i;
      const o = c(s);
      return i.substring(0, n) + o + i.substring(n + r.length);
    },
    truncate: function (e, t = 50, s = "...") {
      const i = c(e);
      return (
        this.context.memoryLimit.use(i.length),
        i.length <= t ? e : i.substring(0, t - s.length) + s
      );
    },
    truncatewords: function (e, t = 15, s = "...") {
      const i = c(e);
      this.context.memoryLimit.use(i.length);
      const r = i.split(/\s+/);
      t <= 0 && (t = 1);
      let n = r.slice(0, t).join(" ");
      return r.length >= t && (n += s), n;
    },
    normalize_whitespace: function (e) {
      const t = c(e);
      return this.context.memoryLimit.use(t.length), t.replace(/\s+/g, " ");
    },
    number_of_words: function (e, t) {
      const s = c(e);
      if ((this.context.memoryLimit.use(s.length), !(e = s.trim()))) return 0;
      switch (t) {
        case "cjk":
          return (e.match(Rs) || []).length + (e.match(_s) || []).length;
        case "auto":
          return Rs.test(e)
            ? e.match(Rs).length + (e.match(_s) || []).length
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
    }
  });
  const zs = Object.assign(
    Object.assign(
      Object.assign(
        Object.assign(
          Object.assign(Object.assign(Object.assign({}, ut), fs), ys),
          xs
        ),
        Fs
      ),
      As
    ),
    ot
  );
  const js = ["offset", "limit", "reversed"];
  function Ds(e, t, s) {
    if (t.options.dynamicPartials) {
      const t = e.readValue();
      if ((e.assert(t, "illegal file path"), "none" === t.getText())) return;
      if (Gt(t)) {
        return Es(s.parse(t.content));
      }
      return t;
    }
    const i = [...e.readFileNameTemplate(t.options)],
      r = Es(s.parseTokens(i));
    return "none" === r ? void 0 : r;
  }
  function Es(e) {
    return 1 === e.length && Wt(e[0].token) ? e[0].token.getContent() : e;
  }
  function* $s(e, t, s) {
    return "string" == typeof e
      ? e
      : Array.isArray(e)
      ? s.renderer.renderTemplates(e, t)
      : yield Ge(e, t);
  }
  class qs extends Y {
    constructor(e, t, s, i) {
      super(e, s, i), (this.length = e), (this.cols = t);
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
  const Ns = {
    assign: class extends bt {
      constructor(e, t, s) {
        super(e, t, s),
          (this.identifier = this.tokenizer.readIdentifier()),
          (this.key = this.identifier.content),
          this.tokenizer.assert(this.key, "expected variable name"),
          this.tokenizer.skipBlank(),
          this.tokenizer.assert("=" === this.tokenizer.peek(), 'expected "="'),
          this.tokenizer.advance(),
          (this.value = new Lt(
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
      *arguments() {
        yield this.value;
      }
      *localScope() {
        yield this.identifier;
      }
    },
    for: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s);
        const r = this.tokenizer.readIdentifier(),
          n = this.tokenizer.readIdentifier(),
          o = this.tokenizer.readValue();
        if (!r.size() || "in" !== n.content || !o)
          throw new Error(`illegal tag: ${e.getText()}`);
        let a;
        (this.variable = r.content),
          (this.collection = o),
          (this.hash = new Tt(this.tokenizer, s.options.keyValueSeparator)),
          (this.templates = []),
          (this.elseTemplates = []);
        const l = i
          .parseStream(t)
          .on("start", () => (a = this.templates))
          .on("tag:else", (e) => {
            U(e.args), (a = this.elseTemplates);
          })
          .on("tag:endfor", (e) => {
            U(e.args), l.stop();
          })
          .on("template", (e) => a.push(e))
          .on("end", () => {
            throw new Error(`tag ${e.getText()} not closed`);
          });
        l.start();
      }
      *render(e, t) {
        const s = this.liquid.renderer;
        let i = u(yield Ge(this.collection, e));
        if (!i.length)
          return void (yield s.renderTemplates(this.elseTemplates, e, t));
        const r = "continue-" + this.variable + "-" + this.collection.getText();
        e.push({ continue: e.getRegister(r) });
        const n = yield this.hash.render(e);
        e.pop();
        (i = (
          this.liquid.options.orderedFilterParameters
            ? Object.keys(n).filter((e) => js.includes(e))
            : js.filter((e) => void 0 !== n[e])
        ).reduce((e, t) => {
          return "offset" === t
            ? ((s = e), (i = n.offset), s.slice(i))
            : "limit" === t
            ? (function (e, t) {
                return e.slice(0, t);
              })(e, n.limit)
            : (function (e) {
                return [...e].reverse();
              })(e);
          var s, i;
        }, i)),
          e.setRegister(r, (n.offset || 0) + i.length);
        const o = {
          forloop: new Y(i.length, this.collection.getText(), this.variable)
        };
        e.push(o);
        for (const r of i) {
          if (
            ((o[this.variable] = r),
            (e.continueCalled = e.breakCalled = !1),
            yield s.renderTemplates(this.templates, e, t),
            e.breakCalled)
          )
            break;
          o.forloop.next();
        }
        (e.continueCalled = e.breakCalled = !1), e.pop();
      }
      *children() {
        const e = this.templates.slice();
        return this.elseTemplates && e.push(...this.elseTemplates), e;
      }
      *arguments() {
        yield this.collection;
        for (const e of Object.values(this.hash.hash)) es(e) && (yield e);
      }
      blockScope() {
        return [this.variable, "forloop"];
      }
    },
    capture: class extends bt {
      constructor(e, t, s, i) {
        for (
          super(e, t, s),
            this.templates = [],
            this.identifier = this.readVariable(),
            this.variable = this.identifier.content;
          t.length;

        ) {
          const e = t.shift();
          if (Zt(e) && "endcapture" === e.name) return;
          this.templates.push(i.parseToken(e, t));
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      readVariable() {
        let e = this.tokenizer.readIdentifier();
        if (e.content) return e;
        if (((e = this.tokenizer.readQuoted()), e)) return e;
        throw this.tokenizer.error("invalid capture name");
      }
      *render(e) {
        const t = this.liquid.renderer,
          s = yield t.renderTemplates(this.templates, e);
        e.bottom()[this.variable] = s;
      }
      *children() {
        return this.templates;
      }
      *localScope() {
        yield this.identifier;
      }
    },
    case: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s),
          (this.branches = []),
          (this.elseTemplates = []),
          (this.value = new Lt(
            this.tokenizer.readFilteredValue(),
            this.liquid
          )),
          (this.elseTemplates = []);
        let r = [],
          n = 0;
        const o = i
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
        const s = this.liquid.renderer,
          i = p(yield this.value.value(e, e.opts.lenientIf));
        let r = !1;
        for (const n of this.branches)
          for (const o of n.values) {
            if (et(i, yield Ge(o, e, e.opts.lenientIf))) {
              yield s.renderTemplates(n.templates, e, t), (r = !0);
              break;
            }
          }
        r || (yield s.renderTemplates(this.elseTemplates, e, t));
      }
      *arguments() {
        yield this.value, yield* this.branches.flatMap((e) => e.values);
      }
      *children() {
        const e = this.branches.flatMap((e) => e.templates);
        return this.elseTemplates && e.push(...this.elseTemplates), e;
      }
    },
    comment: class extends bt {
      constructor(e, t, s) {
        for (super(e, t, s); t.length; ) {
          const e = t.shift();
          if (Zt(e) && "endcomment" === e.name) return;
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      render() {}
    },
    include: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s);
        const { tokenizer: r } = e;
        (this.file = Ds(r, this.liquid, i)), (this.currentFile = e.file);
        const n = r.p;
        "with" === r.readIdentifier().content
          ? (r.skipBlank(),
            ":" !== r.peek() ? (this.withVar = r.readValue()) : (r.p = n))
          : (r.p = n),
          (this.hash = new Tt(
            r,
            s.options.jekyllInclude || s.options.keyValueSeparator
          ));
      }
      *render(e, t) {
        const { liquid: s, hash: i, withVar: r } = this,
          { renderer: n } = s,
          o = yield $s(this.file, e, s);
        B(o, () => `illegal file path "${o}"`);
        const a = e.saveRegister("blocks", "blockMode");
        e.setRegister("blocks", {}), e.setRegister("blockMode", ss.OUTPUT);
        const l = yield i.render(e);
        r && (l[o] = yield Ge(r, e));
        const h = yield s._parsePartialFile(o, e.sync, this.currentFile);
        e.push(e.opts.jekyllInclude ? { include: l } : l),
          yield n.renderTemplates(h, e, t),
          e.pop(),
          e.restoreRegister(a);
      }
      *children(e, t) {
        return e && o(this.file)
          ? yield this.liquid._parsePartialFile(this.file, t, this.currentFile)
          : [];
      }
      partialScope() {
        if (o(this.file)) {
          let e;
          return (
            this.liquid.options.jekyllInclude
              ? (e = ["include"])
              : ((e = Object.keys(this.hash.hash)),
                this.withVar && e.push([this.file, this.withVar])),
            { name: this.file, isolated: !1, scope: e }
          );
        }
      }
      *arguments() {
        yield* Object.values(this.hash.hash).filter(es),
          es(this.file) && (yield this.file),
          es(this.withVar) && (yield this.withVar);
      }
    },
    render: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s);
        const r = this.tokenizer;
        for (
          this.file = Ds(r, this.liquid, i), this.currentFile = e.file;
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
              const s = r.p;
              let i;
              "as" === r.readIdentifier().content
                ? (i = r.readIdentifier())
                : (r.p = s),
                (this[t.content] = { value: e, alias: i && i.content }),
                r.skipBlank(),
                "," === r.peek() && r.advance();
              continue;
            }
          }
          r.p = e;
          break;
        }
        this.hash = new Tt(r, s.options.keyValueSeparator);
      }
      *render(e, t) {
        const { liquid: s, hash: i } = this,
          r = yield $s(this.file, e, s);
        B(r, () => `illegal file path "${r}"`);
        const n = e.spawn(),
          o = n.bottom();
        if ((K(o, yield i.render(e)), this.with)) {
          const { value: t, alias: s } = this.with;
          o[s || r] = yield Ge(t, e);
        }
        if (this.for) {
          const { value: i, alias: a } = this.for,
            l = u(yield Ge(i, e));
          o.forloop = new Y(l.length, i.getText(), a);
          for (const e of l) {
            o[a] = e;
            const i = yield s._parsePartialFile(r, n.sync, this.currentFile);
            yield s.renderer.renderTemplates(i, n, t), o.forloop.next();
          }
        } else {
          const e = yield s._parsePartialFile(r, n.sync, this.currentFile);
          yield s.renderer.renderTemplates(e, n, t);
        }
      }
      *children(e, t) {
        return e && o(this.file)
          ? yield this.liquid._parsePartialFile(this.file, t, this.currentFile)
          : [];
      }
      partialScope() {
        if (o(this.file)) {
          const e = Object.keys(this.hash.hash);
          if (this.with) {
            const { value: t, alias: s } = this.with;
            o(s) ? e.push([s, t]) : o(this.file) && e.push([this.file, t]);
          }
          if (this.for) {
            const { value: t, alias: s } = this.for;
            o(s) ? e.push([s, t]) : o(this.file) && e.push([this.file, t]);
          }
          return { name: this.file, isolated: !0, scope: e };
        }
      }
      *arguments() {
        for (const e of Object.values(this.hash.hash)) es(e) && (yield e);
        if (this.with) {
          const { value: e } = this.with;
          es(e) && (yield e);
        }
        if (this.for) {
          const { value: e } = this.for;
          es(e) && (yield e);
        }
      }
    },
    decrement: class extends bt {
      constructor(e, t, s) {
        super(e, t, s),
          (this.identifier = this.tokenizer.readIdentifier()),
          (this.variable = this.identifier.content);
      }
      render(e, t) {
        const s = e.environments;
        g(s[this.variable]) || (s[this.variable] = 0),
          t.write(c(--s[this.variable]));
      }
      *localScope() {
        yield this.identifier;
      }
    },
    increment: class extends bt {
      constructor(e, t, s) {
        super(e, t, s),
          (this.identifier = this.tokenizer.readIdentifier()),
          (this.variable = this.identifier.content);
      }
      render(e, t) {
        const s = e.environments;
        g(s[this.variable]) || (s[this.variable] = 0);
        const i = s[this.variable];
        s[this.variable]++, t.write(c(i));
      }
      *localScope() {
        yield this.identifier;
      }
    },
    cycle: class extends bt {
      constructor(e, t, s) {
        super(e, t, s), (this.candidates = []);
        const i = this.tokenizer.readValue();
        for (
          this.tokenizer.skipBlank(),
            i &&
              (":" === this.tokenizer.peek()
                ? ((this.group = i), this.tokenizer.advance())
                : this.candidates.push(i));
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
        const s =
            `cycle:${yield Ge(this.group, e)}:` + this.candidates.join(","),
          i = e.getRegister("cycle");
        let r = i[s];
        void 0 === r && (r = i[s] = 0);
        const n = this.candidates[r];
        return (
          (r = (r + 1) % this.candidates.length), (i[s] = r), yield Ge(n, e)
        );
      }
      *arguments() {
        yield* this.candidates, this.group && (yield this.group);
      }
    },
    if: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s), (this.branches = []);
        let r = [];
        i.parseStream(t)
          .on("start", () =>
            this.branches.push({
              value: new Lt(e.tokenizer.readFilteredValue(), this.liquid),
              templates: (r = [])
            })
          )
          .on("tag:elsif", (e) => {
            B(!this.elseTemplates, "unexpected elsif after else"),
              this.branches.push({
                value: new Lt(e.tokenizer.readFilteredValue(), this.liquid),
                templates: (r = [])
              });
          })
          .on("tag:else", (e) => {
            U(e.args),
              B(!this.elseTemplates, "duplicated else"),
              (r = this.elseTemplates = []);
          })
          .on("tag:endif", function (e) {
            U(e.args), this.stop();
          })
          .on("template", (e) => r.push(e))
          .on("end", () => {
            throw new Error(`tag ${e.getText()} not closed`);
          })
          .start();
      }
      *render(e, t) {
        const s = this.liquid.renderer;
        for (const { value: i, templates: r } of this.branches) {
          if (Qe(yield i.value(e, e.opts.lenientIf), e))
            return void (yield s.renderTemplates(r, e, t));
        }
        yield s.renderTemplates(this.elseTemplates || [], e, t);
      }
      *children() {
        const e = this.branches.flatMap((e) => e.templates);
        return this.elseTemplates && e.push(...this.elseTemplates), e;
      }
      arguments() {
        return this.branches.map((e) => e.value);
      }
    },
    layout: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s),
          (this.file = Ds(this.tokenizer, this.liquid, i)),
          (this.currentFile = e.file),
          (this.args = new Tt(this.tokenizer, s.options.keyValueSeparator)),
          (this.templates = i.parseTokens(t));
      }
      *render(e, t) {
        const { liquid: s, args: i, file: r } = this,
          { renderer: n } = s;
        if (void 0 === r)
          return (
            e.setRegister("blockMode", ss.OUTPUT),
            void (yield n.renderTemplates(this.templates, e, t))
          );
        const o = yield $s(this.file, e, s);
        B(o, () => `illegal file path "${o}"`);
        const a = yield s._parseLayoutFile(o, e.sync, this.currentFile);
        e.setRegister("blockMode", ss.STORE);
        const l = yield n.renderTemplates(this.templates, e),
          h = e.getRegister("blocks");
        void 0 === h[""] && (h[""] = (e, t) => t.write(l)),
          e.setRegister("blockMode", ss.OUTPUT),
          e.push(yield i.render(e)),
          yield n.renderTemplates(a, e, t),
          e.pop();
      }
      *children(e) {
        const t = this.templates.slice();
        return (
          e &&
            o(this.file) &&
            t.push(
              ...(yield this.liquid._parsePartialFile(
                this.file,
                !0,
                this.currentFile
              ))
            ),
          t
        );
      }
      *arguments() {
        for (const e of Object.values(this.args.hash)) es(e) && (yield e);
        es(this.file) && (yield this.file);
      }
      partialScope() {
        if (o(this.file))
          return {
            name: this.file,
            isolated: !1,
            scope: Object.keys(this.args.hash)
          };
      }
    },
    block: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s), (this.templates = []);
        const r = /\w+/.exec(e.args);
        for (this.block = r ? r[0] : ""; t.length; ) {
          const e = t.shift();
          if (Zt(e) && "endblock" === e.name) return;
          const s = i.parseToken(e, t);
          this.templates.push(s);
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      *render(e, t) {
        const s = this.getBlockRender(e);
        e.getRegister("blockMode") === ss.STORE
          ? (e.getRegister("blocks")[this.block] = s)
          : yield s(new Z(), t);
      }
      getBlockRender(e) {
        const { liquid: t, templates: s } = this,
          i = e.getRegister("blocks")[this.block],
          r = function* (i, r) {
            e.push({ block: i }),
              yield t.renderer.renderTemplates(s, e, r),
              e.pop();
          };
        return i ? (e, t) => i(new Z(() => r(e, t)), t) : r;
      }
      *children() {
        return this.templates;
      }
      blockScope() {
        return ["block"];
      }
    },
    raw: class extends bt {
      constructor(e, t, s) {
        for (super(e, t, s), this.tokens = []; t.length; ) {
          const e = t.shift();
          if (Zt(e) && "endraw" === e.name) return;
          this.tokens.push(e);
        }
        throw new Error(`tag ${e.getText()} not closed`);
      }
      render() {
        return this.tokens.map((e) => e.getText()).join("");
      }
    },
    tablerow: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s);
        const r = this.tokenizer.readIdentifier();
        this.tokenizer.skipBlank();
        const n = this.tokenizer.readIdentifier(),
          o = this.tokenizer.readValue();
        if ("in" !== n.content || !o)
          throw new Error(`illegal tag: ${e.getText()}`);
        let a;
        (this.variable = r.content),
          (this.collection = o),
          (this.args = new Tt(this.tokenizer, s.options.keyValueSeparator)),
          (this.templates = []);
        const l = i
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
        let s = u(yield Ge(this.collection, e));
        const i = yield this.args.render(e),
          r = i.offset || 0,
          n = void 0 === i.limit ? s.length : i.limit;
        s = s.slice(r, r + n);
        const o = i.cols || s.length,
          a = this.liquid.renderer,
          l = new qs(s.length, o, this.collection.getText(), this.variable),
          h = { tablerowloop: l };
        e.push(h);
        for (let i = 0; i < s.length; i++, l.next())
          (h[this.variable] = s[i]),
            0 === l.col0() &&
              (1 !== l.row() && t.write("</tr>"),
              t.write(`<tr class="row${l.row()}">`)),
            t.write(`<td class="col${l.col()}">`),
            yield a.renderTemplates(this.templates, e, t),
            t.write("</td>");
        s.length && t.write("</tr>"), e.pop();
      }
      *children() {
        return this.templates;
      }
      *arguments() {
        yield this.collection;
        for (const e of Object.values(this.args.hash)) es(e) && (yield e);
      }
      blockScope() {
        return [this.variable, "tablerowloop"];
      }
    },
    unless: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s), (this.branches = []), (this.elseTemplates = []);
        let r = [],
          n = 0;
        i.parseStream(t)
          .on("start", () =>
            this.branches.push({
              value: new Lt(e.tokenizer.readFilteredValue(), this.liquid),
              test: Xe,
              templates: (r = [])
            })
          )
          .on("tag:elsif", (e) => {
            n > 0
              ? (r = [])
              : this.branches.push({
                  value: new Lt(e.tokenizer.readFilteredValue(), this.liquid),
                  test: Qe,
                  templates: (r = [])
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
        const s = this.liquid.renderer;
        for (const { value: i, test: r, templates: n } of this.branches) {
          if (r(yield i.value(e, e.opts.lenientIf), e))
            return void (yield s.renderTemplates(n, e, t));
        }
        yield s.renderTemplates(this.elseTemplates, e, t);
      }
      *children() {
        const e = this.branches.flatMap((e) => e.templates);
        return this.elseTemplates && e.push(...this.elseTemplates), e;
      }
      arguments() {
        return this.branches.map((e) => e.value);
      }
    },
    break: class extends bt {
      render(e, t) {
        e.breakCalled = !0;
      }
    },
    continue: class extends bt {
      render(e, t) {
        e.continueCalled = !0;
      }
    },
    echo: class extends bt {
      constructor(e, t, s) {
        super(e, t, s),
          this.tokenizer.skipBlank(),
          this.tokenizer.end() ||
            (this.value = new Lt(
              this.tokenizer.readFilteredValue(),
              this.liquid
            ));
      }
      *render(e, t) {
        if (!this.value) return;
        const s = yield this.value.value(e, !1);
        t.write(s);
      }
      *arguments() {
        this.value && (yield this.value);
      }
    },
    liquid: class extends bt {
      constructor(e, t, s, i) {
        super(e, t, s);
        const r = this.tokenizer.readLiquidTagTokens(this.liquid.options);
        this.templates = i.parseTokens(r);
      }
      *render(e, t) {
        yield this.liquid.renderer.renderTemplates(this.templates, e, t);
      }
      *children() {
        return this.templates;
      }
    },
    "#": class extends bt {
      constructor(e, t, s) {
        if ((super(e, t, s), -1 !== e.args.search(/\n\s*[^#\s]/g)))
          throw new Error(
            "every line of an inline comment must start with a '#' character"
          );
      }
      render() {}
    }
  };
  class Ms {
    constructor(e = {}) {
      (this.renderer = new Ye()),
        (this.filters = {}),
        (this.tags = {}),
        (this.options = ft(e)),
        (this.parser = new Bt(this)),
        k(Ns, (e, t) => this.registerTag(t, e)),
        k(zs, (e, t) => this.registerFilter(t, e));
    }
    parse(e, t) {
      return new Bt(this).parse(e, t);
    }
    _render(e, t, s) {
      const i = t instanceof is ? t : new is(t, this.options, s);
      return this.renderer.renderTemplates(e, i);
    }
    render(e, t, s) {
      return ee(this, void 0, void 0, function* () {
        return te(
          this._render(e, t, Object.assign(Object.assign({}, s), { sync: !1 }))
        );
      });
    }
    renderSync(e, t, s) {
      return se(
        this._render(e, t, Object.assign(Object.assign({}, s), { sync: !0 }))
      );
    }
    renderToNodeStream(e, t, s = {}) {
      const i = new is(t, this.options, s);
      return this.renderer.renderTemplatesToNodeStream(e, i);
    }
    _parseAndRender(e, t, s) {
      const i = this.parse(e);
      return this._render(i, t, s);
    }
    parseAndRender(e, t, s) {
      return ee(this, void 0, void 0, function* () {
        return te(
          this._parseAndRender(
            e,
            t,
            Object.assign(Object.assign({}, s), { sync: !1 })
          )
        );
      });
    }
    parseAndRenderSync(e, t, s) {
      return se(
        this._parseAndRender(
          e,
          t,
          Object.assign(Object.assign({}, s), { sync: !0 })
        )
      );
    }
    _parsePartialFile(e, t, s) {
      return new Bt(this).parseFile(e, t, It.Partials, s);
    }
    _parseLayoutFile(e, t, s) {
      return new Bt(this).parseFile(e, t, It.Layouts, s);
    }
    _parseFile(e, t, s, i) {
      return new Bt(this).parseFile(e, t, s, i);
    }
    parseFile(e, t) {
      return ee(this, void 0, void 0, function* () {
        return te(new Bt(this).parseFile(e, !1, t));
      });
    }
    parseFileSync(e, t) {
      return se(new Bt(this).parseFile(e, !0, t));
    }
    *_renderFile(e, t, s) {
      const i = yield this._parseFile(e, s.sync, s.lookupType);
      return yield this._render(i, t, s);
    }
    renderFile(e, t, s) {
      return ee(this, void 0, void 0, function* () {
        return te(
          this._renderFile(
            e,
            t,
            Object.assign(Object.assign({}, s), { sync: !1 })
          )
        );
      });
    }
    renderFileSync(e, t, s) {
      return se(
        this._renderFile(
          e,
          t,
          Object.assign(Object.assign({}, s), { sync: !0 })
        )
      );
    }
    renderFileToNodeStream(e, t, s) {
      return ee(this, void 0, void 0, function* () {
        const i = yield this.parseFile(e);
        return this.renderToNodeStream(i, t, s);
      });
    }
    _evalValue(e, t) {
      const s = new Lt(e, this),
        i = t instanceof is ? t : new is(t, this.options);
      return s.value(i);
    }
    evalValue(e, t) {
      return ee(this, void 0, void 0, function* () {
        return te(this._evalValue(e, t));
      });
    }
    evalValueSync(e, t) {
      return se(this._evalValue(e, t));
    }
    registerFilter(e, t) {
      this.filters[e] = t;
    }
    registerTag(e, t) {
      var s;
      this.tags[e] = a(t)
        ? t
        : ((s = t),
          class extends bt {
            constructor(e, t, i) {
              super(e, t, i), a(s.parse) && s.parse.call(this, e, t);
            }
            *render(e, t) {
              const i = yield new Tt(
                this.token.args,
                e.opts.keyValueSeparator
              ).render(e);
              return yield s.render.call(this, e, t, i);
            }
          });
    }
    plugin(e) {
      return e.call(this, Ms);
    }
    express() {
      const e = this;
      let t = !0;
      return function (s, i, r) {
        if (t) {
          t = !1;
          const s = gt(this.root);
          e.options.root.unshift(...s),
            e.options.layouts.unshift(...s),
            e.options.partials.unshift(...s);
        }
        e.renderFile(s, i).then((e) => r(null, e), r);
      };
    }
    analyze(e, t = {}) {
      return ee(this, void 0, void 0, function* () {
        return jt(e, t);
      });
    }
    analyzeSync(e, t = {}) {
      return Dt(e, t);
    }
    parseAndAnalyze(e, t, s = {}) {
      return ee(this, void 0, void 0, function* () {
        return jt(this.parse(e, t), s);
      });
    }
    parseAndAnalyzeSync(e, t, s = {}) {
      return Dt(this.parse(e, t), s);
    }
    variables(e, t = {}) {
      return ee(this, void 0, void 0, function* () {
        const s = yield jt(o(e) ? this.parse(e) : e, t);
        return Object.keys(s.variables);
      });
    }
    variablesSync(e, t = {}) {
      const s = Dt(o(e) ? this.parse(e) : e, t);
      return Object.keys(s.variables);
    }
    fullVariables(e, t = {}) {
      return ee(this, void 0, void 0, function* () {
        const s = yield jt(o(e) ? this.parse(e) : e, t);
        return Array.from(
          new Set(
            Object.values(s.variables).flatMap((e) => e.map((e) => String(e)))
          )
        );
      });
    }
    fullVariablesSync(e, t = {}) {
      const s = Dt(o(e) ? this.parse(e) : e, t);
      return Array.from(
        new Set(
          Object.values(s.variables).flatMap((e) => e.map((e) => String(e)))
        )
      );
    }
    variableSegments(e, t = {}) {
      return ee(this, void 0, void 0, function* () {
        const s = yield jt(o(e) ? this.parse(e) : e, t);
        return Array.from(
          A(
            Object.values(s.variables).flatMap((e) => e.map((e) => e.toArray()))
          )
        );
      });
    }
    variableSegmentsSync(e, t = {}) {
      const s = Dt(o(e) ? this.parse(e) : e, t);
      return Array.from(
        A(Object.values(s.variables).flatMap((e) => e.map((e) => e.toArray())))
      );
    }
    globalVariables(e, t = {}) {
      return ee(this, void 0, void 0, function* () {
        const s = yield jt(o(e) ? this.parse(e) : e, t);
        return Object.keys(s.globals);
      });
    }
    globalVariablesSync(e, t = {}) {
      const s = Dt(o(e) ? this.parse(e) : e, t);
      return Object.keys(s.globals);
    }
    globalFullVariables(e, t = {}) {
      return ee(this, void 0, void 0, function* () {
        const s = yield jt(o(e) ? this.parse(e) : e, t);
        return Array.from(
          new Set(
            Object.values(s.globals).flatMap((e) => e.map((e) => String(e)))
          )
        );
      });
    }
    globalFullVariablesSync(e, t = {}) {
      const s = Dt(o(e) ? this.parse(e) : e, t);
      return Array.from(
        new Set(
          Object.values(s.globals).flatMap((e) => e.map((e) => String(e)))
        )
      );
    }
    globalVariableSegments(e, t = {}) {
      return ee(this, void 0, void 0, function* () {
        const s = yield jt(o(e) ? this.parse(e) : e, t);
        return Array.from(
          A(Object.values(s.globals).flatMap((e) => e.map((e) => e.toArray())))
        );
      });
    }
    globalVariableSegmentsSync(e, t = {}) {
      const s = Dt(o(e) ? this.parse(e) : e, t);
      return Array.from(
        A(Object.values(s.globals).flatMap((e) => e.map((e) => e.toArray())))
      );
    }
  }
  class Cs {
    static Init() {
      this.engine = this.GetEngine();
    }
    static GetEngine() {
      return (
        (this.engine = new Ms({ root: "/", extname: ".html" })),
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
  class Is {
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
      Is.InitWidget(t);
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
        s = e.getAttribute("data-template"),
        i = e.getAttribute("data-templateId"),
        r = e.getAttribute("data-cache"),
        n = e.getAttribute("data-host"),
        o = e.getAttribute("data-params"),
        a = !1;
      e.getAttribute("data-requireUser") &&
        "true" === e.getAttribute("data-requireUser").toLowerCase() &&
        (a = !0);
      var l = !1;
      e.getAttribute("data-debug") && (l = !0);
      var h = !1;
      e.getAttribute("data-useCalendar") && (h = !0);
      var c = !1;
      e.getAttribute("data-authOverride") &&
        "true" === e.getAttribute("data-authOverride").toLowerCase() &&
        (c = !0),
        n
          ? n.indexOf(".") > -1 || n.indexOf("http") > -1
            ? console.error(
                "Host must refer to the church prefix ONLY and cannot contain http, https, or other characters"
              )
            : (h ||
                (o &&
                  o.indexOf("@") < 0 &&
                  console.warn(
                    "params must include the '@' character to correctly pass parameters to the data stored procedure"
                  )),
              t &&
                h &&
                console.warn(
                  "Stored Procedure and Use Calendar are configured.  In this case, only UseCalendar will be processed.  Please reivew your custom widget configuration and correct to avoid this warning."
                ),
              console.info(
                "**************************************************"
              ),
              console.info(`Element ID:       ${e.id}`),
              console.info(`Host:             ${n}`),
              console.info(`Stored Procedure: ${t}`),
              console.info(`Params:           ${o}`),
              console.info(`Template:         ${s}`),
              console.info(`Template ID:      ${i}`),
              console.info(`Require User:     ${a}`),
              console.info(`Cache Data:       ${r}`),
              console.info(`Use Calendar:     ${h}`),
              console.info(`Params:           ${o}`),
              console.info(`Debug Enabled:    ${l}`),
              console.info(`Auth Override:    ${c}`),
              console.info(
                "**************************************************"
              ),
              this.LoadWidget(e.id, t, o, s, i, a, r, n, h, l, c))
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
    static async LoadWidget(e, t, s, i, r, n, o, a, l, h, c) {
      var u = document.getElementById(e),
        d = {};
      if (n && !this.checkForUser())
        return (
          (d.userAuthenticated = !1),
          console.info("|||===> No user is logged in."),
          c
            ? (h && (console.log("|||===> Data"), console.log(d)),
              await this.RenderTemplateWithData(r, i, d, u))
            : (u.innerHTML =
                '<div class="alert alert-danger alert-nologin">You must be logged in to see the details of this widget.</div>'),
          void this.setupAuthRecheck()
        );
      ((d = l
        ? await this.LoadCalendarData(s, o, a)
        : await this.LoadWidgetData(
            this.getUserData(),
            n,
            t,
            s,
            o,
            a
          )).widgetId = e),
        h && (console.log("|||===> Data"), console.log(d)),
        console.info("***====> Checking for Authentication <====***"),
        this.checkForUser()
          ? (console.info("===> User Authenticated"),
            (d.userAuthenticated = !0))
          : (console.warn("===> User NOT Authenticated"),
            (d.userAuthenticated = !1)),
        await this.RenderTemplateWithData(r, i, d, u);
      var p = new CustomEvent("widgetLoaded", {
        detail: { widgetId: `${u.id}`, data: d }
      });
      u.dispatchEvent(p), window.dispatchEvent(p);
    }
    static async RenderTemplateWithData(e, t, s, i) {
      try {
        if (e) {
          var r = document.getElementById(e),
            n = await Cs.GetRenderedTemplateString(r.innerText, s);
          i.innerHTML = n;
        } else if (t) {
          n = await Cs.GetRenderedTemplate(t, s);
          i.innerHTML = n;
        } else
          console.error("Error while rendering template."),
            console.error(err),
            (i.innerHTML =
              '<div class="alert alert-danger error">An error occurred while rendering the widget template</div>');
      } catch (e) {
        console.error("Error while rendering template."),
          console.error(e),
          (i.innerHTML =
            '<div class="alert alert-danger error">An error occurred while rendering the widget template</div>');
      }
    }
    static async LoadWidgetData(t, s, i, r, n, o) {
      var a = `https://${o}.cloudapps.ministryplatform.cloud/sky/api/CustomWidget?storedProcedure=${i}`;
      return (
        r &&
          (a += `&spParams=${encodeURIComponent(this.replaceParameters(r))}`),
        t && (a += `&userData=${t}`),
        n && (a += `&cacheData=${n}`),
        s && ((a += "&requireUser=true"), !t)
          ? (console.error("Not logged in..."),
            void (element.innerHTML =
              '<div class="alert alert-danger error">Please login to see this widget.</div>'))
          : await e.getData(a)
      );
    }
    static async LoadCalendarData(t, s, i) {
      var r = `https://${i}.cloudapps.ministryplatform.cloud/sky/api/Events/GetEvents`;
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
      for (var t, s = e, i = /\[.*?]/gi; null != (t = i.exec(e)); )
        s = s.replace(t[0], this.getParameterByName(t[0]));
      return s;
    }
    static getParameterByName(e, t = window.location.href) {
      var s = e.replace("[", "");
      (s = s.replace("]", "")),
        console.log("|||===> Getting Querystring Parameter:" + s),
        (s = s.replace(/[\[\]]/g, "\\$&"));
      var i = new RegExp("[?&]" + s + "(=([^&#]*)|&|#|$)").exec(t);
      return i
        ? i[2]
          ? (console.log(
              "|||===> Param Value:" +
                decodeURIComponent(i[2].replace(/\+/g, " "))
            ),
            decodeURIComponent(i[2].replace(/\+/g, " ")))
          : ""
        : null;
    }
  }
  window.addEventListener("load", function () {
    Is.Init();
  }),
    (window.ReInitWidget = Is.ReinitWidget),
    (window.ReinitAllWidgets = Is.ReinitAllWidgets);
})();
//# sourceMappingURL=customWidgetV1.js.map
