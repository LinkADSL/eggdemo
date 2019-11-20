const Service = require('egg').Service;

class AdminService extends Service {
    async find(uid) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const user = await this.app.mysql.get('users', {id: 11});
        return {user};
    }

    async create() {
        const result = await this.app.mysql.insert('posts', {title: 'Hello World'}); // 在 post 表中，插入 title 为 Hello World 的记录

        console.log(result);

        // 判断插入成功
        const insertSuccess = result.affectedRows === 1;

    }

    async read() {
        const post = await this.app.mysql.get('posts', {id: 12});
        // => SELECT * FROM `posts` WHERE `id` = 12 LIMIT 0, 1;

        const results = await this.app.mysql.select('posts');
        // => SELECT * FROM `posts`;

        const results = await this.app.mysql.select('posts', { // 搜索 post 表
            where: {status: 'draft', author: ['author1', 'author2']}, // WHERE 条件
            columns: ['author', 'title'], // 要查询的表字段
            orders: [['created_at', 'desc'], ['id', 'desc']], // 排序方式
            limit: 10, // 返回数据量
            offset: 0, // 数据偏移量
        });
        //
        // => SELECT `author`, `title` FROM `posts`
        //     WHERE `status` = 'draft' AND `author` IN('author1','author2')
        //     ORDER BY `created_at` DESC, `id` DESC LIMIT 0, 10;
    }


    async update() {
        // 修改数据，将会根据主键 ID 查找，并更新
        const row = {
            id: 123,
            name: 'fengmk2',
            otherField: 'other field value',    // any other fields u want to update
            modifiedAt: this.app.mysql.literals.now, // `now()` on db server
        };
        const result = await this.app.mysql.update('posts', row); // 更新 posts 表中的记录
        // => UPDATE `posts` SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE id = 123 ;

        // 判断更新成功
        const updateSuccess = result.affectedRows === 1;

        // 如果主键是自定义的 ID 名称，如 custom_id，则需要在 `where` 里面配置
        const row = {
            name: 'fengmk2',
            otherField: 'other field value',    // any other fields u want to update
            modifiedAt: this.app.mysql.literals.now, // `now()` on db server
        };

        const options = {
            where: {
                custom_id: 456
            }
        };
        const result = await this.app.mysql.update('posts', row, options); // 更新 posts 表中的记录
        // => UPDATE `posts` SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE custom_id = 456 ;

        // 判断更新成功
        const updateSuccess = result.affectedRows === 1;
    }

    async delete() {
        const result = await this.app.mysql.delete('posts', {
            author: 'fengmk2',
        });
        // => DELETE FROM `posts` WHERE `author` = 'fengmk2';
    }

}

module.exports = AdminService;
