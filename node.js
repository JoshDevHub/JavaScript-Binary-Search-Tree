const Node = (value = null, leftChild = null, rightChild = null) => {
  return {
    value,
    leftChild,
    rightChild
  }
}

module.exports = Node;
