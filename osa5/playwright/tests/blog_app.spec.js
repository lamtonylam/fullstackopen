const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
    // testien alustus
    beforeEach(async ({ page, request }) => {
        await request.post("http:localhost:3003/api/testing/reset");
        await request.post("http://localhost:3003/api/users", {
            data: {
                name: "Matti Luukkainen",
                username: "mluukkai",
                password: "salainen",
            },
        });

        await page.goto("http://localhost:5173");
    });

    test("Login form is shown", async ({ page }) => {
        const loginheader = await page.getByText("Log in to application");
        await expect(loginheader).toBeVisible();
        const usernameLocator = await page.getByText("username");
        await expect(usernameLocator).toBeVisible();
        const passwordLocator = await page.getByText("password");
        await expect(passwordLocator).toBeVisible();
    });

    describe("Login", () => {
        test("succeeds with correct crendetials", async ({ page }) => {
            await page.getByTestId("username").fill("mluukkai");
            await page.getByTestId("password").fill("salainen");

            await page.getByRole("button", { name: "login" }).click();

            const succesfulLocator = await page.getByText(
                "Matti Luukkainen logged in"
            );
            await expect(succesfulLocator).toBeVisible();
        });

        test("fails with wrong credentials", async ({ page }) => {
            await page.getByTestId("username").fill("mluukkai");
            await page.getByTestId("password").fill("mluukkai");

            await page.getByRole("button", { name: "login" }).click();

            const incorrectCrendentialsLocator = await page.getByText(
                "wrong crendials"
            );
            await expect(incorrectCrendentialsLocator).toBeVisible();
        });
    });
});
