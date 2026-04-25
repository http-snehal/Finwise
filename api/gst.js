import { validateGSTIN } from '../_lib/gstValidator.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { action } = req.query;

  // POST /api/gst?action=calculate
  if (action === 'calculate') {
    const { amount, gstRate = 18, isInterState = false } = req.body;
    if (!amount || amount < 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;
    const breakup = isInterState 
      ? { igst: gstAmount } 
      : { cgst: gstAmount / 2, sgst: gstAmount / 2 };
    return res.json({ baseAmount: amount, gstRate, gstAmount, totalAmount, breakup });
  }

  // POST /api/gst?action=check-threshold
  if (action === 'check-threshold') {
    const { annualTurnover } = req.body;
    if (typeof annualTurnover !== 'number' || annualTurnover < 0) {
      return res.status(400).json({ message: 'Invalid turnover amount' });
    }
    const THRESHOLD = 2000000;
    const requiresRegistration = annualTurnover >= THRESHOLD;
    return res.json({
      turnover: annualTurnover, threshold: THRESHOLD, requiresRegistration,
      message: requiresRegistration 
        ? 'Turnover exceeds ₹20 Lakhs. GST registration is mandatory.' 
        : 'Turnover is under ₹20 Lakhs. GST registration is optional.',
    });
  }

  // POST /api/gst?action=calculate-itc
  if (action === 'calculate-itc') {
    const { outputGst, inputGst } = req.body;
    if (typeof outputGst !== 'number' || typeof inputGst !== 'number') {
      return res.status(400).json({ message: 'Invalid GST amounts' });
    }
    const netGstPayable = Math.max(0, outputGst - inputGst);
    const itcClaimed = Math.min(outputGst, inputGst);
    const itcCarriedForward = Math.max(0, inputGst - outputGst);
    return res.json({ outputGst, inputGst, itcClaimed, netGstPayable, itcCarriedForward });
  }

  // POST /api/gst?action=validate-gstin
  if (action === 'validate-gstin') {
    const { gstin } = req.body;
    if (!gstin) {
      return res.status(400).json({ message: 'GSTIN is required' });
    }
    const isValid = validateGSTIN(gstin);
    return res.json({ gstin, isValid, message: isValid ? 'Valid GSTIN format' : 'Invalid GSTIN format' });
  }

  return res.status(404).json({ message: 'Not found. Use ?action=calculate|check-threshold|calculate-itc|validate-gstin' });
}
