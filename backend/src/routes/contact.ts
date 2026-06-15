import { Router, type IRouter } from "express";
import { z } from "zod";
import { ContactMessage } from "../models/ContactMessage";

const router: IRouter = Router();

const SubmitContactBody = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const saved = await ContactMessage.create(parsed.data);
    req.log?.info?.({ id: saved._id }, "Contact message saved");

    res.status(201).json({
      id: saved._id,
      name: saved.name,
      email: saved.email,
      subject: saved.subject,
      message: saved.message,
      createdAt: saved.createdAt.toISOString(),
    });
  } catch (err) {
    req.log?.error?.({ err }, "Failed to save contact message");
    res.status(500).json({ error: "Failed to save message. Please try again." });
  }
});

export default router;
