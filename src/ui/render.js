import { getTodos, saveTodos } from "../services/storage.js";

export function renderList(listOfTOdoItems = getTodos()) {

    const listOfItems = document.getElementById("listOfItems");
    listOfItems.innerHTML = "";

    const selectElement = document.getElementById("availableLists");
    const selectedList = selectElement.options[selectElement.selectedIndex].text;
    let newListOfTOdoItems = listOfTOdoItems.filter((currList) => {
        return currList.listName === selectedList;
    });


    const filterValue = document.getElementById("filterTasks").value;

    if (filterValue === "new") {
        newListOfTOdoItems = newListOfTOdoItems.filter(item => !item.isDone);
    } else if (filterValue === "done") {
        newListOfTOdoItems = newListOfTOdoItems.filter(item => item.isDone);
    }


    if (newListOfTOdoItems.length === 0) {
        const noResultsMsg = document.createElement("div");
        noResultsMsg.innerText = "No tasks found.";
        noResultsMsg.classList.add("no-results");
        listOfItems.appendChild(noResultsMsg);
        return;
    }

    for (const currItem of newListOfTOdoItems) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("itemWithActions");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = currItem.isDone;

        const label = document.createElement("label");
        if (currItem.isDone) {
            label.classList.add("crossed");
        }

        label.classList.add(currItem.priority.toLowerCase());

        checkbox.addEventListener("change", () => {
            currItem.isDone = checkbox.checked;
            label.classList.toggle("crossed", checkbox.checked);
            updateItemStatus(currItem);
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(currItem.name));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "❌";
        deleteButton.addEventListener("click", () => {
            deleteItem(currItem.id);
        });

        itemDiv.appendChild(label);
        itemDiv.appendChild(deleteButton);

        listOfItems.appendChild(itemDiv);

    }
}

export function updateItemStatus(updatedItem) {
    const currentList = getTodos();
    const updatedList = currentList.map(item => item.id === updatedItem.id ? updatedItem : item);
    saveTodos(updatedList);
}

export function deleteItem(id) {
    const currentList = getTodos();
    const filteredList = currentList.filter(item => item.id !== id);
    saveTodos(filteredList);
    renderList();
}
