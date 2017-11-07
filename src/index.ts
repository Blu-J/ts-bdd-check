import * as testcheck from "testcheck";

export type Options = testcheck.CheckOptions;
export type Thunk = () => void;
export type Generator<A> = testcheck.Generator<A>;

export function check<A>(
  options: Options,
  fn: (a: A) => void,
  genA: Generator<A>
): Thunk;
export function check<A>(fn: (a: A) => void, genA: Generator<A>): Thunk;

export function check<A, B>(
  options: Options,
  fn: (a: A, b: B) => void,
  genA: Generator<A>,
  genB: Generator<B>
): Thunk;
export function check<A, B>(
  fn: (a: A, b: B) => void,
  genA: Generator<A>,
  genB: Generator<B>
): Thunk;

export function check<A, B, C>(
  options: Options,
  fn: (a: A, b: B, c: C) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>
): Thunk;
export function check<A, B, C>(
  fn: (a: A, b: B, c: C) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>
): Thunk;

export function check<A, B, C, D>(
  options: Options,
  fn: (a: A, b: B, c: C, d: D) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>
): Thunk;
export function check<A, B, C, D>(
  fn: (a: A, b: B, c: C, d: D) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>
): Thunk;

export function check<A, B, C, D, E>(
  options: Options,
  fn: (a: A, b: B, c: C, d: D, e: E) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>,
  genE: Generator<E>
): Thunk;
export function check<A, B, C, D, E>(
  fn: (a: A, b: B, c: C, d: D, e: E) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>,
  genE: Generator<E>
): Thunk;

export function check<A>(
  fn: ((...as: A[]) => void),
  genA: Generator<A>,
  ...genAs: Generator<A>[]
): Thunk;
export function check<A>(
  options: Options,
  fn: ((...as: A[]) => void),
  genA: Generator<A>,
  ...genAs: Generator<A>[]
): Thunk;

export function check(...args: any[]): Thunk {
  const [optionsOrFn, fnOrA, ...restAs] = args;
  const hasOptions = !(optionsOrFn instanceof Function);
  const options = (hasOptions ? optionsOrFn : {}) as Options;
  const fn = (hasOptions ? fnOrA : optionsOrFn) as ((...as: any[]) => void);
  const genAs = (hasOptions ? restAs : [fnOrA, ...restAs]) as Generator<any>[];

  return () => {
    const property = (testcheck.property as any)(...genAs, fn);
    const checkResult: CheckResult = testcheck.check(property, options);
    if (checkResult.fail) {
      throw new CheckFailure(checkResult);
    }
  };
}

export type CheckResult = {
  // True if the check passed, otherwise false or a thrown Error.
  result: boolean | Error;

  // The number of generated checks ran.
  numTests: number;

  // The seed used for this check.
  seed?: number;

  // The arguments generated when and if this check failed.
  fail?: any[];

  // The size used when and if this check failed
  failingSize?: number;

  /*
  * When a check fails, the failing arguments shrink to find the smallest
  * value that fails.
  */
  shrunk?: {
    // True if the check passed, otherwise false or a thrown Error.
    result: boolean | Error;

    // The smallest arguments with this result.
    smallest: any[];

    // The depth of the shrunk result.
    depth: number;

    // The number of nodes shrunk to result in this smallest failing value.
    totalNodesVisited: number;
  };
};
const tryJson = (value: any) => {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return `[${typeof value}:${value}]`;
  }
};
class CheckFailure extends Error {
  check: CheckResult;
  constructor(checkResult: CheckResult) {
    super();
    const shrunk = checkResult.shrunk;
    const args = shrunk ? shrunk.smallest : checkResult.fail;
    const result = shrunk ? shrunk.result : checkResult.result;
    this.check = checkResult;
    this.message = `seed=${checkResult.seed} (${(args || [])
      .map(tryJson)
      .join(", ")}) => ${String(result)}`;

    if (result instanceof Error) {
      // Edit stack
      this.stack = `${this.name}: ${this.message}\n${result.stack}`;

      // Copy over other properties
      for (const p in result) {
        if (p !== "message" && result.hasOwnProperty(p)) {
          (this as any)[p] = (result as any)[p];
        }
      }
    }
  }
}

export const gen = testcheck.gen;
