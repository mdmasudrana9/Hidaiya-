import { Router } from 'express'
import { eventRoutes } from '../modules/event/event.route'
import { helpRequestRoutes } from '../modules/helpRequest/helpRequest.route'
import { teamRoutes } from '../modules/team/team.route'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { donateRoutes } from '../modules/donate/donate.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/events',
    route: eventRoutes,
  },
  {
    path: '/helpRequest',
    route: helpRequestRoutes,
  },
  {
    path: '/team',
    route: teamRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/donate',
    route: donateRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
