import Node from "./node.js";
import Traversal from "./traversal.js";

export default class BinaryTree {
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

  remove(value) {
    if (!this.#root) return;

    if (this.#root.value === value && this.#root.isLeaf()) {
      this.#root = null;
      return;
    }

    this.#recursivelyRemove(value, this.#root)
  }

  #recursivelyRemove(value, node) {
    if (!node) return node;

    if (node.value === value) {
      if (!node.hasTwoChildren()) {
        return node.left ?? node.right;
      }

      node.value = node.inorderSuccessor().value;
      node.right = this.#recursivelyRemove(node.value, node.right);
    }

    if (node.value < value) {
      node.right = this.#recursivelyRemove(value, node.right);
    } else if (node.value > value) {
      node.left = this.#recursivelyRemove(value, node.left);
    }

    return node;
  }

  includes(value) {
    return this.#find(value, this.#root) !== null;
  }

  #find(value, node) {
    if (!node || node.value === value) return node;

    if (node.value < value) {
      return this.#find(value, node.right);
    }

    return this.#find(value, node.left);
  }

  levelOrderForEach(callback) {
    new Traversal(this.#root, callback).levelOrder();
  }

  inorderForEach(callback) {
    new Traversal(this.#root, callback).inorder();
  }

  preorderForEach(callback) {
    new Traversal(this.#root, callback).preorder();
  }

  postorderForEach(callback) {
    new Traversal(this.#root, callback).postorder();
  }

  toInorderArray() {
    const result = [];
    this.inorderForEach((value) => result.push(value));
    return result;
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

  prettyPrint(node = this.#root, prefix = "", isLeft = true) {
    if (!node) return;

    this.prettyPrint(node.right, `${prefix}${isLeft ? '|   ' : '    '}`, false)
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '|   '}`, true)
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
}
