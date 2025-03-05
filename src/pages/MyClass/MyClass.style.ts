import { styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';

import { INVALID, NEUTRAL, VIOLET } from '@/styles/colors';

export const Wrapper = styled('div')`
  display: flex;
  padding-top: 40px;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 46.2px 24px;
`;

export const ImageWrapper = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 450px) {
    flex-direction: column;
    gap: 24px;
    text-align: center;
    width: 100%;
  }
`;

export const ImageContent = styled('div')`
  color: ${VIOLET[700]};
`;

export const ImageTitle = styled('p')`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

export const ImageSubTitle = styled('p')`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const ClassWrapper = styled('div')`
  width: 828px;
  display: flex;
  flex-direction: column;

  @media (max-width: 876px) {
    width: 100%;
  }
`;

export const ClassCard = styled('div')`
  background-color: ${NEUTRAL[0]};
  padding: 24px 24px 16px;
  border: 1px solid ${NEUTRAL[400]};
  border-radius: 8px;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  column-gap: 16px;
  row-gap: 5px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    column-gap: 8px;
    grid-template-columns: auto 100px;
    padding: 16px 16px 8px;
  }
`;

export const InputTitle = styled('p')`
  font-size: 16px;
  color: ${NEUTRAL[900]};
  font-weight: 600;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 576px) {
    font-size: 12px;
    font-weight: 500;
    flex: 0 0 100%;
  }
`;

export const Input = styled(OutlinedInput)`
  flex-grow: 1;
  line-height: 48px;
  border-radius: 8px;

  & .MuiInputBase-input {
    font-size: 16px;
    padding: 12px 16px;
  }

  &.Mui-error .MuiOutlinedInput-notchedOutline {
    border-color: ${INVALID[600]};
  }

  @media (max-width: 576px) {
    grid-row-start: 2;
  }
`;

export const InputErrorText = styled(FormHelperText)`
  color: ${INVALID[600]};
  order: 4;
  grid-column-start: 2;
  grid-column-end: 3;
  margin-left: 6px;

  @media (max-width: 576px) {
    grid-row-start: 3;
    grid-column-start: 1;
  }
`;

export const InputButtonWrapper = styled('div')`
  width: 120px;
  @media (max-width: 576px) {
    width: 100px;
    grid-row-start: 2;
  }
`;

export const SectionTitle = styled('p')`
  font-size: 16px;
  font-weight: 600;
  color: ${NEUTRAL[900]};
  margin: 0 0 8px;
`;

export const CardWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const OngoingCard = styled('div')`
  background-color: ${NEUTRAL[0]};
  padding: 24px;
  border: 1px solid ${NEUTRAL[400]};
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 120px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr 80px;
  }
`;

export const CardTitle = styled('p')`
  font-size: 18px;
  color: ${NEUTRAL[900]};
  font-weight: 600;
  margin-bottom: 8px;
  margin: 0;
  @media (max-width: 576px) {
    grid-column-start: 1;
    grid-column-end: 3;
  }
`;

export const CardSubTitle = styled('p')`
  font-size: 16px;
  color: ${NEUTRAL[600]};
  margin: 8px 0 0;
`;

export const Time = styled('p')`
  font-size: 14px;
  color: ${VIOLET[700]};
  margin: 8px 0 0;
`;

export const ButtonWrapper = styled('div')`
  width: 120px;
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  align-self: center;

  @media (max-width: 576px) {
    width: 80px;
    margin-top: 8px;
    grid-row-start: 2;
  }
`;

export const ClassAccordion = styled(Accordion)`
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${NEUTRAL[400]};
  &:before {
    display: none;
  }

  &.Mui-disabled,
  & .Mui-disabled {
    background-color: ${NEUTRAL[0]};
    opacity: 1;
  }
`;

export const ClassAccordionSummary = styled(AccordionSummary)`
  padding: 0;
  margin: 0;
  & .MuiAccordionSummary-content {
    margin: 0;
  }
`;

export const DropdownButton = styled('button')`
  background-color: ${VIOLET[50]};
  border-radius: 8px;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${VIOLET[700]};
    color: ${NEUTRAL[0]};
  }

  &:disabled {
    background-color: ${NEUTRAL[300]};
  }
`;

export const Line = styled('div')`
  border-top: 1px solid ${NEUTRAL[600]};
  margin-top: 16px;
`;

export const SeeLessonsLink = styled('div')`
  color: ${NEUTRAL[600]};
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  margin-top: 16px;
`;

export const NoClassWrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 16px;
`;

export const NoClassText = styled('p')`
  font-size: 14px;
  color: ${NEUTRAL[600]};
`;
