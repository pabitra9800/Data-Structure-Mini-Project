let stack = [];
let queue = [];
let array = [];
let arrayType = null;
let linkedList = []; // Initialize linked list
let bstRoot = null; // Root of the Binary Search Tree

// Toggle content visibility with effects
function toggleContent(dataStructure) {
  // Get all tabs and remove the active class
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.remove("active-tab"));

  // Get all content sections and hide them
  const allContent = document.querySelectorAll(".data-structure-content");
  allContent.forEach((section) => section.classList.remove("active-content"));

  // Get the content and tab of the clicked data structure
  const content = document.getElementById(dataStructure + "-content");
  const tab = document.getElementById(dataStructure + "-tab");

  // Check if the content is already visible
  if (content.classList.contains("active-content")) {
    // If content is visible, hide it and remove the active class from the tab
    content.classList.remove("active-content");
    tab.classList.remove("active-tab");
  } else {
    // If content is not visible, show it and add the active class to the tab
    content.classList.add("active-content");
    tab.classList.add("active-tab");
  }
}

function displayStack() {
  const stackDisplay = document.getElementById("stack-display");
  stackDisplay.innerHTML = stack.join(" | ") || "Stack is empty";
}

function displayQueue() {
  const queueDisplay = document.getElementById("queue-display");
  queueDisplay.innerHTML = queue.join(" | ") || "Queue is empty";
}

function displayArray() {
  const arrayDisplay = document.getElementById("array-display");
  arrayDisplay.innerHTML = array.join(" | ") || "Array is empty";
}

// Function to display the Linked List
function displayLinkedList() {
  const linkedListDisplay = document.getElementById("linked-list-display");
  linkedListDisplay.innerHTML =
    linkedList.join(" -> ") || "Linked List is empty";
}

// Function to display the BST (in-order traversal)
function displayBST() {
  const bstDisplay = document.getElementById("bst-display");
  bstDisplay.innerHTML =
    inOrderTraversal(bstRoot).join(" -> ") || "BST is empty";
}

function isValidInput(input) {
  return input && input.trim() !== "";
}

function addToArray() {
  if (array.length === 0) {
    const newElement = prompt(
      "Enter an element to add to the array (This will define the type):"
    );
    if (isValidInput(newElement)) {
      arrayType = typeof newElement.trim();
      array.push(newElement.trim());
      displayArray();
    } else {
      alert("Please enter a valid non-empty element!");
    }
  } else {
    const newElement = prompt(
      `Enter an element of type ${arrayType} to add to the array:`
    );
    if (isValidInput(newElement)) {
      if (typeof newElement.trim() === arrayType) {
        array.push(newElement.trim());
        displayArray();
      } else {
        alert(`Please enter a valid element of type ${arrayType}`);
      }
    } else {
      alert("Please enter a valid non-empty element!");
    }
  }
}

function removeFromArray() {
  if (array.length > 0) {
    array.pop();
    if (array.length === 0) arrayType = null; // Reset the type if array becomes empty
    displayArray();
  } else {
    alert("Array is empty! Cannot remove.");
  }
}

function pushToStack() {
  const newElement = prompt("Enter an element to push to the stack:");
  if (isValidInput(newElement)) {
    stack.push(newElement.trim());
    displayStack();
  } else {
    alert("Please enter a valid non-empty element!");
  }
}

function popFromStack() {
  if (stack.length > 0) {
    stack.pop();
    displayStack();
  } else {
    alert("Stack is empty! Cannot pop.");
  }
}

function enqueue() {
  const newElement = prompt("Enter an element to enqueue:");
  if (isValidInput(newElement)) {
    queue.push(newElement.trim());
    displayQueue();
  } else {
    alert("Please enter a valid non-empty element!");
  }
}

function dequeue() {
  if (queue.length > 0) {
    queue.shift();
    displayQueue();
  } else {
    alert("Queue is empty! Cannot dequeue.");
  }
}

// Function to add to the Linked List
function addToLinkedList() {
  const newElement = prompt("Enter a value to add to the Linked List:");
  if (isValidInput(newElement)) {
    linkedList.push(newElement.trim());
    displayLinkedList();
  } else {
    alert("Please enter a valid non-empty element!");
  }
}

// Function to remove from the Linked List
function removeFromLinkedList() {
  if (linkedList.length > 0) {
    linkedList.shift(); // Removing the first element
    displayLinkedList();
  } else {
    alert("Linked List is empty! Cannot remove.");
  }
}

// Node class to represent each element in the tree
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Function to insert a value in the BST
function insertToBST() {
  const newValue = prompt(
    "Enter a value to insert into the Binary Search Tree:"
  );
  if (isValidInput(newValue)) {
    const newNode = new TreeNode(newValue.trim());
    bstRoot = insertNode(bstRoot, newNode);
    displayBST();
  } else {
    alert("Please enter a valid non-empty element!");
  }
}

// Helper function to insert a node into the BST
function insertNode(root, node) {
  if (root === null) {
    return node;
  }
  if (node.value < root.value) {
    root.left = insertNode(root.left, node);
  } else {
    root.right = insertNode(root.right, node);
  }
  return root;
}

// Helper function to perform in-order traversal of the BST
function inOrderTraversal(root) {
  if (root === null) {
    return [];
  }
  return [
    ...inOrderTraversal(root.left),
    root.value,
    ...inOrderTraversal(root.right),
  ];
}

// Function to remove a value from the BST
function removeFromBST() {
  if (bstRoot) {
    const valueToRemove = prompt(
      "Enter a value to remove from the Binary Search Tree:"
    );
    if (isValidInput(valueToRemove)) {
      bstRoot = removeNode(bstRoot, valueToRemove.trim());
      displayBST();
    } else {
      alert("Please enter a valid non-empty element!");
    }
  } else {
    alert("Tree is empty! Cannot remove.");
  }
}

// Helper function to remove a node from the BST
function removeNode(root, value) {
  if (root === null) {
    return null;
  }

  if (value < root.value) {
    root.left = removeNode(root.left, value);
  } else if (value > root.value) {
    root.right = removeNode(root.right, value);
  } else {
    // Node to be deleted found
    // Case 1: No children (Leaf node)
    if (root.left === null && root.right === null) {
      return null;
    }
    // Case 2: One child
    if (root.left === null) {
      return root.right;
    }
    if (root.right === null) {
      return root.left;
    }
    // Case 3: Two children
    let minNode = findMinNode(root.right);
    root.value = minNode.value;
    root.right = removeNode(root.right, minNode.value);
  }
  return root;
}

// Helper function to find the minimum node in a BST
function findMinNode(root) {
  while (root.left !== null) {
    root = root.left;
  }
  return root;
}

// Initialize with Stack content visible
displayStack();
displayQueue();
displayArray();
displayLinkedList();
displayBST();
