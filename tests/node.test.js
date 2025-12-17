import { describe, expect, test } from "@jest/globals";
import Node from "../src/node";

describe("Node", () => {
  describe("hasTwoChildren", () => {
    test("returns false for a node with no children", () => {
      const node = new Node(5);
      expect(node.hasTwoChildren()).toBe(false);
    })

    test("returns false for a node with only a left child", () => {
      const node = new Node(5);
      node.left = new Node(6);

      expect(node.hasTwoChildren()).toBe(false);
    })

    test("returns false for a node with only a right child", () => {
      const node = new Node(5);
      node.right = new Node(6);

      expect(node.hasTwoChildren()).toBe(false);
    })

    test("returns true for a node with both left and right children", () => {
      const node = new Node(5);
      node.right = new Node(6);
      node.left = new Node(4);

      expect(node.hasTwoChildren()).toBe(true);
    })
  })
})
