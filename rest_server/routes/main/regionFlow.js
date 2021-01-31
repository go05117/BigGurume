const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ShareFlowTb = require("../../models/shareFlowTb.model")

router.get('/regionFlow', (req, res, next) => {
    ShareFlowTb.find()
    .select()
    .populate('userTbId')
    // .populate({
    //     path: 'userTbId',
    //     populate: { path: '' }
    // })
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            shareFlowTb: docs.map(doc => {
                return {
                    _id: doc._id,
                    shareTitle: doc.shareTitle,
                    shareThumbnail: doc.shareThumbnail,
                    adminTag: doc.adminTag,
                    userTags: doc.userTags,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/regionFlow/'
                    }
                }
            })
        });
        
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

// shareFlowTb에서 지역으로 검색
router.get('/regionFlow/region/:regionTag', (req, res, next) => {
    ShareFlowTb.find({"adminTag.regionTag" : req.params.regionTag})
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            shareFlowTb: docs.map(doc => {
                return {
                    _id: doc._id,
                    shareTitle: doc.shareTitle,
                    shareThumbnail: doc.shareThumbnail,
                    adminTag: doc.adminTag,
                    userTags: doc.userTags,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/regionFlow/'
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;