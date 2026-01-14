import { isPresent } from "./utils.js"

export default class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  inorderSuccessor() {
    let current = this.right;
    while (current?.left) {
      current = current.left;
    }

    return current;
  }

  isLeaf() {
    return this.children().length === 0;
  }

  hasTwoChildren() {
    return this.children().length === 2;
  }

  children() {
    return [this.left, this.right].filter(isPresent);
  }

  levelOrder(callback) {
    const queue = [this];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.value)
      queue.push(...current.children());
    }
  }

  inorder(callback) {
    this.left?.inorder(callback);
    callback(this.value);
    this.right?.inorder(callback);
  }

  preorder(callback) {
    callback(this.value);
    this.left?.preorder(callback);
    this.right?.preorder(callback);
  }

  postorder(callback) {
    this.left?.postorder(callback);
    this.right?.postorder(callback);
    callback(this.value);
  }
}
