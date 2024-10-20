const openai = require('openai');

// API call to GPT-3 to fine-tune a model with the PDF data
const TrainChatbot = async (pdfText) => {
  const response = await openai.Completion.create({
    engine: 'davinci',
    prompt: `Train a chatbot on the following data:\n\n${pdfText}`,
    maxTokens: 150,
  });
  return response.data;
};

export default TrainChatbot;