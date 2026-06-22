from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        try:
            # Handle Onboarding if it shows up
            if page.get_by_text("Finally. A Habit Tracker for ADHD Brains.").is_visible(timeout=5000):
                print("Onboarding detected. Completing onboarding...")
                page.get_by_text("Continue").click(force=True)
                time.sleep(1)
                page.get_by_text("Continue").click(force=True)
                time.sleep(1)
                page.get_by_text("Continue").click(force=True)
                time.sleep(1)
                page.get_by_text("Get Started").click(force=True)
                time.sleep(2)
        except Exception as e:
            print("No onboarding detected or error:", e)

        print("Checking Home Screen...")
        page.wait_for_selector("text=Good Morning!")

        # Test Dopamine menu
        print("Testing Dopamine menu...")
        page.get_by_text("Low").click(force=True)
        time.sleep(1)
        assert page.get_by_text("Dopamine Menu Suggestion").is_visible()

        # Go to Add Habit screen
        print("Navigating to Habits tab...")
        page.get_by_role("tab", name="Habits").click(force=True)
        time.sleep(1)

        print("Testing Empty State...")
        assert page.get_by_text("No habits yet. Start small!").is_visible()

        print("Adding a habit...")
        page.get_by_text("Your Habits").locator("..").locator("svg").locator("..").click(force=True)
        time.sleep(1)

        page.get_by_placeholder("e.g., Floss teeth").fill("Read 10 pages")
        page.get_by_text("Create Habit").click(force=True)
        time.sleep(1)

        print("Verifying habit added...")
        assert page.get_by_text("Read 10 pages").is_visible()
        assert page.get_by_text("Streak: 0 days").is_visible()

        print("Toggling habit completion...")
        page.get_by_role("button", name="Toggle Completion").click(force=True)
        time.sleep(1)
        assert page.get_by_text("Streak: 1 days").is_visible()

        print("Editing habit...")
        page.get_by_role("button", name="Edit Habit").click(force=True)
        time.sleep(1)
        page.get_by_placeholder("e.g., Floss teeth").fill("Read 20 pages")
        page.get_by_text("Save Habit").click(force=True)
        time.sleep(1)
        assert page.get_by_text("Read 20 pages").is_visible()

        print("Testing delete...")
        # Since platform is 'web', it'll try to window.confirm. We can accept the dialog:
        page.on("dialog", lambda dialog: dialog.accept())
        page.get_by_role("button", name="Delete Habit").click(force=True)
        time.sleep(1)
        assert page.get_by_text("No habits yet. Start small!").is_visible()

        print("Tests passed!")
        browser.close()

if __name__ == "__main__":
    run()
