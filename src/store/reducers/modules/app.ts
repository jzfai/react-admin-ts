import { ActionTy, AppTy } from '~/store'

const initState: AppTy = {
  sidebar: {
    opened: true
  }
}
export default function countReducer(preState = initState, action: ActionTy) {
  const { type, data } = action
  switch (type) {
    case 'R_app_sidebar_opened':
      return { ...preState, sidebar: { opened: data } }
    default:
      return preState
  }
}
