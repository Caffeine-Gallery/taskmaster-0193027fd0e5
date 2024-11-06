export const idlFactory = ({ IDL }) => {
  const Todo = IDL.Record({
    'id' : IDL.Nat,
    'text' : IDL.Text,
    'completed' : IDL.Bool,
  });
  return IDL.Service({
    'createTodo' : IDL.Func([IDL.Text], [Todo], []),
    'deleteTodo' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllTodos' : IDL.Func([], [IDL.Vec(Todo)], ['query']),
    'toggleTodo' : IDL.Func([IDL.Nat], [IDL.Opt(Todo)], []),
  });
};
export const init = ({ IDL }) => { return []; };
