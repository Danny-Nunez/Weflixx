(function (_0x3f2b30, _0x52dbc0) {
    const _0x2b6f9e = _0x3262,
      _0x23b53e = _0x3f2b30();
    while (!![]) {
      try {
        const _0x52c895 =
          -parseInt(_0x2b6f9e(0x14c)) / 0x1 +
          parseInt(_0x2b6f9e(0x153)) / 0x2 +
          parseInt(_0x2b6f9e(0x160)) / 0x3 +
          (-parseInt(_0x2b6f9e(0x159)) / 0x4) * (parseInt(_0x2b6f9e(0x150)) / 0x5) +
          parseInt(_0x2b6f9e(0x166)) / 0x6 +
          (parseInt(_0x2b6f9e(0x15d)) / 0x7) * (parseInt(_0x2b6f9e(0x167)) / 0x8) +
          parseInt(_0x2b6f9e(0x14e)) / 0x9;
        if (_0x52c895 === _0x52dbc0) break;
        else _0x23b53e["push"](_0x23b53e["shift"]());
      } catch (_0x3bdfc7) {
        _0x23b53e["push"](_0x23b53e["shift"]());
      }
    }
  })(_0x20d6, 0xbb6c2);
  function _0x21b4(_0x284742, _0x4532b0) {
    const _0x8d9075 = _0xf27f();
    return (
      (_0x21b4 = function (_0x4543cb, _0x488411) {
        _0x4543cb = _0x4543cb - 0x10f;
        let _0x2aeae0 = _0x8d9075[_0x4543cb];
        return _0x2aeae0;
      }),
      _0x21b4(_0x284742, _0x4532b0)
    );
  }
  (function (_0x22346d, _0xa6cf3c) {
    const _0x4a5b47 = _0x3262,
      _0x567c3a = _0x21b4,
      _0x25c28f = _0x22346d();
    while (!![]) {
      try {
        const _0x16435d =
          (parseInt(_0x567c3a(0x11c)) / 0x1) * (parseInt(_0x567c3a(0x11f)) / 0x2) +
          parseInt(_0x567c3a(0x115)) / 0x3 +
          (parseInt(_0x567c3a(0x11a)) / 0x4) * (parseInt(_0x567c3a(0x114)) / 0x5) +
          -parseInt(_0x567c3a(0x111)) / 0x6 +
          -parseInt(_0x567c3a(0x10f)) / 0x7 +
          (-parseInt(_0x567c3a(0x119)) / 0x8) * (parseInt(_0x567c3a(0x112)) / 0x9) +
          (parseInt(_0x567c3a(0x120)) / 0xa) * (parseInt(_0x567c3a(0x113)) / 0xb);
        if (_0x16435d === _0xa6cf3c) break;
        else _0x25c28f[_0x4a5b47(0x15a)](_0x25c28f["shift"]());
      } catch (_0x545494) {
        _0x25c28f["push"](_0x25c28f["shift"]());
      }
    }
  })(_0xf27f, 0x91507);
  import { server } from "configs/server";
  function _0xf27f() {
    const _0x24715a = _0x3262,
      _0x3d0204 = [
        _0x24715a(0x152),
        _0x24715a(0x158),
        _0x24715a(0x154),
        "NEXT_PUBLIC_APP",
        _0x24715a(0x14f),
        _0x24715a(0x156),
        _0x24715a(0x165),
        _0x24715a(0x148),
        _0x24715a(0x162),
        _0x24715a(0x161),
        _0x24715a(0x151),
        _0x24715a(0x14b),
        _0x24715a(0x15f),
        _0x24715a(0x149),
        _0x24715a(0x147),
        _0x24715a(0x157),
        _0x24715a(0x14d),
        _0x24715a(0x14a),
        _0x24715a(0x164),
        _0x24715a(0x15c),
        "5694104YaFYWR",
        _0x24715a(0x155)
      ];
    return (
      (_0xf27f = function () {
        return _0x3d0204;
      }),
      _0xf27f()
    );
  }
  import { STATUS } from "constants/status";
  import { removeHttp } from "utils/helper";
  import { ApiError, responseError } from "utils/response";
  function _0x3262(_0x4ce172, _0x3eb7b8) {
    const _0x20d641 = _0x20d6();
    return (
      (_0x3262 = function (_0x32623b, _0xcb8e16) {
        _0x32623b = _0x32623b - 0x147;
        let _0x213f60 = _0x20d641[_0x32623b];
        return _0x213f60;
      }),
      _0x3262(_0x4ce172, _0x3eb7b8)
    );
  }
  const appMiddleware = (_0x1f4a63, _0x504b41) => {
    const _0x321012 = _0x3262,
      _0x1caec6 = _0x21b4,
      _0x536478 = _0x1f4a63[_0x1caec6(0x118)],
      _0xe474df = _0x536478[_0x321012(0x163)];
    if (removeHttp(_0x536478[_0x1caec6(0x122)]) !== removeHttp(server)) {
      const _0x2b1c9c = new ApiError(STATUS["FORBIDDEN"], _0x321012(0x14b));
      return responseError(_0x2b1c9c, _0x504b41);
    }
    if (
      _0x536478[_0x1caec6(0x117)] === _0x1caec6(0x11b) &&
      _0x536478[_0x1caec6(0x11d)] === _0x1caec6(0x124)
    )
      return;
    if (_0xe474df?.[_0x1caec6(0x123)](_0x321012(0x15e))) return;
    if (!_0xe474df || !_0xe474df[_0x1caec6(0x123)](server)) {
      const _0x1616ac = new ApiError(STATUS[_0x321012(0x15b)], _0x1caec6(0x110));
      return responseError(_0x1616ac, _0x504b41);
    }
    if (_0x536478[_0x1caec6(0x121)] !== process[_0x1caec6(0x116)][_0x1caec6(0x11e)]) {
      const _0x2eb33a = new ApiError(STATUS[_0x321012(0x15b)], _0x1caec6(0x110));
      return responseError(_0x2eb33a, _0x504b41);
    }
  };
  function _0x20d6() {
    const _0x31818b = [
      "1038924tLHmKi",
      "784353UGdoPx",
      "3535443PjczIp",
      "285314WUwQNS",
      "186725OmQUzN",
      "7793534ftyJkb",
      "close",
      "1684600PMCRpz",
      "user-agent",
      "4llNdIq",
      "2344190iTqDBa",
      "900685HnkjLe",
      "6JvPqfH",
      "160CncJig",
      "push",
      "FORBIDDEN",
      "headers",
      "7iZgOTB",
      "/api-doc",
      "3108786boMyTc",
      "729864CYUcLe",
      "axios/1.1.3",
      "includes",
      "referer",
      "connection",
      "appid",
      "3245706aHQDlv",
      "10248320vMYrKG",
      "77atXmaF",
      "host",
      "9kVqLqp",
      "env",
      "Forbidden\x20access\x20is\x20denied"
    ];
    _0x20d6 = function () {
      return _0x31818b;
    };
    return _0x20d6();
  }
  export default appMiddleware;