import Modal from 'antd/es/modal/Modal'
export default {
  antConfirm(content: string) {
    return new Promise((resolve) => {
      // @ts-ignore
      Modal.confirm({
        title: '删除',
        content: content,
        okText: '是',
        okType: 'warning',
        cancelText: '否',
        onOk: () => {
          resolve('')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    })
  }
}
