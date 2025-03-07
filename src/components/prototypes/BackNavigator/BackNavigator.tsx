import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowLeft from '@/assets/svgr/icons/arrow-left.svg';
import { ROUTE_PATH } from '@/enums/routePath';

import * as $ from './BackNavigator.style';
import { BackNavigatorProps } from './BackNavigator.type';

const fallbackRoute = ROUTE_PATH.MY_CLASS;

/**
 *  Navigates back to the previous page by default.
 * * If the current page is the first page in the history stack, it will instead navigate to the fallback route
 * @param {To} to  can be provided to specify the route and adds to the history stack
 */
const BackNavigator = ({ to, label }: BackNavigatorProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleNavigateClick = () => {
    if (!to) {
      if (location.key === 'default') {
        navigate(fallbackRoute);
        return;
      }
      navigate(-1);
      return;
    }
    navigate(to);
  };

  return (
    <$.Wrapper>
      <$.Navigator onClick={handleNavigateClick}>
        <ArrowLeft />
        {label || t('common:navigate.back')}
      </$.Navigator>
    </$.Wrapper>
  );
};

export default BackNavigator;
