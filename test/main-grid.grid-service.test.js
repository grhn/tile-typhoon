describe('grid service test:', function() {
    beforeEach(function() {
        module('mainGrid');
        
        inject(function(_GridService_) {
            GridService = _GridService_;
        });
    });

    it('generated grid should be consistent', function() {
        function check(size) {
            var innerSize = Math.round(Math.sqrt(size));
            GridService.createGrid(size);
            for (var i = 0; i < size; i++) {
                var indexOffset = i * size;
                var valueOffset = Math.floor(i / innerSize) * innerSize;
                for (var j = 0; j < size; j++) {
                    var expectedValue = 1 + Math.floor(j / innerSize) + valueOffset;
                    expect(GridService.grid[j + indexOffset].value).toEqual(expectedValue);
                }
            }
        }
        check(1);
        check(4);
        check(9);
        check(16);
    });

    it('randomness should be increased by x', function() {
        function check(x) {
            var origValue = GridService.randomness;
            GridService.increaseRandomness(x);
            expect(GridService.randomness).toEqual(origValue + x);
        }
        check(1);
        check(2);
        check(3);
        check(1689);
    });

    it('consistency check should return true for consistent grid', function() {
        function check(size) {
            GridService.createGrid(size);
            expect(GridService.checkPositions()).toEqual(true);
        }
        check(1);
        check(4);
        check(9);
        check(16);
    });
});
