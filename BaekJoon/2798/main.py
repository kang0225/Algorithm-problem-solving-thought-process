import sys
import itertools

card_amount, sum_max = map(int, input().split())

cards = list(map(int, input().split()))

if (len(cards) != card_amount) or not 3 <= card_amount <= 100 or not 10 <= sum_max <= 300000:
    sys.exit(0)

for i in range(card_amount):
    if not 0 < cards[i] <= 100000:
        sys.exit(0)

sum_selected_cards = 0
for selected_cards in itertools.combinations(cards, 3):
    selected_cards = list(selected_cards)
    if sum(selected_cards) <= sum_max:
        sum_selected_cards = max(sum(selected_cards), sum_selected_cards)

print(sum_selected_cards)
