const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bufferSize = 2000;

class execution {
    constructor() {
        this.back_stack = new Array();
        this.front_stack = new Array();
        this.current_page = null;
    }

    moveBackward() {
        if (this.back_stack.length === 0)
            return;

        this.front_stack.push(this.current_page);
        this.current_page = this.back_stack.pop();
    }

    moveFrontward() {
        if (this.front_stack.length === 0)
            return;
        this.back_stack.push(this.current_page);
        this.current_page = this.front_stack.pop();
    }

    access(page_num) {
        this.front_stack.length = 0;
        if (this.current_page != null) {
            this.back_stack.push(this.current_page);
        }

        this.current_page = page_num;
    }

    compress() {
        if (this.back_stack.length === 0) return;

        let result = [this.back_stack[0]];
        for (let i = 1; i < this.back_stack.length; i++) {
            if (this.back_stack[i] !== this.back_stack[i - 1]) {
                result.push(this.back_stack[i]);
            } else {
                continue;
            }
        }
        this.back_stack = result;
    }
}

function input() {
    return new Promise(
        (resolve) => rl.question("", resolve)
    )
}

async function main() {
    const input_line = await input();
    const tokens = input_line.split(" ");
    const page_amount = parseInt(tokens[0]);
    const tasks = parseInt(tokens[1]);

    const exe = new execution();
    let option, page;
    
    if ((page_amount < 1 || page_amount > bufferSize) || (tasks < 1 || tasks > bufferSize)) {
        console.log("Invalid value.");
        process.exit(-1);
    }

    for (let i = 0; i < tasks; i++) {
        option = await input();
        if (option.startsWith("B")) {
            exe.moveBackward();
        }
        else if (option.startsWith("F")) {
            exe.moveFrontward();
        }
        else if (option.startsWith("C")) {
            exe.compress();
        }
        else if (option.startsWith("A")) {
            page = parseInt(option.split(" ")[1]);
            if (page < 1 || page > bufferSize) {
                console.log("Invalid page number.");
                process.exit(-1);
            }
            exe.access(page);
        }
    }

    console.log(exe.current_page);

    if (exe.back_stack.length === 0) {
        console.log("-1");
    } else {
        for (let i = exe.back_stack.length - 1; i >= 0; i--) {
            console.log(exe.back_stack[i]);
        }
    }
    
    if (exe.front_stack.length === 0) {
        console.log("-1");
    } else {
        for (let i = exe.front_stack.length - 1; i >= 0; i--) {
            console.log(exe.front_stack[i]);
        }
    }
    
    return;
}

main();
