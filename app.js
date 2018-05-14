function loadWasm(file) {
  return fetch(file)
    .then(function(res) {
      return res.arrayBuffer();
    })
    .then(function(bit) {
      return WebAssembly.compile(bit);
    })
    .then(function(module) {
      return new WebAssembly.Instance(module);
    });
}

// const loadWasm = file =>
//   fetch(file)
//     .then(res => res.arrayBuffer())
//     .then(bit => WebAssembly.compile(bit))
//     .then(module => WebAssembly.instance(module));

var multiply, sum, divide, subract;

loadWasm('main.wasm').then(function(instance) {
  multiply = instance.exports._Z8multiplyii;
  sum = instance.exports._Z3sumii;
  divide = instance.exports._Z6divideii;
  subract = instance.exports._Z8subtractii;
  console.log('Finished compiling Wasm file!');
  console.log('Result of multiplying 4 and 5 :', multiply(4, 5));
  console.log('Result of suming 4 and 5 :', sum(4, 5));
  console.log('Result of dividing 4 and 5 :', divide(4, 5));
  console.log('Result of subracting 4 and 5 :', subract(4, 5));
});
