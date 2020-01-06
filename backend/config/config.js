const Env = use("Env");

module.exports = {
    name: Env.get("HOST") == '' ? '2' : 1
}