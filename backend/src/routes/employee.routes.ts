import { Router } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const router = Router();

// Simple Employee Model
interface IEmployee extends Document {
    name: string;
    role: string;
    dept: string;
    performance: string;
    initial: string;
}

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    dept: { type: String, required: true },
    performance: { type: String, default: "Meeting" },
    initial: { type: String, required: true },
}, { timestamps: true });

const Employee = mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.json([
            { id: 1, name: "Alice Johnson", role: "Sales Manager", dept: "Corporate", performance: "Exceeding", initial: "AJ" },
            { id: 2, name: "Bob Smith", role: "Account Executive", dept: "SMB", performance: "Meeting", initial: "BS" },
        ]);
    }
});

export default router;
