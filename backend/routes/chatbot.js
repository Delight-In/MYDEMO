import express from "express";                       // Express framework for routing
import dotenv from "dotenv";                         // To load environment variables from .env file

// Load environment variables
dotenv.config();

// Create a new Express router
const router = express.Router();

// Perplexity API configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Define POST route for chatbot interaction
router.post("/chatbot", async (req, res) => {
  try {
    // Extract message from request body
    const { message } = req.body;

    // Validate message: it must be a non-empty string
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Valid message is required" });
    }

    // Validate API key is present
    if (!PERPLEXITY_API_KEY) {
      return res.status(500).json({ error: "Perplexity API key not configured" });
    }

    // Call Perplexity API
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online", // You can change this to other available models
        messages: [
          {
            role: "You are career path advisor and help students and working professional to give clarity about there career and interest.",
            content: message
          }
        ],
        max_tokens: 2000,  // Limit on output tokens (length of AI response)
        temperature: 0.9,  // Controls randomness (0 = deterministic, 1 = more creative)
        top_p: 0.9,        // Nucleus sampling parameter
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract the text response from Perplexity's reply
    const text = data.choices[0].message.content;

    // Respond to client with the AI-generated text
    res.status(200).json({ reply: text });
    
  } catch (error) {
    // Log any errors for debugging
    console.error("Perplexity API Error:", error);
    
    // Enhanced error information structure
    const errorInfo = {
      message: error.message,
      status: error.status || 500,
    };

    // Respond with error information
    res.status(errorInfo.status).json({
      error: "AI service unavailable",
      details: errorInfo
    });
  }
});

// Export the router so it can be used in your main app
export default router;