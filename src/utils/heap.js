class Heap {
    constructor(data = []) {
        this.arr = data
        for(let i = this.arr.length - 1; i >= 0; i--)
            this.downHeapify(i)
    }

    swap(ind1, ind2) {
        const temp = this.arr[ind1]
        this.arr[ind1] = this.arr[ind2]
        this.arr[ind2] = temp
    }

    downHeapify(pi) {
        const lci = 2*pi + 1
        const rci = 2*pi + 2
        
        let maxIdx = pi

        if(lci < this.arr.length && this.arr[lci].amount > this.arr[maxIdx].amount) maxIdx = lci
        if(rci < this.arr.length && this.arr[rci].amount > this.arr[maxIdx].amount) maxIdx = rci

        if(maxIdx !== pi) {
            this.swap(maxIdx, pi)
            this.downHeapify(maxIdx)
        }
    }

    upHeapify(ci) {
        const pi = Math.floor((ci - 1) / 2)

        if(pi >= 0 && this.arr[pi].amount < this.arr[ci].amount) {
            this.swap(pi, ci)
            this.upHeapify(pi)
        }
    }

    top() {
        if(this.arr.length === 0) throw new Error('NullPointerException')
        return this.arr[0]
    }

    remove() {
        if(this.arr.length === 0) throw new Error('NullPointerException')

        const top = this.arr[0]
        this.swap(0, this.arr.length - 1)
        this.arr.pop()
        this.downHeapify(0)

        return top
    }

    add(ele) {
        this.arr.push(ele)
        this.upHeapify(this.arr.length - 1)
    }

    isEmpty() {
        return this.arr.length === 0
    }

    print() {
        this.arr.forEach(item => console.log(item))
    }
}


// const heap = new Heap([10, 2, -8, 16, -4, 5, 7, 3, -10, 20, 15, 13, 1])
// heap.add(100)
// while(!heap.isEmpty()) 
//     console.log(heap.remove());

// const heap2 = new Heap([{payer: 'John', amount: 100}])
// console.log(heap2.remove());


export default Heap
