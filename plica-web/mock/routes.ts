import { Response, Request } from 'express'
import { RouteConfig } from 'vue-router'

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

const routeList: RouteConfig[] = [{
  path: '/detail/:id',
  meta: {
    title: '사이트 관리',
    icon: 'dashboard',
    noCache: true,
    affix: true
  },
  children: [
    {
      name: 'miso',
      path: '/detail/miso',
      redirect: 'redirect',
      meta: {
        roles: ['admin'],
        title: '석남 미소지움',
        icon: 'example',
        noCache: true,
        affix: true
      }
    },
    {
      name: 'test',
      path: '/detail/test',
      redirect: 'redirect',
      meta: {
        roles: ['admin', 'viewer'],
        title: '테스트 페이지',
        icon: 'example',
        noCache: true,
        affix: true
      }
    },
    {
      name: 'test2',
      path: '/detail/test2',
      redirect: 'redirect',
      meta: {
        roles: ['viewer'],
        title: '테스트 페이지2',
        icon: 'example',
        noCache: true,
        affix: true
      }
    }
  ]
}]

export const getCustomRoutes = (req: Request, res: Response) => {
  console.log(routeList)
  return res.json({
    code: 20000,
    data: {
      items: routeList
    }
  })
}

export const getCustomRouteByName = (req: Request, res: Response) => {
  const { name } = req.params
  if (routeList[0].children) {
    const page = routeList[0].children.filter(page => {
      if (page.name !== undefined) {
        const lowerCaseName = page.name.toString().toLowerCase()
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
      }
    })
    if (page.length === 0) {
      return res.status(404).json({
        code: 50404,
        message: 'Not found: ' + name
      })
    }
    return res.json({
      code: 20000,
      data: {
        items: page
      }
    })
  }
  return res.status(500).json({
    code: 50404,
    message: 'Fail'
  })
}

export const createCustomRoute = (req: Request, res: Response) => {
  const { name, path, meta } = req.body
  let data: RouteConfig = {
    name: name,
    path: path,
    meta: meta
  }
  if (routeList[0].children) {
    routeList[0].children.push(data)
    return res.json({
      code: 20000,
      data: {
        routeList
      }
    })
  }

  return res.status(500).json({
    code: 50404,
    message: 'Fail'
  })
}

export const deletePage = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
