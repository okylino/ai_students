import * as $ from './PageStepper.style';
import { PageStepperProps } from './PageStepper.type';

const PageStepper = ({ currentPage = 0, totalPage = 0, onPageChange }: PageStepperProps) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPage;

  const handleNextClick = () => {
    if (onPageChange) {
      const newPage = isLastPage ? currentPage : currentPage + 1;
      onPageChange(newPage);
    }
  };

  const handlePrevClick = () => {
    if (onPageChange) {
      const newPage = isFirstPage ? currentPage : currentPage - 1;
      onPageChange(newPage);
    }
  };

  return (
    <$.Wrapper>
      <$.ActionButton onClick={handlePrevClick} disabled={isFirstPage}>
        <$.PrevIcon />
      </$.ActionButton>
      <span>
        {currentPage} / {totalPage}
      </span>
      <$.ActionButton onClick={handleNextClick} disabled={isLastPage}>
        <$.NextIcon />
      </$.ActionButton>
    </$.Wrapper>
  );
};

export default PageStepper;
