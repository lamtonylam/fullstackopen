const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, createSecondBlog } = require("./helper");
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

    test("most liked blog is ordered correctly", async ({ page }) => {
        // create no likes blog first
        await createBlog(page, "Most liked", "mikko mallikas", "hs.fi");
        await createSecondBlog(page, "No likes", "mikko mallikas", "hs.fi");

        // get all buttons
        const buttons = await page.getByRole("button").all();
        // click the last button which is view button for the most liked blog
        await buttons.slice(-1)[0].click();

        // like the most liked blog
        await page.getByRole("button", { name: "like" }).click();
        await page.getByRole("button", { name: "like" }).click();

        // reload page and wait for 1 second
        await page.reload();
        await page.waitForTimeout(1000);

        const blogs = await page.getByTestId("blog").all();
        const first_blog = await blogs[0].textContent();

        expect(first_blog).toContain("Most liked");
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
