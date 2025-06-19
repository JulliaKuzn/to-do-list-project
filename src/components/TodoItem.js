export default class TodoItem {
    constructor(name, listName, priority = "Medium") {
        this.id = crypto.randomUUID();
        this.name = name.trim();
        this.listName = listName;
        this.priority = priority;
        this.isDone = false;
    }
}