// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./screens/Login/";
import ForgotPassword from "./screens/ForgotPassword";
import SignUp from "./screens/SignUp/";
import Walkthrough from "./screens/Walkthrough/";
import Comments from "./screens/Comments/";
import Channel from "./screens/Channel";
import Story from "./screens/Story";
import Transfer from "./screens/Gln/Transfer/";
import History from "./screens/Gln/History/";
import Create from "./screens/Gln/Create/";
import Main from "./screens/Gln/Home/";
import Setting from "./screens/Gln/Setting/";
import Home from "./screens/Home/";
import Channels from "./screens/Channels";
import Sidebar from "./screens/Sidebar";
import Overview from "./screens/Overview";
import Calendar from "./screens/Calendar/";
import Timeline from "./screens/Timeline";
import Feedback from "./screens/Feedback/";
import Profile from "./screens/Profile/";
import Icoprev from "./screens/Profile/IcoPrev.js";
import TeamWork from "./screens/Profile/TeamWork.js";

import depnwith from "./screens/Profile/depoAndwithdraw.js";
import Settings from "./screens/Settings";
import LoginUlang from "./screens/Profile/LoginUlang.js";

import CommingSoon from "./screens/Profile/CommingSoon.js";


const Drawer = DrawerNavigator(
  {
    Main: { screen: Main },
    History: { screen: History },
    Transfer: { screen: Transfer },
    Create: { screen: Create },
    Home: { screen: Home },
    Channels: { screen: Channels },
    Overview: { screen: Overview },
    Calendar: { screen: Calendar },
    Timeline: { screen: Timeline },
    Feedback: { screen: Feedback },
    Profile: { screen: Profile },
    Icoprev: { screen: Icoprev },
    depnwith: { screen: depnwith },
    Setting: { screen: Setting },
    Settings: { screen: Settings },
     LoginUlang: { screen: LoginUlang },
       TeamWork: { screen: TeamWork },
    CommingSoon: { screen: CommingSoon }
  },
  {
    initialRouteName: "Main",
    contentComponent: props => <Sidebar {...props} />
  }
);

// const Log = StackNavigator(
//   {
   
//     Drawer: { screen: Drawer }
//   },
//   {
//     index: 0,
//     initialRouteName: "Drawer"
//   }
// );

const App = StackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    Walkthrough: { screen: Walkthrough },
    Story: { screen: Story },
     LoginUlang: { screen: LoginUlang },
    Comments: { screen: Comments },
    Channel: { screen: Channel },
    Drawer: { screen: Drawer }
  },
  {
    index: 0,
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;
