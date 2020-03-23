import { confirm, render, toast } from 'amis';
import cloneDeep from 'lodash/cloneDeep';
import { app } from "../../../app";
import logger from "../../../utils/logger";
import { amisResAdapter } from "../exports";
import { normalizeLink } from "./func";
const log = logger.getLogger('lib:components:amis:schema');
export default (option) => {
    const { schema, props, theme, option: amisOption, history } = option;
    const env = {
        session: 'global',
        // number 固底间距 顶部间距
        affixOffsetTop: 50,
        // number 固底间距，当你的有其x他固底元素时，需要设置一定的偏移量，否则会重叠。
        affixOffsetBottom: 0,
        // 富文本编辑器 token， 内置 rich-text 为 frolaEditor，想要使用，请自行购买，或者自己实现 rich-text 渲染器。
        richTextToken: false,
        // 请求模块
        fetcher: (reqOpts) => {
            console.log('~~~==', cloneDeep(reqOpts));
            return app.request(reqOpts).then(amisResAdapter);
        },
        // 是否取消 ajax请求
        isCancel: (value) => {
            log.log('isCancel', value);
            if (value.name === 'AbortError') {
                log.info('请求被终止', value);
                return true;
            }
            return false;
        },
        // 消息提示
        notify: (msgType, msg) => {
            log.log('notify', msgType, msg);
            // 默认跳过表单错误 提示
            if (/表单验证失败/.test(msg)) {
                return;
            }
            const tipMsg = toast[msgType];
            const isError = msgType === 'error';
            if (tipMsg) {
                tipMsg(msg || `未知${isError ? '异常' : '消息'}`, msgType === 'error' ? '系统异常' : '系统提示');
            }
        },
        // 实现警告提示。
        alert: (msg) => {
            log.log('alert', msg);
        },
        // 实现确认框。 boolean | Promise<boolean>
        confirm: (msg, title) => {
            let confirmTitle = title || '提示';
            let confirmText = msg || '';
            if (!title && msg.indexOf('[') === 0 && msg.indexOf(']') > 0) {
                const end = msg.indexOf(']');
                confirmText = msg.substr(end + 1);
                confirmTitle = msg.substring(1, end);
            }
            log.log('confirm: ', msg);
            return confirm(confirmText, confirmTitle);
        },
        // 实现页面跳转
        jumpTo: (to, action, ctx) => {
            log.log('jumpTo', to, action, ctx);
            const { href } = normalizeLink({ to });
            history.push(href);
        },
        // 地址替换，跟 jumpTo 类似。
        updateLocation: (to, replace = false) => {
            const { href, pathname } = normalizeLink({ to });
            const isReplace = pathname === window.location.pathname;
            log.log('updateLocation', replace ? 'replace ' : 'push', isReplace, href);
            if (isReplace) {
                window.history.replaceState(null, '', href);
                return;
            }
            history.push(href);
        },
        // 判断目标地址是否为当前页面。
        isCurrentUrl: (to) => {
            const { href } = normalizeLink({ to });
            log.log('isCurrentUrl', href);
            return href === window.location.href;
        },
        // 实现，内容复制。
        copy: (contents, options) => {
            log.log('copy', contents, options);
        },
        // HTMLElement 决定弹框容器。
        // getModalContainer: () => {
        //   log.log('getModalContainer')
        // },
        // Promise<Function>  可以通过它懒加载自定义组件，比如： https://github.com/baidu/amis/blob/master/__tests__/factory.test.tsx#L64-L91。
        // 大型组件可能需要异步加载。比如：富文本编辑器
        loadRenderer: (loaderSchema, path) => {
            log.log('loadRenderer', loaderSchema, path);
        },
    };
    return render(schema, props, Object.assign(Object.assign(Object.assign({}, env), amisOption), { theme: theme.name }));
};
