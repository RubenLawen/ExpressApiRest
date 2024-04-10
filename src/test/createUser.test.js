const createUser = require("../function/createUser");

test('Create User should be equal = true', async () => {
    expect(await createUser("Lawen", "lawentest@gmail.com", "RubenLawenLeBoss1&")).toBe(true)
});