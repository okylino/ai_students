export type CustomSelectProps = {
  value: string;
  list: { label: string; value: string }[];
  handleValueChange: (value: string) => void;
};
