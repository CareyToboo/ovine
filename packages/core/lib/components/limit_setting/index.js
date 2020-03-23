/**
 * APP 权限设置模块
 */
import { Tab, Tabs, Tree } from 'amis';
import { eachTree, mapTree } from 'amis/lib/utils/helper';
import map from 'lodash/map';
import React, { useEffect, useRef, useMemo } from 'react';
import { routeLimitKey, storage } from "../../constants";
import { getLimitMenusConfig } from "../../routes/limit";
import { checkLimitByKeys, convertLimitStr, setAppLimits } from "../../routes/limit/exports";
import { useImmer } from "../../utils/hooks";
import { getStore, setStore } from "../../utils/store";
import { cls, isSubStr } from "../../utils/tool";
import { StyledLimit } from "./styled";
const LimitSetting = (props) => {
    const { render, data = {} } = props;
    const [state, setState] = useImmer({
        activeTab: 0,
        isUnfolded: true,
        visitedTabs: [],
        selectedVal: '',
    });
    const storeRef = useRef({});
    const { activeTab, visitedTabs, selectedVal, isUnfolded } = state;
    const { name: limitName, isDevLimit = false, limits = '' } = data;
    const menuConfig = useMemo(getLimitMenusConfig, []);
    useEffect(() => {
        initData();
    }, []);
    function initData() {
        setState((d) => {
            const initialVal = isDevLimit ? getStore(storage.dev.limit) || '' : limits;
            // 初始化每个tab
            menuConfig.forEach((_, index) => {
                storeRef.current[index] = initialVal;
            });
            d.selectedVal = initialVal;
            d.visitedTabs = [];
        });
    }
    const toggleFold = (toggle) => {
        setState((d) => {
            d.isUnfolded = toggle;
        });
    };
    const onTreeChange = (value) => {
        const limitValue = resolveSelectVal(menuConfig, value);
        storeRef.current[activeTab] = limitValue;
        setState((d) => {
            d.selectedVal = limitValue;
            if (!d.visitedTabs.filter((tab) => tab === activeTab).length) {
                d.visitedTabs.push(activeTab);
            }
        });
    };
    const onTabSelect = (tab) => {
        setState((d) => {
            d.activeTab = tab;
            d.selectedVal = storeRef.current[tab];
        });
    };
    const onSave = () => {
        const authApi = getAllAuthApiStr(menuConfig, selectedVal);
        const authLimit = getAllAuthLimitStr(menuConfig, visitedTabs, storeRef.current);
        if (isDevLimit) {
            setStore(storage.dev.limit, authLimit);
            setStore(storage.dev.api, authApi);
            setAppLimits(authLimit);
            window.location.reload();
        }
    };
    const renderButtons = () => {
        return render('body', {
            type: 'button-toolbar',
            buttons: [
                {
                    type: 'button-group',
                    buttons: [
                        {
                            type: 'button',
                            label: '展开',
                            className: cls({ 'is-active': isUnfolded === true }),
                            onClick: () => toggleFold(true),
                        },
                        {
                            type: 'button',
                            label: '折叠',
                            className: cls({ 'is-active': isUnfolded === false }),
                            onClick: () => toggleFold(false),
                        },
                        {
                            type: 'button',
                            label: '重置',
                            onClick: initData,
                        },
                    ],
                },
                {
                    type: 'button',
                    icon: 'fa fa-check text-success',
                    tooltipPlacement: 'top',
                    actionType: 'cancel',
                    confirmText: isDevLimit
                        ? '权限测试修改，仅对自己有效，刷新页面后可预览最新权限。清除缓存可恢复所有权限。'
                        : `您正在修改的权限是【${limitName}】，提交后将不可重置，是否确认提交？`,
                    onAction: onSave,
                },
                {
                    type: 'button',
                    icon: 'fa fa-times text-danger',
                    actionType: 'cancel',
                    tooltipPlacement: 'top',
                    confirmText: !visitedTabs.length ? '' : '关闭将视为您主动放弃本次修改。',
                },
            ],
        });
    };
    return (React.createElement(StyledLimit, null,
        React.createElement("div", { className: "action-btns" }, renderButtons()),
        React.createElement(Tabs, Object.assign({}, props, { activeKey: activeTab, mode: "line", onSelect: onTabSelect }), resolveLimitMenus(menuConfig, { limitValue: selectedVal, isUnfolded }).map((item, index) => {
            if (!item.children) {
                return null;
            }
            return (React.createElement(Tab, { key: index, title: item.label, icon: item.icon, eventKey: index },
                React.createElement(Tree, Object.assign({}, props, { hideRoot: true, multiple: true, joinValues: true, withChildren: true, value: selectedVal, valueField: "nodePath", options: item.children, onChange: onTreeChange }))));
        }))));
};
// 处理 权限设置的值
function resolveSelectVal(menusConfig, limitValue) {
    const limits = convertLimitStr(limitValue);
    eachTree(menusConfig, (item) => {
        const { needs, nodePath } = item;
        if (!needs || isSubStr(nodePath, routeLimitKey)) {
            return;
        }
        // 前置权限不满足时，自动撤销
        const omit = !checkLimitByKeys(needs, { nodePath, limits });
        if (omit) {
            delete limits[nodePath];
        }
    });
    const newLimitValue = Object.keys(limits).join(',');
    return newLimitValue;
}
// 处理 权限配置表
function resolveLimitMenus(menusConfig, option) {
    const { limitValue, isUnfolded = true } = option;
    const limits = convertLimitStr(limitValue);
    return mapTree(menusConfig, (item) => {
        const { needs, nodePath } = item;
        item.unfolded = isUnfolded;
        if (!needs || isSubStr(nodePath, routeLimitKey)) {
            return item;
        }
        // 前置权限不满足时，禁用
        item.disabled = !checkLimitByKeys(needs, { nodePath, limits });
        return item;
    });
}
// 获取所有被允许的权限
function getAllAuthLimitStr(menusConfig, visitedTabs, store) {
    const limitValue = [];
    map(store, (value, storeTab) => {
        var _a;
        const index = Number(storeTab);
        if (visitedTabs.findIndex((tab) => tab === index) > -1) {
            limitValue.push(value);
            return;
        }
        eachTree(((_a = menusConfig[index]) === null || _a === void 0 ? void 0 : _a.children) || [], (item) => {
            const limits = convertLimitStr(value);
            if (limits[item.nodePath]) {
                limitValue.push(item.nodePath);
            }
        });
    });
    return limitValue.join(',');
}
// 获取所有 被允许的 api
function getAllAuthApiStr(menusConfig, limitValue) {
    const limits = convertLimitStr(limitValue);
    const authApis = {};
    eachTree(menusConfig, (item) => {
        const { nodePath, apis } = item;
        if (!apis) {
            return;
        }
        Object.values(apis).forEach((apiItem) => {
            const { url, key, limits: needs } = apiItem;
            const auth = !needs ? true : checkLimitByKeys(needs, { nodePath, limits });
            if (auth) {
                authApis[key || url] = true;
            }
        });
    });
    const apiValue = Object.keys(authApis).join(',');
    return apiValue;
}
export default LimitSetting;
