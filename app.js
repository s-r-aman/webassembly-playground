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

var multiply;

loadWasm('main.wasm').then(function(instance) {
  multiply = instance.exports._Z8multiplyii;
  console.log('Finished compiling Wasm file!');
  console.log(multiply(4, 5));
});
