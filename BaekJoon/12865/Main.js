const fs = require("fs");
const inputLines = fs.readFileSync(0, "utf8").trim().split("\n");
let lineIdx = 0;

function input() {
    return inputLines[lineIdx++];
}

function knapsack(item_count, max_weight, weights, values) {
    const dp = Array.from(
        { length: weights.length + 1 },
        () => Array(max_weight + 1).fill(0)
    );

    for (let i = 1; i <= item_count; i++) {
        for (let w = 0; w <= max_weight; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[item_count][max_weight];
}

function main() {
    let input_line = input();
    let tokens = input_line.split(" ");
    const itemCount = parseInt(tokens[0]);
    const maxWeight = parseInt(tokens[1]);
    const Weights = [], Values = [];

    if (
        itemCount < 1 || itemCount > 100 ||
        maxWeight < 1 || maxWeight > 100000
    ) {
        console.log("Invalid Value.");
        process.exit(-1);
    }

    for (let i = 0; i < itemCount; i++) {
        input_line = input();
        tokens = input_line.split(" ");
        let itemWeight = parseInt(tokens[0]);
        let itemValue = parseInt(tokens[1]);
        Weights.push(itemWeight);
        Values.push(itemValue);
    }
    const result = knapsack(itemCount, maxWeight, Weights, Values);
    console.log(result);
}

main();
