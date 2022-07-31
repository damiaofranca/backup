import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: block;
  width: 100vw;
  height: 100vh;
  background: #083d93;
  
  .primary-title {
    color: #083d93;
  }
`;

export const ContainerCard = styled.div`
  position: relative;
  display: block;
`;

export const ContainerFloatable = styled.div`
  position: absolute;
  display: block;
  left: 50%;
  top: 10vh;
  transform: translateX(-50%);
  background: #ffffff;
  border-radius: 6px;
  min-height: 100px;
  width: 65vw;
  padding: 33px;

  // xl
  @media (max-width: 1200px) {
    width: 80vw;
  }

  @media (min-width: 1600px) {
    width: 60vw;
  }

  @media (min-width: 1900px) {
    width: 40vw;
  }
`;

export const ContainerFlex = styled.div`
  display: flex;
  width: 100%;
`;

export const ContainerFlexSlotRight = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-right: 1px solid #adb5bd;
  padding-right: 44px;
  width: 50%;
  padding-top: 40px;
`;

export const ContainerFlexSlotRightTitles = styled.div`
  padding-left: 50px;
`;

export const ContainerFlexSlotLeft = styled.div`
  display: block;
  width: 50%;
  padding-top: 60px;
  padding-left: 60px;
  padding-right: 60px;
`;

export const ContainerImage = styled.div`
  margin-top: 60px;
  text-align: center;

  img {
    margin-bottom: -33px;

    width: 100%;
  }
`;

// export const Title = styled.div`
//   font-family: Poppins;
//   font-style: normal;
//   font-weight: 600;
//   font-size: 18px;
//   line-height: 27px;
//   color: #083d93;
// `;

// export const EnterTitle = styled.div`
//   font-family: Poppins;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 22px;
//   line-height: 33px;

//   /* primary colors/blue-normal */

//   color: #083d93;
//   margin-bottom: 17px;
// `;

// export const SubTitle = styled.div`
//   font-family: Poppins;
//   font-style: normal;
//   font-weight: normal;
//   font-size: 14px;
//   line-height: 21px;

//   /* gray scale/gray-600 */

//   margin-top: 12px;

//   color: #495057;
// `;

export const TextFieldWrapper = styled.div<{ isLast?: boolean }>`
  margin-bottom: ${(p) => (p.isLast ? 33 : 23)}px;
`;
