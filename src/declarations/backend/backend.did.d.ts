import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Todo { 'id' : bigint, 'text' : string, 'completed' : boolean }
export interface _SERVICE {
  'createTodo' : ActorMethod<[string], Todo>,
  'deleteTodo' : ActorMethod<[bigint], boolean>,
  'getAllTodos' : ActorMethod<[], Array<Todo>>,
  'toggleTodo' : ActorMethod<[bigint], [] | [Todo]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
