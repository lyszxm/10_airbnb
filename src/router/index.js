import Demo from '@/views/demo'
import React from 'react'
import { Navigate } from 'react-router-dom'

/*使用了这个懒加载  我们这个Home页面没有下载下来的时候会使用suspense的fallback上的元素，下载下来后才真正使用这个Home，所以会渲染两次 */
const Home = React.lazy(() =>
  import('@/views/home').then(res => {
    console.log(res)
    return res
  })
)
const Entire = React.lazy(() => import('@/views/entire'))
const Detail = React.lazy(() => import('@/views/detail'))

const routes = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/entire',
    element: <Entire />
  },
  {
    path: '/detail',
    element: <Detail />
  },
  {
    path: '/demo',
    element: <Demo />
  }
]

export default routes
