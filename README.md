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
         #[macro_use]
         mod utils;

         mod universe;

         // universe.rs
         use crate::utils;
         // 直接使用
         log!("This is a log message: {}", some_variable);
         ```
2. Always let profiling guide your focus
   - 一些检测性能工具
      1. edge开发者工具 -> 性能
      2. `cargo benchcmp`
      3. `perf`
   - [Time Profiling - Rust and WebAssembly](https://rustwasm.github.io/docs/book/game-of-life/time-profiling.html)这章值得再读几次

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
  
## 待办
- [ ] 修复bug: 暂停后的第一次修改cell状态，会进行下一次tick
- [ ] Replace the 2D canvas renderer with a [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) renderer to get a better performance.
- [ ] 美化界面
- [ ] 参考[shalzz/wasm-game-of-life: Game of Life implementation using Rust, Javascript and WebAssembly!](https://github.com/shalzz/wasm-game-of-life)进行部署

## 参考
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/introduction.html)
- [Play John Conway’s Game of Life](https://playgameoflife.com/) 目前发现的最好的一个game of life实现
- [shalzz/wasm-game-of-life: Game of Life implementation using Rust, Javascript and WebAssembly!](https://github.com/shalzz/wasm-game-of-life)