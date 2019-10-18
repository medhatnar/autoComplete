const chai = require('chai');
const expect = chai.expect;
var sinon = require('sinon');
const { autoCompleteProgram } = require('./autoCompleter.js');

describe('autoCompleteProgram', function() {
    it('parses each file passed into a Trie data structure', function() {
      const wordFragment = 'foo';
      const frequencyCount = autoCompleteProgram(wordFragment);

      expect(frequencyCount).to.equal();
    });
  });