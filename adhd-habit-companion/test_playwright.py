import re
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')

    # Optional: Skip Onboarding if present
    try:
        page.wait_for_selector('text="Finally. A Habit Tracker for ADHD Brains."', timeout=5000)
        print("Onboarding detected. Completing onboarding...")
        page.get_by_role("button", name="Continue").click(force=True)
        page.get_by_role("button", name="Continue").click(force=True)
        page.get_by_role("button", name="Continue").click(force=True)
        page.get_by_role("button", name="Get Started").click(force=True)
    except Exception as e:
        print("No onboarding or skipped.")

    # Wait for Home screen to load
    page.wait_for_selector('text="Good Morning!"')
    print("Home screen loaded.")

    # Test Dopamine Menu interaction
    page.get_by_text("High").click(force=True)
    page.wait_for_selector('text="Dopamine Menu Suggestion"')
    print("Dopamine menu logic works.")

    # Navigate to Habits tab
    page.get_by_role("tab", name="Habits").click(force=True)
    page.wait_for_selector('text="Your Habits"')
    print("Navigated to Habits list.")

    # Add a Habit
    page.locator('div[accessibilityrole="button"] > svg').locator("path").nth(1).click(force=True) # Click Plus icon (approximate via DOM structure) or just use the button role locator if available
    try:
        page.wait_for_selector('text="New Habit"')
        page.get_by_placeholder("e.g., Floss teeth").fill("Test Playwright Habit")
        page.get_by_text("Create Habit").click(force=True)
        print("Created habit.")
    except Exception as e:
        print("Failed to add habit", e)

    page.wait_for_selector('text="Your Habits"')

    # Let's directly edit via the pen icon
    # There should be an edit button on the card now.
    edit_buttons = page.locator('div[accessibilityrole="button"] > svg > path') # This is a bit brittle, wait for card text
    page.wait_for_selector('text="Test Playwright Habit"')
    print("Habit appears in list.")

    browser.close()
