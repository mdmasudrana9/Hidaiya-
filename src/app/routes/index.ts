import { Router } from 'express'
import { eventRoutes } from '../modules/event/event.route'
import { helpRequestRoutes } from '../modules/helpRequest/helpRequest.route'
import { teamRoutes } from '../modules/team/team.route'

const router = Router()

const moduleRoutes = [
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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
