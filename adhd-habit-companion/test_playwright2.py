import re
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:3000')

    page.wait_for_selector('text="Finally. A Habit Tracker for ADHD Brains."', timeout=10000)
    print("Onboarding detected. Completing onboarding...")

    for _ in range(3):
        page.get_by_text("Continue").click(force=True)
        page.wait_for_timeout(500)

    page.get_by_text("Get Started").click(force=True)

    # Wait for Home screen to load
    page.wait_for_selector('text="Good Morning!"')
    print("Home screen loaded.")

    # Test Dopamine Menu interaction
    page.get_by_text("High").click(force=True)
    page.wait_for_selector('text="Dopamine Menu Suggestion"')
    print("Dopamine menu logic works.")

    browser.close()
