import bycrpt from 'bcrypt';

const users = [
  {
    email: 'exampleuser@gmail.com',
    password: bycrpt.hashSync('password44sd5ds5s', 10),
  },
  {
    email: 'exampleuser2@gmail.com',
    password: bycrpt.hashSync('pasqwqw!!sword44sd5ds5s', 10),
  },
  {
    email: 'exampleuser3@gmail.com',
    password: bycrpt.hashSync('pa123sqwqw!!sw12?+_3ord44sd5ds5s', 10),
  }
]

const profiles = [
  {
    wallets: [
      "QmWLxGtt7xkKZ7XJq7S6Xf7BhjmXf7pQQmvqJQm7qfN",
      "ZJXEQ6BPRPKZFC6DZBLPQTINTIB3TZLCUDIA4",
      "asdfwerew7pQQmvqJQm7ewrwerwerwerqfN",
    ],
    preferredCurrency: 'usd',
  }, {
    wallets: [
      "Jq7S6Xf7BhjmXf7pQQmvqJQm7qfN",
      "KZFC6DZBLPQTINTIB3TZLCUDIA4",
      "a7pQQmvqJQm7ewrwerwerwerqfN",
    ],
    preferredCurrency: 'sek'
  },
  {
    wallets: [],
  }
]

const webhooks = [
  {
    webhooks:
      [{
        url: 'https://example.com/webhook1',
        event: 'LoginEvent',
        secret: 'secret1558sad9'
      }]
  }
]

export default {
  users, profiles, webhooks
}