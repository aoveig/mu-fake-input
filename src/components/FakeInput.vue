<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

export interface PropsType {
  quantity?: number | string; // 要渲染方块的数量
  modelValue: string; // v-model绑定的值
  type?: "line" | "frame"; // 输入框样式
  config?: {
    width: number; // 输入框的宽
    height: number; // 输入框的高
    fontSize: number; // 输入字体大小
    spacing: number; // 输入框间距
  };
  inputKeys?: "numeric" | "letter" | "all";
}

const props = withDefaults(defineProps<PropsType>(), {
  quantity: 6,
  type: "frame",
  config: () => ({
    width: 20,
    height: 25,
    fontSize: 12,
    spacing: 2
  }),
  inputKeys: "all"
});

const emit = defineEmits(["update:modelValue"]);

// 获取input的dom
const inputRef = ref();

// 方块集合 以及对应的值
const inputArr = ref<Array<{ value: string }>>([]);

// 最终整个输入框的值
const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

// 监听数组集合，修改最终的值
watch(
  () => inputArr.value,
  newValue => {
    let str = "";
    newValue.forEach(item => {
      if (item.value) {
        str += item.value;
      }
    });
    inputValue.value = str;
  },
  {
    deep: true
  }
);

watch(
  () => props.modelValue,
  () => {
    setInputArr();
  }
);

// 当前选中的输入框
const currIndex = ref();
const getCurrIndex = (i?: number) => {
  currIndex.value = i;
};

// 点击输入框事件
const onClick = (index: number) => {
  const i = index;
  // 判断点击的输入框之前是否还有空输入框，如果有聚焦前边的输入框
  if (i === 0) {
    inputRef.value[i].focus();
    getCurrIndex(i);
  } else {
    if (inputArr.value[i - 1].value === "") {
      onClick(i - 1);
    } else {
      inputRef.value[i].focus();
      getCurrIndex(i);
    }
  }
};

// 判断用户按下的键是否符合要求
const isKeyValid = (e: KeyboardEvent): boolean => {
  const key = e.key;
  const isLetterKey = /^[a-zA-Z]$/.test(key);
  const isNumericKey = /^[0-9]$/.test(key);

  switch (props.inputKeys) {
    case "all":
      return isLetterKey || isNumericKey;
    case "letter":
      return isLetterKey;
    case "numeric":
      return isNumericKey;
  }
};

// 键盘松开事件
const onKeyup = (e: KeyboardEvent, index: number) => {
  const domNode = inputRef.value,
    currInput = domNode[index],
    nextInput = domNode[index + 1],
    lastInput = domNode[index - 1];
  if (isKeyValid(e)) {
    if (
      index < Number(props.quantity) - 1 &&
      inputArr.value[index].value !== ""
    ) {
      (nextInput as HTMLInputElement).focus();
      getCurrIndex(index + 1);
    } else {
      (currInput as HTMLInputElement).focus();
      getCurrIndex(index);
    }
  } else if (e.key === "Backspace") {
    if (index != 0 && inputArr.value[index].value === "") {
      (lastInput as HTMLInputElement).focus();
      getCurrIndex(index - 1);
    }
  } else {
    const inputElement = e.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(
      /./g,
      ""
    );
    inputArr.value[index].value = "";
  }
};
// 键盘按下触发
const onKeydown = (e: KeyboardEvent, index: number) => {
  if (isKeyValid(e)) {
    inputArr.value[index].value = e.key;
  }
};

const setInputArr = () => {
  inputArr.value = [];
  for (let i = 0; i < Number(props.quantity); i++) {
    inputArr.value.push({
      value: props.modelValue[i] ? props.modelValue[i] : ""
    });
  }
};

onMounted(() => {
  setInputArr();
});
</script>

<template>
  <div class="fake-input">
    <div
      v-for="(item, index) of inputArr"
      :class="[
        `input-style`,
        `input-style_${props.type}`,
        index === currIndex ? 'input-style--state' : ''
      ]"
      :style="{ margin: `0px ${props.config.spacing}px` }"
      :key="index"
    >
      <input
        ref="inputRef"
        :style="{
          width: `${props.config.width}px`,
          height: `${props.config.height}px`,
          fontSize: `${props.config.fontSize}px`
        }"
        type="text"
        v-model="item.value"
        maxlength="1"
        @keyup="onKeyup($event, index)"
        @keydown="onKeydown($event, index)"
        @click="onClick(index)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.fake-input {
  display: flex;

  .input-style {
    box-sizing: border-box;

    input {
      border: none;
      box-sizing: border-box;
      color: #606266;
      text-align: center;
      outline: none;
    }
  }

  .input-style--state {
    border-color: #409eff;
  }
}

.input-style_frame {
  border: 1px solid #b9b9b9;
  border-radius: 4px;
  overflow: hidden;
}

.input-style_line {
  border-bottom: 1px solid #b9b9b9;
}
</style>
