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

  describe("isLeaf", () => {
    test("returns false for a node with two children", () => {
      const node = new Node(5);
      node.right = new Node(10);
      node.left = new Node(1);

      expect(node.isLeaf()).toBe(false);
    })

    test("returns false for a node with only a right child", () => {
      const node = new Node(5);
      node.right = new Node(10);

      expect(node.isLeaf()).toBe(false);
    })

    test("returns false for a node with only a left child", () => {
      const node = new Node(5);
      node.left = new Node(0);

      expect(node.isLeaf()).toBe(false);
    })

    test("returns true for a node no children", () => {
      const node = new Node(5);

      expect(node.isLeaf()).toBe(true);
    })
  })

  describe("inorderSuccessor", () => {
    test("returns null with a node that has no children", () => {
      const node = new Node(5);

      expect(node.inorderSuccessor()).toBeNull();
    })

    test("returns null with a node that only has a left child", () => {
      const node = new Node(5);
      node.left = new Node(4);

      expect(node.inorderSuccessor()).toBeNull();
    })

    test("return the right node with a node that has a leaf node as its right child", () => {
      const node = new Node(5);
      const successor = new Node(10);
      node.right = successor;

      expect(node.inorderSuccessor()).toBe(successor);
    })

    test("returns the leftmost node in the right subtree", () => {
      const node = new Node(5);
      const successor = new Node(6);

      node.right = new Node(10);
      node.right.right = new Node(11);
      node.right.left = new Node(8);
      node.right.left.left = successor;

      expect(node.inorderSuccessor()).toBe(successor);
    })
  })
})
