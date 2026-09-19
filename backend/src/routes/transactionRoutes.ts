import express from "express";
import Transaction from "../models/Transaction";
import { verifyToken } from "../middleware/auth";

const router = express.Router();
//add transaction 
router.post(
  "/",
  verifyToken,
  async (req: any, res) => {
    try {
      const transaction =
        await Transaction.create({
          ...req.body,
          userId: req.user.id,
        });

      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

//get all transactions
router.get(
  "/",
  verifyToken,
  async (req: any, res) => {
    try {
      const transactions =
        await Transaction.find({
          userId: req.user.id,
        });

      res.json(transactions);
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

//delete transaction
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {
      await Transaction.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get(
  "/export/csv",
  verifyToken,
  async (req: any, res) => {
    try {
      const transactions =
        await Transaction.find({
          userId: req.user.id,
        });

      let csv =
  "Title,Category,Amount,Status,Date\n";

csv += transactions
  .map((t) => {
    return [
      `"${String(t.title).replace(/"/g, '""')}"`,
      `"${String(t.category).replace(/"/g, '""')}"`,
      t.amount,
      `"${String(t.status).replace(/"/g, '""')}"`,
      new Date(t.createdAt).toLocaleDateString()
    ].join(",");
  })
  .join("\n");

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        "transactions.csv"
      );

      res.send(csv);
    } catch (error) {
      res.status(500).json({
        message: "Export Failed",
      });
    }
  }
);

export default router;
