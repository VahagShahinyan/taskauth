const FileRepository = require('../database/repository/file.repository')
const fs = require('fs');
module.exports = class FileService {
    constructor() {
        this.fileRepository = new FileRepository();
    }

    get(id = 0) {
        return this.fileRepository.get(id);
    }

    getList(page, limit) {
        page = parseInt(page) || 1;
        page = page > 0 ? page : 1;
        limit = parseInt(limit) || 10;
        limit = limit > 0 ? limit : 10;
        let offset = ((page - 1) * limit)
        return this.fileRepository.getList(offset, limit);
    }

    create(data) {
        return this.fileRepository.create(data);
    }

    createMultiple(files) {
        return this.fileRepository.createMultiple(files);
    }

    async update(id, data) {
        id = parseInt(id);
        let file = await this.get(id);
        if (file) {
            this.deleteFile(file.path)
            return await this.fileRepository.update(id, data);
        }
        return 0;
    }

    async delete(id) {
        id = parseInt(id);
        let file = await this.get(id);
        if (file) {
            this.deleteFile(file.path)
            return this.fileRepository.delete(id);
        }
        return 0
    }

    deleteFile(path) {
        fs.exists(path, (exists) => {
            if (exists)
                fs.unlink(path, () => { })
        })
    }
}