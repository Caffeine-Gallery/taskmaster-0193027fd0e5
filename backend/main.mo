import Bool "mo:base/Bool";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
    // Todo type definition
    public type Todo = {
        id: Nat;
        text: Text;
        completed: Bool;
    };

    private stable var nextId: Nat = 0;
    private stable var todosEntries: [(Nat, Todo)] = [];
    
    // Initialize HashMap with stable entries
    private var todos = HashMap.HashMap<Nat, Todo>(0, Nat.equal, Hash.hash);

    // Create a new todo
    public func createTodo(text: Text) : async Todo {
        let id = nextId;
        let todo: Todo = {
            id;
            text;
            completed = false;
        };
        todos.put(id, todo);
        nextId += 1;
        return todo;
    };

    // Get all todos
    public query func getAllTodos() : async [Todo] {
        let todosIter = todos.vals();
        return Iter.toArray(todosIter);
    };

    // Toggle todo completion status
    public func toggleTodo(id: Nat) : async ?Todo {
        switch (todos.get(id)) {
            case (null) { null };
            case (?todo) {
                let updatedTodo: Todo = {
                    id = todo.id;
                    text = todo.text;
                    completed = not todo.completed;
                };
                todos.put(id, updatedTodo);
                ?updatedTodo
            };
        };
    };

    // Delete a todo
    public func deleteTodo(id: Nat) : async Bool {
        switch (todos.remove(id)) {
            case (null) { false };
            case (?_) { true };
        };
    };

    // System functions for upgrades
    system func preupgrade() {
        todosEntries := Iter.toArray(todos.entries());
    };

    system func postupgrade() {
        todos := HashMap.fromIter<Nat, Todo>(todosEntries.vals(), 0, Nat.equal, Hash.hash);
    };
}
