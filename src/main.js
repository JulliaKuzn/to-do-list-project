import TodoItem from "./components/TodoItem.js";
import { getTodos, saveTodos, getListNames, saveListNames } from "./services/storage.js";
import { toggleTheme, applySavedTheme } from "./services/theme.js";
import { showWeather } from "./services/weather.js";
import { renderList } from "./ui/render.js";

document.getElementById("addBtn").addEventListener("click", addNewItem);

function addNewItem() {
    const input = document.getElementById("newItemText");
    if (getListNames().length === 0) {
        document.getElementById("error-message").classList.remove("hidden");
        return;
    }
    document.getElementById("error-message").classList.add("hidden");

    const selectElement = document.getElementById("availableLists");
    const selectedListName = selectElement.options[selectElement.selectedIndex].text;
    const selectedPriority = document.querySelector('input[name="priority"]:checked').value;

    const newItem = new TodoItem(input.value, selectedListName, selectedPriority);
    if (!newItem.name) return;

    const currentList = getTodos();
    currentList.push(newItem);
    saveTodos(currentList);

    input.value = "";
    renderList();
}

function toggleErrorMessage() {
    const errorMessage = document.getElementById("error-message");
    if (getListNames().length === 0) {
        errorMessage.classList.remove("hidden");
    } else {
        errorMessage.classList.add("hidden");
    }
}

const sortBtn = document.getElementById("sortByPriority");
sortBtn.addEventListener("click", () => {
    const currentList = getTodos();
    const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
    const sortedList = [...currentList].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderList(sortedList);
});

const addTodoListBtn = document.getElementById("addNewListBtn");
addTodoListBtn.addEventListener("click", () => {
    const newListName = document.getElementById("newListName");
    if (!newListName.value) return;

    const currentToDoNames = getListNames();
    currentToDoNames.push(newListName.value.trim());
    saveListNames(currentToDoNames);

    newListName.value = "";
    showAvailableLists();
    toggleErrorMessage();
});

function showAvailableLists() {
    const selectWithLists = document.getElementById("availableLists");
    selectWithLists.innerHTML = "";

    const currentLists = getListNames();
    for (let listName of currentLists) {
        const option = document.createElement("option");
        option.innerText = listName;
        selectWithLists.appendChild(option);
    }

    toggleErrorMessage();
}

const deleteListBtn = document.getElementById("deleteList");
deleteListBtn.addEventListener("click", () => {
    const selectElement = document.getElementById("availableLists");
    const text = selectElement.options[selectElement.selectedIndex].text;

    const currentLists = getListNames();
    const updatedList = currentLists.filter(listN => listN !== text);
    saveListNames(updatedList);

    const currentTodos = getTodos();
    const updatedTodos = currentTodos.filter(todo => todo.listName !== text);
    saveTodos(updatedTodos);

    showAvailableLists();
    renderList();
    toggleErrorMessage();
});

const selectWithLists = document.getElementById("availableLists");
selectWithLists.addEventListener("change", () => {
    renderList();
});

const toggleThemeBtn = document.getElementById("toggleThemeBtn");
toggleThemeBtn.addEventListener("click", toggleTheme);

const filterSelect = document.getElementById("filterTasks");
filterSelect.addEventListener("change", () => {
    renderList();
});

window.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("todo-list")) {
        localStorage.setItem("todo-list", JSON.stringify([]));
    }
    if (!localStorage.getItem("list-names")) {
        localStorage.setItem("list-names", JSON.stringify([]));
    }

    applySavedTheme();
    showAvailableLists();
    renderList();
    showWeather();
});