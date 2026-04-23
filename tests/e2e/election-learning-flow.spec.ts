import { expect, test } from "@playwright/test";

test.describe("Election learning flow", () => {
  test("user can navigate primary educational journeys", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await expect(page.getByRole("heading", { name: "Election clarity for every voter journey" })).toBeVisible();

    await page.getByRole("link", { name: "Open", exact: true }).first().click();
    await expect(page).toHaveURL(/timeline/);

    await page.goto("http://localhost:3000/process");
    await page.getByRole("button", { name: "Load Steps" }).click();
    await expect(page.getByRole("heading", { name: "Find your election preparation steps" })).toBeVisible();

    await page.goto("http://localhost:3000/chat");
    await page.getByLabel("Your question").fill("What should I do before polling day?");
    await page.getByRole("button", { name: "Ask" }).click();
    await expect(page.getByText("Assistant Response")).toBeVisible();
  });
});
