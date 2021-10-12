// eslint-disable-next-line no-use-before-define
import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { asyncRouters } from '@/router/config'
import { Menu } from 'antd'
const { SubMenu } = Menu
import Icon from './Icon'
import path from 'path'
import { isExternal } from '@/utils/validate'
import { ObjTy } from '@/types/common'
import { StateTy } from '@/types/store'
import { RouterRowTy } from '@/types/router'
function menuItem(props: ObjTy) {
  /*侧边栏默认选中和展开*/
  let location = useLocation()
  let activeMenu = location.pathname
  let pathNameArr = location.pathname.substring(1).split('/')
  pathNameArr[0] = '/' + pathNameArr[0]
  const resolvePath = (basePath: string, routePath: string) => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(basePath)) {
      return basePath
    }
    return path.resolve(basePath, routePath)
  }
  let onlyOneChild: ObjTy = {}
  let showSidebarItem = (children = [], parent: RouterRowTy) => {
    const showingChildren = children.filter((item: RouterRowTy) => {
      if (item.hidden) {
        return false
      } else {
        onlyOneChild = item
        return true
      }
    })
    if (showingChildren.length === 1 && !parent?.alwaysShow) {
      return true
    }
    if (showingChildren.length === 0) {
      onlyOneChild = { ...parent, path: '', noChildren: true }
      return true
    }
    return false
  }

  const renderSideMenu = (item: RouterRowTy, basePath: string) => {
    if (item.hidden) return ''
    if (showSidebarItem(item.children, item)) {
      return (
        <Menu.Item
          icon={<Icon icon={item.meta?.icon || onlyOneChild.meta?.icon} />}
          key={resolvePath(basePath, onlyOneChild.path)}
        >
          <Link to={resolvePath(basePath, onlyOneChild.path)}>
            <span className="nav-text">{onlyOneChild.meta?.title}</span>
          </Link>
        </Menu.Item>
      )
    } else {
      return (
        <SubMenu
          icon={<Icon icon={item.meta?.icon || onlyOneChild.meta?.icon} />}
          key={item.path}
          title={item.meta.title}
        >
          {item.children.map((child: RouterRowTy) => {
            return renderSideMenu(child, resolvePath(basePath, child.path))
          })}
        </SubMenu>
      )
    }
  }
  return (
    <Menu
      defaultOpenKeys={pathNameArr}
      inlineCollapsed={!props.opened}
      mode="inline"
      selectedKeys={[activeMenu]}
      theme="dark"
    >
      {asyncRouters.map((route) => {
        return renderSideMenu(route, route.path)
      })}
    </Menu>
  )
}

//配置使用redux
export default connect((state: StateTy) => ({
  opened: state.app.sidebar.opened
}))(menuItem)
