const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input() {
    return new Promise(
        resolve => rl.question("", resolve)
    )
}

class Censor {
    constructor(text_original, text_forbidden) {
        this.text_original = text_original;
        this.text_forbidden = text_forbidden;
    }

    censorUsingTwoPointer() {
        let left = 0, right = this.text_original.length - 1;
        let leftStack = new Array();
        let rightStack = new Array();
        let turn = 0;

        while (left <= right) {
            if (turn === 0) {
                leftStack.push(this.text_original[left++]);

                if (leftStack.length >= this.text_forbidden.length) {
                    var endPart = leftStack.slice(-this.text_forbidden.length).join('');
                    if (endPart === this.text_forbidden) {
                        for (let i = 0; i < this.text_forbidden.length; i++) {
                            leftStack.pop();
                        }
                        turn ^= 1;
                    }
                }
            } else {
                rightStack.push(this.text_original[right--]);

                if (rightStack.length >= this.text_forbidden.length) {
                    const reversedEnd = rightStack.slice(-this.text_forbidden.length).reverse().join('');
                    if (reversedEnd === this.text_forbidden) {
                        for (let i = 0; i < this.text_forbidden.length; i++) {
                            rightStack.pop();
                        }
                        turn ^= 1;
                    }
                }
            }
        }
        this.filtered_text = leftStack.concat(rightStack.reverse()).join('');
    }

    censorLinear() {
        const newStack = [];
    
        for (let i = 0; i < this.filtered_text.length; i++) {
            newStack.push(this.filtered_text[i]);

            while (
                newStack.length >= this.text_forbidden.length &&
                newStack.slice(-this.text_forbidden.length).join('') === this.text_forbidden
            ) {
                for (let j = 0; j < this.text_forbidden.length; j++) {
                    newStack.pop();
                }
            }
        }
    
        this.filtered_text = newStack.join('');
    }
    
}

async function main() {
    const text_forbidden = await input();
    const text_original = await input();

    if ((text_original.length < 1 || text_original.length > 300000) || (text_forbidden.length < 1 || text_forbidden.length > 25)) {
        console.log("Invalid Value.");
        process.exit(-1);
    }
            
    const cs = new Censor(text_original, text_forbidden);
    cs.censorUsingTwoPointer();
    cs.censorLinear();
    console.log(cs.filtered_text);
    rl.close();
    return;
}

main();
