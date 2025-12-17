import Node from "./node";

class BinaryTree {
  #root;

  static fromArray(array) {
    const sortedUniqArray = [...new Set(array)].sort((a, b) => a - b);
    const root = this.#recursivelyBuildRoot(sortedUniqArray);

    return new BinaryTree(root);
  }

  static #recursivelyBuildRoot(array) {
    if (array.length === 0) return null;

    const middleIdx = Math.floor(array.length / 2);
    const root = new Node(array[middleIdx]);
    root.left = this.#recursivelyBuildRoot(array.slice(0, middleIdx));
    root.right = this.#recursivelyBuildRoot(array.slice(middleIdx + 1));

    return root;
  }

  constructor(root = null) {
    this.#root = root;
  }

  insert(value) {
    if (!this.#root) {
      this.#root = new Node(value);
      return;
    }

    this.#recursivelyInsert(this.#root, value);
  }

  #recursivelyInsert(node, value) {
    if (!node) return new Node(value);

    if (node.value < value) {
      node.right = this.#recursivelyInsert(node.right, value);
    } else if (node.value > value) {
      node.left = this.#recursivelyInsert(node.left, value);
    }

    return node;
  }

  remove(value, currentNode = this.root) {
    if (currentNode === null) return currentNode;

    if (currentNode.value === value) {
      currentNode = this.#removeNodeHelper(currentNode);
    } else if (currentNode.value > value) {
      currentNode.leftChild = this.remove(value, currentNode.leftChild);
    } else {
      currentNode.rightChild = this.remove(value, currentNode.rightChild);
    }
    return currentNode;
  }

  find(value, node = this.root) {
    if (node === null || node.value === value) return node;

    if (node.value < value) {
      return this.find(value, node.rightChild);
    } else {
      return this.find(value, node.leftChild);
    }
  }

  levelOrder(callbackFn) {
    const queue = [this.root];
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

  inorderForEach(callback) {
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function.`);
    }

    this.#recurseInorder(this.#root, callback);
  }

  #recurseInorder(node, callback) {
    if (!node) return;

    this.#recurseInorder(node.left, callback);
    callback(node.value);
    this.#recurseInorder(node.right, callback);
  }

  toInorderArray() {
    const result = [];
    this.inorderForEach((value) => result.push(value));
    return result;
  }

  preorder(callbackFn, node = this.root, preorderList = []) {
    if (node === null) return;

    callbackFn ? callbackFn(node) : preorderList.push(node.value);
    this.preorder(callbackFn, node.leftChild, preorderList);
    this.preorder(callbackFn, node.rightChild, preorderList);

    if (preorderList.length > 0) return preorderList;
  }

  postorder(callbackFn, node = this.root, postorderList = []) {
    if (node === null) return;

    this.postorder(callbackFn, node.leftChild, postorderList,);
    this.postorder(callbackFn, node.rightChild, postorderList);
    callbackFn ? callbackFn(node) : postorderList.push(node.value);

    if (postorderList.length > 0) return postorderList;
  }

  height(node = this.root) {
    if (node === null) return 0;

    const leftHeight = this.height(node.leftChild);
    const rightHeight = this.height(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(nodeVal, node = this.root, edgeCount = 0) {
    if (node === null) return;
    if (node.value === nodeVal) return edgeCount;

    if (node.value < nodeVal) {
      return this.depth(nodeVal, node.rightChild, edgeCount + 1);
    } else {
      return this.depth(nodeVal, node.leftChild, edgeCount + 1);
    }
  }

  isBalanced() {
    return this.#testBalance(this.root) !== -1;
  }

  rebalance() {
    const inorderList = this.inorder();
    this.root = this.buildTree(inorderList);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.rightChild) {
      this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '|   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftChild) {
      this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '|   '}`, true)
    }
  }

  // private methods
  #testBalance(node) {
    if (node === null) return 0;

    const leftBalance = this.#testBalance(node.leftChild);
    const rightBalance = this.#testBalance(node.rightChild);
    const diff = Math.abs(leftBalance - rightBalance);

    if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
      return -1;
    } else {
      return Math.max(leftBalance, rightBalance) + 1;
    }
  }

  #inorderSuccessorFor(node) {
    let currentNode = node;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }
    return currentNode;
  }

  #removeNodeHelper(node) {
    if (node.leftChild && node.rightChild) {
      const successorNode = this.#inorderSuccessorFor(node.rightChild);
      node.value = successorNode.value;
      node.rightChild = this.remove(successorNode.value, node.rightChild);
      return node;
    } else {
      const replacementNode = node.rightChild || node.leftChild;
      node = null;
      return replacementNode;
    }
  }
}

module.exports = BinaryTree
