# wasm-game-of-life

## About
a project to learn Rust

## Usage

### Clone this Template


```
git clone
```

### Build with `wasm-pack build`

```
wasm-pack build
```

### Test in Headless Browsers with `wasm-pack test`

```
wasm-pack test --headless --firefox
```

### Publish to NPM with `wasm-pack publish`

```
wasm-pack publish
```

## 踩坑
- [WSL无法使用npm](https://blog.csdn.net/hys__handsome/article/details/125687617)
- [failed to download binaryen-version_90-x86-windows.tar.gz](https://github.com/rustwasm/wasm-pack/issues/864)
   solution: 
   ```
   [package.metadata.wasm-pack.profile.release]
   wasm-opt = false
   ```
- [Headless Chrome test fails](https://github.com/rustwasm/wasm-pack/issues/611)

## 参考
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/introduction.html)