const router = require('express').Router();
const db = require('../../db');

router.get('/', (req, res, next) => {
	db.models.student.findAll()
	.then(students => res.json(students))
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	db.models.student.findById(req.params.id)
	.then(student => {
		res.json(student)
	})
	.catch(next);
});

router.post('/', (req, res, next) => {
	db.models.student.create(req.body)
	.then(student => res.status(201).json(student))
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	db.models.student.update(req.body, {
		where: {id: req.params.id}
	})
	.then(() => {
		return db.models.student.findById(req.params.id)
	})
	.then(updatedStudent => res.json(updatedStudent))
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	db.models.student.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(() => res.status(204).end())
	.catch(next);
});

module.exports = router;
