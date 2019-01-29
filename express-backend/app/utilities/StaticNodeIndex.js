
var index=0 ;
class StaticNodeIndex {
    
    static getNextIndex() {
        return ++index;
    }
    static reset() {
        index = 0
    }
}

module.exports = StaticNodeIndex;