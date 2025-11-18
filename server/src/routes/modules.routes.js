const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const Module = require('../models/Module');

const router = express.Router();

router.get('/:courseId', requireAuth, async (req, res) => {
    const { courseId } = req.params;
    try {
        const modules = await Module.find({ courseId }).sort({ order: 1 });
        const allMaterials = modules.flatMap(m => m.materials);
        res.json(allMaterials);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/:courseId/create-modules', requireAuth, requireRole('ADMIN','LEAD'), async(req,res) => {
    const {courseId} = req.params;
    const {title, order, materials, quizId, assessmentId} = req.body;
    try {
        const createModules = await Module.create(
            {
                courseId,
                title: title,
                order: order,
                materials: materials,
                quizId: quizId || null,
                assessmentId: assessmentId || null,
            });
        res.json(createModules);    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});    
    }
});

router.put('/:courseId/add-material', requireAuth, requireRole('ADMIN', 'LEAD'),async (req, res) => {
    const { courseId } = req.params;
    const { type, title, url } = req.body;
    const modules = [{ type, title, url }];
    try {
        const existing = await Module.find({ courseId }).sort({ order: 1 });
        if(existing.length === 0) {
            
        }
        const addMaterial = await Module.findByIdAndUpdate({
            _id: existing[0]._id
        }, {
            $push: { materials: { $each: modules } }
        }, { new: true });

        res.json(addMaterial);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;