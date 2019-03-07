import * as mongoose from 'mongoose';
import * as httpErrors from 'httperrors';
import { Common } from './common';

export class ModelRoutes extends Common {
    model: mongoose.Model<any>;
    basePath: string;

    constructor(model) {
        super();
        this.model = model;
        this.basePath = `/${this.model.collection.name}`;
    }

    envelope(document: any): any{
        let resource = Object.assign({_links:{}}, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }

    validateId = (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(httpErrors.NotFound('Document was not found'));
        } else
            next();
    }

    findAll = (req, res, next) => {
        this.model.find()
            .then(this.renderAll(res, next))
            .catch(next);
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
        if(document.password)
            document.password = undefined;
        return document;
    }
}