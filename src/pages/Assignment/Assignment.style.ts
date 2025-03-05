import styled from 'styled-components';

export const AssignmentWrapper = styled.div`
  padding: 24px;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  a {
    color: #666;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Separator = styled.span`
  color: #666;
`;

export const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

export const TabList = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  justify-content: center;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentSection = styled.div`
  background: #ffffff;
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
  width: 828px;
  margin: 0 auto;

  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    padding-left: 16px;

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
  }

  .description {
    font-family: sans-serif;
    font-size: 14px;
    line-height: 22.4px;
    color: #444444;
    margin-bottom: 24px;
    padding-left: 56px;
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
`;

export const MaterialCard = styled.div`
  display: flex;
  width: 342px;
  height: 104px;
  background: #f6f6f6;
  border-radius: 8px;
  padding: 16px;
  gap: 16px;

  img {
    width: 128px;
    height: 72px;
    object-fit: cover;
    border-radius: 4px;
  }

  .material-content {
    flex: 1;

    h3 {
      font-family: sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 19.2px;
      color: #212121;
      margin: 0 0 8px 0;
    }

    p {
      font-family: sans-serif;
      font-size: 14px;
      line-height: 22.4px;
      color: #444444;
      margin: 0;
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
`;
