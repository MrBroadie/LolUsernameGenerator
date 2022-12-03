import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.champion),
    temperature: 1,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(champion) {
  const capitalizedChampion =
  champion[0].toUpperCase() + champion.slice(1).toLowerCase();
  return `Suggest three league of legends usernames based on the champion input.

  Champion: Riven
  Names: Rivint, 404 Blade, RivenIsADancer
  Champion: Yasuo
  Names: 10 Death Spike, Yasugod, GGgoNext
  Champion: ${capitalizedChampion}
  Names:`;
}