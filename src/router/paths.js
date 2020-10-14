/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Home'
  },
  {
    path: '/home',
    // Relative to /src/views
    view: 'Home'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  },
  {
    path: '/login',
    name: 'login',
    view: 'Login'
  },
  {
    path: '/sign-up',
    name: 'Sign up',
    view: 'SignUp'
  },
  {
    path: '/sign-up-handyman',
    name: 'Handyman sign up ',
    view: 'SignupHandyMan'
  },
  {
    path: '/sign-up-homeowner',
    name: 'Homeowner sign up ',
    view: 'SignupHomeOwner'
  },
  {
    path: '/search-handyman',
    name: 'Search Handyman',
    view: 'SearchHandyman'
  },
  {
    path: '/handyman-skill',
    name: 'Register Handyman skills',
    view: 'Handymanskill'
  },
  {
    path: '/Create-Handyman-Skills',
    name: 'Create Handyman Skills',
    view: 'CreateHandymanSkill'
  },
  {
    path: '/booking',
    name: 'Booking',
    view: 'Booking'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    view: 'Dashboard'
  }
]
