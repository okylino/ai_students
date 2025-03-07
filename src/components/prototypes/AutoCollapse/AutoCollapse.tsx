import { Collapse } from '@mui/material';
import { useState } from 'react';

import * as $ from './AutoCollapse.style';
import { IAutoCollapseProps } from './AutoCollapse.type';

const defaultLabel: IAutoCollapseProps['label'] = {
  expanded: 'less',
  collapsed: 'more',
};

const AutoCollapse = ({ children, defaultExpanded, label = defaultLabel, ...props }: IAutoCollapseProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const toggleExpanded = () => setExpanded((prev) => !prev);
  return (
    <div className={props.className}>
      <Collapse in={expanded}>{children}</Collapse>
      <$.LabelWrapper onClick={toggleExpanded}>{expanded ? label.expanded : label.collapsed}</$.LabelWrapper>
    </div>
  );
};

export default AutoCollapse;
