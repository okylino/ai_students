import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedbackProps, FeedbackReason } from './AssignmentFeedback.type';
import {
  FeedbackWrapper,
  FeedbackQuestion,
  FeedbackButtons,
  IconButton,
  IconButtonGroup,
  ButtonLabel,
  CloseButton,
  FeedbackFormWrapper,
  FormBooleanWrapper,
  FormTextWrapper,
  RadioGroup,
  RadioOption,
  OptionLabel,
  FormTitle,
  FormDescription,
  TextArea,
  SubmitButton,
  SuccessWrapper,
  SuccessIcon,
  SuccessContent,
  SuccessTitle,
  SuccessMessage,
  CharCount,
  FormCloseButton,
} from './AssignmentFeedback.style';

import YesIcon from '../../assets/assignment/Yes.png';
import NoIcon from '../../assets/assignment/No.png';
import DoneIcon from '../../assets/assignment/Done.png';
import { useSubmitFeedbackMutation } from '@/api/services/assignmentService';

export const AssignmentFeedback: FC<FeedbackProps> = ({ assignmentId, onClose }) => {
  const { t } = useTranslation('assignment');
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [submitFeedback] = useSubmitFeedbackMutation();

  const handleYesClick = async () => {
    try {
      await submitFeedback({
        assignment_id: assignmentId,
        overall: false
      }).unwrap();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleNoClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!selectedReason) return;
    
    try {
      await submitFeedback({
        assignment_id: assignmentId,
        overall: true,
        reason: selectedReason,
        text: additionalFeedback
      }).unwrap();
      setShowForm(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  if (showSuccess) {
    return (
      <SuccessWrapper>
        <SuccessIcon src={DoneIcon} alt="Success" />
        <SuccessContent>
          <SuccessTitle>{t('feedback.success.title')}</SuccessTitle>
          <SuccessMessage>{t('feedback.success.message')}</SuccessMessage>
        </SuccessContent>
      </SuccessWrapper>
    );
  }

  if (showForm) {
    return (
      <FeedbackFormWrapper>
        <FormCloseButton onClick={onClose} aria-label="Close" />
        <FormBooleanWrapper>
          <FormTitle>{t('feedback.whatWentWrong')}</FormTitle>
          <RadioGroup>
            {Object.values(FeedbackReason).map((reason) => (
              <RadioOption key={reason} $isSelected={selectedReason === reason}>
                <input
                  type="radio"
                  name="feedback"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                />
                <OptionLabel>{t(`feedback.reasons.${reason}`)}</OptionLabel>
              </RadioOption>
            ))}
          </RadioGroup>
        </FormBooleanWrapper>
        <FormTextWrapper>
          <FormTitle>{t('feedback.importantOpinion')}</FormTitle>
          <FormDescription>{t('feedback.feedbackOnly')}</FormDescription>
          <TextArea
            placeholder={t('feedback.tellMore')}
            value={additionalFeedback}
            onChange={(e) => setAdditionalFeedback(e.target.value)}
            maxLength={500}
          />
          <CharCount>{additionalFeedback.length}/500</CharCount>
        </FormTextWrapper>
        <SubmitButton onClick={handleSubmit} disabled={!selectedReason}>
          {t('feedback.submit')}
        </SubmitButton>
      </FeedbackFormWrapper>
    );
  }

  return (
    <FeedbackWrapper>
      <FeedbackQuestion>{t('feedback.question')}</FeedbackQuestion>
      <FeedbackButtons>
        <IconButtonGroup>
          <IconButton onClick={handleYesClick}>
            <img src={YesIcon} alt="Yes" />
            <ButtonLabel>Yes</ButtonLabel>
          </IconButton>
          <IconButton onClick={handleNoClick}>
            <img src={NoIcon} alt="No" />
            <ButtonLabel>No</ButtonLabel>
          </IconButton>
        </IconButtonGroup>
        <CloseButton onClick={onClose} aria-label="Close" />
      </FeedbackButtons>
    </FeedbackWrapper>
  );
}; 