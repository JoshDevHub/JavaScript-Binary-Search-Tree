const Node = require("./node")

const BinaryTree = (array) => {
  const sortedArrayData = [...new Set(array)].sort((a, b) => a - b);

  let root = buildTree(sortedArrayData);

  function buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const midpoint = Math.floor(sortedArray.length / 2);
    const newNode = Node(sortedArray[midpoint]);
    const leftSubTree = buildTree(sortedArray.slice(0, midpoint));
    const rightSubTree = buildTree(sortedArray.slice(midpoint + 1));
    
    newNode.leftChild = leftSubTree;
    newNode.rightChild = rightSubTree;
    return newNode;
  }

  function insert(value, currentNode = root) {
    if (currentNode === null) return Node(value);
    if (currentNode.value === value) return;

    if (currentNode.value < value) {
      currentNode.rightChild = insert(value, currentNode.rightChild);
    } else {
      currentNode.leftChild = insert(value, currentNode.leftChild);
    }
    return currentNode;
  }

  function remove(value, currentNode = root) {
    if (currentNode === null) return currentNode;

    if (currentNode.value === value) {
      currentNode = removeNodeHelper(currentNode);
    } else if (currentNode.value > value) {
      currentNode.leftChild = remove(value, currentNode.leftChild);
    } else {
      currentNode.rightChild = remove(value, currentNode.rightChild);
    }
    return currentNode;
  }

  function removeNodeHelper(node) {
    if (node.leftChild && node.rightChild) {
      const successorNode = inorderSuccessorFor(node.rightChild);
      node.value = successorNode.value;
      node.rightChild = remove(successorNode.value, node.rightChild);
      return node;
    } else {
      const replacementNode = node.rightChild || node.leftChild;
      node = null;
      return replacementNode;
    }
  }

  function inorderSuccessorFor(node) {
    let currentNode = node;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }
    return currentNode;
  }

  function find(value, node = root) {
    if (node === null || node.value === value) return node;

    if (node.value < value) {
      return find(value, node.rightChild);
    } else {
      return find(value, node.leftChild);
    }
  }

  function levelOrder(callbackFn) {
    const queue = [root];
    const levelOrderList = [];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callbackFn ? callbackFn(currentNode) : levelOrderList.push(currentNode.value);

      const enqueueList = [
        currentNode?.leftChild,
        currentNode?.rightChild
      ].filter((value) => value);
      queue.push(...enqueueList);
    }
    if (levelOrderList.length > 0) return levelOrderList;
  }

  function inorder(callbackFn, node = root, inorderList = []) {
    if (node === null) return;

    inorder(callbackFn, node.leftChild, inorderList);
    callbackFn ? callbackFn(node) : inorderList.push(node.value);
    inorder(callbackFn, node.rightChild, inorderList);

    if (inorderList.length > 0) return inorderList;
  }

  function preorder(callbackFn, node = root, preorderList = []) {
    if (node === null) return;

    callbackFn ? callbackFn(node) : preorderList.push(node.value);
    preorder(callbackFn, node.leftChild, preorderList);
    preorder(callbackFn, node.rightChild, preorderList);

    if (preorderList.length > 0) return preorderList;
  }

  function postorder(callbackFn, node = root, postorderList = []) {
    if (node === null) return;

    postorder(callbackFn, node.leftChild, postorderList,);
    postorder(callbackFn, node.rightChild, postorderList);
    callbackFn ? callbackFn(node) : postorderList.push(node.value);

    if (postorderList.length > 0) return postorderList;
  }

  function height(node = root) {
    if (node === null) return 0;

    const leftHeight = height(node.leftChild);
    const rightHeight = height(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(nodeVal, node = root, edgeCount = 0) {
    if (node === null) return;
    if (node.value === nodeVal) return edgeCount;

    if (node.value < nodeVal) {
      return depth(nodeVal, node.rightChild, edgeCount + 1);
    } else {
      return depth(nodeVal, node.leftChild, edgeCount + 1);
    }
  }

  function isBalanced() {
    return testBalance(root) !== -1;
  }

  function testBalance(node) {
    if (node === null) return 0;

    const leftBalance = testBalance(node.leftChild);
    const rightBalance = testBalance(node.rightChild);
    const diff = Math.abs(leftBalance - rightBalance);

    if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
      return -1;
    } else {
      return Math.max(leftBalance, rightBalance) + 1;
    }
  }

  function rebalance() {
    const inorderList = inorder();
    root = buildTree(inorderList);
  }

  function prettyPrint(node = root, prefix = "", isLeft = true) {
    if (node.rightChild) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '|   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftChild) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '|   '}`, true)
    }
  }

  return {
    insert,
    remove,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    inorder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint
  }
}

module.exports = BinaryTree
