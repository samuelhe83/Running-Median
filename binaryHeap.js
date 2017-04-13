class BinaryHeap {

  constructor() {
    this._storage = [];

  }

  add(ele) {
    this._storage.push(ele);
    this.bubbleUp(this.size() - 1);
  }

  bubbleUp(idx) {
    while (idx > 0) {
      var element = this._storage[idx];
      var parentIdx = Math.floor((idx + 1) / 2 - 1);
      var parent = this._storage[parentIdx];

      if (element > parent) {
        break;
      }

      if (element < parent) {
        this._storage[parentIdx] = element;
        this._storage[idx] = parent;
        idx = parentIdx;
      }
    }
  }

  sinkDown(idx) {
    var element = this._storage[idx];
    var length = this.size()

    while (true) {

      var child1Idx = Math.floor((idx + 1) * 2 - 1);
      var child2Idx = child1Idx + 1;

      var child1 = this._storage[child1Idx];
      var child2 = this._storage[child2Idx];

      var swap = null;
      if (child1Idx < length) {
        if (child1 < element) {
          swap = child1Idx;
        }
      }

      if (child2Idx < length) {
        if (child2 < (swap === null ? element : child1)) {
          swap = child2Idx;
        }
      }

      if (swap === null) {
        break;
      }

      this._storage[idx] = this._storage[swap];
      this._storage[swap] = element;
      idx = swap;

    }

  }

  remove(ele) {
    var length = this.size();

    for (var i = 0; i < length; i++) {
      if (this._storage[i] === ele) {
        var end = this._storage.pop();

        this._storage[i] = end;
        this.bubbleUp(i);
        this.sinkDown(i);
      }
    }
  }

  removeByIdx(idx) {
    var end = this._storage.pop();
    this._storage[idx] = end;
    this.bubbleUp(idx);
    this.sinkDown(idx);
  }

  size() {
    return this._storage.length;
  }
}

class ReverseHeap extends BinaryHeap {
  constructor() {

    super();

  }

  sinkDown(idx) {


    while (true) {
      var element = this._storage[idx];
      var swap = null;
      var child2Idx = (idx + 1) * 2;
      var child1Idx = child2Idx - 1;
      var length = this.size();

      var child1 = this._storage[child1Idx];
      var child2 = this._storage[child2Idx];

      if (child1Idx < length && child1 > element) {
        swap = child1Idx;

      } else if (child2Idx < length && child2 > (swap === null ? element : child1)) {
        swap = child2Idx;
      }

      if (swap === null) {
        break;
      }

      this._storage[idx] = this._storage[swap];
      this._storage[swap] = element;
      idx = swap;
    }
  }


  bubbleUp(idx) {

    while (idx > 0) {

      var element = this._storage[idx];
      var parentIdx = Math.floor((idx + 1) / 2 - 1);
      var parent = this._storage[parentIdx];
      if (parent >= element) {
        break;
      } else if (parent < element) {
        this._storage[parentIdx] = element;
        this._storage[idx] = parent;
        idx = parentIdx;
      }
    }


  }
}


function main(arr) {
  var n = arr.length;
  var minHeap = new BinaryHeap();
  var maxHeap = new ReverseHeap();

  for (var i = 0; i < n; i++) {
    var minSize = minHeap.size();
    var maxSize = maxHeap.size();

    var element = arr[i];
    if (minSize === 0 || element > minHeap._storage[0]) {
      minHeap.add(element);
    } else if (maxSize === 0 || element < maxHeap._storage[0]) {
      maxHeap.add(element);
    } else {
      maxSize > minSize ? minHeap.add(element) : maxHeap.add(element);
    }
    minSize = minHeap.size();
    maxSize = maxHeap.size();
    if (Math.abs(minSize - maxSize) > 1) {
      if (minSize > maxSize) {
        maxHeap.add(minHeap._storage[0]);
        minHeap.removeByIdx(0);
      } else {
        minHeap.add(maxHeap._storage[0]);
        maxHeap.removeByIdx(0);
      }
    }


    var median;
    minSize = minHeap.size();
    maxSize = maxHeap.size();
    if (minSize !== maxSize) {

      if (minSize > maxSize) {
        median = minHeap._storage[0].toFixed(1);
      } else if (maxSize > minSize) {

        median = maxHeap._storage[0].toFixed(1);

      }
    } else {
      median = ((minHeap._storage[0] + maxHeap._storage[0]) / 2).toFixed(1);

    }
    console.log(median);

  }
}

main([123412, 12341, 23234235, 123412341, 2324234212361261, 3463475856, 6745745, 34, 34534353453]);


