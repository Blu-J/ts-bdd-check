# BDD Check

Using the testcheck.js, we don't have the bindings for libraries like Mocha-Chai, Jasmine, Jest. So we are going to be writing a wrapper in ts to utilize in these test environments.

## Use

```ts
import { check, gen, Options } from 'ts-bdd-check'

const identity = <A>(x: A) => x
it(
  'identity to be idempotent',
  check((a: any) => expect(identity(a)).toBe(identity(identity(a))), gen.any),
)
```

## Features
* [x] Non-async it check
* [ ] Promise returned it check
* [ ] Done async it check
* [ ] Observable returned it check
* [ ] This binding for it