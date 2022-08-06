const BinaryTree = require("./binary-tree")

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const tree = BinaryTree(randomArray(20));

console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

tree.insert(300);
tree.insert(400);
tree.insert(500);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

tree.prettyPrint();
