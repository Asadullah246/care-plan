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


calculatePay.ts:389 examCost 1 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 1 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 1 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 1 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 1 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 2 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 2 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 2 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 2 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 2 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 3 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 3 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 3 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 3 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 3 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 4 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 4 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 4 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 4 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 4 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 5 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 5 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 5 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 5 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 5 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 6 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 6 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 6 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 6 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 6 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 7 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 7 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 7 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 7 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 7 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 8 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 8 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 8 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 8 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 8 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 9 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 9 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 9 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 9 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 9 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 10 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 10 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 10 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 10 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 10 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 11 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 11 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 11 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 11 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 11 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 12 {amount: 94.74, saved: 0}
calculatePay.ts:404 adjustmentCost 12 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 12 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 12 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 12 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 13 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 13 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 13 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 13 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 13 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 14 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 14 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 14 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 14 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 14 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 15 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 15 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 15 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 15 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 15 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 16 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 16 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 16 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 16 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 16 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 17 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 17 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 17 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 17 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 17 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 18 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 18 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 18 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 18 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 18 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 19 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 19 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 19 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 19 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 19 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 20 {amount: 0, saved: 94.74}
calculatePay.ts:404 adjustmentCost 20 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 20 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 20 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 20 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 21 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 21 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 21 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 21 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 21 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 22 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 22 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 22 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 22 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 22 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 23 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 23 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 23 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 23 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 23 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 24 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 24 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 24 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 24 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 24 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 25 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 25 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 25 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 25 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 25 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 26 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 26 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 26 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 26 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 26 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 27 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 27 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 27 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 27 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 27 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 28 {amount: 0, saved: 94.74}
calculatePay.ts:404 adjustmentCost 28 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 28 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 28 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 28 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 29 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 29 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 29 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 29 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 29 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 30 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 30 {amount: 0, saved: 51.22}
calculatePay.ts:421 xrayCost 30 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 30 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 30 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 31 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 31 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 31 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 31 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 31 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 32 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 32 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 32 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 32 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 32 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 33 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 33 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 33 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 33 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 33 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 34 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 34 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 34 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 34 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 34 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 35 {amount: 0, saved: 0}
calculatePay.ts:404 adjustmentCost 35 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 35 {amount: 0, saved: 0}
calculatePay.ts:437 addonsCost 35 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 35 {amount: 0, saved: 0}
calculatePay.ts:389 examCost 36 {amount: 94.74, saved: 0}
calculatePay.ts:404 adjustmentCost 36 {amount: 51.22, saved: 0}
calculatePay.ts:421 xrayCost 36 {amount: 168.87, saved: 0}
calculatePay.ts:437 addonsCost 36 {amount: 0, saved: 0}
calculatePay.ts:452 therapiesCost 36 {amount: 0, saved: 0}
templateHooks.ts:52 {adjustments: Array(1), exams: Array(1), addOns: Array(0), xrays: Array(4), therapies: Array(0)} 'break down'
templateHooks.ts:53 1060.22
templateHooks.ts:52 {adjustments: Array(1), exams: Array(1), addOns: Array(0), xrays: Array(4), therapies: Array(0)} 'break down'
templateHooks.ts:53 1060.22
