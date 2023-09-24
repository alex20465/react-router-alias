
type RouteAliasParams = { [name: string]: string | number }

type StandardEnum = {
    [id: string]: string;
}

export class RouteAliasManager<T extends StandardEnum> {

    private readonly keys: string[] = []

    constructor(private readonly routes: T) {
        this.keys = Object.keys(routes)
    }

    private _routeParams(route: string): string[] {
        return route
            .split("/")
            .filter(fragment => fragment.startsWith(":"))
            .map(fragment => fragment.substring(1))
    }

    withoutParams() {
        const manager = this

        return new Proxy({}, {
            get(target, name) {
                if (typeof (name) !== "string" || !manager.keys.includes(name)) {
                    throw new Error(`Unable to resolve route ${name.toString()} Getter-Proxy.`)
                }

                const route = manager.routes[name]
                const requiredParams = manager._routeParams(route)

                if (requiredParams.length === 0) {
                    return route
                } else {
                    const list = requiredParams.join(", ")
                    throw new Error(`Unable to resolve route without params, required: ${list}`)
                }
            }
        }) as T
    }

    withParams(params: RouteAliasParams = {}) {
        const manager = this

        return new Proxy({}, {
            get(target, name) {
                if (typeof (name) !== "string" || !manager.keys.includes(name)) {
                    throw new Error(`Unable to resolve route '${name.toString()}' Getter-Proxy.`)
                }
                const route = manager.routes[name]
                const routeParams = manager._routeParams(route)

                return routeParams.reduce((route, key) => {
                    if (key in params) {
                        return route.replace(`:${key}`, params[key] as string);
                    } else {
                        throw new Error(`Unable to resolve route '${name}', parameter '${key}' is not defined.`)
                    }
                }, route)

            }
        }) as T
    }
}
