import styled from 'styled-components'

export const StyledRouteTabs = styled.div`
  position: fixed;
  top: 50px;
  right: 0;
  left: 220px;
  z-index: 999;
  height: 40px;
  line-height: 40px;
  padding-left: 40px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);

  .layui-icon-prev {
    left: 0;
    border-left: none;
    border-right: 1px solid #f6f6f6;
  }

  .layui-icon-next {
    right: 0;
  }

  .rtadmin-tabs-control {
    position: absolute;
    top: 0;
    width: 40px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    box-sizing: border-box;
    border-left: 1px solid #f6f6f6;
  }

  .layui-tab {
    margin: 0;
    overflow: hidden;
    cursor: pointer;
  }

  .layui-tab-title {
    height: 40px;
    border: none;

    .layui-this {
      color: #000;
      &:after {
        border: 0;
        width: 100%;
      }
    }

    li {
      min-width: 0;
      line-height: 40px;
      max-width: 160px;
      text-overflow: ellipsis;
      padding-right: 40px;
      overflow: hidden;
      border-right: 1px solid #f6f6f6;
      vertical-align: top;
      &:first-child {
        padding-right: 15px;
        .layui-tab-close {
          display: none;
        }
      }
      &:hover:after {
        width: 100%;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        border-radius: 0;
        background-color: #292b34;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
      }
    }

    .layui-tab-close {
      position: absolute;
      right: 8px;
      top: 50%;
      margin: -7px 0 0;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border-radius: 50%;
      font-size: 12px;
      &:hover {
        border-radius: 100%;
      }
    }
  }

  li.layui-this,
  li:hover {
    background-color: #f6f6f6;
  }
`