type Node<T> = {
    value: T;
    next?: Node<T> | null;
    prev?: Node<T> | null;
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
        const node = { value: item, next: this.head, prev: null } as Node<T>;

        this.length++;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.head.prev = node;
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }

        return;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (idx === this.length) {
            this.append(item);
            return;
        }

        const node = { value: item } as Node<T>;
        let current = this.head;
        for (let i = 0; i < idx - 1; i++) {
            current = current?.next || null;
        }

        node.next = current?.next || null;
        node.prev = current;
        current!.next = node;
        this.length++;

        return;
    }

    append(item: T): void {
        const node = { value: item, next: null, prev: this.tail } as Node<T>;

        this.length++;
        if (!this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;

        if (!this.head) {
            this.head = node;
        }

        return;
    }

    remove(item: T): T | undefined {
        let current = this.head;
        while (current) {
            if (current.value === item) {
                this.length--;

                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next || null;
                }

                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev || null;
                }

                return current.value;
            }

            current = current?.next || null;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current?.next || null;
        }

        return current?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let current = this.head;
        for (let i = 0; i < idx; i++) {
            current = current?.next || null;
        }

        this.length--;

        if (current!.prev) {
            current!.prev.next = current!.next;
        } else {
            this.head = current!.next || null;
        }

        if (current!.next) {
            current!.next.prev = current!.prev;
        } else {
            this.tail = current!.prev || null;
        }

        return current!.value;
    }
}
