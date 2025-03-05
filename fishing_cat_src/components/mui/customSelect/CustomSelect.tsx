import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

import arrowImage from '@fishing_cat/assets/svgr/icons/caret-down-small.svg';
import COLOR from '@fishing_cat/styles/color';

import * as $ from './customSelect.style';
import { CustomSelectProps } from './customSelect.type';

export default function CustomSelect({ value, list, handleValueChange }: CustomSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    handleValueChange(event.target.value as string);
  };

  return (
    <$.CustomizedSelect
      value={value}
      onChange={handleChange}
      IconComponent={arrowImage}
      sx={{
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${COLOR.GRAY[300]}`,
        },
        borderRadius: '8px',
      }}
      MenuProps={{ sx: { maxHeight: 300, marginTop: '4px' } }}
    >
      {list &&
        list.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </$.CustomizedSelect>
  );
}
