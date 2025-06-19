const TODO_KEY = "todo-list";
const LIST_NAMES_KEY = "list-names";


export function getTodos() {
    return JSON.parse(localStorage.getItem(TODO_KEY)) || [];
}

export function saveTodos(todos) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

export function getListNames() {
    return JSON.parse(localStorage.getItem(LIST_NAMES_KEY)) || [];
}

export function saveListNames(names) {
    localStorage.setItem(LIST_NAMES_KEY, JSON.stringify(names));
}
