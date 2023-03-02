import { getSocketIO } from '../connection/socket.js';
import * as tweetRespository from '../data/tweetRepository.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRespository.getByUsername(username)
    : tweetRespository.getAll());
  res.status(200).json(data);
}

export async function getTweetById(req, res) {
  const id = req.params.id;
  const tweet = await tweetRespository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet(${id}) not found!` });
  }
}

export async function createTweet(req, res) {
  const { text } = req.body;
  const tweet = await tweetRespository.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit('tweets', tweet);
}

export async function updateTweetById(req, res) {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = await tweetRespository.getById(id);

  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found id(${id})` });
  }

  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updatedTweet = await tweetRespository.updateById(id, text);
  res.status(200).json(updatedTweet);
}

export async function deleteTweetById(req, res) {
  const id = req.params.id;
  const tweet = await tweetRespository.getById(id);

  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found id(${id})` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const deletedTweet = await tweetRespository.removeById(id);
  res.status(200).json(deletedTweet);
}
