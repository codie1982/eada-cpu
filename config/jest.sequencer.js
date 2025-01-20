const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
    sort(tests) {
        return tests.sort((a, b) => {
            if (a.path.includes('test-index.js')) return -1;
            if (b.path.includes('test-search.js')) return 1;
            return 0;
        });
    }
}

module.exports = CustomSequencer;
