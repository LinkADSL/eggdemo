const Service = require('egg').Service;

class AdminService extends Service {
    // async find(uid) {
    //     // 假如 我们拿到用户 id 从数据库获取用户详细信息
    //     const user = await this.app.mysql.get('user', {id: 11});
    //     return {user};
    // }

    async create() {
        const result = await this.app.mysql.insert('MedicalExaminations', {name: 'Hello World'});

        console.log(result);

        // 判断插入成功
        const insertSuccess = result.affectedRows === 1;
        console.log(`insertSuccess?${insertSuccess}`);
        return insertSuccess
    }

}

module.exports = AdminService;
