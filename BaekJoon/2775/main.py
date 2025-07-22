import sys
input = sys.stdin.readline

tests = int(input())

dp = [[0] * 15 for _ in range(15)]
def calculate_population(floor, num):
    if floor <= 0:
        return num
    if num <= 1:
        return 1
    if dp[floor][num] != 0:
        return dp[floor][num] # memoization
    dp[floor][num] = calculate_population(floor, num - 1) + calculate_population(floor - 1, num)
    return dp[floor][num]

for _ in range(tests):
    floor = int(input())
    room = int(input())
    if not (1 <= floor <= 14 and 1 <= room <= 14):
        sys.exit(0)
    print(calculate_population(floor, room))
