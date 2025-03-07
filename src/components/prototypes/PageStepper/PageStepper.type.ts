export interface PageStepperProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (newPage: number) => void;
}
