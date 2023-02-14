import React, { memo, Suspense } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routes from './router'
import AppHeader from '@/components/app-header'
import AppFooter from './components/app-footer'
import useScrollTop from './hooks/useScrollTop'
import DocLoading from './components/docLoading'

const App = memo(() => {
  useScrollTop()

  return (
    <div className='app'>
      <AppHeader />
      <Suspense fallback={<DocLoading />}>
        <div className='page'>{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
    </div>
  )
})

export default App
