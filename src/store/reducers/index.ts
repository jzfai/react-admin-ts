//引入combineReducers，用于汇总多个reducer
import { combineReducers } from 'redux'
import { ObjTy } from '~/common'
//自动引入reducers(真香！！！)
const modulesFiles = import.meta.globEager('./modules/*.ts')
let modules: ObjTy = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}

export default combineReducers(modules)
