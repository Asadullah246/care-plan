# Calculate Method

## Requirements
  - Inusrance data
    - companyName, visitsLeft, deductable left, allowed percentage, xrayCoverage
  - adjustment data
    - default cost, companyCost, qty
  - exams data
    - default cost, companyCost, qty
  - addons data
    - default cost, companyCost, qty
  - therapy data
    - default cost, companyCost, qty
  - xray data
    - default cost, companyCost, qty

# Demo plan 1
  red, 25, 1000, 80, 50
  - $45, $40, 36x => insuranceCovered = 25 x 40 = 1000, deductable met, user cost = 11 x 45 = 495
  - {$50, $40, 1x} => insuranceCovered = 0 X 40 = 0, user cost = 50 x 1 = 50
    {$45, $40, 2x} => insuranceCovered = 0 X 40 = 0, user cost = 45 x 2 = 90
  - {$50, $40, 1x} => insuranceCovered = 0 X 40 = 0, user cost = 50 x 1 = 50
    {$45, $40, 2x} => insuranceCovered = 0 X 40 = 0, user cost = 45 x 2 = 90
  - {$50, $40, 1x} => insuranceCovered = 0 X 40 = 0, user cost = 50 x 1 = 50
  - {$50, undefined, 1x} => insuranceCovered = 50 x .5 = 25, user cost = 50 - 25 = 25

  user cost = 850
  insurance coverage = 1025
  total cost = 1875
  
# Demo plan 2
  green, 25, 600, 80, 80
  - $45, $40, 36x => insuranceCovered = 25 x 40 = 1000,
                  => deductable met 600, left 400, 400 x .80 = 320
                  => user cost = 11 x 45 = 495 + 80 = 575
  - {$50, $40, 1x} => insuranceCovered = 0 X 40 = 0, user cost = 50 x 1 = 50
    {$45, $40, 2x} => insuranceCovered = 0 X 40 = 0, user cost = 45 x 2 = 90
  - {$50, $40, 1x} => insuranceCovered = 0 X 40 = 0, user cost = 50 x 1 = 50
    {$45, $40, 2x} => insuranceCovered = 0 X 40 = 0, user cost = 45 x 2 = 90
  - {$50, $40, 1x} => insuranceCovered = 0 X 40 = 0, user cost = 50 x 1 = 50
  - {$50, undefined, 1x} => insuranceCovered = 50 x .8 = 40, user cost = 50 - 40 = 10

  user cost = 915
  insurance coverage = 960
  total cost = 1875