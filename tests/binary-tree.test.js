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
})
