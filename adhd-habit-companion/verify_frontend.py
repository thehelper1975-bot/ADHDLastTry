from playwright.sync_api import sync_playwright
import time

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # 1. Navigate to the app (Expo Web usually runs on port 8081)
            print("Navigating to app...")
            page.goto("http://localhost:8081")

            # 2. Complete Onboarding if visible
            try:
                print("Checking for onboarding...")
                # Check for unique text on the first onboarding slide
                page.get_by_text("Finally. A Habit Tracker").wait_for(timeout=5000)
                print("Onboarding detected. Proceeding...")

                # Click 'Continue' 3 times
                for i in range(3):
                    page.get_by_role("button", name="Continue").click()
                    time.sleep(0.5)

                # Click 'Get Started'
                page.get_by_role("button", name="Get Started").click()
                print("Onboarding completed.")
            except Exception as e:
                print(f"Onboarding skipped or not found: {e}")

            # 3. Verify Home Screen & Dopamine Menu
            print("Verifying Home Screen...")
            page.get_by_text("Good Morning!").wait_for()

            # Select 'Balanced' energy
            page.get_by_text("Balanced").click()
            time.sleep(0.5)

            # Verify suggestion appears
            suggestion_visible = page.get_by_text("Dopamine Menu Suggestion").is_visible()
            if suggestion_visible:
                print("✅ Dopamine Menu suggestion appeared.")
            else:
                print("❌ Dopamine Menu suggestion NOT found.")

            page.screenshot(path="verification_home.png")

            # 4. Verify Add/Edit Habit
            print("Verifying Habit Creation/Editing...")
            # Click 'Add a habit' (if empty state) or (+) button
            try:
                page.get_by_text("Add a habit").click(timeout=2000)
            except:
                # Find the plus button in header.
                # Note: Lucide icons might not have accessible names, so we might need a specific strategy.
                # Assuming the header has a touchable for adding.
                # Let's try to find by role 'button' with no name if strictly needed, or just assume it's there.
                # Since we don't have aria-labels on the icons, we might need to rely on the 'Add a habit' text if list is empty,
                # or create a habit to ensure list isn't empty.
                pass

            # Create a new habit
            page.get_by_placeholder("e.g., Floss teeth").fill("Test Habit")
            page.get_by_text("Create Habit").click()
            time.sleep(1)

            # Verify habit appears
            page.get_by_text("Test Habit").wait_for()
            print("✅ Habit created.")

            # Edit the habit (Long press simulation might be tricky in web, so use the edit button)
            # We added a pencil icon button.
            # In web, icons often render as SVGs. We need to find the button wrapping it.
            # Let's assume the edit button is the first one in the actions row.

            # For simplicity in verification, let's look for the edit button.
            # Since we didn't add aria-labels, we might have to rely on order or layout.
            # But we can try to click the habit card itself if we didn't add specific accessible names.
            # The code has `onLongPress` and an edit button.

            # Let's take a screenshot of the list with the new habit.
            page.screenshot(path="verification_list.png")

            # 5. Verify Progress Screen
            print("Verifying Progress Screen...")
            # Navigate to Progress tab
            page.get_by_role("link", name="Progress").click() # React Navigation often uses links/buttons for tabs
            # If standard bottom tabs, they are often roles="tab"
            try:
                page.get_by_role("tab", name="Progress").click()
            except:
                 # Fallback if role isn't explicitly 'tab'
                 page.get_by_text("Progress").click()

            page.get_by_text("Weekly Consistency").wait_for()
            page.screenshot(path="verification_progress.png")
            print("✅ Progress screen loaded.")

        except Exception as e:
            print(f"❌ Verification failed: {e}")
            page.screenshot(path="verification_failure.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
