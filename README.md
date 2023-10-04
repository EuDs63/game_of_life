# wasm-game-of-life

## About
a project to learn Rust

## Local Usage

### Clone this Template

```
git clone https://github.com/EuDs63/game_of_life.git
```

### Install Dependency

```
cd www
npm install
```

### Run

```
npm run start
```

### Modify codes about Rust (optional)

```
git checkout prod 
# make some change
wasm-pack build 
```

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
3. vercel部署
   - 过程
     1. 一开始参考[Deploying a WASM-Powered React App on Vercel | by Mukkund Sunjii | Better Programming](https://betterprogramming.pub/deploying-a-wasm-powered-react-app-on-vercel-cf3cae2a75d6)。后来发现不需要这么麻烦，因为我已经`wasm-pack pulish`了，可以直接将[wasm-game-of-life-euds63 - npm](https://www.npmjs.com/package/wasm-game-of-life-euds63)作为依赖引入。这样就只需要部署webpack，而不用再去安装Rust相关的内容。
     2. 对代码进行对应的修改后。我开始尝试部署。先是遇到路径问题，我将`Root Directory`修改为www。
     3. 这时候vercel显示部署成功了，但实际上是运行不了的。我因着之前的经验，惯性地以为也是路径问题。开始修改其他地方的路径。但实际上不是。反复修改几次后我发现:错误的路径会导致部署成功，而正确的路径反而会使`npm install`报错。而我一开始以为的错误路径是正确的。 这一步我觉得还是我没有好好去看log导致的。
     4. 根据相应的报错发现是node版本问题。我本地运行成功的node版本是12，而vercel只支持18和16，我一开始的想法是另外安装一个12的版本，未果。后来报着试一试的念头改为16，惊喜的是运行成功了。
     5. `npm run build`后报错：Missing Public Directory。根据[Error List | Vercel Docs](https://vercel.com/docs/errors/error-list#missing-public-directory)尝试将`Output Directory`设为dist，解决。


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
- [x] 部署至vercel
- [ ] 修改domain

## 参考
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/introduction.html)
- [Play John Conway’s Game of Life](https://playgameoflife.com/) 目前发现的最好的一个game of life实现
- [shalzz/wasm-game-of-life: Game of Life implementation using Rust, Javascript and WebAssembly!](https://github.com/shalzz/wasm-game-of-life)