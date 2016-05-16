'use strict';

describe('Service: Node', function() {

  // load the service's module
  beforeEach(module('editorApp'));

  // instantiate service
  let Node;
  beforeEach(inject(function(_Node_) {
    Node = _Node_;
  }));

  it('updateVersion should inc node version',
    function() {
      let node = {
        $meta: {
          version: 1
        }
      };
      Node.updateVersion(node);

      expect(node.$meta.version).toBe(2);
    });

  it('updateVersion should set node version to 1 if it is equal to Number.MAX_SAFE_INTEGER',
    function() {
      let node = {
        $meta: {
          version: Number.MAX_SAFE_INTEGER
        }
      };
      Node.updateVersion(node);

      expect(node.$meta.version).toBe(1);
    });

  it('addService should add service to node services array and set node to service $meta object',
    function() {
      let node = {};
      let service = {
        $meta: {}
      };
      Node.addService(node, service);

      expect(node.services).toBeDefined();
      expect(node.services.length).toBe(1);
      expect(node.services[0]).toBe(service);
      expect(service.$meta.node).toBe(node);
    });

  it('addDecorator should add decorator to node decorators array and set node to decorator $meta object',
    function() {
      let node = {};
      let decorator = {
        $meta: {}
      };
      Node.addDecorator(node, decorator);

      expect(node.decorators).toBeDefined();
      expect(node.decorators.length).toBe(1);
      expect(node.decorators[0]).toBe(decorator);
      expect(decorator.$meta.node).toBe(node);
    });

  it('addChildNode should add child node to childNodes array of the parent node and set node to child node $meta object',
    function() {
      let node = {};
      let childNode = {
        $meta: {}
      };
      Node.addChildNode(node, childNode);

      expect(node.childNodes).toBeDefined();
      expect(node.childNodes.length).toBe(1);
      expect(node.childNodes[0]).toBe(childNode);
      expect(childNode.$meta.parentNode).toBe(node);
    });

  it('addService should fail if the service is already in a node',
    function() {
      let node = {};
      let service = {
        $meta: {
          node: {}
        }
      };
      expect(() => Node.addService(node, service)).toThrowError();
    });

  it('addDecorator should fail if the decorator is already in a node',
    function() {
      let node = {};
      let decorator = {
        $meta: {
          node: {}
        }
      };
      expect(() => Node.addDecorator(node, decorator)).toThrowError();
    });

  it('addChildNode should fail if the node is already child of a node',
    function() {
      let node = {};
      let childNode = {
        $meta: {
          parentNode: {}
        }
      };
      expect(() => Node.addChildNode(node, childNode)).toThrowError();
    });
});
