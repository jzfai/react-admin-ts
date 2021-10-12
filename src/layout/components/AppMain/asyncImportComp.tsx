// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import { ObjTy } from '@/types/common'

const asyncImportComponent = function (importComp: any) {
  function AsyncComponent(props: ObjTy) {
    const [Comp, setComp] = useState(null)
    useEffect(() => {
      async function fetchComponent() {
        try {
          const { default: importComponent } = await importComp()
          setComp(() => importComponent)
        } catch (e) {
          throw new Error('加载组件出错')
        }
      }
      fetchComponent()
    }, [])
    // @ts-ignore
    return Comp ? <Comp {...props} /> : <div className="pl"> </div>
  }
  return AsyncComponent
}

export default asyncImportComponent
