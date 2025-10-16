import { TabContent } from './components/tabs/tabcontent';
import { TabNavItem } from './components/tabs/tabnavitem';
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
