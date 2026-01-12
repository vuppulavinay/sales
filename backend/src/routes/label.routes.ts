import { Router } from 'express';
import Label from '../models/Label';

const router = Router();


let inMemoryLabels: Record<string, string> = {};

// Get all labels
router.get('/', async (req, res) => {
    try {
        const labels = await Label.find();
        res.json(labels);
    } catch (err: any) {
        const labelsArray = Object.entries(inMemoryLabels).map(([key, value]) => ({ key, value }));
        res.json(labelsArray);
    }
});

// Update or Create label
router.post('/', async (req, res) => {
    const { key, value } = req.body;
    try {
        let label = await Label.findOne({ key });
        if (label) {
            label.value = value;
            await label.save();
        } else {
            label = new Label({ key, value });
            await label.save();
        }
        res.json(label);
    } catch (err: any) {
        inMemoryLabels[key] = value;
        res.json({ key, value });
    }
});

export default router;
