export type Option = {
  label: string | number;
  value: string | number;
};

export type GroupOption = {
  label: string;
  value: Option[] | GroupOption[];
};
