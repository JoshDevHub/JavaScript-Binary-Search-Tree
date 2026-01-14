import { describe, expect, test } from "@jest/globals";
import BinaryTree from "../src/binary-tree";

describe("BinaryTree", () => {
  describe("fromArray", () => {
    test("returns a new binary search tree with the given values", () => {
      const array = [5, -1, 3, 20, 4];
      const tree = BinaryTree.fromArray(array);

      expect(tree.toInorderArray()).toEqual(array.toSorted((a, b) => a - b));
    })
  })

  describe("insert", () => {
    // NOTE: `toInorderArray()` is used to for assertions here. This is because
    //   one of the main things we care about is that the "binary search" property
    //   (ie. for any node, all nodes to its left are lesser than and all nodes
    //   to the right are greater than) is preserved while changing the structure
    //   of the tree. As a pleasant side effect, this also captures the structural
    //   changes we'd expect (ie. after inserting the value 5, we'd expect 5 in
    //   the returned inorder array).

    test("adds a new value to the right subtree", () => {
      const tree = BinaryTree.fromArray([5, 10, 15]);

      expect(tree.toInorderArray()).toEqual([5, 10, 15]);
      tree.insert(20);

      expect(tree.toInorderArray()).toEqual([5, 10, 15, 20]);
    })

    test("adds a new value to the left subtree", () => {
      const tree = BinaryTree.fromArray([5, 10, 15]);

      expect(tree.toInorderArray()).toEqual([5, 10, 15]);
      tree.insert(0);

      expect(tree.toInorderArray()).toEqual([0, 5, 10, 15]);
    })

    test("does nothing if the given value is already in the tree", () => {
      const tree = BinaryTree.fromArray([5, 10, 15]);

      expect(tree.toInorderArray()).toEqual([5, 10, 15]);
      tree.insert(10);

      expect(tree.toInorderArray()).toEqual([5, 10, 15]);
    })

    test("adds the new value to the tree when used on an empty tree", () => {
      const tree = new BinaryTree();

      expect(tree.toInorderArray()).toEqual([]);
      tree.insert(10);

      expect(tree.toInorderArray()).toEqual([10]);
    })
  })

  describe("remove", () => {
    test("has no impact when the given value isn't in the tree", () => {
      const tree = new BinaryTree();

      expect(tree.toInorderArray()).toEqual([]);
      tree.remove(5);

      expect(tree.toInorderArray()).toEqual([]);
    })

    test("removes the node when the value matches the root and the root has no children", () => {
      const tree = BinaryTree.fromArray([5]);

      expect(tree.toInorderArray()).toEqual([5]);
      tree.remove(5);

      expect(tree.toInorderArray()).toEqual([]);
    })

    // the tree in the following tests is structured like:
    //
    // │       ┌── 8
    // │   ┌── 7
    // │   │   └── 6
    // └── 5
    //     │   ┌── 4
    //     └── 3
    //         └── 2
    //             └── 1

    // This gives me an opportunity to test different `#remove` scenarios

    test("removes a leaf node", () => {
      const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(tree.toInorderArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

      tree.remove(6)

      expect(tree.toInorderArray()).toEqual([1, 2, 3, 4, 5, 7, 8]);
    })

    test("removes a node with one child", () => {
      const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(tree.toInorderArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

      tree.remove(2);

      expect(tree.toInorderArray()).toEqual([1, 3, 4, 5, 6, 7, 8]);
    })

    test("removes a node with two children", () => {
      const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(tree.toInorderArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

      tree.remove(7);

      expect(tree.toInorderArray()).toEqual([1, 2, 3, 4, 5, 6, 8]);

    })
  })

  describe("includes", () => {
    test("returns false when the tree doesn't include the value", () => {
      const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);

      expect(tree.includes(100)).toBe(false);
    })

    test("returns true when the tree includes the value in the left subtree", () => {
      const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);

      expect(tree.includes(1)).toBe(true);
    })

    test("returns true when the tree includes the value in the right subtree", () => {
      const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);

      expect(tree.includes(8)).toBe(true);
    })
  })

  describe("levelOrderForEach", () => {
    const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);

    test("throws TypeError when not given a callback", () => {
      expect(() => tree.levelOrderForEach()).toThrow(TypeError);

      expect(() => tree.levelOrderForEach("not a func")).toThrow(TypeError);
    })

    test("executes a callback for the tree in level order", () => {
      const levelOrderVals = [];
      const callback = (val) => levelOrderVals.push(val);

      tree.levelOrderForEach(callback);

      const expectedVals = [5, 3, 7, 2, 4, 6, 8, 1];
      expect(levelOrderVals).toEqual(expectedVals);
    })
  })

  describe("inorderForEach", () => {
    const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);

    test("throws TypeError when not given a callback", () => {
      expect(() => tree.inorderForEach()).toThrow(TypeError);

      expect(() => tree.inorderForEach("not a func")).toThrow(TypeError);
    })

    test("executes a callback for the tree inorder", () => {
      const inorderVals = [];
      const callback = (val) => inorderVals.push(val);

      tree.inorderForEach(callback);

      const expectedVals = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(inorderVals).toEqual(expectedVals);
    })
  })

  describe("preorderForEach", () => {
    const tree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);

    test("throws TypeError when not given a callback", () => {
      expect(() => tree.preorderForEach()).toThrow(TypeError);

      expect(() => tree.preorderForEach("not a func")).toThrow(TypeError);
    })

    test("executes a callback for the tree preorder", () => {
      const preorderVals = [];
      const callback = (val) => preorderVals.push(val);

      tree.preorderForEach(callback);

      const expectedVals = [5, 3, 2, 1, 4, 7, 6, 8];
      expect(preorderVals).toEqual(expectedVals);
    })
  })
})
