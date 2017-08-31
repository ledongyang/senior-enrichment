const router = require('express').Router();
const db = require('../../db');

router.get('/', (req, res, next) => {
	db.models.campus.findAll()
	.then(campuses => res.json(campuses))
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	db.models.campus.findById(req.params.id)
	.then(campus => {
		res.json(campus)
	})
	.catch(next);
});

router.post('/', (req, res, next) => {
	db.models.campus.create(req.body)
	.then(campus => res.status(201).json(campus))
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	db.models.campus.update(req.body, {
		where: {id: req.params.id}
	})
	.then(() => {
		return db.models.campus.findById(req.params.id)
	})
	.then(updatedCampus => res.json(updatedCampus))
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	// db.models.campus.destroy({
	// 	where: {
	// 		id: req.params.id
	// 	}
	// })
	// .then(() => {
	// 	res.status(204).end()
	// })
	// .catch(next);
	db.models.student.destroy({
		where: {
			campusId: req.params.id
		}
	})
	.then(() => {
		return db.models.campus.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(() => {
			res.status(204).end();
		})
	})
	.catch(next);
});

module.exports = router;
