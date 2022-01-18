// eslint-disable-next-line no-use-before-define
import React from 'react'
import { connect } from 'react-redux'
import { Sidebar, Navbar, AppMain } from './components'
import './Layout.scss'
import { ObjTy } from '~/common'
import { StateTy } from '~/store'
function Layout(props: ObjTy) {
  return (
    <div className={`${!props.opened && 'closeSidebar'}`}>
      {/* left container*/}
      <div className="sidebar-container">
        <Sidebar />
      </div>
      {/*right container*/}
      <div className="main-container">
        <Navbar />
        <AppMain />
      </div>
    </div>
  )
}
export default connect(
  (state: StateTy) => ({
    opened: state.app.sidebar.opened
  }),
  {}
)(Layout)
