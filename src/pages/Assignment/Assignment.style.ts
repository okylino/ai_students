import styled from 'styled-components';

const breakpoints = {
  mobile: '480px',
  tablet: '768px'
};

export const AssignmentWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 16px 24px;
  background: white;
  
  a {
    color: #668;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px 16px;
    margin-bottom: 0;
    border-bottom: 1px solid #eaeaea;
  }
`;

export const Separator = styled.span`
  color: #666;
`;

export const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 22px;
  margin: 24px 0 20px;
  text-align: center;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 18px;
    margin: 16px 0;
    text-align: center;
  }
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 24px;
  overflow-x: auto;
  padding: 0 16px;
  justify-content: center;
  
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;
    padding: 8px 16px;
    white-space: nowrap;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 16px;
    width: 100%;
    
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface TabProps {
  $active?: boolean;
  $hasUnread?: boolean;
}

export const Tab = styled.button<TabProps>`
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid ${(props) => (props.$active ? '#1890FF' : 'transparent')};
  color: ${(props) => (props.$active ? '#1890FF' : '#666')};
  transition: all 0.3s;
  position: relative;
  white-space: nowrap;

  &:hover {
    color: #1890ff;
  }

  ${(props) =>
    props.$hasUnread &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background: #ff4d4f;
      border-radius: 50%;
    }
  `}
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

export const NoAssignmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;

  img {
    margin-bottom: 24px;
    width: 200px;
  }
`;

interface MessageProps {
  secondary?: boolean;
}

export const Message = styled.p<MessageProps>`
  color: ${(props) => (props.secondary ? '#666' : '#333')};
  margin: 8px 0;
`;

export const ExtendedMaterialsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 40px;
  text-align: center;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  p {
    color: #666;
    margin-bottom: 24px;
  }
`;

export const ContentWrapper = styled.div`
  background: #F5F5F5;
  padding: 0 16px;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 16px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 8px;
    background: #f5f5f5;
  }
`;

export const ContentSection = styled.div`
  background: #ffffff;
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
  width: 100%;
  max-width: 828px;
  margin: 0 auto 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    margin-top: 30px;
    padding-left: 0;

    img {
      width: 24px;
      height: 24px;
    }

    h2 {
      font-family: sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 21.6px;
      letter-spacing: 0.15px;
      color: #212121;
      margin: 0;
    }
    
    &:first-child {
      margin-top: 0;
    }
  }

  .description {
    font-family: sans-serif;
    font-size: 14px;
    line-height: 22.4px;
    color: #444444;
    margin-bottom: 24px;
    padding-left: 34px;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 16px;
    margin: 0 auto 16px;
    
    .section-header {
      margin-top: 30px;
      padding-left: 0;
      
      &:first-child {
        margin-top: 0;
      }
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px 12px;
    margin: 0 auto 16px;
    border-radius: 8px;
    max-width: 100%;
    
    .section-header {
      gap: 10px;
      margin-top: 24px;
      
      h2 {
        font-size: 16px;
        line-height: 19px;
      }
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    .description {
      padding-left: 24px;
      margin-bottom: 16px;
    }
  }
`;

export const SectionIcon = styled.div`
  margin-bottom: 16px;

  svg {
    width: 24px;
    height: 24px;
    color: #37439a;
  }
`;

export const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding-left: 56px;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding-left: 32px;
    gap: 12px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const MaterialCard = styled.div`
  display: flex;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  gap: 16px;
  
  img {
    width: 128px;
    height: 72px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    
    img {
      width: 96px;
      height: 72px;
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    height: auto;
    padding: 12px;
    
    img {
      width: 80px;
      height: 60px;
    }
    
    .material-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      h3 {
        font-size: 15px;
        line-height: 18px;
        margin-bottom: 4px;
      }
      
      p {
        font-size: 13px;
        line-height: 16px;
      }
    }
  }
`;

export const MoreExercisesSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 40px;
  text-align: center;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  p {
    color: #666;
    margin-bottom: 24px;
  }
`;

export const PracticeSection = styled.div`
  text-align: center;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .practice-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;

    img {
      width: 250px;
      height: 150px;
      margin-bottom: 16px;
    }

    .practice-text {
      text-align: center;

      p {
        font-family: sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 19.2px;
        letter-spacing: 0.15px;
        color: #212121;
        margin: 0;
      }

      .due-date {
        font-weight: 400;
        font-size: 14px;
        color: #444444;
        margin-top: 8px;
      }
    }
  }

  .quiz-card {
    width: 700px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 0px 6px 0px #00000029;
    margin-bottom: 16px;
    background: #FFFFFF;
    text-align: left;
    
    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
    }
    
    @media (max-width: ${breakpoints.mobile}) {
      padding: 12px;
    }
  }

  .quiz-header {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    align-items: flex-start;
  }

  .quiz-number {
    font-size: 16px;
    line-height: 19px;
    color: #333;
    font-weight: 500;
    min-width: 24px;
  }

  .quiz-question {
    font-size: 16px;
    line-height: 19px;
    color: #333;
    flex: 1;
  }

  .quiz-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 24px;
    position: relative;

    .option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      height: 26px;
      position: relative;
      border-radius: 4px;
      transition: all 0.3s ease;
      width: 100%;
      
      @media (max-width: ${breakpoints.mobile}) {
        padding: 8px 12px;
        align-items: flex-start;
        height: auto;
        min-height: 26px;
      }

      &.selected.correct,
      &.selected.incorrect,
      &.correct-answer {
        &::before {
          content: '';
          position: absolute;
          left: -24px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          font-size: 16px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      &.selected.correct {
        color: #52C41A;

        &::before {
          content: '✓';
          color: #52C41A;
        }
      }

      &.selected.incorrect {
        color: #FF4D4F;

        &::before {
          content: '×';
          color: #FF4D4F;
        }
      }

      &.correct-answer {
        color: #52C41A;

        &::before {
          content: '✓';
          font-weight: 800;
          color: #52C41A;
        }
      }

      &.clickable {
        cursor: pointer;

        &:hover {
          background-color: rgba(24, 144, 255, 0.1);
        }

        &.selected {
          background-color: rgba(24, 144, 255, 0.2);
        }
      }

      .option-label {
        font-weight: 500;
        min-width: 24px;
        color: inherit;
      }

      .option-content {
        flex: 1;
        color: inherit;
      }
    }
  }

  .show-explanation {
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: 0.15px;
    text-decoration: underline;
    text-decoration-style: solid;
    color: #A4A4A4;
    background: none;
    border: none;
    cursor: pointer;
    margin-top: 16px;
    padding: 0;
    text-align: left;
    margin-left: 24px;

    &:hover {
      opacity: 0.8;
    }
  }

  .explanation-section {
    margin-top: 12px;
    padding-left: 24px;

    .explanation-item {
      margin-bottom: 8px;
      display: flex;
      align-items: flex-start;

      .explanation-label {
        font-weight: 500;
        font-size: 14px;
        line-height: 120%;
        letter-spacing: 0.15px;
        color: #333;
        margin-right: 8px;
        min-width: 24px;
      }

      .explanation-content {
        font-size: 14px;
        line-height: 120%;
        color: #666;
        flex: 1;
      }
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    .practice-content {
      img {
        width: 200px;
        height: auto;
      }
    }
    
    .quiz-header {
      .quiz-question {
        font-size: 15px;
      }
    }
  }
`;

export const PracticeButton = styled.button`
  width: 180px;
  height: 48px;
  border-radius: 8px;
  padding: 12px 24px;
  border: 1px solid #2b3084;
  background: #2b3084;
  color: white;
  font-family: sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;

  img {
    width: 32px;
    height: 32px;
  }

  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 160px;
    height: 44px;
    font-size: 15px;
    
    img {
      width: 28px;
      height: 28px;
    }
  }
`;
