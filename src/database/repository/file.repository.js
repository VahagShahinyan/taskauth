const File = require('../model/file.model')
module.exports = class FileRepository {
    constructor() { }

    get(id = 0) {
        return File.findOne({
            where: {
                id: id
            }
        })
    }

    getList(offset = 0, limit = 10) {
        return File.findAll({
            limit: limit,
            offset: offset
        })
    }

    create(data) {
        let file = new File(data);
        return file.save()
    }

    createMultiple(files) {
        return File.bulkCreate(files, {
            returning: true
        })
    }

    update(id, data) {
        return File.update(data, {
            returning: true,
            where: {
                id: id
            }
        })
    }

    delete(id) {
        return File.destroy({
            where: {
                id: id
            }
        })
    }
}
