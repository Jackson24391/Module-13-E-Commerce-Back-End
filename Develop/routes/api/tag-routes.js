const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const productTagData = await Tag.findAll({
      include: [{ model: Product, as: 'tagged_products' }],
    });
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'tagged_products'}],
    });

    if (!productTagData) {
      res.status(404).json({ message: 'No product tag found with that id!' });
      return;
    }

    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const productTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(productTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No product tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productTagData) {
      res.status(404).json({ message: 'No product tag found with that id!' });
      return;
    }

    res.status(200).json(productTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
