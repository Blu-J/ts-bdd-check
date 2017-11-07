import * as testcheck from "testcheck";
export declare type Options = testcheck.CheckOptions;
export declare type Thunk = () => void;
export declare type Generator<A> = testcheck.Generator<A>;
export declare function check<A>(
  options: Options,
  fn: (a: A) => void,
  genA: Generator<A>
): Thunk;
export declare function check<A>(fn: (a: A) => void, genA: Generator<A>): Thunk;
export declare function check<A, B>(
  options: Options,
  fn: (a: A, b: B) => void,
  genA: Generator<A>,
  genB: Generator<B>
): Thunk;
export declare function check<A, B>(
  fn: (a: A, b: B) => void,
  genA: Generator<A>,
  genB: Generator<B>
): Thunk;
export declare function check<A, B, C>(
  options: Options,
  fn: (a: A, b: B, c: C) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>
): Thunk;
export declare function check<A, B, C>(
  fn: (a: A, b: B, c: C) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>
): Thunk;
export declare function check<A, B, C, D>(
  options: Options,
  fn: (a: A, b: B, c: C, d: D) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>
): Thunk;
export declare function check<A, B, C, D>(
  fn: (a: A, b: B, c: C, d: D) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>
): Thunk;
export declare function check<A, B, C, D, E>(
  options: Options,
  fn: (a: A, b: B, c: C, d: D, e: E) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>,
  genE: Generator<E>
): Thunk;
export declare function check<A, B, C, D, E>(
  fn: (a: A, b: B, c: C, d: D, e: E) => void,
  genA: Generator<A>,
  genB: Generator<B>,
  genC: Generator<C>,
  genD: Generator<D>,
  genE: Generator<E>
): Thunk;
export declare function check<A>(
  fn: ((...as: A[]) => void),
  genA: Generator<A>,
  ...genAs: Generator<A>[]
): Thunk;
export declare function check<A>(
  options: Options,
  fn: ((...as: A[]) => void),
  genA: Generator<A>,
  ...genAs: Generator<A>[]
): Thunk;
export declare type CheckResult = {
  result: boolean | Error;
  numTests: number;
  seed?: number;
  fail?: any[];
  failingSize?: number;
  shrunk?: {
    result: boolean | Error;
    smallest: any[];
    depth: number;
    totalNodesVisited: number;
  };
};
export declare const gen: {
  any: testcheck.Generator<any>;
  primitive: testcheck.Generator<any>;
  boolean: testcheck.Generator<boolean>;
  null: testcheck.Generator<void>;
  undefined: testcheck.Generator<void>;
  NaN: testcheck.Generator<number>;
  number: testcheck.Generator<number>;
  posNumber: testcheck.Generator<number>;
  negNumber: testcheck.Generator<number>;
  numberWithin: (min: number, max: number) => testcheck.Generator<number>;
  int: testcheck.Generator<number>;
  posInt: testcheck.Generator<number>;
  negInt: testcheck.Generator<number>;
  sPosInt: testcheck.Generator<number>;
  sNegInt: testcheck.Generator<number>;
  intWithin: (min: number, max: number) => testcheck.Generator<number>;
  string: testcheck.Generator<string>;
  asciiString: testcheck.Generator<string>;
  alphaNumString: testcheck.Generator<string>;
  substring: (original: string) => testcheck.Generator<string>;
  char: testcheck.Generator<string>;
  asciiChar: testcheck.Generator<string>;
  alphaNumChar: testcheck.Generator<string>;
  array: {
    <T>(valueGen: testcheck.Generator<T>): testcheck.Generator<T[]>;
    <T>(
      valueGen: testcheck.Generator<T>,
      options?: testcheck.SizeOptions | undefined
    ): testcheck.Generator<T[]>;
    <T1, T2, T3, T4, T5>(
      tupleGens: [
        T1 | testcheck.Generator<T1>,
        T2 | testcheck.Generator<T2>,
        T3 | testcheck.Generator<T3>,
        T4 | testcheck.Generator<T4>,
        T5 | testcheck.Generator<T5>
      ]
    ): testcheck.Generator<[T1, T2, T3, T4, T5]>;
    <T1, T2, T3, T4>(
      tupleGens: [
        T1 | testcheck.Generator<T1>,
        T2 | testcheck.Generator<T2>,
        T3 | testcheck.Generator<T3>,
        T4 | testcheck.Generator<T4>
      ]
    ): testcheck.Generator<[T1, T2, T3, T4]>;
    <T1, T2, T3>(
      tupleGens: [
        T1 | testcheck.Generator<T1>,
        T2 | testcheck.Generator<T2>,
        T3 | testcheck.Generator<T3>
      ]
    ): testcheck.Generator<[T1, T2, T3]>;
    <T1, T2>(
      tupleGens: [T1 | testcheck.Generator<T1>, T2 | testcheck.Generator<T2>]
    ): testcheck.Generator<[T1, T2]>;
    <T1>(tupleGens: [T1 | testcheck.Generator<T1>]): testcheck.Generator<[T1]>;
  };
  uniqueArray: {
    <T>(
      valueGen: testcheck.Generator<T>,
      options?: testcheck.SizeOptions | undefined
    ): testcheck.Generator<T[]>;
    <T>(
      valueGen: testcheck.Generator<T>,
      uniqueBy: (value: T) => any,
      options?: testcheck.SizeOptions | undefined
    ): testcheck.Generator<T[]>;
  };
  object: {
    <T>(
      valueGen: testcheck.Generator<T>,
      options?: testcheck.SizeOptions | undefined
    ): testcheck.Generator<{
      [key: string]: T;
    }>;
    <T>(
      keyGen: testcheck.Generator<string>,
      valueGen: testcheck.Generator<T>,
      options?: testcheck.SizeOptions | undefined
    ): testcheck.Generator<{
      [key: string]: T;
    }>;
    (
      genMap: {
        [key: string]: testcheck.Generator<any>;
      }
    ): testcheck.Generator<{
      [key: string]: any;
    }>;
  };
  arrayOrObject: <T>(
    valueGen: testcheck.Generator<T>
  ) => testcheck.Generator<{
    [key: string]: T;
    [key: number]: T;
  }>;
  nested: <C, T>(
    collectionGenFn: (
      valueGen: testcheck.Generator<T>
    ) => testcheck.Generator<C>,
    valueGen: testcheck.Generator<T>
  ) => testcheck.Generator<C>;
  JSON: testcheck.Generator<{
    [key: string]: any;
  }>;
  JSONValue: testcheck.Generator<any>;
  JSONPrimitive: testcheck.Generator<any>;
  oneOf: <T>(
    generators: (T | testcheck.Generator<T>)[]
  ) => testcheck.Generator<T>;
  oneOfWeighted: <T>(
    generators: [number, T | testcheck.Generator<T>][]
  ) => testcheck.Generator<T>;
  return: <T>(value: T) => testcheck.Generator<T>;
  sized: <T>(
    sizedGenFn: (size: number) => T | testcheck.Generator<T>
  ) => testcheck.Generator<T>;
};
