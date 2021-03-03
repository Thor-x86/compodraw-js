import { Instruct } from ".";

/**
 * List of available instructions with their name.
 *
 * @example
 * import {NamedInstructs} from 'compodraw';
 * import {Foo, Bar} from './my-instructs';
 *
 * const myInstructs: NamedInstructs = {
 *     "foo": Foo,
 *     "bar": Bar
 * };
 **/
export interface NamedInstructs {
  [key: string]: new () => Instruct;
}

export default NamedInstructs;
