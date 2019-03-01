import * as mongoose from 'mongoose';
import * as httpErrors from 'httperrors';
import { render } from './common-functions';

export class ModelRoutes{
    constructor(private model){
        this.model = model;
    }

    validateId = (req, res, next) => {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(httpErrors.NotFound('Document was not found'));
        }else
            next();
    }

    findAll = (req, res, next) => {
        this.model.find()
            .then(render(res, next))
            .catch(next);
    }

    findOne = (req, res, next) => {
        this.model.findById(req.params.id)
            .then(render(res, next))
            .catch(next);
    }

    insert = (req, res, next) => {
        this.model.create(req.body)
            .then(document => {
                // altera o retorno para que a senha não seja retornada com os dados
                if(document.hasOwnProperty('password'))
                    document.password = undefined;
                return document;
            })
            .then(render(res, next))
            .catch(next);
    }

    findAndReplace = (req, res, next) => {
        const options = { overwrite: true, new: true, runValidators: true }
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, options)
            .then(render(res, next))
            .catch(next);
    }

    findAndUpdate = (req, res, next) => {
        const options = { new: true, useFindAndModify: false, runValidators: true };
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, options)
            .then(render(res, next))
            .catch(next);
    }

    findAndDelete = (req, res, next) => {
        this.model.findOneAndDelete({ _id: req.params.id })
            .then(result => {
                if (result)
                    res.status(204).json(result);
                else
                    throw new httpErrors.NotFound('Document was not found');
                return next();
            }).catch(next);
    }
}