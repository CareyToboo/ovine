var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled, { css } from 'styled-components';
import { inline, ellipsis } from "../../styled/utils";
export var StyledLayout = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  height: 100%;\n  width: 100%;\n\n  ", "\n\n  .brand-logo {\n    width: 22px;\n  }\n\n  .app-layout-brand {\n    color: #fff;\n    &:hover,\n    &:active {\n      color: #fff;\n    }\n  }\n\n  .app-layout-body {\n    position: relative;\n    width: 100%;\n    min-height: 100%;\n  }\n"], ["\n  position: relative;\n  height: 100%;\n  width: 100%;\n\n  ",
    "\n\n  .brand-logo {\n    width: 22px;\n  }\n\n  .app-layout-brand {\n    color: #fff;\n    &:hover,\n    &:active {\n      color: #fff;\n    }\n  }\n\n  .app-layout-body {\n    position: relative;\n    width: 100%;\n    min-height: 100%;\n  }\n"])), function (_a) {
    var _b = _a.theme, ns = _b.ns, colors = _b.colors;
    return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    .", "Layout--folded .app-layout-brand {\n      height: 3.125rem;\n      display: table-cell;\n    }\n    .", "Layout {\n      height: 100%;\n      &-body {\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n  "], ["\n    .", "Layout--folded .app-layout-brand {\n      height: 3.125rem;\n      display: table-cell;\n    }\n    .", "Layout {\n      height: 100%;\n      &-body {\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n  "])), ns, ns, colors.bodyBg, colors.text);
});
export var PopupItemMenu = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  ", "\n  ul {\n    min-width: 100px;\n    padding: 0;\n    margin: 0;\n  }\n  li {\n    padding: 6px;\n    list-style: none;\n    cursor: pointer;\n    &:first-child {\n      padding-top: 0;\n    }\n    &:last-child {\n      padding-bottom: 0;\n      border-bottom: 0;\n    }\n  }\n  i {\n    ", ";\n    width: 20px;\n    padding-right: 10px;\n    text-align: center;\n  }\n  span {\n    ", ";\n  }\n"], ["\n  ",
    "\n  ul {\n    min-width: 100px;\n    padding: 0;\n    margin: 0;\n  }\n  li {\n    padding: 6px;\n    list-style: none;\n    cursor: pointer;\n    &:first-child {\n      padding-top: 0;\n    }\n    &:last-child {\n      padding-bottom: 0;\n      border-bottom: 0;\n    }\n  }\n  i {\n    ", ";\n    width: 20px;\n    padding-right: 10px;\n    text-align: center;\n  }\n  span {\n    ", ";\n  }\n"])), function (_a) {
    var colors = _a.theme.colors;
    return css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    li {\n      border-bottom: 1px solid ", ";\n      &:hover {\n        color: ", ";\n      }\n    }\n  "], ["\n    li {\n      border-bottom: 1px solid ", ";\n      &:hover {\n        color: ", ";\n      }\n    }\n  "])), colors.border, colors.linkHover);
}, inline(), inline());
export var PopupMsgMenu = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  min-width: 300px;\n\n  ", "\n"], ["\n  min-width: 300px;\n\n  ",
    "\n"])), function (p) { return css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    .", "Tabs-link a {\n      padding-top: 0 !important;\n      padding-bottom: 5px !important;\n    }\n  "], ["\n    .", "Tabs-link a {\n      padding-top: 0 !important;\n      padding-bottom: 5px !important;\n    }\n  "])), p.theme.ns); });
export var SearchInput = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  ", ";\n  ", "\n  .search-input {\n    ", ";\n  }\n"], ["\n  ", ";\n  ",
    "\n  .search-input {\n    ", ";\n  }\n"])), inline(), function (_a) {
    var ns = _a.theme.ns;
    return css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    .", "TreeSelect-arrow {\n      display: none;\n    }\n    .", "TreeSelect-input {\n      width: 0;\n      display: none;\n      border-width: 0 0 1px 0;\n      border-radius: 0;\n      transition: width 2s ease-in-out;\n    }\n    .", "TreeSelect-value {\n      ", ";\n    }\n    .", "Tree {\n      width: 350px;\n      margin-top: 6px;\n      border-color: #dedede;\n      border-radius: 2px;\n    }\n    .active {\n      .", "TreeSelect-input {\n        display: flex;\n        width: 180px;\n      }\n    }\n  "], ["\n    .", "TreeSelect-arrow {\n      display: none;\n    }\n    .", "TreeSelect-input {\n      width: 0;\n      display: none;\n      border-width: 0 0 1px 0;\n      border-radius: 0;\n      transition: width 2s ease-in-out;\n    }\n    .", "TreeSelect-value {\n      ", ";\n    }\n    .", "Tree {\n      width: 350px;\n      margin-top: 6px;\n      border-color: #dedede;\n      border-radius: 2px;\n    }\n    .active {\n      .", "TreeSelect-input {\n        display: flex;\n        width: 180px;\n      }\n    }\n  "])), ns, ns, ns, ellipsis(), ns, ns);
}, inline());
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
