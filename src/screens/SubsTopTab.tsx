import MySabs from './tabTopSubs/MySubs';
import InformTab from './tabTopSubs/InformTab';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTabNavigation = createMaterialTopTabNavigator();

const SubsTopTab = () => {
  return (
    <TopTabNavigation.Navigator>
      <TopTabNavigation.Screen name="My subscription" component={MySabs} />
      <TopTabNavigation.Screen name="Inform" component={InformTab} />
    </TopTabNavigation.Navigator>
  );
};

export default SubsTopTab;
