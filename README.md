# 一个伪造的输入框

如同手机中输入验证码的输入框

![image](https://raw.githubusercontent.com/aoveig/mu-fake-input/refs/heads/main/src/assets/1.png)
![image](https://raw.githubusercontent.com/aoveig/mu-fake-input/refs/heads/main/src/assets/2.png)

使用方式：

1. 首先引入组件
   `import FakeInput from "mu-fake-input"`
2. 引入样式`import "mu-fake-input/style.css";`

3. 定义输入框绑定的值`const value = ref("")`

4. 使用组件
   `<FakeInput v-model="value" />`

组件传递的参数有：`v-model`，`quantity`，`config`，`type`，`inputKeys`

- `v-model`:输入框绑定的值 - 必填项

- `quantity`:生成输入框的数量 - 可选项（默认为 6）

- `config`:输入框的配置 - 可选项

- `type`:输入框的类型，目前有方形`frame`和线形`line`两种 - 可选项（默认为 frame）

- `inputKeys`:输入内容的格式，`numeric`为数字，`letter`为字母，`all`为数字与字母 - 可选项（默认为 all）

```javascript
PropsType {
  quantity?: number | string; // 要渲染方块的数量
  modelValue: string; // v-model绑定的值
  type?: "line" | "frame"; // 输入框样式
  config?: {
    width?: number; // 输入框的宽
    height?: number; // 输入框的高
    fontSize?: number; // 输入字体大小
    spacing?: number; // 输入框间距
  };
  inputKeys?: "numeric" | "letter" | "all"; // 输入内容的格式
}
```
