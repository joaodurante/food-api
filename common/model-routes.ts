import * as mongoose from 'mongoose';
import * as httpErrors from 'httperrors';
import { Common } from './common';

export class ModelRoutes extends Common {
    model: mongoose.Model<any>;
    basePath: string;
    pageSize: number = 4;

    constructor(model) {
        super();
        this.model = model;
        this.basePath = `/${this.model.collection.name}`;
    }

    envelope(document: any): any {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }

    envelopeAll(documents: any[], options: any = {}): any {
        const resource: any = {
            _links: {
                previous: undefined,
                self: `${options.url}`,
                next: undefined
            },
            items: documents
        }
        if (options.page && options.count && options.pageSize) {
            if (options.page > 1)
                resource._links.previous = `${this.basePath}?page=${options.page - 1}`;
            
            let remaining = options.count - (options.page * options.pageSize);
            if(remaining > 0)
                resource._links.next = `${this.basePath}?page=${options.page + 1}`;
        }
        return resource;
    }

    validateId = (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new httpErrors.NotFound('Document was not found'));
        } else
            next();
    }

    findAll = (req, res, next) => {
        let page = parseInt(req.query.page || 1);
        page = page > 0 ? page : 1
        const skip = (page - 1) * this.pageSize;
        
        this.model.estimatedDocumentCount({})
            .then(count =>
                this.model.find()
                    .skip(skip)
                    .limit(this.pageSize)
                    .then(this.renderAll(res, next, {
                        page, count, pageSize: this.pageSize, url: req.originalUrl
                    }))
            ).catch(next);
    }

    findOne = (req, res, next) => {
        this.model.findById(req.params.id)
            .then(this.render(res, next))
            .catch(next);
    }

    insert = (req, res, next) => {
        this.model.create(req.body)
            .then(document => this.removePassword(document))
            .then(this.render(res, next))
            .catch(next);
    }

    findAndReplace = (req, res, next) => {
        const options = { overwrite: true, new: true, runValidators: true }
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, options)
            .then(document => this.removePassword(document))
            .then(this.render(res, next))
            .catch(next);
    }

    findAndUpdate = (req, res, next) => {
        const options = { new: true, useFindAndModify: false, runValidators: true };
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, options)
            .then(this.render(res, next))
            .catch(next);
    }

    findAndDelete = (req, res, next) => {
        this.model.findOneAndDelete({ _id: req.params.id })
            .then(document => this.removePassword(document))
            .then(this.render(res, next))
            .catch(next);
    }

    removePassword = (document) => {
        if (document.password)
            document.password = undefined;
        return document;
    }
}