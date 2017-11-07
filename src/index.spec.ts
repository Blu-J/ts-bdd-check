import { check, gen, Options } from "./index";

const testOptions: Options = { numTests: 10, seed: 0 };
describe("bddCheck checking ary 1", () => {
  it(
    "should validate type int",
    check((a: number) => {
      expect(typeof a).toBe("number");
    }, gen.number)
  );

  it(
    "should ensure a length exists with options",
    check(
      testOptions,
      (a: string) => {
        expect(a).toHaveProperty("length");
      },
      gen.string
    )
  );
});

describe("bddCheck checking ary 2", () => {
  it(
    "should validate both types with options",
    check(
      testOptions,
      (a: string, b: number) => {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
      },
      gen.string,
      gen.number
    )
  );
});

describe("bddCheck checking ary 3", () => {
  it(
    "should validate 3 types with options",
    check(
      testOptions,
      (a: string, b: number, c: string) => {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
        expect(typeof c).toBe("string");
      },
      gen.string,
      gen.number,
      gen.string
    )
  );
});

describe("bddCheck checking ary 4", () => {
  it(
    "should validate 4 types with options",
    check(
      testOptions,
      (a: string, b: number, c: string, d: number) => {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
        expect(typeof c).toBe("string");
        expect(typeof d).toBe("number");
      },
      gen.string,
      gen.number,
      gen.string,
      gen.negNumber
    )
  );
});

describe("bddCheck checking ary 5", () => {
  it(
    "should validate 5 types with options",
    check(
      testOptions,
      (a: string, b: number, c: string, d: number, e: number) => {
        expect(typeof a).toBe("string");
        expect(typeof b).toBe("number");
        expect(typeof c).toBe("string");
        expect(typeof d).toBe("number");
        expect(typeof e).toBe("number");
      },
      gen.string,
      gen.number,
      gen.string,
      gen.negNumber,
      gen.posInt
    )
  );
});

describe("bddCheck checking ary n", () => {
  it(
    "should validate all types with options",
    check(
      testOptions,
      (...args: number[]) => {
        args.forEach(x => expect(typeof x).toBe("number"));
      },
      gen.int,
      ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => gen.int)
    )
  );
});
