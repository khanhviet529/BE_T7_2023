function check(x) {
  for (var i = 2; i < Math.sqrt(x); i++) {
    if (x % i == 0) return false;
  }
  return x > 1;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
  var x = parseInt(_input);
  if (check(x)) console.log("YES");
  else console.log("NO");
});