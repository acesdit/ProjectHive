const express = require('express');
const router = express.Router();

const StringService = require('../services/stringService');
const stringService = new StringService();

// POST /strings
router.post('/', async (req, res) => {
    const body = req.body;
    if (!body || typeof body !== 'object' || !('value' in body)) {
        return res.status(400).json({ message: 'Invalid request body or missing "value" field' });
    }
    if (typeof body.value !== 'string') {
        return res.status(422).json({ message: 'Invalid data type for "value" (must be string)' });
    }
    try {
        const created = await stringService.createString(body);
        return res.status(201).json(created);
    } catch (err) {
        if (err.status === 409) return res.status(409).json({ message: err.message });
        if (err.status === 422) return res.status(422).json({ message: err.message });
        return res.status(500).json({ message: err.message });
    }
});

// GET /strings/:string_value
router.get('/:string_value', async (req, res) => {
    const raw = req.params.string_value;
    const value = decodeURIComponent(raw);
    const found = await stringService.getStringByValue(value);
    if (!found) return res.status(404).json({ message: 'String not found' });
    return res.status(200).json(found);
});

// GET /strings (with filters)
router.get('/', async (req, res) => {
    try {
        const qs = req.query;
        const filters = {};
        if ('is_palindrome' in qs) {
            if (qs.is_palindrome !== 'true' && qs.is_palindrome !== 'false') {
                return res.status(400).json({ message: 'Invalid is_palindrome value' });
            }
            filters.is_palindrome = qs.is_palindrome === 'true';
        }
        if ('min_length' in qs) {
            const n = parseInt(qs.min_length, 10);
            if (Number.isNaN(n)) return res.status(400).json({ message: 'Invalid min_length' });
            filters.min_length = n;
        }
        if ('max_length' in qs) {
            const n = parseInt(qs.max_length, 10);
            if (Number.isNaN(n)) return res.status(400).json({ message: 'Invalid max_length' });
            filters.max_length = n;
        }
        if ('word_count' in qs) {
            const n = parseInt(qs.word_count, 10);
            if (Number.isNaN(n)) return res.status(400).json({ message: 'Invalid word_count' });
            filters.word_count = n;
        }
        if ('contains_character' in qs) {
            const c = qs.contains_character;
            if (typeof c !== 'string' || c.length !== 1) return res.status(400).json({ message: 'contains_character must be a single character' });
            filters.contains_character = c;
        }

        const result = await stringService.getAllStrings(filters);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET /strings/filter-by-natural-language
router.get('/filter-by-natural-language', async (req, res) => {
    const q = req.query.query || req.query.q || req.query.language;
    try {
        const result = await stringService.filterByNaturalLanguage(q);
        return res.status(200).json(result);
    } catch (err) {
        if (err.status === 400) return res.status(400).json({ message: err.message });
        if (err.status === 422) return res.status(422).json({ message: err.message });
        return res.status(500).json({ message: err.message });
    }
});

// DELETE /strings/:string_value
router.delete('/:string_value', async (req, res) => {
    const value = decodeURIComponent(req.params.string_value);
    const deleted = await stringService.deleteStringByValue(value);
    if (!deleted) return res.status(404).json({ message: 'String not found' });
    return res.status(204).send();
});

module.exports = router;