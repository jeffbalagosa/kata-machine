type Node<T> = {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
};

export default class DoublyLinkedList<T> {
    public length: number;
    public head: Node<T> | null;
    public tail: Node<T> | null;

    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item, next: this.head, prev: null };

        if (this.head) {
            this.head.prev = node;
        } else {
            this.tail = node;
        }

        this.head = node;
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }

        let current = this.head;
        for (let i = 0; i < idx - 1; i++) {
            current = current!.next;
        }

        const node: Node<T> = { value: item, next: current!.next, prev: current };
        current!.next!.prev = node;
        current!.next = node;
        this.length++;
    }

    append(item: T): void {
        const node: Node<T> = { value: item, next: null, prev: this.tail };

        if (this.tail) {
            this.tail.next = node;
        } else {
            this.head = node;
        }

        this.tail = node;
        this.length++;
    }

    remove(item: T): T | undefined {
        let current = this.head;
        while (current) {
            if (current.value === item) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next;
                }

                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }

                this.length--;
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current!.next;
        }
        return current!.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current!.next;
        }

        if (current!.prev) {
            current!.prev.next = current!.next;
        } else {
            this.head = current!.next;
        }

        if (current!.next) {
            current!.next.prev = current!.prev;
        } else {
            this.tail = current!.prev;
        }

        this.length--;
        return current!.value;
    }
}
