export default class Traversal {
  #node;
  #callback;

  constructor(node, callback) {
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }

    this.#node = node;
    this.#callback = callback;
  }

  inorder(node = this.#node) {
    if (!node) return;

    this.inorder(node.left);
    this.#callback(node.value);
    this.inorder(node.right);
  }

  preorder(node = this.#node) {
    if (!node) return;

    this.#callback(node.value);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  postorder(node = this.#node) {
    if (!node) return;

    this.postorder(node.left);
    this.postorder(node.right);
    this.#callback(node.value);
  }

  levelOrder() {
    if (!this.#node) return;

    const queue = [this.#node];
    while (queue.length > 0) {
      const current = queue.shift();
      this.#callback(current.value);

      const enqList = [current.left, current.right].filter(Boolean);
      queue.push(...enqList);
    }
  }
}
