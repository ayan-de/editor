export interface FileNavbarProps {
  onToggleTerminal?: () => void;
  isTerminalOpen?: boolean;
}

export interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  tooltip?: string;
}

export interface SideNavbarProps {
  columns: SidebarItem[];
  activeItemId?: string;
}
