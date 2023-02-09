const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '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',
});

console.log('apikey');
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt: 'make me a funny meme about ' + prompt,

      n: 1,
      size: imageSize,
    });

    console.log(req.body);
    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The Image Could Not Be Generated',
    });
  }
};

module.exports = { generateImage };
