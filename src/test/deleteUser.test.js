const deleteUser = require("../function/deleteUser");

test('Create User should be equal = true', async () => {
    expect(await deleteUser("admin@admin.gmail.com", "Admin123&", "lawentest@gmail.com")).toBe(true)
});