import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // get the sign in button

  await page.getByRole("link", { name: "Sign In" }).click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  // await expect(page.getByText("Sign In")).toBeVisible();

  await page.locator("[name=email]").fill("test3@test.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("Should show search result", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("where are you going?").fill("Dublin");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
});
