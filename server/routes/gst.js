import express from 'express';
import { validateGSTIN } from '../utils/gstValidator.js';

const router = express.Router();

// Calculate GST
router.post('/calculate', (req, res) => {
  try {
    const { amount, gstRate = 18, isInterState = false } = req.body;
    
    if (!amount || amount < 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;
    
    let breakup = {};
    if (isInterState) {
      breakup = { igst: gstAmount };
    } else {
      breakup = { cgst: gstAmount / 2, sgst: gstAmount / 2 };
    }

    res.json({
      baseAmount: amount,
      gstRate,
      gstAmount,
      totalAmount,
      breakup,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check Registration Threshold
router.post('/check-threshold', (req, res) => {
  try {
    const { annualTurnover } = req.body;
    
    if (typeof annualTurnover !== 'number' || annualTurnover < 0) {
      return res.status(400).json({ message: 'Invalid turnover amount' });
    }

    const THRESHOLD = 2000000; // 20 Lakhs
    const requiresRegistration = annualTurnover >= THRESHOLD;
    
    res.json({
      turnover: annualTurnover,
      threshold: THRESHOLD,
      requiresRegistration,
      message: requiresRegistration 
        ? 'Turnover exceeds ₹20 Lakhs. GST registration is mandatory.' 
        : 'Turnover is under ₹20 Lakhs. GST registration is optional.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Calculate ITC (Input Tax Credit)
router.post('/calculate-itc', (req, res) => {
  try {
    const { outputGst, inputGst } = req.body;
    
    if (typeof outputGst !== 'number' || typeof inputGst !== 'number') {
      return res.status(400).json({ message: 'Invalid GST amounts' });
    }

    const netGstPayable = Math.max(0, outputGst - inputGst);
    const itcClaimed = Math.min(outputGst, inputGst);
    const itcCarriedForward = Math.max(0, inputGst - outputGst);

    res.json({
      outputGst,
      inputGst,
      itcClaimed,
      netGstPayable,
      itcCarriedForward,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate GSTIN
router.post('/validate-gstin', (req, res) => {
  try {
    const { gstin } = req.body;
    
    if (!gstin) {
      return res.status(400).json({ message: 'GSTIN is required' });
    }

    const isValid = validateGSTIN(gstin);
    
    res.json({
      gstin,
      isValid,
      message: isValid ? 'Valid GSTIN format' : 'Invalid GSTIN format',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
