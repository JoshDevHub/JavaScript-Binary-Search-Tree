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
    return !this.right && !this.left;
  }

  hasTwoChildren() {
    return this.right !== null && this.left !== null;
  }
}
