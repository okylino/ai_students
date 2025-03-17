import styled from 'styled-components';

export const FeedbackWrapper = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 549px;
  height: 56px;
  padding: 8px 16px;
  border-radius: 40px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

export const FeedbackQuestion = styled.span`
  font-family: font/sans;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: var(--letter-spacing-headline);
`;

export const FeedbackButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const IconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const ButtonLabel = styled.span`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  color: #333;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: #333;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const FeedbackFormWrapper = styled.div`
  position: fixed;
  right: 24px;
  top: 24px;
  width: 499px;
  height: 356px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0px 24px;
  z-index: 1000;
`;

export const FormBooleanWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 111px;
    margin-bottom: 32px;
`;
export const FormTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 111px;
    margin-bottom: 16px;
    margin-top: 16px;
    height: 137px;
    position: relative;
`;

export const CharCount = styled.span`
  position: absolute;
  bottom: -24px;
  right: 0;
  font-family: 'Source Sans Pro';
  font-size: 12px;
  color: #666;
`;

export const FormCloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: #333;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const RadioGroup = styled.div`
  width: 451px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

interface RadioOptionProps {
  $isSelected: boolean;
}

export const RadioOption = styled.label<RadioOptionProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  input[type="radio"] {
    width: 20px;
    height: 20px;
    border-radius: 16px;
    padding: 4px;
    margin: 0;
    appearance: none;
    border: 1px solid #BDBDBD;
    position: relative;
    cursor: pointer;

    &:checked {
      border-color: #2B3084;
      background: #2B3084;
      &::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export const OptionLabel = styled.span`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  color: #333;
`;

export const FormTitle = styled.h2`
  font-family: font/sans;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: var(--letter-spacing-headline);
  margin-bottom: 8px;
`;

export const FormDescription = styled.p`
  width: 451px;
  height: 24px;
  font-family: 'Source Sans Pro';
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
`;

export const TextArea = styled.textarea`
  width: 451px;
  height: 80px;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #BDBDBD;
  resize: none;
  font-family: 'Source Sans Pro';
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #2B3084;
  }
`;

export const SubmitButton = styled.button`
  width: 87px;
  height: 36px;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background: #2B3084;
  color: white;
  cursor: pointer;
  float: right;
  margin-top: 16px;
  font-size: 14px;
  &:disabled {
    background: #BDBDBD;
    cursor: not-allowed;
  }
`;

export const SuccessWrapper = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 500px;
  height: 97px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 16px;
  z-index: 1000;
`;

export const SuccessIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 16px;
`;

export const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SuccessTitle = styled.h2`
  font-family: font/sans;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: var(--letter-spacing-headline);
  margin-bottom: 8px;
`;

export const SuccessMessage = styled.p`
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 150%;
`;