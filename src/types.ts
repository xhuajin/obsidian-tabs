import { TabContent } from './components/tabs/tab-content';
import { TabNavItem } from './components/tabs/tab-nav-item';
import { Tabs } from './components/tabs/tabs';

export interface TabDragger {
  fromTabs: Tabs;
  toTabs?: Tabs;
  draggedTab: TabNavItem;
  draggedContent: TabContent;
  draggedContentLineCount: number;
  draggedIndex: number;
  dropIndex?: number;
}
