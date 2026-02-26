from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.goto("http://localhost:8081")

        print("Page loaded")

        # Handle Onboarding if present
        try:
            if page.get_by_text("Finally. A Habit Tracker").is_visible(timeout=5000):
                print("Onboarding detected, skipping...")
                page.get_by_text("Continue").click()
                page.get_by_text("Continue").click()
                page.get_by_text("Continue").click()
                page.get_by_text("Get Started").click()
        except:
            print("Onboarding not found or timed out, assuming Home screen")

        # Verify Home Screen
        try:
            page.get_by_text("Good Morning!").wait_for(timeout=10000)
            print("Home Screen loaded")
        except:
             print("Home Screen not loaded")
             page.screenshot(path="failed_home.png")
             browser.close()
             return

        # Add Habit
        try:
            if page.get_by_text("Test Habit").is_visible():
                print("Test Habit already exists")
            else:
                page.get_by_text("Add a habit").click()
                print("Clicked Add a habit")

                page.get_by_placeholder("e.g., Floss teeth").fill("Test Habit")
                print("Filled habit name")

                page.get_by_text("Create Habit").click()
                print("Clicked Create Habit")
        except:
            print("Failed to add habit")
            page.screenshot(path="failed_add_habit.png")
            browser.close()
            return

        # Verify Habit created
        try:
            page.get_by_text("Test Habit").wait_for()
            print("Habit created and visible on Home")
        except:
            print("Habit not found on Home")
            page.screenshot(path="failed_habit_create.png")

        # Go to Habits Tab
        try:
            # Click Habits tab
            page.get_by_text("Habits").last.click()
            print("Clicked Habits tab")
        except:
             print("Failed to click Habits tab")

        # Verify Habit List
        try:
            page.get_by_text("Your Habits").wait_for()
            print("Habit List loaded")

            # Skip testing Add Button in HabitList to avoid navigation state issues

        except:
            print("Failed to load Habit List")
            page.screenshot(path="failed_habit_list.png")
            browser.close()
            return

        # Verify Edit Button exists (by accessibility label)
        try:
            edit_btn = page.get_by_label("Edit")
            count = edit_btn.count()
            print(f"Edit button count: {count}")

            if count > 0:
                print("Edit button found")
                # Try clicking specifically the LAST one (Test Habit)
                edit_btn.last.click(force=True)
                print("Clicked Edit button")

                # Verify Edit Screen
                try:
                    page.get_by_text("Edit Habit").wait_for(timeout=5000)
                    print("Edit Habit screen loaded")

                    # Update Habit
                    page.get_by_placeholder("e.g., Floss teeth").fill("Updated Habit")
                    page.get_by_text("Update Habit").click()
                    print("Clicked Update Habit")

                    # Verify update
                    page.get_by_text("Updated Habit").wait_for()
                    print("Habit updated successfully")

                    # Take screenshot
                    page.screenshot(path="verification_success.png")
                    print("Screenshot taken: verification_success.png")
                except:
                    print("Edit Habit screen NOT loaded")
                    if page.get_by_text("New Habit").is_visible():
                        print("New Habit screen loaded instead!")
                    page.screenshot(path="failed_click_edit.png")

            else:
                print("Edit button not found")
                page.screenshot(path="failed_find_edit_btn.png")
        except Exception as e:
            print(f"Failed during edit verification: {e}")
            page.screenshot(path="failed_edit_habit_exception.png")

        browser.close()

if __name__ == "__main__":
    run()
