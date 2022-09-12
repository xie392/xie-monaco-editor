<template>
  <div class="monaco">
    <div class="monaco-toolbar">
      <p class="p">主题：</p>
      <el-select v-model="select1">
        <el-option v-for="v in themeList" :key="v" :value="v.label"></el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p class="p">语言:</p>
      <el-select v-model="select2">
        <el-option v-for="v in languageList" :key="v" :value="v"></el-option>
      </el-select>
    </div>
    <div class="monaco-editor" id="monaco-editor"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as monaco from "monaco-editor";

const themeList = ref([
  {
    label: "亮色主题",
    value: "vs",
  },
  {
    label: "暗色主题",
    value: "vs-dark",
  },
  {
    label: "高对比度主题",
    value: "hc-black",
  },
]);

const select1 = ref("暗色主题");
const select2 = ref("javascript");

const languageList = ref([
  "javascript",
  "typescript",
  "html",
  "css",
  "json",
  "python",
  "java",
  "c",
  "c++",
  "c#",
  "go",
  "php",
  "ruby",
  "r",
  "shell",
  "less",
  "scss",
]);
const theme = ref("vs-dark");

const editor = ref<any>(null);
const value = ref(`// 你好，世界！

package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }

}

`);
const language = ref("java");

const options = ref({
  colorDecorators: true,
  lineHeight: 24,
  tabSize: 2,
});

const initMonaco = () => {
  const editorDom:HTMLElement | null = document.getElementById("monaco-editor");
  editor.value = monaco.editor.create(editorDom, {
    value: value.value,
    language: language.value,
    theme: theme.value,
    options: options.value,
  });
};

// 监听主题
watch(
  () => select1.value,
  (val) => {
    const newtheme = themeList.value.find((v:any) => v.label === val)?.value;
    theme.value = newtheme;
    monaco.editor.setTheme(theme.value);
  }
);

// 监听语言
watch(
  () => select2.value,
  (val) => {
    language.value = val;
    monaco.editor.setModelLanguage(editor.value?.getModel(), language.value);
  }
);

onMounted(() => {
  initMonaco();
});

// export default defineComponent({
//   name: "MonacoEditor",
//   props: {
//     diffEditor: { type: Boolean, default: false },
//     width: { type: [String, Number], default: "100%" },
//     height: { type: [String, Number], default: "100%" },
//     original: String,
//     value: String,
//     language: { type: String, default: "javascript" },
//     theme: { type: String, default: "vs" },
//     options: {
//       type: Object,
//       default() {
//         return {};
//       },
//     },
//   },
//   emits: ["editorWillMount", "editorDidMount", "change", "update:value"],
//   setup(props) {
//     const { width, height } = toRefs(props);
//     const style = computed(() => {
//       const fixedWidth = width.value.toString().includes("%")
//         ? width.value
//         : `${width.value}px`;
//       const fixedHeight = height.value.toString().includes("%")
//         ? height.value
//         : `${height.value}px`;
//       return {
//         width: fixedWidth,
//         height: fixedHeight,
//         "text-align": "left",
//       };
//     });
//     return {
//       style,
//     };
//   },
//   mounted() {
//     this.initMonaco();
//   },
//   beforeDestroy() {
//     this.editor && this.editor.dispose();
//   },
//   methods: {
//     initMonaco() {
//       this.$emit("editorWillMount", monaco);
//       const { value, language, theme, options } = this;
//       this.editor = monaco.editor[
//         this.diffEditor ? "createDiffEditor" : "create"
//       ](this.$el, {
//         value: value,
//         language: language,
//         theme: theme,
//         ...options,
//       });
//       this.diffEditor && this._setModel(this.value, this.original);

//       // @event `change`
//       const editor = this._getEditor();
//       editor &&
//         editor.onDidChangeModelContent((event) => {
//           const value = editor.getValue();
//           if (this.value !== value) {
//             this.$emit("change", value, event);
//             this.$emit("update:value", value);
//           }
//         });

//       this.$emit("editorDidMount", this.editor);
//     },
//     _setModel(value, original) {
//       const { language } = this;
//       const originalModel = monaco.editor.createModel(original, language);
//       const modifiedModel = monaco.editor.createModel(value, language);
//       this.editor.setModel({
//         original: originalModel,
//         modified: modifiedModel,
//       });
//     },
//     _setValue(value) {
//       let editor = this._getEditor();
//       if (editor) return editor.setValue(value);
//     },
//     _getValue() {
//       let editor = this._getEditor();
//       if (!editor) return "";
//       return editor.getValue();
//     },
//     _getEditor() {
//       if (!this.editor) return null;
//       return this.diffEditor ? this.editor.modifiedEditor : this.editor;
//     },
//     _setOriginal() {
//       const { original } = this.editor.getModel();
//       original.setValue(this.original);
//     },
//   },
//   watch: {
//     options: {
//       deep: true,
//       handler(options) {
//         this.editor.updateOptions(options);
//       },
//     },
//     value() {
//       this.value !== this._getValue() && this._setValue(this.value);
//     },
//     original() {
//       this._setOriginal();
//     },
//     language() {
//       if (!this.editor) return;
//       if (this.diffEditor) {
//         const { original, modified } = this.editor.getModel();
//         monaco.editor.setModelLanguage(original, this.language);
//         monaco.editor.setModelLanguage(modified, this.language);
//       } else
//         monaco.editor.setModelLanguage(this.editor.getModel(), this.language);
//     },
//     theme() {
//       monaco.editor.setTheme(this.theme);
//     },
//   },
// });
</script>

<style lang="scss" scoped>
.monaco {
  width: 100%;
  min-height: 100vh;

  .monaco-toolbar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

    .p {
      margin-right: 5px;
      font-size: 14px;
    }
  }

  .monaco-editor {
    width: 100%;
    min-height: calc(100vh - 50px);
    overflow: hidden;
    padding: 20px 0;
    box-sizing: border-box;
  }
}
</style>