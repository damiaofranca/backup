import styled from "styled-components";

export const Container = styled.div`
  background-color: white;

  .ant-form-item-labe--upload {
    margin-bottom: 10px;
  }
`;

export const ContainerLoading = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

export const ContainerActions = styled.div`
  display: flex;

  & > button {
    margin: 0 0.2rem;
  }
`;
