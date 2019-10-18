const chai = require('chai');
const expect = chai.expect;
var sinon = require('sinon');

const { autoCompleteProgram } = require('../program/autoCompleter.js');

describe('autoCompleteProgram', function() {
  const wordFragment = 'demo';
  const testFile = './testFiles/about-act-blue.txt';
  
  it('returns sorted list of word suggestions for all files', async function() {
    const processStub = sinon.sandbox.create();
    processStub
      .stub(process, 'argv')
      .value(['node', 'autoCompleter.js', wordFragment, testFile]);

    const autoComplete = await autoCompleteProgram(wordFragment);

    expect(autoComplete).to.deep.equal([
      { suggestion: 'democratic', count: 2 },
      { suggestion: 'democracy', count: 1 },
    ]);
  });
});
