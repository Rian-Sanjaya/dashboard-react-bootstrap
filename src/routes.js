import Dashboard from './views/Dashboard/Dashboard'
import Buttons from './views/Components/Buttons'
import GridSystem from './views/Components/GridSystem'
import Charts from './views/Charts/Charts'

let routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "now-ui-icons design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    path: "/components",
    name: "Components",
    state: "openComponents",
    icon: "now-ui-icons education_atom",
    views: [
      {
        path: "/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/grid-system",
        name: "Grid System",
        mini: "GS",
        component: GridSystem,
        layout: "/admin"
      },
      // {
      //   path: "/panels",
      //   name: "Panels",
      //   mini: "P",
      //   component: Panels,
      //   layout: "/admin"
      // },
      // {
      //   path: "/sweet-alert",
      //   name: "Sweet Alert",
      //   mini: "SA",
      //   component: SweetAlert,
      //   layout: "/admin"
      // },
      // {
      //   path: "/notifications",
      //   name: "Notifications",
      //   mini: "N",
      //   component: Notifications,
      //   layout: "/admin"
      // },
      // {
      //   path: "/icons",
      //   name: "Icons",
      //   mini: "I",
      //   component: Icons,
      //   layout: "/admin"
      // },
      // {
      //   path: "/typography",
      //   name: "Typography",
      //   mini: "T",
      //   component: Typography,
      //   layout: "/admin"
      // }
    ]
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "now-ui-icons business_chart-pie-36",
    component: Charts,
    layout: "/admin"
  },
]

export default routes