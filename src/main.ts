import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "./style.css"
// 权限设置
import './permission'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'



self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        if (label === 'editorWorker') {
            return new editorWorker()
        }
        if (label === 'python') {
            return new Worker('./python.worker.bundle.js')
        }
        if (label === 'java') {
            return new Worker('./java.worker.bundle.js')
        }
        if (label === 'c') {
            return new Worker('./c.worker.bundle.js')
        }
        if (label === 'c++') {
            return new Worker('./cpp.worker.bundle.js')
        }
        if (label === 'c#') {
            return new Worker('./csharp.worker.bundle.js')
        }
        if (label === 'go') {
            return new Worker('./go.worker.bundle.js')
        }
        if (label === 'php') {
            return new Worker('./php.worker.bundle.js')
        }
        if (label === 'ruby') {
            return new Worker('./ruby.worker.bundle.js')
        }
        if (label === 'rust') {
            return new Worker('./rust.worker.bundle.js')
        }
        if (label === 'swift') {
            return new Worker('./swift.worker.bundle.js')
        }
        if (label === 'scala') {
            return new Worker('./scala.worker.bundle.js')
        }
        if (label === 'kotlin') {
            return new Worker('./kotlin.worker.bundle.js')
        }
        if (label === 'lua') {
            return new Worker('./lua.worker.bundle.js')
        }
        if (label === 'perl') {
            return new Worker('./perl.worker.bundle.js')
        }
        if (label === 'r') {
            return new Worker('./r.worker.bundle.js')
        }
        if (label === 'powershell') {
            return new Worker('./powershell.worker.bundle.js')
        }
        if (label === 'shell') {
            return new Worker('./shell.worker.bundle.js')
        }
        if (label === 'coffeescript') {
            return new Worker('./coffeescript.worker.bundle.js')
        }
        if (label === 'fsharp') {
            return new Worker('./fsharp.worker.bundle.js')
        }



        return new editorWorker()
    }
}

const app = createApp(App)
// app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')