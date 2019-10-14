class Node {
  constructor(key) {
    this.key = key;
    this.parentNode = null;
    this.childrenNodes = {};
    this.end = false;
  }

  getWord() {
    var word = '';
    var node = this;

    while (node !== null) {
      word = node.key + word;
      node = node.parent;
    }

    return word;
  }
}
// -----------------------------------------

class Trie {
  constructor() {
    this.root = new Node(null);
  }

  insert(word) {
    var node = this.root;

    for (var i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new Node(word[i]);

        node.children[word[i]].parent = node;
      }

      node = node.children[word[i]];

      if (i == word.length - 1) {
        node.end = true;
      }
    }
  }

  find(prefix) {
    var node = this.root;
    var output = [];

    for (var i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return output;
      }
    }

    function findAllWords(node, arr) {
      if (node.end) {
        arr.unshift(node.getWord());
      }

      for (var child in node.children) {
        findAllWords(node.children[child], arr);
      }
    }

    findAllWords(node, output);

    return output;
  }
}

export default Trie;