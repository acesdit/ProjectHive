class StringsController {
    constructor(stringService) {
        this.stringService = stringService;
    }

    async createString(req, res) {
        try {
            const stringData = req.body;
            const newString = await this.stringService.createString(stringData);
            res.status(201).json(newString);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getString(req, res) {
        try {
            const { id } = req.params;
            const string = await this.stringService.getString(id);
            if (!string) {
                return res.status(404).json({ message: 'String not found' });
            }
            res.status(200).json(string);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllStrings(req, res) {
        try {
            const strings = await this.stringService.getAllStrings();
            res.status(200).json(strings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async filterByNaturalLanguage(req, res) {
        try {
            const { language } = req.query;
            const filteredStrings = await this.stringService.filterByNaturalLanguage(language);
            res.status(200).json(filteredStrings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteString(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.stringService.deleteString(id);
            if (!deleted) {
                return res.status(404).json({ message: 'String not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = StringsController;