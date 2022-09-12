import router from './router'
import { getCookie } from "./utils/auth";
import NProgress from 'nprogress'
import '@/assets/style/nprogress.scss'

NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ["login", "dashboard", ] 

router.beforeEach(async (to: any, from: any, next: any) => {

    NProgress.start();

    // 设置标题
    if (to.meta.title) {
        document.title = `${to.meta.title}`
    }
    
    if (getCookie("__token__")) {
        if (to.name === 'login')
            next({ path: '/' });
        else
            next()
    } else {
        // 没有 cookie
        if (whiteList.indexOf(to.name) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            if (getCookie("__token__")) {
                if (to.name === 'login') {
                    next({ path: '/' });
                } else {
                    next()
                }
            } else {
                if (to.name === 'login') {
                    next() // 否则全部重定向到登录页
                } else {
                    // 否则全部重定向到登录页
                    next(`/login?redirect=${to.fullPath}`)
                }
            }
        }
    }
})



router.afterEach(() => {
    NProgress.done();
})