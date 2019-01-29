
class staticNodeIndex {
    static index = 0;
    static getNextIndex() {
        return ++staticNodeIndex.index;
    }
    static reset() {
        staticNodeIndex.index = 0
    }
}

export default staticNodeIndex;