const chai = require('chai');
const expect = chai.expect;
const { Trie, Node, WordsFound } = require('./trie.js');

describe('WordsFound', function() {
  describe('fetchWordInfo', function() {
    it('returns the count value of a prior stored word', function() {
      const myWordsFoundClass = new WordsFound();
      const randomWord = 'foo-bar';
      myWordsFoundClass.update(randomWord);

      const frequencyCount = myWordsFoundClass.fetchWordInfo(randomWord);

      expect(frequencyCount).to.equal(1);
    });
  });

  describe('update', function() {
    it('keeps track of completed words and their frequency', function() {
      const myWordsFoundClass = new WordsFound();
      const randomWord = 'foo-bar';

      myWordsFoundClass.update(randomWord);
      myWordsFoundClass.update(randomWord);

      const frequencyCount = myWordsFoundClass.fetchWordInfo(randomWord);

      expect(frequencyCount).to.equal(2);
    });
  });
});

describe('Node', function() {
  describe('getWord', function() {
    it('returns a word based on the connected parentNodes and children', function() {
      const rootNode = new Node('b');
      const childNode = new Node('a');
      const grandchildNode = new Node('z');
      rootNode.children['a'] = childNode;
      rootNode.children['a'].parentNode = rootNode;
      childNode.children['z'] = grandchildNode;
      childNode.children['z'].parentNode = childNode;
      grandchildNode.end = true;

      const wordReturned = grandchildNode.getWord();

      expect(wordReturned).to.equal('baz');
    });
  });
});

describe('Trie', function() {
  describe('insert', function() {
    it('creates nodes for each letter in a given word', function() {
      const myTrie = new Trie();
      const randomWord = 'foo';

      myTrie.insert(randomWord);

      const firstLetterNode = myTrie.root.children.f;
      const firstLetterNodeChild = firstLetterNode.children.o;

      expect(firstLetterNode.key).to.equal('f');
      expect(firstLetterNodeChild.key).to.equal('o');
    });
  });
  
  describe('search', function() {
    it('returns all possible words with given word fragment', function() {
      const myTrie = new Trie();
      const randomWord = 'foobar';
      myTrie.insert(randomWord);
      const wordFragment = 'foo';

      const possibleWords = myTrie.search(wordFragment);

      expect(possibleWords).to.be.an('array');
      expect(possibleWords[0]).to.include({ suggestion: randomWord });
    });
  });
});
