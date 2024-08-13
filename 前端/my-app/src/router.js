import App from'./page/App.js'
import LogIn from'./page/LogIn.js'
import Register from'./page/Register.js'
import AfterLogIn from'./page/AfterLogIn.js'

import { createBrowserRouter } from 'react-router-dom'

const router=createBrowserRouter([
  {
    path:'/LogIn',
    element:< LogIn/>
  },
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/Register',
    element:<Register/>
  },
  {
    path:'/AfterLogIn',
    element:<AfterLogIn/>
  }
])
export default router