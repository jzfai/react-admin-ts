/* react redux */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ObjTy } from '@/types/common'
function SvgIcon(props: ObjTy) {
  const [iconName, setIconName]: any = useState(null)
  useEffect(() => {
    setIconName(`#icon-${props.iconClass}`)
  }, [])
  return (
    <svg aria-hidden="true" className="svg-icon">
      <use xlinkHref={iconName} />
    </svg>
  )
}
//配置使用redux
export default connect(() => ({}))(SvgIcon)
