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
  active?: boolean;
}

export const Tab = styled.button<TabProps>`
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#1890FF' : 'transparent'};
  color: ${props => props.active ? '#1890FF' : '#666'};
  transition: all 0.3s;

  &:hover {
    color: #1890FF;
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
  color: ${props => props.secondary ? '#666' : '#333'};
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

export const ContentSection = styled.section`
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionIcon = styled.div`
  margin-bottom: 16px;
  
  svg {
    width: 24px;
    height: 24px;
    color: #37439A;
  }
`;

export const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

export const MaterialCard = styled.div`
  background: #F8F9FA;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .material-content {
    padding: 16px;

    h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #666;
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
  margin-top: 24px;
  text-align: center;

  .practice-content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    img {
      width: 120px;
      height: 120px;
      margin-right: 24px;
    }

    .practice-text {
      text-align: left;

      .due-date {
        color: #666;
        margin-top: 8px;
      }
    }
  }
`;

export const PracticeButton = styled.button`
  background: #37439A;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #2C3580;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;