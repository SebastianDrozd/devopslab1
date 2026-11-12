function getHealth() {
  return {
    status: "ok",
    version: "1.1.0",
    deployedBy: "ansible"
  };
}

module.exports = getHealth;
