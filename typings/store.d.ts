import { ObjTy } from '~/common'

interface UserTy {
  name: string
  role: string
  avatar: string
  token: string
}
interface AppTy {
  sidebar: {
    opened: boolean
  }
}

interface StateTy {
  app: AppTy
  user: UserTy
}

interface ActionTy {
  type: string
  data: any
}
