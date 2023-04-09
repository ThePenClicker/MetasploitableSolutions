const net = require("net");
const fs = require("fs");
const readline = require("readline");

/**
 * The port number for the SMTP server.
 *
 * @type {number}
 */
const SMTP_PORT = 25;

/**
 * The IP address or domain name of the SMTP server.
 *
 * @type {string}
 */
const SMTP_HOST = "192.168.31.129";

/**
 * The SMTP mode to use for verifying user existence.
 *
 * @type {string}
 */
const SMTP_MODE = "VRFY";

/**
 * An object that contains the host and port options for establishing a network connection.
 *
 * @typedef {Object} Options
 * @property {string} host - The host IP address or domain name.
 * @property {number} port - The port number to use for the connection.
 */

/**
 * The options object for establishing a network connection with the SMTP server.
 *
 * @type {Options}
 */
const options = {
  host: SMTP_HOST,
  port: SMTP_PORT,
};

/**
 * A Boolean indicating whether or not to show failed logins to the SMTP server.
 * 
 * @type {boolean}
 */
const VerboseOutput = false;

/**
 * Checks if the specified username exists on the server by sending an SMTP command and receiving a response.
 *
 * @param {string} username - The username to be checked for existence on the server.
 * @returns {Promise<void>} A Promise that resolves when the username has been checked.
 */
function CheckVRFY(username) {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(options, (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      client.write(`HELO ${SMTP_HOST}\r\n`);
      client.write(`${SMTP_MODE} ${username}\r\n`);
    });

    client.on("data", (data) => {
      if (VerboseOutput && data.includes("User unknown")) {
        console.log(`--[!] User:${username} does not exist`);
      } else if (data.includes("2.0.0")) {
        console.log(`--[+] User:${username} exists`);
      }

      client.end();
      resolve();
    });
  });
}

/**
 * Reads each line from a file and calls CheckVRFY function for each line.
 *
 * @returns {Promise<void>} A Promise that resolves when all lines in the file have been processed.
 */
async function processFile() {
  const fileStream = fs.createReadStream("usernames.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });


  console.log(`[*] Server: ${SMTP_HOST}:${SMTP_PORT}`);
  console.log(`[*] Mode: ${SMTP_MODE}`);
  console.log(`[*] Verbose Output: ${VerboseOutput}`);
  console.log(`[*] File: usernames.txt`);
  console.log(`[*] SMTP VRFY Check Started`);

  for await (const user of rl) {
    await CheckVRFY(user);
  }

  console.log(`[*] SMTP VRFY Check Complete`);
  rl.close();
  fileStream.close();

}

processFile();
