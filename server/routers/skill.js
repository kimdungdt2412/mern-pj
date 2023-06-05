const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const User = require('../models/User')
const Skill = require('../models/Skill')

// @route POST api/skill
// @desc Create skill
// @access Private

router.post('/', verifyToken, async (req, res) => {
    const {
        title, description, url, status
    } = req.body

    //Simple validation
    if (!title) {
        return res
        .status(400)
        .json({
            success: false,
            message: "Title is required"
        })
    }

    try {
        const newSkill = new Skill({
            title, 
            description,
            url: (url.startsWith('https://') ? url : `https://${url}`),
            status: status || 'TODO',
            user: req.userId
        })

        await newSkill.save()

        res.json({
			success: true,
			message: 'Create skill successfully',
			skill : newSkill
		})
    } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router