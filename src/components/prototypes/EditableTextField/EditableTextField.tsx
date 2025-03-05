import { FormControl, InputBase } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CheckIcon from '@/assets/svgr/icons/check.svg';
import EditIcon from '@/assets/svgr/icons/edit.svg';
import CustomButton from '@/components/prototypes/CustomButton';

import * as $ from './EditableTextField.style';
import { EditableTextFieldProps } from './EditableTextField.type';

const cropString = (targetString = '', maxLength = 0) => {
  if (!targetString || !maxLength) return '';
  return targetString.substring(0, maxLength);
};

const EditableTextField = ({
  className,
  defaultValue = '',
  maxLength = 500,
  onConfirm,
  label,
  placeholder,
}: EditableTextFieldProps) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(cropString(defaultValue, maxLength));
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const validDefaultValue = cropString(defaultValue, maxLength);
    setValue(validDefaultValue);
  }, [defaultValue, maxLength]);

  const handleFieldChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputValue = e.target?.value || '';
    setValue(inputValue);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
      const startPosition = value.length || 0;
      inputRef.current.setSelectionRange(startPosition, startPosition);
    }
  };

  const handleConfirm = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      if (onConfirm) {
        await onConfirm(value);
      }
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormControl fullWidth className={className}>
      <$.Card>
        <$.Row>
          {label}
          {isEditing ? (
            <CustomButton variant='outlined' onClick={handleConfirm}>
              <$.Action>
                <CheckIcon />
                <span>{t('common:action.done')}</span>
              </$.Action>
            </CustomButton>
          ) : (
            <CustomButton variant='outlined' onClick={handleEditClick}>
              <$.Action>
                <EditIcon />
                <span>{t('common:action.edit')}</span>
              </$.Action>
            </CustomButton>
          )}
        </$.Row>
        <InputBase
          inputRef={inputRef}
          value={value}
          readOnly={!isEditing}
          multiline
          placeholder={placeholder}
          onChange={handleFieldChange}
          inputProps={{
            maxLength,
          }}
          disabled={isLoading}
        />
      </$.Card>
      <$.HelperText>
        {value?.length || 0}/{maxLength}
      </$.HelperText>
    </FormControl>
  );
};

export default EditableTextField;
