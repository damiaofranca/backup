import styled from "styled-components";
import { Layout } from "antd";

export const Container = styled(Layout)`
  height: 100vh;
  .logo {
    width: 80%;
    margin: 16px auto;
  }
  .logo img {
    width: 100%;
  }
  .system-name {
    width: 100%;
    color: #333333;
    text-align: center;
    font-size: 18px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .nav-menu {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > button {
      margin: 0 10px;
    }
  }
`;
