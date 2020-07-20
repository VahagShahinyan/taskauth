const FileService = require('../service/file.service');
module.exports = class FileController {
    constructor() {
        this.fileService = new FileService();
    }

    get = (req, res, next) => {
        const id = req.params.id || 0;
        this.fileService.get(id)
            .then(result => res.json(result))
            .catch(next)
    }

    getList = (req, res, next) => {
        this.fileService.getList(req.query.page, req.query.limit)
            .then(result => res.json(result))
            .catch(next)
    }

    create = (req, res, next) => {
        const files = req.files;
        this.fileService.createMultiple(files)
            .then(result => res.json(result))
            .catch(next)
    }

    update = (req, res, next) => {
        const file = req.file;
        const id = req.params.id;
        this.fileService.update(id, file)
            .then((success) => {
                if (!success) {
                    this.fileService.deleteFile(file.path)
                }
                res.json({ updated: !!success })
            })
            .catch(next)
    }

    delete = (req, res, next) => {
        const id = parseInt(req.params.id) || 0;
        if (id > 0) {
            return this.fileService.delete(id)
                .then((result) => { res.json({ deleted_count: result }) })
                .catch(next);
        }
        res.json({ error: "id required" })
    }

    downloadFile = (req, res, next) => {
        const id = parseInt(req.params.id) || 0;
        if (id) {
            return this.fileService.get(id)
                .then((file) => {
                    if (file)
                        res.download(file.path, file.name);
                    else
                        res.json({ error: `file ${id} not found` })
                })
                .catch(next)
        }
        res.json({ error: "id required" })
    }
}