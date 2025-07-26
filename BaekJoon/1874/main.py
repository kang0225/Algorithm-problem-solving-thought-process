import sys
input = sys.stdin.readline
n = int(input())

stack = []
target = []
for _ in range(n):
    target.append(int(input()))

result = []
current_idx = -1
target_current_idx = 0
num = 1

toPrint = []
while True:
    if result == target:
        break

    if len(stack) == 0:
        stack.append(num)
        current_idx += 1
        toPrint.append("+")
        num += 1
        continue

    if stack[current_idx] == target[target_current_idx]:
        result.append(stack.pop())
        current_idx -= 1
        toPrint.append("-")
        target_current_idx += 1
        continue

    stack.append(num)
    current_idx += 1
    toPrint.append("+")
    num += 1
    if stack[len(stack) - 1] > n:
        toPrint.clear()
        toPrint.append("NO")
        break

for i in toPrint:
    print(i)
