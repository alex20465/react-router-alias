
import { expect } from "chai"
import { RouteAliasManager } from "../src"



describe('RouteAliasManager', () => {


    describe('withoutParams', () => {
        enum RouteAliases {
            HOME = "/",
            HELLO_WORD = "/hello/world"
        }

        let manager: RouteAliasManager<typeof RouteAliases>

        beforeEach(() => {
            manager = new RouteAliasManager(RouteAliases)
        })

        it("should resolve '/' to '/'", () => {
            expect(manager.withoutParams().HOME).to.be.equal("/")
        })

        it("should resolve '/hello/world' to '/hello/world'", () => {
            expect(manager.withoutParams().HELLO_WORD).to.be.equal("/hello/world")
        })

        describe("with empty params", () => {
            it("should resolve '/hello/world' to '/hello/world'", () => {
                expect(manager.withParams({}).HELLO_WORD).to.be.equal("/hello/world")
            })
        })

        describe("with not defined parameter", () => {
            it("should resolve '/hello/world' to '/hello/world'", () => {
                expect(manager.withParams({
                    notDefined: "test"
                }).HELLO_WORD).to.be.equal("/hello/world")
            })
        })
    })


    describe('withParams', () => {
        enum RouteAliases {
            ORDER = "/order/:id",
            ORDER_DETAiLS = "/order/:id/details",
            ORDER_ITEM = "/order/:id/item/:itemId"
        }

        let manager: RouteAliasManager<typeof RouteAliases>

        beforeEach(() => {
            manager = new RouteAliasManager(RouteAliases)
        })


        it("should resolve '/order/:id' to '/order/1'", () => {
            expect(manager.withParams({ id: 1 }).ORDER).to.be.equal("/order/1")
            expect(manager.withParams({ id: "1" }).ORDER).to.be.equal("/order/1")
        })

        it("should resolve '/order/:id/order' to '/order/1/order'", () => {
            expect(manager.withParams({ id: 1 }).ORDER_DETAiLS).to.be.equal("/order/1/details")
            expect(manager.withParams({ id: "1" }).ORDER_DETAiLS).to.be.equal("/order/1/details")
        })

        describe("with missing params", () => {
            it("should throw Error: Unable to resolve route", () => {
                expect(() => {
                    manager.withParams({ id: 1 }).ORDER_ITEM
                }).to.throw("Unable to resolve route 'ORDER_ITEM', parameter 'itemId' is not defined")
            })
        })

        describe("use withoutParams when route has params", () => {
            it("should throw Error: Unable to resolve route", () => {
                expect(() => {
                    manager.withoutParams().ORDER
                }).to.throw('Unable to resolve route without params, required: id')
            })
        })
    })
})