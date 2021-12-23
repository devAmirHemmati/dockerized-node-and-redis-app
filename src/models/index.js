const redis = require('redis');

class UserDB {
  constructor() {
    this.createRedis();
  }

  async createRedis() {
    this.client = redis.createClient({
      url:
        process.env.NODE_ENV === 'production'
          ? 'redis://redis_db'
          : 'redis://localhost',
    });

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

  async deleteUser(data) {
    const users = await this.client.get('users');
    const parsedUsers = JSON.parse(users) || [];

    if (!Array.isArray(parsedUsers)) return;

    const findUser = parsedUsers.find(
      (item) =>
        item.firstName === data.firstName && item.lastName === data.lastName
    );

    if (typeof findUser === 'undefined') return;

    const filterUsers = parsedUsers.filter(
      (item) =>
        item.firstName !== data.firstName || item.lastName !== data.lastName
    );

    await this.client.set('users', JSON.stringify(filterUsers));
  }
}

module.exports = UserDB;
