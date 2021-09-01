export default function evaluate(expression) {
  let nums = [
    ...expression.matchAll(/(?:(?<=[*/+-]|^)-)?\d*[.]?\d+(?:e[+-]\d+)?/g),
  ].map((match) => parseFloat(match[0]));
  let ops = [...expression.matchAll(/(?<![e*/+-]|^)[*/+-]/g)].map(
    (match) => match[0]
  );

  console.log(nums);
  console.log(ops);

  let i = 0;
  while (i < ops.length) {
    if (ops[i] === "*") {
      nums[i] *= nums[i + 1];
      nums.splice(i + 1, 1);
      ops.splice(i, 1);
      continue;
    }
    if (ops[i] === "/") {
      nums[i] /= nums[i + 1];
      nums.splice(i + 1, 1);
      ops.splice(i, 1);
      continue;
    }
    i++;
  }

  for (let op of ops) {
    if (op === "+") {
      nums[0] += nums[1];
      nums.splice(1, 1);
      ops.splice(0, 1);
    }
    if (op === "-") {
      nums[0] -= nums[1];
      nums.splice(1, 1);
      ops.splice(0, 1);
    }
  }
  return nums[0];
}
