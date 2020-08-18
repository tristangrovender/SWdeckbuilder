const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

function writeFile(path, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contents, "utf-8", (err, fileContents) => {
      if (err) {
        reject(err);
      }

      resolve(fileContents);
    });
  });
}

async function getEnvironmentVariablesFromDoppler(env) {
  const { stdout } = await exec(
    `doppler enclave secrets --config ${env} --json`
  );
  const envVars = JSON.parse(stdout);
  return Object.entries(envVars).map(([envName, { computed: envValue }]) => {
    return { key: envName, value: envValue };
  });
}

(async () => {
  const env = process.argv[2];
  if (!env) {
    throw new Error("Please provided env arg. node write-secrets.js dev");
  }
  const environmentVariables = (
    await getEnvironmentVariablesFromDoppler(env)
  ).map(({ key, value }) => {
    return `process.env.${key} = "${value}"`;
  });

  const fileBody = `// This is a generated file from write-secrets.js
// AWS Lambda doesn't support environment variables so this is a work around
${environmentVariables.join("\n")}
export {}
`;

  writeFile("server/load-secrets.ts", fileBody);
})();
