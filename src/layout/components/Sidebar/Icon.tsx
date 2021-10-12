// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react'
import SvgIcon from '@/icons/svg-icon'
import { ObjTy } from '@/types/common'
import './Icon.scss'
function Icon(props: ObjTy) {
  return (
    <Fragment>
      {props.icon && (
        <div className="nav-icon">
          <SvgIcon iconClass={props.icon} />
        </div>
      )}
    </Fragment>
  )
}

export default Icon
