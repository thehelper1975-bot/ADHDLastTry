from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to app...")
        try:
            page.goto("http://localhost:8081", timeout=60000)
            page.wait_for_selector("body", timeout=30000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            return

        print("Page loaded. Checking for Onboarding...")
        time.sleep(3) # Wait for animations/rendering

        # Handle Onboarding
        # Try to find "Continue" button
        for i in range(5):
            if page.get_by_text("Continue").is_visible():
                print("Clicking Continue...")
                page.get_by_text("Continue").click()
                time.sleep(1)
            else:
                break

        if page.get_by_text("Get Started").is_visible():
            print("Clicking Get Started...")
            page.get_by_text("Get Started").click()
            time.sleep(3)

        print("Checking for Home Screen...")
        # Check if we are on Home Screen
        try:
            expect(page.get_by_text("Good Morning!")).to_be_visible(timeout=5000)
            print("On Home Screen.")

            # Select an energy level to show the suggestion card
            print("Selecting 'Balanced' energy...")
            page.get_by_text("Balanced").click()
            time.sleep(1)

            # Now "Dopamine Menu Suggestion" should be visible
            expect(page.get_by_text("Dopamine Menu Suggestion")).to_be_visible()

            # Take screenshot of Home with Suggestion
            page.screenshot(path="verification/home_suggestion.png")
            print("Screenshot taken: home_suggestion.png")

        except Exception as e:
            print(f"Not on Home Screen or error: {e}")
            page.screenshot(path="verification/unknown_state.png")

        browser.close()

if __name__ == "__main__":
    run()
