import sys
from collections import deque

input = sys.stdin.readline
tests = int(input())


for _ in range(tests):
    doc_amount, doc_ordered = map(int, input().split())
    docs_info = deque(list(map(int, input().split())))

    if not (1 <= doc_amount <= 100 and 0 <= doc_ordered < doc_amount):
        sys.exit(0)
    if doc_amount != len(docs_info):
        sys.exit(0)

    docs = deque()
    for i in range(doc_amount):
        docs.append([docs_info[i], i])

    count = 0
    while docs:
        if docs[0][0] == max(d[0] for d in docs):
            printed = docs.popleft()
            count += 1
            if printed[1] == doc_ordered:
                print(count)
                break
        else:
            docs.append(docs.popleft())
