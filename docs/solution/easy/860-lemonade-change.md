# 860 柠檬水找零

::: tip 关于题目

难度：[简单](/solution/easy/)

分类：[贪心算法](/art/greedy.html)

来源：[LeetCode](https://leetcode.com/problems/lemonade-change/)  [力扣](https://leetcode-cn.com/problems/lemonade-change/)

源码：[JS 版本](https://github.com/swpuLeo/cattle/blob/master/src/easy/LemonadeChange.js)

:::



## 题目描述

在柠檬水摊上，每一杯柠檬水的售价为 5 美元。顾客排队购买你的产品，按账单 bills 支付的顺序，一次购买一杯。每位顾客只买一杯柠檬水，然后向你支付 5 美元、10 美元或者 20 美元。你必须给顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

注意：一开始你手头并没有任何零钱。如果你能够给每位顾客找零，返回 true，否则返回 false。

示例如下：

```
输入：[5,5,5,10,20]
输出：true
解释：
前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
由于所有客户都得到了正确的找零，所以我们输出 true。


输入：[5,5,10]
输出：true


输入：[10,10]
输出：false


输入：[5,5,10,10,20]
输出：false
解释：
前 2 位顾客那里，我们按顺序收取 2 张 5 美元的钞票。
对于接下来的 2 位顾客，我们收取一张 10 美元的钞票，然后返还 5 美元。
对于最后一位顾客，我们无法退回 15 美元，因为我们现在只有两张 10 美元的钞票。
由于不是每位顾客都得到了正确的找零，所以答案是 false。
```

提示：0 ≤ bills.length ≤ 1000；bills[i] 只能是 5、10 和 20。


## 解题思路

这个题涉及到贪心算法。贪心算法是一种算法思想，并没有具体的实现步骤。贪心算法的思想是在每一次选择时，都选择当前最有利的，以期望整体结果最优。

本题中，当顾客付 10 美元或者 20 美元时，我们都会面临找零的选择。对于 10 美元，我们只有一种选择，找 5 美元；而对于 20 美元，我们面临的选择是 1 张 10 美元和 1 张 5 美元，或者 3 张 5 美元。

当一位顾客付 20 美元时，是解决整个问题的一个子问题，我们要使这个子问题最优，那么哪种找零方式更优呢？还需要来分析当前问题的限制。

当前问题的限制在于需要找零的时候，手上没有 5 美元。根据此限制，那么更优的选择就是手上尽可能多地保留 5 美元，即优先选择找 1 张 10 美元和 1 张 5 美元。

```js
var lemonadeChange = function(bills) {
  const map = { 5: 0, 10: 0, 20: 0 };
  for (const bill of bills) {
    if (bill === 5) map[bill] += 1;
    if (bill === 10) {
      map[bill] += 1;
      map[5] -= 1;
    }
    if (bill === 20) {
      if (map[10] > 0) {
        map[bill] += 1;
        map[10] -= 1;
        map[5] -= 1;
      } else {
        map[5] -= 3;
      }
    }
    if (map[5] < 0) return false;
  }
  return true;
};
```



## 相关推荐

我为你挑选的[贪心算法](/art/greedy.html)题目：