import re
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')

    page.wait_for_selector('text="Finally. A Habit Tracker for ADHD Brains."', timeout=10000)

    for _ in range(3):
        page.get_by_text("Continue").click(force=True)
        page.wait_for_timeout(500)

    page.get_by_text("Get Started").click(force=True)

    page.wait_for_selector('text="Good Morning!"')

    # Navigate to Habits tab
    page.get_by_role("tab", name="Habits").click(force=True)
    page.wait_for_selector('text="Your Habits"')
    print("Navigated to Habits list.")

    # Click the add button. In React Native Web, TouchableOpacity might not have a button role by default.
    # It has a Plus icon. We'll click by selecting the parent element of the SVG containing the title "Your Habits"
    page.locator('text="Your Habits"').locator("xpath=..").locator("div").nth(1).click(force=True)

    try:
        page.wait_for_selector('text="New Habit"')
        page.get_by_placeholder("e.g., Floss teeth").fill("Test Playwright Habit")
        page.get_by_text("Create Habit").click(force=True)
        print("Created habit.")
    except Exception as e:
        print("Failed to add habit", e)

    page.wait_for_selector('text="Your Habits"')
    page.wait_for_selector('text="Test Playwright Habit"')
    print("Habit appears in list.")

    # Edit habit
    page.locator('text="Test Playwright Habit"').locator("xpath=../..").locator("svg").nth(1).click(force=True)
    try:
        page.wait_for_selector('text="Edit Habit"')
        page.get_by_placeholder("e.g., Floss teeth").fill("Updated Habit")
        page.get_by_text("Save Changes").click(force=True)
        print("Edited habit.")
    except Exception as e:
        print("Failed to edit habit", e)

    page.wait_for_selector('text="Your Habits"')
    page.wait_for_selector('text="Updated Habit"')
    print("Updated habit appears in list.")

    browser.close()
