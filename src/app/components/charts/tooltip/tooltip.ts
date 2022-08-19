export interface Tooltip {
  items?: { key: string; value: any }[];
  buttonGroups: {
    name: string;
    buttons: TooltipButton[];
  }[];
  toolTipData: any;
}

export interface TooltipButton {
  id: string;
  className?: string;
  name: string;
  data?: any;
  callback: () => any;
}
