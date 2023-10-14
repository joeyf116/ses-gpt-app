const express = require("express");
const getStreamingCompletion = require("../services/openai-service").getStreamingCompletion;

const router = express.Router();

//Post Method
router.post("/aicompletion", async (req, res) => {
    const data = req.body;
    let starttime = Date.now();
    const stream = await getStreamingCompletion({ userPrompt: data?.userPrompt });
    for await (const part of stream) {
      // here express will stream the response
      res.write(part.choices[0]?.delta.content || "");
    }
    // here express sends the closing/done/end signal for the stream consumer
    res.end();
});


module.exports = router;
