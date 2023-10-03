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

## 收获
1. 自定义macro
- 步骤
   1. 在一个模块中定义并导出自定义宏
      ```Rust
      // utils.rs
      #[macro_export]
      macro_rules! log {
         ( $( $t:tt )* ) => {
            web_sys::console::log_1(&format!( $( $t )* ).into());
         }
      }
      ```
   2. 在其他模块中使用
      ```Rust
      // lib.rs
      utils::log!("hello,{}",name);
      ```


## 踩坑
1. *npm install 失败*
- 解决：在Ubuntu中安装npm
- 参考：[WSL无法使用npm](https://blog.csdn.net/hys__handsome/article/details/125687617)

2. *wasm-build 失败*
- 解决
   ```
   [package.metadata.wasm-pack.profile.release]
   wasm-opt = false
   ```
- 参考：[failed to download binaryen-version_90-x86-windows.tar.gz](https://github.com/rustwasm/wasm-pack/issues/864)

3. *wasm-pack test --chrome --headless 失败*
- 解决: 改用`wasm-pack test --chrome`
- 参考： [Headless Chrome test fails](https://github.com/rustwasm/wasm-pack/issues/611)
  

## 参考教程
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/introduction.html)