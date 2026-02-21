
from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 390, 'height': 844}) # iPhone 12 Pro dimensions
    page = context.new_page()

    # 1. Navigate to app
    print("Navigating to app...")
    page.goto("http://localhost:8081")

    # CLEAR STORAGE FIRST
    print("Clearing storage...")
    page.evaluate("window.localStorage.clear()")
    page.reload()

    # 2. Onboarding
    print("Checking for Onboarding...")
    try:
        # Check if Onboarding is present
        expect(page.get_by_text("Finally. A Habit Tracker")).to_be_visible(timeout=10000)
        print("Onboarding found. Proceeding...")

        # Click Continue 3 times
        # Note: 'Continue' might be 'Next' or arrow. I need to find the button.
        # Assuming typical onboarding buttons.
        # I'll look for "Continue" button.

        # Memory says: "click 'Continue' three times followed by 'Get Started'"
        # But buttons might have no text or icons.
        # I'll try to find buttons by role 'button'.

        # First screen
        page.get_by_text("Continue").click()
        time.sleep(0.5)
        # Second screen
        page.get_by_text("Continue").click()
        time.sleep(0.5)
        # Third screen
        page.get_by_text("Continue").click()
        time.sleep(0.5)
        # Fourth screen
        page.get_by_text("Get Started").click()

    except Exception as e:
        print(f"Onboarding skipped or failed: {e}")
        page.screenshot(path="verification/onboarding_fail.png")

    # 3. Home Screen Verification (Dopamine Menu)
    print("Verifying Home Screen...")
    try:
        expect(page.get_by_text("Good Morning!")).to_be_visible(timeout=20000)
    except Exception as e:
        print(f"Home not found: {e}")
        page.screenshot(path="verification/home_fail.png")
        raise e

    print("Testing Dopamine Menu...")
    # Click 'Low' energy
    page.get_by_text("Low").click()

    # Check suggestion
    expect(page.get_by_text("Dopamine Menu Suggestion")).to_be_visible()

    # Get suggestion text
    suggestion_card = page.locator("div").filter(has_text="Dopamine Menu Suggestion").last
    # Note: structure is nested.

    # Take screenshot of Home with Suggestion
    page.screenshot(path="verification/1_home_dopamine.png")
    print("Screenshot 1 taken.")

    # 4. Add Habit
    print("Adding a habit...")
    # Click 'Add a habit' link if list empty, or go to Habits tab.
    # If list is empty, "Add a habit" text is visible.

    # Add a habit via Home screen link
    page.get_by_text("Add a habit").click()

    # (Removed redundant code)

    # 5. Add Habit Form
    print("Filling Add Habit form...")
    expect(page.get_by_text("New Habit")).to_be_visible()

    # Fill Title
    page.get_by_placeholder("e.g., Floss teeth").fill("Test Habit 1")

    # Toggle Bundling
    # Switch is usually a role='switch' or button.
    # Or checkbox.
    # React Native Web switch: role="switch".
    page.get_by_role("switch").click()

    # Fill Bundled Task
    page.get_by_placeholder("e.g., Listening to podcast").fill("With Coffee")

    # Save
    page.get_by_text("Create Habit").click()

    # 6. Verify in List
    print("Verifying in list...")
    # Should be back on Home? "navigation.goBack()" goes to previous screen.
    # Previous was Home.
    try:
        expect(page.get_by_text("Test Habit 1")).to_be_visible(timeout=10000)
        expect(page.get_by_text("+ With Coffee")).to_be_visible()
        page.screenshot(path="verification/2_habit_added.png")
        print("Screenshot 2 taken.")
    except Exception as e:
        print(f"List verification failed: {e}")
        page.screenshot(path="verification/list_fail.png")
        raise e

    # 7. Edit Habit (Long Press)
    print("Testing Edit Habit (Long Press)...")

    # We are on Home. Habits are listed there too (Today's Focus).
    # Can we edit from Home?
    # In Home Screen:
    # incompleteHabits.map(habit => ( <View key={habit.id} style={styles.habitCard}> ... ))
    # HomeScreen uses `View` for habitCard. It does NOT have onLongPress!
    # Only HabitListScreen has onLongPress.

    # Go to Habits Tab
    page.get_by_text("Habits").click()

    # Find the habit card.
    habit_card = page.locator("div").filter(has_text="Test Habit 1").last
    # Note: Filter might match the text element itself. We want the container that has the listener.
    # The container is the TouchableOpacity.
    # I'll try to find the text, then click its parent?
    # Or just simulate long press on the text. Events usually bubble.

    text_locator = page.get_by_text("Test Habit 1")

    # Simulate Long Press
    # Use .last to pick the visible one (React Navigation keeps previous screens in DOM)
    text_locator = text_locator.last

    # Mouse down, wait, Mouse up.
    box = text_locator.bounding_box()
    if box:
        x = box["x"] + box["width"] / 2
        y = box["y"] + box["height"] / 2
        page.mouse.move(x, y)
        page.mouse.down()
        time.sleep(1.0) # 1 second hold
        page.mouse.up()

    # Verify Edit Screen
    try:
        expect(page.get_by_text("Edit Habit")).to_be_visible(timeout=5000)
        print("Edit Screen opened.")

        # Verify Pre-fill
        expect(page.get_by_placeholder("e.g., Floss teeth")).to_have_value("Test Habit 1")
        expect(page.get_by_placeholder("e.g., Listening to podcast")).to_have_value("With Coffee")

        # Change Title
        page.get_by_placeholder("e.g., Floss teeth").fill("Updated Habit")

        # Save
        page.get_by_text("Save Changes").click()

        # Verify Update
        expect(page.get_by_text("Updated Habit")).to_be_visible()
        print("Habit updated successfully.")

        page.screenshot(path="verification/3_habit_edited.png")

    except Exception as e:
        print(f"Edit failed: {e}")
        # Take debug screenshot
        page.screenshot(path="verification/error_debug.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
