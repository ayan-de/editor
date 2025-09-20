export interface DrawerItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
}

export interface DrawerProps {
  isOpen?: boolean; // Made optional since drawer will always be open
  title: string;
  items: DrawerItem[];
  onClose?: () => void;
  children?: React.ReactNode; // Custom content for the drawer
}
