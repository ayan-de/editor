export function getDrawerTitle(activeItem: string): string {
  switch (activeItem) {
    case 'explorer':
      return 'Explorer';
    case 'search':
      return 'Search';
    case 'git':
      return 'Source Control';
    default:
      return 'Explorer';
  }
}
