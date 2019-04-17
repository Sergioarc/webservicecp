/**
 * Author: Sergio A.
 * Endpoint to fetch info of CP
 */

var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
var validate = require('./../utils/validate');

// Middleware for fetch info of CP on redis o postgres
router.post('/', function(req, res, next) {
    const redis = req.redis;
    redis.get(req.body.cp, (error, result) => {
        if (error) {
            res.json({
                status: 'ERROR',
                code: '400',
                msg: 'Bad request',
                data: error,
            });
            throw error;
        }
        if(result === null){
            validate.validateCP(req.body)
            .then(resp => {
                if (Array.isArray(resp)){
                    res.json({
                        status: 'ERROR',
                        code: '400',
                        msg: 'Bad request',
                        data: resp,
                    });
                }else{
                    db.any(`SELECT C.id_colonias, C.id_municipio, C.nombre colonia, C.cp, M.nombre municipio, E.nombre Estado FROM colonias C LEFT JOIN municipios M on M.id_municipio = C.id_municipio LEFT JOIN estados E on M.id_estado = E.id_estados where C.cp = '${resp.cp}'`)
                    .then(function (resp) {
                        var response = {
                            status: 'OK',
                            code: '200',
                            msg: 'Success request',
                            data: resp,
                        };
                        redis.set(req.body.cp, JSON.stringify(resp[0]), redis.print);
                        res.json(response);
                    })
                    .catch(function (err) {
                        res.json({
                            status: 'ERROR',
                            code: '400',
                            msg: 'Bad request',
                            data: err,
                        });
                    });
                }
            });
        }else{
            res.json({
                status: 'OK',
                code: '200',
                msg: 'Success request',
                data: JSON.parse(result),
            })
        }
    });
});

module.exports = router;
