const Controller = require('egg').Controller;

class AdminController extends Controller {
    // async info() {
    //     const ctx = this.ctx;
    //     const userId = ctx.params.id;
    //     const user = await ctx.service.adminService.find(userId);
    //     ctx.body = user;
    // }

    async insert(){
        const {ctx} = this;
        const {name} = ctx.params;
        const fuck = await ctx.service.adminService.create(name)

    }


}

module.exports = AdminController;
