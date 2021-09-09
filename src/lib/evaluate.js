// returns a number equal to the result of the given expression
export default function evaluate(expression) {
  let tokens = tokenize(clean(expression));
  console.log(tokens);

  let ops = [];
  let nums = [];

  for (let token of tokens) {
    switch (token) {
      case "^":
      case "/":
      case "*":
      case "-":
      case "+":
        while (ops.length && precedes(ops[ops.length - 1], token)) {
          let result = process(ops, nums);
          if (result) return result;
        }
        ops.push(token);
        break;
      case "(":
        ops.push("(");
        break;
      case ")":
        while (ops[ops.length - 1] !== "(") {
          let result = process(ops, nums);
          if (result) return result;
        }
        ops.pop();
        break;
      default:
        nums.push(token);
    }
  }
  while (ops.length) {
    let result = process(ops, nums);
    if (result) return result;
  }
  return nums[0];
}

// adds * between parenthesis and operands
function clean(expression) {
  return expression.replace(/(?<=\d)\(/, "*(").replace(/\)(?=\d)/, ")*");
}

// pops 2 nums from nums, 1 op from op and pushes the result of performing the op on the nums back to nums
function process(ops, nums) {
  let b = nums.pop();
  let result = operate(nums.pop(), b, ops.pop());
  if (result === "Err: Division by 0") return result;
  nums.push(result);
  return false;
}

// returns true if op1 precedes op2 in the order of operations, returns false otherwise
function precedes(op1, op2) {
  return oop(op1) < oop(op2);
}
// returns the order or operations precedence of the operator, lower meaning higher
function oop(op) {
  if (op === "^") return 1;
  else if (op === "*" || op === "/") return 2;
  else return 3;
}

// returns the result of a op b
// returns "Err: Division by 0" if attempting to divide by 0
function operate(a, b, op) {
  console.log(a, op, b);
  switch (op) {
    case "^":
      return Math.pow(a, b);
    case "/":
      return b === 0 ? "Err: Division by 0" : a / b;
    case "*":
      return a * b;
    case "-":
      return a - b;
    case "+":
      return a + b;
    default:
      return NaN;
  }
}

// return expression as a list of numbers and operating symbols
function tokenize(expression) {
  return [...expression.matchAll(/(?:((?<!\d)-)?\d*\.?\d+)|[()^*/+-]/g)].map(
    (match) => {
      let num = parseFloat(match[0]);
      return isNaN(num) ? match[0] : num;
    }
  );
}
