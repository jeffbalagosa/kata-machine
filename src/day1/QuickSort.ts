function qs(arr: number[], lo: number, hi: number): void {}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];

    let idx = lo - 1;

    for (let i = 0; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}

export default function quick_sort(arr: number[]): void {}
