import { ObjTy } from '@/types/common'

interface UserTy {
  name: string
  role: string
  avatar: string
  token: ObjTy
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
