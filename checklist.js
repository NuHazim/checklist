const groupbox = document.getElementById("groupbox");
const form = document.getElementById("form");

// Load saved groups and lists from localStorage on page load
window.onload = function () {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    savedGroups.forEach(group => {
        createGroupElement(group.name, group.items);
    });
};

// Event listener to handle new group creation
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const groupName = document.getElementById("text").value;
    if (groupName.trim() === '') return;

    createGroupElement(groupName, []);
    saveGroup(groupName, []);

    document.getElementById("text").value = ""; // Clear input field
});

// Function to create a group element
function createGroupElement(groupName, listItems) {
    let details = document.createElement("details");
    let summary = document.createElement("summary");
    summary.textContent = groupName;
    
    // "Remove group" button
    let x = document.createElement("button");
    x.textContent = "X";
    x.classList.add("x");
    summary.appendChild(x);

    // Form to add new list items
    let form = document.createElement("form");
    let label = document.createElement("label");
    label.textContent = "List: ";
    let input = document.createElement("input");
    input.type = "text";
    input.required = true;
    let button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    details.appendChild(summary);
    details.appendChild(form);
    groupbox.appendChild(details);

    // Load the existing list items for the group
    listItems.forEach(item => {
        addListItem(details, item.name, item.checked);
    });

    // Event listener to handle removing a group
    x.addEventListener("click", function () {
        details.remove();
        removeGroup(groupName);
    });

    // Event listener to handle new list item creation
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const listItemText = input.value;
        if (listItemText.trim() === '') return;

        addListItem(details, listItemText, false);
        updateGroup(groupName, listItemText, false); // Add to localStorage

        input.value = ""; // Clear input field
    });
}

// Function to add a list item
function addListItem(details, itemName, isChecked) {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.textContent = itemName;
    h2.classList.add("list");
    h2.style.display = "inline";
    h2.style.cursor = "pointer";
    if (isChecked) h2.classList.add("checked"); // If item is checked

    let x2 = document.createElement("button");
    x2.textContent = "X";
    x2.classList.add("x");

    div.appendChild(h2);
    div.appendChild(x2);
    details.appendChild(div);

    // Remove list item event
    x2.addEventListener("click", function () {
        div.remove();
        removeListItem(details.querySelector("summary").textContent, itemName);
    });

    // Toggle check/uncheck event
    h2.addEventListener("click", function () {
        h2.classList.toggle("checked");
        updateCheckStatus(details.querySelector("summary").textContent, itemName, h2.classList.contains("checked"));
    });
}

// LocalStorage-related functions

// Save a new group to localStorage
function saveGroup(groupName, items) {
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    groups.push({ name: groupName, items });
    localStorage.setItem('groups', JSON.stringify(groups));
}

// Remove a group from localStorage
function removeGroup(groupName) {
    let groups = JSON.parse(localStorage.getItem('groups')) || [];
    groups = groups.filter(group => group.name !== groupName);
    localStorage.setItem('groups', JSON.stringify(groups));
}

// Update a group with a new list item in localStorage
function updateGroup(groupName, itemName, isChecked) {
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    const group = groups.find(group => group.name === groupName);
    if (group) {
        group.items.push({ name: itemName, checked: isChecked });
        localStorage.setItem('groups', JSON.stringify(groups));
    }
}

// Remove a list item from localStorage
function removeListItem(groupName, itemName) {
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    const group = groups.find(group => group.name === groupName);
    if (group) {
        group.items = group.items.filter(item => item.name !== itemName);
        localStorage.setItem('groups', JSON.stringify(groups));
    }
}

// Update check status of a list item in localStorage
function updateCheckStatus(groupName, itemName, isChecked) {
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    const group = groups.find(group => group.name === groupName);
    if (group) {
        const item = group.items.find(item => item.name === itemName);
        if (item) item.checked = isChecked;
        localStorage.setItem('groups', JSON.stringify(groups));
    }
}
