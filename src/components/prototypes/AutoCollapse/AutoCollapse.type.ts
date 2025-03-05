export interface IAutoCollapseProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  label?: {
    expanded: React.ReactNode;
    collapsed: React.ReactNode;
  };
  className?: string;
}
