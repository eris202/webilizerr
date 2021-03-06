import { Express, Router } from 'express'
import { routes, RouteDefinition, RouteMapper } from '../config/routes'

export default class RouteLoader {

    public static async init(app: Express) {
        const router = Router()

        Object.keys(routes).forEach(key => {
            const routeMapper: RouteMapper = routes[key]
            
            for (const mapperKey in routeMapper) {
                console.log(`Configuring for request path: ${mapperKey}`)
                
                this.populateRouterWithDefinition(mapperKey, router, routeMapper[mapperKey])
            }
        })

        app.use('/', router)
    }

    static populateRouterWithDefinition(path: string, router: Router, definitions: RouteDefinition[]) {
        for (const definition of definitions) {
            const middleWares = definition.middleWares || []
            
            switch (definition.method) {
                case 'post': {
                    router.post(path, ...middleWares, definition.handler)

                    break
                }
                case 'get': {
                    router.get(path, ...middleWares, definition.handler)

                    break
                }
                case 'put': {
                    router.put(path, ...middleWares, definition.handler)

                    break
                }
                case 'delete': {
                    router.delete(path, ...middleWares, definition.handler)

                    break
                }
                default: throw Error('Unknown method setup')
            }
        }
    }
}