import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// screens
import useAppContext from '../../hooks/useAppContext';
import Home from '../screens/dashboard';
import SiteModal from '../screens/dashboard/SiteModal';
import ChildPacking from '../screens/dashboard/childPacking/ChildPacking';
import QualityCheck from '../screens/dashboard/childPacking/qualityCheck/QualityCheck';
import DeliveryNote from '../screens/dashboard/deliveryNote/DeliveryNote';
import DeliveryPlan from '../screens/dashboard/deliveryPlan/DeliveryPlan';
import Picking from '../screens/dashboard/picking/Picking';
import PickedSto from '../screens/dashboard/picking/pickedSTO/PickedSto';
import PickingSto from '../screens/dashboard/picking/pickingSTO/PickingSto';
import PickingStoArticle from '../screens/dashboard/picking/pickingStoArticle/PickingStoArticle';
import Print from '../screens/dashboard/print/Print';
import PoArticles from '../screens/dashboard/receiving/PoArticles/PoArticles';
import Receiving from '../screens/dashboard/receiving/Receiving';
import PurchaseOrder from '../screens/dashboard/receiving/purchaseOrder/PurchaseOrder';
import Return from '../screens/dashboard/return/Return';
import ReturnDetails from '../screens/dashboard/return/returnDetails/ReturnDetails';
import ReturnScanner from '../screens/dashboard/return/scanner/Scanner';
import Shelving from '../screens/dashboard/shelving/Shelving';
import ShelveArticle from '../screens/dashboard/shelving/article/ShelveArticle';
import ShelvingScanner from '../screens/dashboard/shelving/scanner/Scanner';
import PickerPackerTaskAssign from '../screens/dashboard/taskAssign/PickerPackerTaskAssign/PickerPackerTaskAssign';
import TaskAssign from '../screens/dashboard/taskAssign/TaskAssign';
import ChangePassword from '../screens/dashboard/userProfile/ChangePassword';
import Profile from '../screens/dashboard/userProfile/Profile';
import Audit from '../screens/dashboard/audit/Audit';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {authInfo} = useAppContext();
  const {user} = authInfo;

  const routes = [
    {id: 'home', name: 'Home', component: Home},
    {id: 'profile', name: 'Profile', component: Profile},
    {id: 'change-password', name: 'ChangePassword', component: ChangePassword},
    {id: 'receiving', name: 'Receiving', component: Receiving},
    {id: 'purchase-order', name: 'PurchaseOrder', component: PurchaseOrder},
    {id: 'po-articles', name: 'PoArticles', component: PoArticles},
    {id: 'shelving', name: 'Shelving', component: Shelving},
    {
      id: 'shelving-scanner',
      name: 'ShelvingScanner',
      component: ShelvingScanner,
    },
    {id: 'shelve-article', name: 'ShelveArticle', component: ShelveArticle},
    {id: 'delivery-plan', name: 'DeliveryPlan', component: DeliveryPlan},
    {id: 'task-assign', name: 'TaskAssign', component: TaskAssign},
    {
      id: 'picker-packer-task-assign',
      name: 'PickerPackerTaskAssign',
      component: PickerPackerTaskAssign,
    },
    {id: 'picking', name: 'Picking', component: Picking},
    {id: 'picking-sto', name: 'PickingSto', component: PickingSto},
    {id: 'picked-sto', name: 'PickedSto', component: PickedSto},
    {
      id: 'picking-sto-article',
      name: 'PickingStoArticle',
      component: PickingStoArticle,
    },
    {id: 'child-packing', name: 'ChildPacking', component: ChildPacking},
    {id: 'quality-check', name: 'QualityCheck', component: QualityCheck},
    {id: 'master-packing', name: 'MasterPacking', component: Receiving},
    {id: 'delivery-note', name: 'DeliveryNote', component: DeliveryNote},
    {id: 'return', name: 'Return', component: Return},
    {id: 'return-scanner', name: 'ReturnScanner', component: ReturnScanner},
    {id: 'return-details', name: 'ReturnDetails', component: ReturnDetails},
    {id: 'audit', name: 'Audit', component: Audit},
    {id: 'print', name: 'Print', component: Print},
  ];

  return (
    <Stack.Navigator initialRouteName="SiteModal">
      {user !== null && user.site.length > 1 && (
        <Stack.Group
          screenOptions={{headerShown: false, presentation: 'modal'}}>
          <Stack.Screen name="SiteModal" component={SiteModal} />
        </Stack.Group>
      )}
      <Stack.Group screenOptions={{headerShown: false}}>
        {routes.map(route => (
          <Stack.Screen
            key={route.id}
            name={route.name}
            component={route.component}
            options={{
              headerShown: false,
            }}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppStack;
