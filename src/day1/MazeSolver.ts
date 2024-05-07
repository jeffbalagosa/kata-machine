const dir = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
];

/**
 * Recursive function to navigate through the maze.
 *
 * @param maze The maze represented as an array of strings.
 * @param wall The character representing a wall in the maze.
 * @param curr The current position in the maze.
 * @param end The target position to reach in the maze.
 * @param seen A 2D array tracking visited positions.
 * @param path The path taken to reach the end.
 * @returns true if a path to the end is found, otherwise false.
 */
function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[]
): boolean {
    // Check if the current position is out of bounds or a wall or already visited
    if (
        curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length ||
        maze[curr.y][curr.x] === wall ||
        seen[curr.y][curr.x]
    ) {
        return false;
    }

    // If the current position is the end position, add to path and return true
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // Mark the current position as visited
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // Recursively explore each possible direction
    for (let i = 0; i < dir.length; i++) {
        const [dx, dy] = dir[i];
        if (walk(maze, wall, { x: curr.x + dx, y: curr.y + dy }, end, seen, path)) {
            return true; // Path found, propagate the success back up the recursion stack
        }
    }

    // If no path is found from the current cell, backtrack: remove the current cell from path and return false
    path.pop();
    return false;
}

/**
 * Solves the maze by finding a path from start to end using the walk function.
 *
 * @param maze The maze to solve.
 * @param wall Character representing walls in the maze.
 * @param start Starting position in the maze.
 * @param end Ending position in the maze.
 * @returns An array of points representing the path from start to end.
 */
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = []; // 2D array to track visited cells
    const path: Point[] = []; // Array to store the path

    // Initialize the seen array to keep track of visited positions
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path); // Start the recursive exploration
    return path; // Return the path found, if any
}
