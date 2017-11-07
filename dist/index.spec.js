"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var testOptions = { numTests: 10, seed: 0 };
describe("bddCheck checking ary 1", function() {
  it(
    "should validate type int",
    index_1.check(function(a) {
      expect(typeof a).toBe("number");
    }, index_1.gen.number)
  );
  it(
    "should ensure a length exists with options",
    index_1.check(
      testOptions,
      function(a) {
        expect(a).toHaveProperty("length");
      },
      index_1.gen.string
    )
  );
});
describe("bddCheck checking ary 2", function() {
  it(
    "should validate both types with options",
    index_1.check(
      testOptions,
      function(a, b) {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
      },
      index_1.gen.string,
      index_1.gen.number
    )
  );
});
describe("bddCheck checking ary 3", function() {
  it(
    "should validate 3 types with options",
    index_1.check(
      testOptions,
      function(a, b, c) {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
        expect(typeof c).toBe("string");
      },
      index_1.gen.string,
      index_1.gen.number,
      index_1.gen.string
    )
  );
});
describe("bddCheck checking ary 4", function() {
  it(
    "should validate 4 types with options",
    index_1.check(
      testOptions,
      function(a, b, c, d) {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
        expect(typeof c).toBe("string");
        expect(typeof d).toBe("number");
      },
      index_1.gen.string,
      index_1.gen.number,
      index_1.gen.string,
      index_1.gen.negNumber
    )
  );
});
describe("bddCheck checking ary 5", function() {
  it(
    "should validate 5 types with options",
    index_1.check(
      testOptions,
      function(a, b, c, d, e) {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
        expect(typeof c).toBe("string");
        expect(typeof d).toBe("number");
        expect(typeof e).toBe("number");
      },
      index_1.gen.string,
      index_1.gen.number,
      index_1.gen.string,
      index_1.gen.negNumber,
      index_1.gen.posInt
    )
  );
});
describe("bddCheck checking ary n", function() {
  it(
    "should validate all types with options",
    index_1.check.apply(
      void 0,
      [
        testOptions,
        function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          args.forEach(function(x) {
            return expect(typeof x).toBe("number");
          });
        },
        index_1.gen.int
      ].concat(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function() {
          return index_1.gen.int;
        })
      )
    )
  );
});
//# sourceMappingURL=index.spec.js.map
