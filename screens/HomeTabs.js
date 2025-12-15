import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TeamGameScreen from "./TeamGameScreen";
import FinanceScreen from "./FinanceScreen";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Team & Game"
        component={TeamGameScreen}
      />
      <Tab.Screen
        name="Finance"
        component={FinanceScreen}
      />
    </Tab.Navigator>
  );
}

