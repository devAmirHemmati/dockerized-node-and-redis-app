const redis = require('redis');

class UserDB {
  constructor() {
    this.createRedis();
  }

  async createRedis() {
    this.client = redis.createClient();

    this.client.on('connect', () => {
      console.log('connect with redis');
    });

    await this.client.connect();
  }

  async getUsers() {
    const users = await this.client.get('users');

    return JSON.parse(users) || [];
  }

  async setNewUser(data) {
    const users = await this.client.get('users');
    const parsedUsers = JSON.parse(users) || [];

    parsedUsers.push(data);

    await this.client.set('users', JSON.stringify(parsedUsers));
  }
}

module.exports = UserDB;
