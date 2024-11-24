const { exec } = require("node:child_process");

function checkPostgres() {
  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
    } else {
      process.stdout.write(" Pronto!\n");
    }
  }

  exec(
    "docker exec clone-tabnews-postgres-dev pg_isready --host localhost",
    handleReturn,
  );
}

process.stdout.write("\n\n:-D Aguardando Postgres aceitar conexões");
checkPostgres();
