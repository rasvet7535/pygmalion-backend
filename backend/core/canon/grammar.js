/**
 * Grammar Module
 * Re-exports Grammar Engine для unified API
 */
const GrammarEngine = require('../grammar-engine');

module.exports = {
  isValidOK: GrammarEngine.isValidOK,
  classifyOK: GrammarEngine.classifyOK,
  getAlphabet: GrammarEngine.getCanonicalAlphabet
};