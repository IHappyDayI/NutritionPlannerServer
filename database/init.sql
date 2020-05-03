/**
 *  Run this script to initialize your local database before trying to run the knex migrations
 */

/** the npm mysql module can't handle the new authenication method of mysql 8. Therefore we need to use the native password method */
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'OoJXr1-50bd8OYkqBIEsVQZuKmnjPQEu0ELZeCzGyxeVKxXOPAL';
flush privileges;

CREATE SCHEMA `npdb`;
