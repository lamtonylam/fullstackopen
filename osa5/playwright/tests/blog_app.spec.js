const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");
const exp = require("constants");

describe("Blog app", () => {
    // testien alustus
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset");
        await request.post("/api/users", {
            data: {
                name: "Matti Luukkainen",
                username: "mluukkai",
                password: "salainen",
            },
        });

        await page.goto("/");
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
            await loginWith(page, "mluukkai", "salainen");

            const succesfulLocator = await page.getByText(
                "Matti Luukkainen logged in"
            );
            await expect(succesfulLocator).toBeVisible();
        });

        test("fails with wrong credentials", async ({ page }) => {
            await loginWith(page, "mluukkai", "bumbum");

            const incorrectCrendentialsLocator = await page.getByText(
                "wrong crendials"
            );
            await expect(incorrectCrendentialsLocator).toBeVisible();
        });
    });
});

describe("When logged in", () => {
    // testien alustus
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset");
        await request.post("/api/users", {
            data: {
                name: "Matti Luukkainen",
                username: "mluukkai",
                password: "salainen",
            },
        });

        await page.goto("/");

        loginWith(page, "mluukkai", "salainen");

        const succesfulLocator = await page.getByText(
            "Matti Luukkainen logged in"
        );
        await expect(succesfulLocator).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
        await createBlog(page, "Meaning of life", "mikko mallikas", "hs.fi");

        await expect(
            page.getByText("Meaning of life mikko mallikas")
        ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
        await createBlog(page, "Meaning of life", "mikko mallikas", "hs.fi");

        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();

        await expect(page.getByText("1")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
        await createBlog(page, "Meaning of life", "mikko mallikas", "hs.fi");
        await page.getByRole("button", { name: "view" }).click();

        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();

        await expect(
            page.getByText("Meaning of life mikko mallikas")
        ).not.toBeVisible();
    });
});

describe("When another person is logged in", () => {
    // testien alustus
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset");
        await request.post("/api/users", {
            data: {
                name: "Matti Luukkainen",
                username: "mluukkai",
                password: "salainen",
            },
        });

        await page.goto("/");

        loginWith(page, "mluukkai", "salainen");

        const succesfulLocator = await page.getByText(
            "Matti Luukkainen logged in"
        );
        await expect(succesfulLocator).toBeVisible();
    });

    test("remove button only showed for blog creator", async ({
        page,
        request,
    }) => {
        await createBlog(page, "Meaning of life", "mikko mallikas", "hs.fi");

        await page.getByRole("button", { name: "Logout" }).click();

        await request.post("/api/users", {
            data: {
                name: "Peppi Pitkätossu",
                username: "peppi",
                password: "salainen",
            },
        });

        loginWith(page, "peppi", "salainen");

        await page.getByRole("button", { name: "view" }).click();
        await expect(page.getByText("remove")).not.toBeVisible();
    });
});
