import React, { memo, useCallback, useRef, useState } from 'react'
import { RightWrapper } from './style'
import IconGlobal from '@/assets/svg/icon_global'
import IconMenu from '@/assets/svg/icon_menu'
import IconAvatar from '@/assets/svg/icon_avatar'
import { useEffect } from 'react'
import { useLatest } from '@/hooks'

const HeaderRight = memo(props => {
  // console.log(props)
  /** 定义组件内部的状态 */
  const [showPanel, setShowPanel] = useState(true)
  const [t, setT] = useState(false)
  /** 副作用代码 */
  useEffect(() => {
    function windowHandleClick() {
      setShowPanel(false)
    }

    window.addEventListener('click', windowHandleClick, true)
    return () => {
      window.removeEventListener('click', windowHandleClick, true)
    }
  }, [])

  useEffect(() => {
    function test(e) {
      // 这里不变是我这里第一次执行后 t形成了闭包，再次执行我还是同一个这个函数参数的地址不变，所以我变了一次后就不会变第二次了，如果下面第二个参数数组中我们写了t，意思是说我t变化就重新监听重新注入，就一定会是新监听函数所以t的闭包也是最新的
      setT(!t)
    }
    document.getElementById('login').addEventListener('click', test)

    return () => {
      document.removeEventListener('click', test)
    }
  }, [t])

  /** 事件处理函数 */

  // let showPanelRef = useLatest(showPanel)
  let profileClickHandle = useCallback(function profileClickHandle(e) {
    setShowPanel(true)
  }, [])
  return (
    <RightWrapper>
      <div className='btns'>
        <span
          className='btn'
          id='login'
        >
          登录
        </span>
        <span className='btn'>注册</span>
        <span className='btn'>
          <IconGlobal />
        </span>
      </div>
      <div
        className='profile'
        onClick={profileClickHandle}
      >
        {t.toString()}
        <IconMenu />
        <IconAvatar />
        {showPanel && (
          <div className='panel'>
            <div className='top'>
              <div className='item register'>注册</div>
              <div className='item login'>登录</div>
            </div>
            <div className='bottom'>
              <div className='item'>出租房源</div>
              <div className='item'>开展体验</div>
              <div className='item'>帮助</div>
            </div>
          </div>
        )}
      </div>
    </RightWrapper>
  )
})

export default HeaderRight
